import { minutesToMillis } from '@cityssm/to-millis';
import Debug from 'debug';
import express from 'express';
import rateLimit from 'express-rate-limit';
import createError from 'http-errors';
import { DEBUG_NAMESPACE } from './debug.config.js';
import handlerAllow from './handlers/allowlist.js';
import * as configFunctions from './helpers/configFunctions.js';
import routerAuth from './routes/auth.js';
const debug = Debug(`${DEBUG_NAMESPACE}:app`);
export const app = express();
app.disable('X-Powered-By');
app.use((request, _response, next) => {
    debug(`${request.method} ${request.url}`);
    next();
});
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
const limiter = rateLimit({
    max: configFunctions.getProperty('maxQueriesPerMinute'),
    windowMs: minutesToMillis(1)
});
app.use(limiter);
app.use('/auth', handlerAllow, routerAuth);
app.use((_request, _response, next) => {
    next(createError(404));
});
export default app;
