const path = require('path');
const fs = require('fs-extra');

const injectables = {
    testRunner: path.join(
        __dirname,
        '../injectables/bundles/testRunner.bundle.js'
    ),
    chai: path.join(__dirname, '../injectables/test-libs/chai.js'),
    mocha: path.join(__dirname, '../injectables/test-libs/mocha.js')
};

const copy = (from, to) => {
    return fs.ensureDir(path.dirname(to)).then(() => fs.copy(from, to));
};

const remove = path => fs.remove(path);

const copyTestRunner = to =>
    copy(
        injectables.testRunner,
        path.join(to, path.basename(injectables.testRunner))
    );

const copyTestLibs = to =>
    Promise.all(
        [injectables.chai, injectables.mocha].map(i =>
            copy(i, path.join(to, path.basename(i)))
        )
    );

module.exports = { copyTestRunner, copy, copyTestLibs, remove };
