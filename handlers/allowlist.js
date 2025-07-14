import { isLocal } from '@cityssm/is-private-network-address';
import Debug from 'debug';
import { DEBUG_NAMESPACE } from '../debug.config.js';
import * as configFunctions from '../helpers/configFunctions.js';
const debug = Debug(`${DEBUG_NAMESPACE}:allowlist`);
export default function handler(request, response, next) {
    const ipAddress = request.ip?.split(':').pop() ?? '';
    debug(`Testing IP: ${ipAddress}`);
    if (isLocal(request.ip ?? '') ||
        configFunctions.getProperty('allowlistIPs').includes(ipAddress)) {
        next();
        return;
    }
    response.status(403).json(false);
}
