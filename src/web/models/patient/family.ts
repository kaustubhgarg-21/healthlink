import User from "../users/user";

interface Family extends User {
   
    userId?: string,
    relation?: string,
    relationshipId?: string,
    preferredCommumnication?: string,
    patientId?: string,

}
export default Family;