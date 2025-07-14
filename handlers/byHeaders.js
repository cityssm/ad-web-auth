import * as authenticate from '../helpers/authFunctions.js';
import * as configFunctions from '../helpers/configFunctions.js';
const headersConfig = configFunctions.getProperty('methods.headers');
if (headersConfig === undefined) {
    throw new Error("Missing configuration for 'methods.headers'");
}
export default async function handler(request, response) {
    const userName = request.header(headersConfig?.userNameField ?? '') ?? '';
    const password = request.header(headersConfig?.passwordField ?? '') ?? '';
    const auth = await authenticate.authenticate(userName, password);
    response.json(auth);
}
