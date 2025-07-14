import cluster from 'node:cluster';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Debug from 'debug';
import { DEBUG_ENABLE_NAMESPACES } from '../debug.config.js';
if (process.env.NODE_ENV === 'development') {
    Debug.enable(DEBUG_ENABLE_NAMESPACES);
}
const debug = Debug(`ad-web-auth:www:${process.pid}`);
const directoryName = path.dirname(fileURLToPath(import.meta.url));
const processCount = Math.min(4, os.cpus().length);
process.title = 'AD Web Auth (Primary)';
debug(`Primary pid:   ${process.pid}`);
debug(`Primary title: ${process.title}`);
debug(`Launching ${processCount} processes`);
const clusterSettings = {
    exec: directoryName + '/wwwProcess.js'
};
cluster.setupPrimary(clusterSettings);
const activeWorkers = new Map();
for (let index = 0; index < processCount; index += 1) {
    const worker = cluster.fork();
    activeWorkers.set(worker.process.pid ?? 0, worker);
}
cluster.on('exit', (worker, code, signal) => {
    debug(`Worker ${(worker.process.pid ?? 0).toString()} has been killed`);
    activeWorkers.delete(worker.process.pid ?? 0);
    debug('Starting another worker');
    const newWorker = cluster.fork();
    activeWorkers.set(newWorker.process.pid ?? 0, newWorker);
});
