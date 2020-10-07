import * as createError from "http-errors";
import * as express from "express";

import * as logger from "morgan";
import * as rateLimit from "express-rate-limit";

import * as configFns from "./helpers/configFns";

import * as routerAuth from "./routes/auth";


/*
 * INITIALIZE APP
 */


const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({
  extended: false
}));


/*
 * RATE LIMITING
 */


const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: configFns.getProperty("maxQueriesPerMinute")
});

app.use(limiter);


/*
 * ROUTES
 */


app.use("/auth", routerAuth);


// Catch 404 and forward to error handler
app.use(function(_req, _res, next) {
  next(createError(404));
});


// Error handler
app.use(function(err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) {

  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.json(false);
});


export = app;
