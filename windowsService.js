import path from "path";
const __dirname = ".";
export const serviceConfig = {
    name: "Active Directory Web Authentication",
    description: "A web application to authenicate Active Directory users.",
    script: path.join(__dirname, "bin", "www.js")
};
