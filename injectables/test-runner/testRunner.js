const {
    isReactNative,
    isNodejs,
    isNativeScript,
    isCordova,
    isDesktop
} = require('../platform');

const MobileTapReporter = require('./mobileTapReporter');

function TestRunner() {
    this.runQueue = [];
    this.initialize();
}

TestRunner.prototype.isCordovaApp = function() {
    return isCordova;
};

TestRunner.prototype.isDevice = function() {
    return isCordova || isNativeScript || isReactNative;
};

TestRunner.prototype.isNativeScriptApp = function() {
    return isNativeScript;
};

TestRunner.prototype.isNodejsApp = function() {
    return isNodejs;
};

TestRunner.prototype.isDesktopApp = function() {
    return isDesktop;
};

TestRunner.prototype.isCordovaApp = function() {
    return isCordova;
};

TestRunner.prototype.initializeGlobals = function(root) {
    root.runner = this;
    root.chai = require('./libs/chai');
    root.mocha = require('./libs/mocha');
    root.ok = chai.assert.ok;
    root.assert = chai.assert;
    root.equal = chai.assert.strictEqual;
    root.deepEqual = chai.assert.deepEqual;
    root.expect = chai.expect;

    root.mocha.setup('bdd');
};

TestRunner.prototype.initialize = function initialize(tests, config) {
    this.config = config;

    this.defaultScripts = [];

    if (this.isDevice() && tests) {
        this.initializeGlobals(global);
        //due to react-native we can't have dynamic requires
        // require('./suites/externalconfig.js');
        // require('./suites/common.js');
        // require('./suites/offline-common.js');

        var el;
        if (isNativeScript || isReactNative) {
            // el = require(`./everlive.js`);
        } else {
            // var nodeBundle =
            //     '../bundles/node-nativescript/everlive.node-nativescript.js'; //working around the static react analysis
            // el = require(nodeBundle);
        }

        // global.Everlive = el;

        tests();
    } else if (!this.isDevice()) {
        this.initializeGlobals(window);

        this.defaultScripts = this.defaultScripts.concat(
            [
                // '../bundles/web-cordova/everlive.web-cordova.js'
            ]
        );

        this.defaultScripts.unshift('libs/chai.js');
        this.defaultScripts.unshift('libs/mocha.js');
        this.defaultScripts.unshift('libs/underscore.js');

        if (isCordova) {
            this.defaultScripts.unshift('../cordova.js');
            // this.defaultScripts[this.defaultScripts.length - 1] =
            //     'everlive.js';
        }

        this.defaultLinks = ['libs/mocha.css'];

        var scripts = null;
        var css = null;
        var self = this;

        [].forEach.call(document.querySelectorAll('script'), function(script) {
            if (script.src.indexOf('TestRunner') !== -1) {
                var src = script.src;
                self.path = src.substr(0, src.lastIndexOf('/') + 1);
                scripts = script.dataset.js && script.dataset.js.split(',');
                css = script.dataset.css && script.dataset.css.split(',');
            }
        });

        if (document && !document.getElementById('mocha')) {
            var mochaDiv = document.createElement('div');
            mochaDiv.id = 'mocha';
            document.body.appendChild(mochaDiv);
        }

        this.loadAndDefaults(scripts, css);
    }
};

TestRunner.prototype.loadDefaults = function() {
    this.load(this.defaultScripts, this.defaultLinks);
};

TestRunner.prototype.loadAndDefaults = function(scripts, links) {
    this.loadDefaults();
    this.load(scripts, links, true);
};

TestRunner.prototype.load = function(scripts, links, relative) {
    var self = this;

    if (scripts) {
        scripts = Array.isArray(scripts) ? scripts : [scripts];

        scripts.forEach(function(script) {
            self.loadScript(script.trim(), relative);
        });
    }

    if (links) {
        links = Array.isArray(links) ? links : [links];

        links.forEach(function(link) {
            self.loadCss(link.trim());
        });
    }
};

TestRunner.prototype.loadScript = function insertScriptTag(src, relative) {
    if (isNativeScript) {
        var scriptName = src.substring(src.lastIndexOf('/'));
        window[scriptName] = require(src);
    } else {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        var prefix = relative ? '' : this.path;
        script.src = prefix + src;
        script.async = false;

        document.head.appendChild(script);
    }
};

TestRunner.prototype.loadCss = function insertLinkTag(href) {
    if (isNativeScript) {
        return;
    }

    var link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = this.path + href;

    document.head.appendChild(link);
};

TestRunner.prototype.run = function run(tests, testFunc, context) {
    if (typeof tests === 'function') {
        //run a test without specific test arguments
        var testFunction = tests;
        var testContext = testFunc;
        testFunc = testFunction;
        context = testContext;
        tests = [[]];
    }

    if (!this.loaded) {
        this.runQueue = this.runQueue || [];
        return this.runQueue.push([tests, testFunc, context]);
    }

    if (arguments.length) {
        tests.forEach(function(test) {
            testFunc.apply(context, test);
        });
    }
};

TestRunner.prototype.runAllTests = function() {
    if (this.loaded) {
        return;
    }

    var that = this;
    this.loaded = true;
    if (this.runQueue) {
        this.configMocha({
            timeout: 60000,
            bail: false,
            reporter: MobileTapReporter(this.config.logServerPort)
        });

        this.runQueue.forEach(function(queueItem) {
            that.run.apply(that, queueItem);
        });
    }

    this.runMocha();
};

TestRunner.prototype.configMocha = function(config) {
    Object.keys(config).forEach(function(key) {
        var val = config[key];
        mocha[key].call(mocha, val);
    });
};

TestRunner.prototype.runMocha = function() {
    if (this.testsRan) {
        //prevent multiple runs of tests
        return;
    }

    this.testsRan = true;
    mocha.run();
};

var runner = new TestRunner();

if (isCordova) {
    document.addEventListener('deviceready', function() {
        setTimeout(function() {
            runner.runAllTests();
        }, 1000);
    });
} else if (!isNativeScript && !isNodejs && !isReactNative) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            runner.runAllTests();
        }, 1000);
    });
}

module.exports = runner;
