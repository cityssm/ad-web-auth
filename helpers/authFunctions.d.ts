import { type ActiveDirectoryAuthenticateResult } from '@cityssm/activedirectory-authenticate';
export declare function authenticate(userName: string | null | undefined, password: string | null | undefined): Promise<Partial<ActiveDirectoryAuthenticateResult & {
    success: boolean;
}>>;
