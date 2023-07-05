import debug from 'debug';
import express from 'express';
import rateLimit from 'express-rate-limit';
import createError from 'http-errors';
import handlerAllow from './handlers/allowlist.js';
import * as configFunctions from './helpers/configFunctions.js';
import routerAuth from './routes/auth.js';
const debugApp = debug('ad-web-auth:app');
export const app = express();
app.use((request, _response, next) => {
    debugApp(`${request.method} ${request.url}`);
    next();
});
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: configFunctions.getProperty('maxQueriesPerMinute')
});
app.use(limiter);
app.use('/auth', handlerAllow, routerAuth);
app.use((_request, _response, next) => {
    next(createError(404));
});
export default app;
