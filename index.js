const { Runner } = require('./lib/runner');
const { copyTestRunner, copy, copyTestLibs, remove } = require('./lib/inject');
const { runCommand, installPackages } = require('./lib/commands');
const { processTemplateFile } = require('./lib/templates');
const logServer = require('./lib/logServer');

module.exports = {
    Runner,
    tasks: {
        logServer: () => ['logServer', logServer],
        copy: (from, to) => [`copy ${from} => ${to}`, copy, from, to],
        remove: path => [`remove => ${path}`, remove, path],
        copyTestRunner: to => [`copyTestRunner => ${to}`, copyTestRunner, to],
        copyTestLibs: to => [`copyTestLibs ${to}`, copyTestLibs, to],
        runCommand: ({ command, args, silent, cwd }) => [
            `runCommand ${command} ${args}`,
            runCommand,
            { command, args, silent, cwd }
        ],
        installPackages: (packages, cwd, silent) => [
            `installPackages ${packages}`,
            installPackages,
            packages,
            cwd,
            silent
        ],
        processTemplateFile: (file, data) => [
            `processTemplateFile ${file}`,
            processTemplateFile,
            file,
            data
        ]
    }
};
