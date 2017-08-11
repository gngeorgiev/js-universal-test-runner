const path = require('path');

const testRunnerWebpackConfig = {
    entry: path.join(__dirname, 'test-runner/testRunner.js'),
    output: {
        library: 'testRunner',
        libraryTarget: 'umd',
        path: path.join(__dirname, './bundles'),
        filename: 'testRunner.bundle.js'
    },
    devtool: 'cheap-eval-source-map',
    externals: {
        'react-native': true,
        './libs/chai': true,
        './libs/mocha': true,
        './suites/externalconfig.js': true,
        './suites/common.js': true,
        './suites/offline-common.js': true
    }
};

module.exports = [testRunnerWebpackConfig];
