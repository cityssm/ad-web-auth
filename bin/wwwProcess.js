import * as http from 'node:http';
import Debug from 'debug';
import { app } from '../app.js';
import { DEBUG_NAMESPACE } from '../debug.config.js';
import * as configFunctions from '../helpers/configFunctions.js';
const debug = Debug(`${DEBUG_NAMESPACE}:wwwProcess:${process.pid}`);
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    switch (error.code) {
        case 'EACCES': {
            debug('Requires elevated privileges');
            process.exit(1);
        }
        case 'EADDRINUSE': {
            debug('Port is already in use.');
            process.exit(1);
        }
        default: {
            throw error;
        }
    }
}
const httpPort = configFunctions.getProperty('ports.http');
if (httpPort !== undefined) {
    const httpServer = http.createServer(app);
    httpServer.listen(httpPort);
    httpServer.on('error', onError);
    httpServer.on('listening', function () {
        debug(`HTTP listening on ${httpPort.toString()}`);
    });
}
