#!/usr/bin/env node

import * as app from "../app";

import * as http from "http";
import * as https from "https";

import * as selfSigned from "selfsigned";

import * as configFns from "../helpers/configFns";


function onError(error: Error) {

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

const httpPort = configFns.getProperty("ports.http");

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

const httpsPort = configFns.getProperty("ports.https");

if (httpsPort) {

  const pems = selfSigned.generate(null, null);

  const httpsServer = https.createServer({
    key: pems.private,
    cert: pems.cert
  }, app);

  httpsServer.listen(httpsPort);

  httpsServer.on("error", onError);

  httpsServer.on("listening", function() {
    console.log("HTTPS listening on " + httpsPort.toString());
  });


}
