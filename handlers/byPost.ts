import * as configFns from "../helpers/configFns";
import * as authenticate from "../helpers/authFns";

import type { RequestHandler } from "express";
import type * as configTypes from "../types/configTypes";


const postConfig = configFns.getProperty("methods.post") as configTypes.MethodConfig;


export const handler: RequestHandler = (req, res) => {

  const userName = req.body[postConfig.userNameField];
  const password = req.body[postConfig.passwordField];

  authenticate.authenticate(userName, password, (auth) => {
    res.json(auth);
  });
};
