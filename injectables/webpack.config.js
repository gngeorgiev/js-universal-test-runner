const path = require('path');

const testRunnerWebpackConfig = {
    entry: path.join(__dirname, 'test-runner/testRunner.js'),
    output: {
        library: 'testRunner',
        libraryTarget: 'umd',
        path: path.join(__dirname, './bundles'),
        filename: 'testRunner.bundle.js'
    },
    devtool: 'sourcemap',
    externals: {
        'react-native': true
    }
};

module.exports = [testRunnerWebpackConfig];
