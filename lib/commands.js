const spawn = require('cross-spawn');

const runCommand = ({ command, args, cwd = process.cwd(), silent = false }) => {
    if (typeof command === 'function') {
        command = command();
    }

    args = args.map(arg => (typeof arg === 'function' ? arg() : arg));

    const proc = spawn.sync(command, args, { cwd });

    if (proc.error) {
        console.log(JSON.stringify(proc.error));
    }

    if (!silent) {
        console.log(proc.stdout.toString());
        console.error(proc.stderr.toString());
    }
};

const installPackages = (packages, cwd, silent) =>
    Promise.all(
        packages.map(p =>
            runCommand({
                command: 'npm',
                args: ['install', p],
                cwd,
                silent
            })
        )
    );

module.exports = { runCommand, installPackages };
