"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const configFns = require("../helpers/configFns");
const authenticate = require("../helpers/authFns");
const postConfig = configFns.getProperty("methods.post");
const handler = (req, res) => {
    const userName = req.body[postConfig.userNameField];
    const password = req.body[postConfig.passwordField];
    authenticate.authenticate(userName, password, (auth) => {
        res.json(auth);
    });
};
exports.handler = handler;
