import * as createError from "http-errors";
import * as express from "express";

import * as compression from "compression";
import * as path from "path";
import * as logger from "morgan";

import * as routerAuth from "./routes/auth";


/*
 * INITIALIZE APP
 */


const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(compression());
app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({
  extended: false
}));


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
  res.json({
    error: err.status
  });

});


export = app;
