import { BaseModel } from "../../../core/models/baseModel";
import User from "../users/user";

interface Provider extends User {
    designation?: string,
    npiName?: string,
    npi?: number | string,
    specialtyId?: string,
    preferredCommunication?: string,
    unavailableFromDate?: null | string,
    unavailableToDate?: null | string,
    providerTypeId: string,
    providerOrgs?: any[],
    providerTypeList?: any,
    password?:string,
    specialtyList?: any,
    providerType?: string,
    specialtyType?: string,
    isPcp? :boolean,
    group?: string,
}

export default Provider