import { BaseModel } from "../../../core/models/baseModel";
// import Address from "./address"
interface Role extends BaseModel {
    id?: string| null
    name?: string,
    description?:string
    permissions?: any[]
    isCustom?: boolean

}
export default Role;