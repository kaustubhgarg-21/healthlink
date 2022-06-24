import BaseState from "../../../core/states/baseState";
import FormState from "../../../core/states/formState";
import Family from "../../../web/models/patient/family";
import Patient from "../../../web/models/patient/patient";
import PatientReview from "../../../web/models/patient/patientReview";
import RelationShip from "../../../web/models/patient/relationShip";
import Payer from "../../../web/models/payer/payer";
import Provider from "../../../web/models/provider/provider";

interface PatientState extends BaseState {
    patients: Patient[] | [],
    patientCount: number,
    selectedPatient: Patient,
    patientReviews: PatientReview[] | [] ,
    formState: FormState,
    isUpdated: FormState,
    isCreated: FormState,
    isReview: FormState,
    isAssigned: FormState,
    unAssigned: FormState,
    familyUpdate: FormState,
    isApproved: FormState,
    relationShips: RelationShip[] | [],
    patientProvider: Provider[] | [],
    patientFamily: Family[] | [],
    adhrence: any[]
    compliance: any[]
    patientDevices: any[]            //TO CHANGE after DEMO
    patientHub : any[],
    createdFamilyMember : Family | null,
    patientPayers : Payer[] | []

}

export default PatientState 