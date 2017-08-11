const path = require('path');

const {
    Runner,
    tasks: { logServer, copy, copyTestRunner, copyTestLibs }
} = require('./');

let logsServerPort;

const runner = new Runner({
    pipeline: [
        logServer(),
        [
            'createApp',
            () => {
                return new Promise(
                    resolve => console.log('create app') && resolve()
                );
            }
        ],
        copy(
            path.resolve(__dirname, 'index.js'),
            path.resolve(__dirname, 'test/')
        ),
        copyTestLibs(path.resolve(__dirname, 'test/')),
        copyTestRunner(path.resolve(__dirname, 'test/')),
        [
            'deployApp',
            () => {
                console.log('deploy app');
            }
        ]
    ]
});

runner.on('log.start', port => (logsServerPort = port));

runner.run().then(() => console.log('done')).catch(err => console.log(err));
