/* eslint-disable no-process-exit, unicorn/no-process-exit */

import { app } from "../app.js";

import * as http from "http";
import * as https from "https";

import devcert from "devcert";

import * as configFunctions from "../helpers/configFunctions.js";


const onError = (error: Error) => {

  if (error.syscall !== "listen") {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error("Requires elevated privileges");
      process.exit(1);
    // break;

    case "EADDRINUSE":
      console.error("Port is already in use.");
      process.exit(1);
    // break;

    default:
      throw error;
  }
}

/**
 * Initialize HTTP
 */

const httpPort = configFunctions.getProperty("ports.http");

if (httpPort) {

  const httpServer = http.createServer(app);

  httpServer.listen(httpPort);

  httpServer.on("error", onError);
  httpServer.on("listening", function() {
    console.log("HTTP listening on " + httpPort.toString());
  });

}

/**
 * Initialize HTTPS
 */

const httpsPort = configFunctions.getProperty("ports.https");

if (httpsPort) {

  const ssl = await devcert.certificateFor([
    "localhost"
  ]);

  const httpsServer = https.createServer(ssl, app);

  httpsServer.listen(httpsPort);

  httpsServer.on("error", onError);

  httpsServer.on("listening", function() {
    console.log("HTTPS listening on " + httpsPort.toString());
  });


}
