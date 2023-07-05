import path from 'node:path';
const _dirname = '.';
export const serviceConfig = {
    name: 'Active Directory Web Authentication',
    description: 'A web application to authenicate Active Directory users.',
    script: path.join(_dirname, 'bin', 'www.js')
};
