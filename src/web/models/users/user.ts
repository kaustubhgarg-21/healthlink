import { BaseModel } from "../../../core/models/baseModel";
import Address from "./address"
interface User extends BaseModel {
    id?: string | null
    username: string ,
    isActive?: boolean,
title?: string,
firstName: string,
middleName: string,
lastName?: string,
imageUrl?: string | null,
contactNumber?: string,
mobileNumber?: string,
preferredCommumnication?: string,
email?: string,
roleId?:string | null,
createdBy?:string,
roleName?: string,
status?: string | boolean,
address1?: string,
address2?: string,
city?: string,
state?: string,
country?: string,
sendInvite?: boolean,
isPrimary?:boolean
zipCode?: String | Number,
organisations?:object[]| object,
userRoles? : any[],
password? : string,
orgId?: string,

}
export default User;