#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("../app");
const http = require("http");
const https = require("https");
const selfSigned = require("selfsigned");
const configFns = require("../helpers/configFns");
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    switch (error.code) {
        case "EACCES":
            console.error("Requires elevated privileges");
            process.exit(1);
        case "EADDRINUSE":
            console.error("Port is already in use.");
            process.exit(1);
        default:
            throw error;
    }
}
function onListening(server) {
    const addr = server.address();
    const bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port.toString();
}
const httpPort = configFns.getProperty("ports.http");
if (httpPort) {
    const httpServer = http.createServer(app);
    httpServer.listen(httpPort);
    httpServer.on("error", onError);
    httpServer.on("listening", function () {
        onListening(httpServer);
    });
    console.log("HTTP listening on " + httpPort.toString());
}
const httpsPort = configFns.getProperty("ports.https");
if (httpsPort) {
    const pems = selfSigned.generate(null, null);
    const httpsServer = https.createServer({
        key: pems.private,
        cert: pems.cert
    }, app);
    httpsServer.listen(httpsPort);
    httpsServer.on("error", onError);
    httpsServer.on("listening", function () {
        onListening(httpsServer);
    });
    console.log("HTTPS listening on " + httpsPort.toString());
}
