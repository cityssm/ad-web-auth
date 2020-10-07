import * as configFns from "../helpers/configFns";

import type { RequestHandler } from "express";


const localIPs = ["127.0.0.1", "1"];


export const handler: RequestHandler = (req, res, next) => {

  const ipAddress = req.ip.split(":").pop();

  if (localIPs.includes(ipAddress) ||
    configFns.getProperty("allowlistIPs").includes(ipAddress)) {
    return next();
  }

  res.status(403);
  return res.json(false);
};
