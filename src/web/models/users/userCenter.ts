import { BaseModel } from "../../../core/models/baseModel";


interface UserCentre extends BaseModel { 
    isPrimary?: boolean,
    centers: any[],
}
export default UserCentre;
