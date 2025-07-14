import { DEBUG_ENABLE_NAMESPACES as DEBUG_ENABLE_NAMESPACES_AD_AUTHENTICATE } from '@cityssm/activedirectory-authenticate/debug';
export const DEBUG_NAMESPACE = 'ad-web-auth';
export const DEBUG_ENABLE_NAMESPACES = [
    `${DEBUG_NAMESPACE}:*`,
    DEBUG_ENABLE_NAMESPACES_AD_AUTHENTICATE
].join(',');
