import { BaseModel } from "../../../core/models/baseModel";
 

interface Device extends BaseModel {
    id: string | null,
    hubId:string|null,
    biometricName:string,
    isActive: boolean,
    transamittingHub:string| null,
    MAC:string,
    deviceMake: string ,
    deviceModel: string,
    lastActivityDate: string,


}
export default Device;
