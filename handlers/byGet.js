"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const configFns = require("../helpers/configFns");
const authenticate = require("../helpers/authFns");
const getConfig = configFns.getProperty("methods.get");
exports.handler = (req, res) => {
    const userName = req.query[getConfig.userNameField];
    const password = req.query[getConfig.passwordField];
    authenticate.authenticate(userName, password, (auth) => {
        return res.json(auth);
    });
};
