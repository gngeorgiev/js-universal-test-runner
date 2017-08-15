(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory((function webpackLoadOptionalExternalModule() { try { return require("react-native"); } catch(e) {} }()), require("./libs/chai"), require("./libs/mocha"));
	else if(typeof define === 'function' && define.amd)
		define(["react-native", "./libs/chai", "./libs/mocha"], factory);
	else if(typeof exports === 'object')
		exports["testRunner"] = factory((function webpackLoadOptionalExternalModule() { try { return require("react-native"); } catch(e) {} }()), require("./libs/chai"), require("./libs/mocha"));
	else
		root["testRunner"] = factory(root["react-native"], root["./libs/chai"], root["./libs/mocha"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var platform;
var isCordova = false;
var isWindowsPhone = false;
var isAndroid = false;
var isIOS = false;
var isReactNative;
try {
    var ReactNative = __webpack_require__(4);
    isAndroid = ReactNative.Platform.OS === 'android';
    isIOS = ReactNative.Platform.OS === 'ios';
    isReactNative = true;
} catch (e) {
    isReactNative = false;
}

var isNativeScript =
    Boolean(
        (typeof android !== 'undefined' &&
            android &&
            android.widget &&
            android.widget.Button) ||
            (typeof UIButton !== 'undefined' && UIButton)
    ) && !isReactNative;

if (typeof window !== 'undefined' && !isNativeScript && !isReactNative) {
    isCordova =
        /^file:\/{3}[^\/]|x-wmapp/i.test(window.location.href) &&
        /ios|iphone|ipod|ipad|android|iemobile/i.test(navigator.userAgent);
    isWindowsPhone = isCordova && /iemobile/i.test(navigator.userAgent);
    isAndroid = isCordova && cordova.platformId === 'android';
}

var isNodejs = typeof exports === 'object' && typeof window === 'undefined';
var isRequirejs = "function" === 'function' && __webpack_require__(5);
var isDesktop = !isNativeScript && !isCordova && !isNodejs && !isReactNative;

if (isNativeScript) {
    platform = 'ns';
} else if (isNodejs) {
    platform = 'nodejs';
} else if (isDesktop) {
    platform = 'desktop';
} else if (isCordova) {
    platform = 'cordova';
} else if (isReactNative) {
    platform = 'reactnative';
}

var isInAppBuilderSimulator = function() {
    return (
        typeof window !== 'undefined' &&
        window.navigator &&
        window.navigator.simulator
    );
};

module.exports = {
    isCordova,
    isNativeScript,
    isDesktop,
    isWindowsPhone,
    isAndroid,
    isIOS,
    isNodejs,
    isRequirejs,
    isReactNative,
    platform,
    isInAppBuilderSimulator
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 1;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {const {
    isReactNative,
    isNodejs,
    isNativeScript,
    isCordova,
    isDesktop
} = __webpack_require__(0);

const MobileTapReporter = __webpack_require__(6);

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
    root.chai = __webpack_require__(7);
    root.mocha = __webpack_require__(8);
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
        window[scriptName] = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

if(typeof __WEBPACK_EXTERNAL_MODULE_4__ === 'undefined') {var e = new Error("Cannot find module \"react-native\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const {
    isReactNative,
    isNodejs,
    isNativeScript,
    isCordova,
    isDesktop
} = __webpack_require__(0);

const MobileTapReporter = function(logServerPort) {
    //the built in TAP reporter of mocha uses placeholders which do not render in logcat
    //console.log('ok %d %s # SKIP -', n, title(test));

    //Generates reports in the following format:
    //https://wiki.jenkins-ci.org/display/JENKINS/TAP+Plugin
    return function MobileTapReporter(runner) {
        var passes = 0;
        var failures = 0;
        var n = 0;

        function handleSendLogError(err) {
            if (err) {
                console.error(`Failed sending log to server: ${err.message}`);
            }
        }

        const logServer = 'http://localhost:' + logServerPort;
        function mochaLog(message) {
            console.log('Mocha: ' + message);

            let platform = '';
            if (isNativeScript) {
                platform = 'nativescript';
            } else if (isNodejs) {
                platform = 'node';
            } else if (isDesktop) {
                platform = 'web';
            } else if (isCordova) {
                platform = 'cordova';
            } else if (isReactNative) {
                platform = 'reactnative';
            }

            if (isReactNative || isDesktop || isCordova || isNativeScript) {
                fetch(logServer, {
                    method: 'POST',
                    body: JSON.stringify({
                        platform: platform,
                        logs: [message]
                    })
                }).catch(handleSendLogError);
            } else if (isNodejs) {
                const requestModule = 'request';
                const request = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
                request(
                    {
                        method: 'POST',
                        url: logServer,
                        json: true,
                        body: {
                            platform,
                            logs: [message]
                        }
                    },
                    handleSendLogError
                );
            }
        }

        /**
     * Return a TAP-safe title of `test`
     *
     * @param {Object} test
     * @return {String}
     * @api private
     */

        function title(test) {
            return test.fullTitle().replace(/#/g, '');
        }

        runner.on('start', function() {
            var total = runner.grepTotal(runner.suite);
            mochaLog(1 + '..' + total);
        });

        runner.on('test end', function() {
            ++n;
        });

        runner.on('pending', function(test) {
            mochaLog('ok ' + n + ' ' + title(test) + ' # SKIP-');
        });

        runner.on('pass', function(test) {
            passes++;
            mochaLog('ok ' + n + ' ' + title(test));
        });

        runner.on('fail', function(test, err) {
            failures++;
            var failMessage = 'not ok ' + n + ' ' + title(test);
            if (err.stack) {
                failMessage += ' - ' + err.stack.replace(/^/gm, '  ');
            }

            mochaLog(failMessage);
        });

        runner.on('end', function() {
            mochaLog('# tests ' + (passes + failures));
            mochaLog('# pass ' + passes);
            mochaLog('# fail ' + failures);
        });
    };
};

module.exports = MobileTapReporter;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=testRunner.bundle.js.map