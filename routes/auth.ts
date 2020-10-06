import { Router } from "express";
import * as configFns from "../helpers/configFns";

import * as authenticate from "../helpers/authFns";

import type * as configTypes from "../types/configTypes";


const router = Router();


if (configFns.getProperty("methods.post")) {

  const postConfig = configFns.getProperty("methods.post") as configTypes.MethodConfig;

  router.post("/byPost", (req, res) => {

    const userName = req.body[postConfig.userNameField];
    const password = req.body[postConfig.passwordField];

    return res.json(authenticate.authenticate(userName, password));
  });

}


export = router;
