"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const configFns = require("../helpers/configFns");
const localIPs = ["127.0.0.1", "1"];
exports.handler = (req, res, next) => {
    const ipAddress = req.ip.split(":").pop();
    if (localIPs.includes(ipAddress) ||
        configFns.getProperty("allowlistIPs").includes(ipAddress)) {
        return next();
    }
    res.status(403);
    return res.json(false);
};
