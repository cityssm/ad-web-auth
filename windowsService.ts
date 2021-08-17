import path from "path";
import type { ServiceConfig } from "node-windows";


const __dirname = ".";

export const serviceConfig: ServiceConfig = {
  name: "Active Directory Web Authentication",
  description: "A web application to authenicate Active Directory users.",
  script: path.join(__dirname, "bin", "www.js")
};
