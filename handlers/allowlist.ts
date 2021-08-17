import * as configFunctions from "../helpers/configFunctions.js";

import type { RequestHandler } from "express";


const localIPs = new Set(["127.0.0.1", "1"]);


export const handler: RequestHandler = (request, response, next) => {

  const ipAddress = request.ip.split(":").pop();

  if (localIPs.has(ipAddress) ||
    configFunctions.getProperty("allowlistIPs").includes(ipAddress)) {
    return next();
  }

  response.status(403);
  return response.json(false);
};


export default handler;
