import createError from "http-errors";
import express from "express";

import rateLimit from "express-rate-limit";

import * as configFunctions from "./helpers/configFunctions.js";

import handlerAllow from "./handlers/allowlist.js";
import routerAuth from "./routes/auth.js";

import debug from "debug";
const debugApp = debug("ad-web-auth:app");


/*
 * INITIALIZE APP
 */


export const app = express();

app.use((request, _response, next) => {
  debugApp(`${request.method} ${request.url}`);
  next();
});

app.use(express.json());

app.use(express.urlencoded({
  extended: false
}));


/*
 * RATE LIMITING
 */


const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: configFunctions.getProperty("maxQueriesPerMinute")
});

app.use(limiter);


/*
 * ROUTES
 */


app.use("/auth", handlerAllow, routerAuth);


// Catch 404 and forward to error handler
app.use(function(_request, _response, next) {
  next(createError(404));
});


// Error handler
app.use(function(error: Error, request: express.Request, response: express.Response) {

  // Set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get("env") === "development" ? error : {};

  // Render the error page
  response.status(error.status || 500);
  response.json(false);
});


export default app;
