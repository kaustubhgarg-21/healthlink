import { BaseModel } from "../../../core/models/baseModel";
import Patient from "./patient";


interface PatientReview extends Patient{
    patientId:string,
    providerId:string,
    action:[],
    diagnosis:string,
    cptCode:string,
    drgCode:string,
    patientReviewnote:string,
    emailMessage:string,
    recordTime: number,
    patientName:string,
    providerName:string,
    email:string,

}
export default PatientReview;