import { BaseModel } from "../../../core/models/baseModel";
import Adherence from "../adherence/adherence";
import User from "../users/user";

interface Patient extends User {
   
    timezone?: string,
    notes?: string,
    pcpId?: string | null,
    gender?: string,
    dob?: string,
    age?: string,
    preferredCommumnication?: string,
    mrn?: string,
    time?: string,
    password?:string,
    critical?:boolean | null
    adherence?:Adherence[]

   
}
export default Patient;