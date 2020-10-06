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

function onListening(server: http.Server | https.Server) {

  const addr = server.address();

  const bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port.toString();
}

/**
 * Initialize HTTP
 */

const httpPort = configFns.getProperty("port.http");

if (httpPort) {

  const httpServer = http.createServer(app);

  httpServer.listen(httpPort);

  httpServer.on("error", onError);
  httpServer.on("listening", function() {
    onListening(httpServer);
  });

  console.log("HTTP listening on " + httpPort.toString());
}

/**
 * Initialize HTTPS
 */

const httpsPort = configFns.getProperty("port.https");

if (httpsPort) {

  const pems = selfSigned.generate(null, null);

  const httpsServer = https.createServer({
    key: pems.private,
    cert: pems.cert
  }, app);

  httpsServer.listen(httpsPort);

  httpsServer.on("error", onError);

  httpsServer.on("listening", function() {
    onListening(httpsServer);
  });

  console.log("HTTPS listening on " + httpsPort.toString());

}
