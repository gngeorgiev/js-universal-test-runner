const http = require('http');
const fs = require('fs');
const net = require('net');

const corsResponseHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type, accept',
    'Access-Control-Max-Age': 10,
    'Content-Type': 'application/json'
};

const mochaEndRegex = /# fail ([0-9]+)/;

module.exports = (logToConsole = true, runner) =>
    new Promise((resolve, reject) => {
        runner.waitForEvent('log.end');

        const handleLogs = function(logEntry) {
            const logPlatform = logEntry.platform;
            logEntry.logs.forEach(log => {
                runner.emit('log.data', log, logPlatform);
                if (logToConsole) {
                    console.log(log);
                }

                if (mochaEndRegex.test(log)) {
                    runner.emit('log.end');
                }
            });
        };

        const server = http.createServer((request, response) => {
            if (request.method === 'OPTIONS') {
                response.writeHead(200, corsResponseHeaders);
                return response.end();
            } else if (request.method === 'POST') {
                let data = '';

                request.on('data', d => (data += d));
                request.on('end', () => handleLogs(JSON.parse(data)));

                response.writeHead(200, corsResponseHeaders);
                response.end('{}');
            }
        });

        server.listen(0, () => {
            const logsPort = server.address().port;
            runner.emit('log.start', logsPort);

            console.log(`LogServer listening on port: ${logsPort}`);

            return resolve(logsPort);
        });
    });
