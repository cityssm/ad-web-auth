"use strict";
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const rateLimit = require("express-rate-limit");
const configFns = require("./helpers/configFns");
const routerAuth = require("./routes/auth");
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: configFns.getProperty("maxQueriesPerMinute")
});
app.use(limiter);
app.use("/auth", routerAuth);
app.use(function (_req, _res, next) {
    next(createError(404));
});
app.use(function (err, req, res, _next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.json(false);
});
module.exports = app;
