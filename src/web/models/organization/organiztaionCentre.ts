import { BaseModel } from "../../../core/models/baseModel";

interface OrganizationCentre extends BaseModel {
    id?: string | null,
    orgName : string,
    levelCode  : string,
    parentId : string | null,
    isActive? : boolean,
    children?: any[],
}

export default OrganizationCentre