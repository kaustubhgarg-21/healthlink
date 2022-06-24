import User from "../users/user";

export interface AppUser extends User {
    orgName: string,
    orgId: string,
    roleId: string
    id: string
    accessToken: string,
    idToken: string
    refreshToken: string,
    patientId?: string,
    policyCheck?: boolean,
    error?: string
}