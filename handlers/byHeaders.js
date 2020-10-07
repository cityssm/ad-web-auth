"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const configFns = require("../helpers/configFns");
const authenticate = require("../helpers/authFns");
const headersConfig = configFns.getProperty("methods.headers");
exports.handler = (req, res) => {
    const userName = req.header[headersConfig.userNameField];
    const password = req.header[headersConfig.passwordField];
    authenticate.authenticate(userName, password, (auth) => {
        res.json(auth);
    });
};
