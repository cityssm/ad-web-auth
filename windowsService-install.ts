import { Service } from "node-windows";
import * as path from "path";

// Create a new service object
const svc = new Service({
  name: "Active Directory Web Authentication",
  description: "A web application to authenicate Active Directory users.",
  script: path.join(__dirname, "bin", "www.js")
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on("install", () => {
  svc.start();
});

svc.install();
