"use strict";
const express_1 = require("express");
const configFns = require("../helpers/configFns");
const authenticate = require("../helpers/authFns");
const router = express_1.Router();
if (configFns.getProperty("methods.post")) {
    const postConfig = configFns.getProperty("methods.post");
    router.post("/byPost", (req, res) => {
        const userName = req.body[postConfig.userNameField];
        const password = req.body[postConfig.passwordField];
        return res.json(authenticate.authenticate(userName, password));
    });
}
module.exports = router;
