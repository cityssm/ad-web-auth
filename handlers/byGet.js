import { authenticate } from '../helpers/authFunctions.js';
import * as configFunctions from '../helpers/configFunctions.js';
const getConfig = configFunctions.getProperty('methods.get');
if (getConfig === undefined) {
    throw new Error("Missing configuration for 'methods.get'");
}
export default async function handler(request, response) {
    const userName = request.query[getConfig?.userNameField ?? ''] ?? '';
    const password = request.query[getConfig?.passwordField ?? ''] ?? '';
    const auth = await authenticate(userName, password);
    response.json(request.query.debug === 'true' ? auth : auth.success);
}
