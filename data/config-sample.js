"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    activeDirectoryConfig: {
        url: "ldap://dc.example.com",
        baseDN: "dc=example,dc=com",
        username: "user@example.com",
        password: "p@ssword"
    },
    methods: {
        post: {
            userNameField: "u",
            passwordField: "p"
        },
        headers: {
            userNameField: "AD-UserName",
            passwordField: "AD-Password"
        }
    },
    allowlistIPs: [
        "192.168.1.234"
    ]
};
module.exports = config;
