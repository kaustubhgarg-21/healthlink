import { BaseModel } from "../../../core/models/baseModel";
interface Permission extends BaseModel {
    id?: string| null,
    name?: string,
    description?:string,
    action?:string,
    isCustom?:boolean

}
export default Permission;