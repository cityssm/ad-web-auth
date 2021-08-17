import createError from "http-errors";
import express from "express";
import rateLimit from "express-rate-limit";
import * as configFunctions from "./helpers/configFunctions.js";
import handlerAllow from "./handlers/allowlist.js";
import routerAuth from "./routes/auth.js";
import debug from "debug";
const debugApp = debug("ad-web-auth:app");
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
    max: configFunctions.getProperty("maxQueriesPerMinute")
});
app.use(limiter);
app.use("/auth", handlerAllow, routerAuth);
app.use(function (_request, _response, next) {
    next(createError(404));
});
app.use(function (error, request, response) {
    response.locals.message = error.message;
    response.locals.error = request.app.get("env") === "development" ? error : {};
    response.status(error.status || 500);
    response.json(false);
});
export default app;
