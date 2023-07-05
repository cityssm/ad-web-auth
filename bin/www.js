import '../helpers/polyfills.js';
import cluster from 'node:cluster';
import os from 'node:os';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Debug from 'debug';
const debug = Debug(`ad-web-auth:www:${process.pid}`);
const directoryName = dirname(fileURLToPath(import.meta.url));
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
    activeWorkers.set(worker.process.pid, worker);
}
cluster.on('exit', (worker, code, signal) => {
    debug(`Worker ${worker.process.pid.toString()} has been killed`);
    activeWorkers.delete(worker.process.pid);
    debug('Starting another worker');
    const newWorker = cluster.fork();
    activeWorkers.set(newWorker.process.pid, newWorker);
});
