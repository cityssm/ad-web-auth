"use strict";
const express_1 = require("express");
const configFns = require("../helpers/configFns");
const allowlist_1 = require("../handlers/allowlist");
const byGet_1 = require("../handlers/byGet");
const byHeaders_1 = require("../handlers/byHeaders");
const byPost_1 = require("../handlers/byPost");
const router = express_1.Router();
if (configFns.getProperty("methods.get")) {
    router.get("/byGet", allowlist_1.handler, byGet_1.handler);
}
if (configFns.getProperty("methods.headers")) {
    router.all("/byHeaders", allowlist_1.handler, byHeaders_1.handler);
}
if (configFns.getProperty("methods.post")) {
    router.post("/byPost", allowlist_1.handler, byPost_1.handler);
}
module.exports = router;
