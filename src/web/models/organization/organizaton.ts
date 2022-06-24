import { BaseModel } from "../../../core/models/baseModel";
import OrganizationCentre from "./organiztaionCentre";

interface Organization extends BaseModel {
        id: string | null,
        parentId: string | null,
        orgName: string,
        isActive: boolean,
        levelCode: string,
        address1: string,
        address2: string,
        city: string,
        state: string,
        country: string,
        zipcode: number,
        notes: string,
        imageURL?: string,
        timezone: string,
        contacts?: any[]
        orgContacts?: any[],
        primaryContact? : any,
        secondaryContact? : any,
        orgCentres?: OrganizationCentre[],
        orgDepartments?: any[],
        password?:string,
}
export default Organization