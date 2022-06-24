import { createSlice } from "@reduxjs/toolkit";
import { fulfilledState, pendingState, rejectedState, resetState } from "../../../utility/stateUtility";
import { UserRoles } from "../../../web/constants/enums";
import { AppUser } from "../../../web/models/app/appUser";
import { updateUserAccountSetting } from "../../actions/auth/authAction";
import { useSelector } from "react-redux";
import { assignProviderToPatients, fetchProviderPatients, assignFamily,assignPayerToPatients, createFamily, fetchProviderOfPatient, fetchRelationships, createPatient, fetchPatientFamily, fetchPatientById, updatePatient, assignHubToPatients, fetchAdhrenceForPatientByAssignee, fetchPatientPayers, fetchPatientDevice, fetchPatientHub, fetchFamilyById, createPatientReview, patientReviewHistory, unAssignProviderOfPatient, fetchComplianceForPatientByAssignee, unAssignFamilyOfPatient, unAssignPayerOfPatient } from "../../actions/patient/patientAction";
import { createPayer } from "../../actions/payer/payerAction";
import { updateFamily } from "../../actions/user/userAction";
import PatientState from "../../states/patient/patient";
import { RootState } from "../../store/rootReducer";
import { AuthStateSelector } from "../authReducer/authReducer";


const initialState: PatientState = {
    formState: resetState(),
    isUpdated: resetState(),
    // familyUpdate:resetState(),
    isCreated: resetState(),
    isReview: resetState(),
    isAssigned: resetState(),
    unAssigned: resetState(),
    isApproved: resetState(),
    familyUpdate: resetState(),
    patients: [],
    patientCount: 0,
    patientReviews:[],
    selectedPatient:{
    id: "",
    title: "",
    firstName: "",
    username:"",
    middleName: "",
    lastName: "",
    imageUrl: "",
    status: "",
    contactNumber: "",
    email: "",
    timezone: "",
    notes: "",
    pcpId: "",
    gender: "",
    dob: "",
    age: "",
    preferredCommumnication: "",
    mrn: "",
    time: "",
    password: "",    },
    relationShips: [],
    patientProvider: [],
    patientFamily: [],
    patientDevices:[],
    adhrence:[],
    compliance: [],
    patientHub:[],
    patientPayers: [],
    createdFamilyMember: null
    
};
export const PatientSlice = createSlice({
  
    name: "Patients",
    initialState: initialState,
    reducers: {
      clearState: (state) => {
        state.formState = resetState();
        state.isUpdated = resetState();
        state.isCreated = resetState();
        state.isAssigned = resetState();
        state.isReview = resetState();
        state.unAssigned = resetState();
        state.isApproved = resetState();
        state.familyUpdate = resetState();
        return state;
      },
      clearPatientData:(state)=>{
        state.patientFamily =[];
        state.patientHub = [];
        state.patientDevices = [];
        state.patientPayers = [];
        state.patientReviews = [];
        state.patientProvider = []
        return state;
    },
      setSelectedPatient: (state,{ payload}) => {
        state.selectedPatient = payload;
        return state;
      },
     
    },
    extraReducers:{
    [fetchProviderPatients.pending.toString()]:(state) => {
        state.formState = pendingState();
        return state;
    },
    [fetchProviderPatients.fulfilled.toString()]:(state, {payload}) => {
        state.formState = fulfilledState();
        state.patients = payload.patientList
        // state.patientCount=payload.count
        return state;
    },
    [fetchProviderPatients.rejected.toString()]:(state) => {
        state.formState = rejectedState();
        return state;
    },

  

[unAssignFamilyOfPatient.fulfilled.toString()]:(state, {payload}) => {
  state.unAssigned = fulfilledState();
  return state;
},
[unAssignFamilyOfPatient.rejected.toString()]:(state, {payload}) => {
  state.unAssigned = rejectedState(payload?.error);
  return state;
},

[unAssignFamilyOfPatient.pending.toString()]:(state) => {
state.unAssigned = pendingState();
return state;
},
  [unAssignProviderOfPatient.fulfilled.toString()]:(state, {payload}) => {
    if(payload?.error?.statusCode==0){
      state.unAssigned = rejectedState();
    }else{
      state.unAssigned = fulfilledState();
    }
      return state;
    
  },
  [unAssignProviderOfPatient.rejected.toString()]:(state, {payload}) => {
      state.unAssigned = rejectedState(payload?.error);
      return state;
  },
  
  [unAssignProviderOfPatient.pending.toString()]:(state) => {
    state.unAssigned = pendingState();
    return state;
},

  [assignProviderToPatients.pending.toString()]:(state) => {
      state.isAssigned = pendingState();
      return state;
  },
[assignProviderToPatients.fulfilled.toString()]:(state, {payload}) => {
    state.isAssigned = fulfilledState();
    return state;
},

  [assignProviderToPatients.rejected.toString()]:(state,{payload}) => {
    state.isAssigned = rejectedState(payload?.error);
    return state;
},


// [assignProviderToPatients.rejected.toString()]:(state) => {
//     state.isAssigned = rejectedState();
//     return state;
// },
    
  [assignPayerToPatients.pending.toString()]:(state) => {
    state.isAssigned = pendingState();
    return state;
},
[assignPayerToPatients.fulfilled.toString()]:(state, {payload}) => {
    state.isAssigned = fulfilledState();
    return state;
},
[assignPayerToPatients.rejected.toString()]:(state, {payload}) => {
    state.isAssigned = rejectedState(payload?.error);
    return state;
},

  [unAssignPayerOfPatient.fulfilled.toString()]:(state, {payload}) => {

    
    state.unAssigned = fulfilledState();
      return state;
  },
  [unAssignPayerOfPatient.rejected.toString()]:(state, {payload}) => {
      state.unAssigned = rejectedState(payload?.error);
      return state;
  },
  
  [unAssignPayerOfPatient.pending.toString()]:(state) => {
    state.unAssigned = pendingState();
    return state;
},
[assignHubToPatients.pending.toString()]:(state) => {
  state.isAssigned = pendingState();
  return state;
},
[assignHubToPatients.fulfilled.toString()]:(state, {payload}) => {
  state.isAssigned = fulfilledState();
  return state;
},
[assignHubToPatients.rejected.toString()]:(state,{payload}) => {
  state.isAssigned = rejectedState(payload?.error);
  return state;
},
[fetchPatientHub.pending.toString()]:(state) => {
  state.formState = pendingState();
  return state;
},
[fetchPatientHub.fulfilled.toString()]:(state, {payload}) => {
  state.formState = fulfilledState();
  state.patientHub = payload
  return state;
},
[fetchPatientHub.rejected.toString()]:(state) => {
  state.formState = rejectedState();
  return state;
},

[fetchPatientDevice.pending.toString()]:(state) => {
  state.formState = pendingState();
  return state;
},
[fetchPatientDevice.fulfilled.toString()]:(state, {payload}) => {
  state.formState = fulfilledState();
  state.patientDevices = payload
  return state;
},
[fetchPatientDevice.rejected.toString()]:(state) => {
  state.formState = rejectedState();
  return state;
},
[createPatient.pending.toString()]:(state) => {
  state.isCreated = pendingState();
  return state;
},
[createPatient.fulfilled.toString()]:(state, {payload}) => {
  state.isCreated = fulfilledState();
  state.selectedPatient = payload
  return state;
},
[createPatient.rejected.toString()]:(state, {payload}) => {
  state.isCreated = rejectedState(payload?.error);
  return state;
},
[createPatientReview.pending.toString()]:(state) => {
  state.isReview = pendingState();
  return state;
},
[createPatientReview.fulfilled.toString()]:(state, {payload}) => {
  state.isReview = fulfilledState();
  return state;
},
[createPatientReview.rejected.toString()]:(state, {payload}) => {
  state.isReview = rejectedState(payload?.error);
  return state;
},
[patientReviewHistory.rejected.toString()]:(state) => {
  state.isReview = rejectedState()
  return state
},
[patientReviewHistory.pending.toString()]:(state) => {
  state.isReview = pendingState()
  return state
},
[patientReviewHistory.fulfilled.toString()]:(state,{payload}) => {
  state.isReview = fulfilledState();
  state.patientReviews = payload
  return state
},
[fetchPatientById.pending.toString()]:(state) => {
  state.formState = pendingState();
  return state;
},
[fetchPatientById.fulfilled.toString()]:(state, {payload}) => {
  state.formState = fulfilledState();
  state.selectedPatient = payload
  return state;
},
[fetchPatientById.rejected.toString()]:(state) => {
  state.formState = rejectedState();
  return state;
},
[updatePatient.pending.toString()]:(state) => {
  state.isUpdated = pendingState();
  return state;
},
[updatePatient.fulfilled.toString()]:(state, {payload}) => {
  state.isUpdated = fulfilledState();
  state.selectedPatient = payload
  return state;
},

[updatePatient.rejected.toString()]:(state, {payload}) => {
  state.isUpdated = rejectedState(payload?.error);
  return state;
},
[createFamily.pending.toString()]:(state) => {
  state.formState = pendingState();
  return state;
},
[createFamily.fulfilled.toString()]:(state, {payload}) => {
  state.formState = fulfilledState();
  state.createdFamilyMember = payload
  return state;
},
[createFamily.rejected.toString()]:(state, {payload}) => {
  state.formState = rejectedState(payload?.error);
  return state;
},
[assignFamily.pending.toString()]:(state) => {
  state.isApproved = pendingState();
  return state;
},
[assignFamily.fulfilled.toString()]:(state, {payload}) => {
  state.isApproved = fulfilledState();
  return state;
},
[assignFamily.rejected.toString()]:(state, {payload}) => {
  state.isApproved = rejectedState(payload?.error);
  return state;
},
[fetchProviderOfPatient.pending.toString()]:(state) => {
  state.formState = pendingState();
  return state;
},
[fetchProviderOfPatient.fulfilled.toString()]:(state, {payload}) => {
  state.formState= fulfilledState()
  state.patientProvider= payload
  return state;
},
[fetchProviderOfPatient.rejected.toString()]:(state) => {
  state.formState = rejectedState();
  return state;
},
[fetchPatientFamily.pending.toString()]:(state) => {
  state.formState = pendingState();
  return state;
},
[fetchPatientFamily.fulfilled.toString()]:(state, {payload}) => {
  state.patientFamily= payload
  state.formState = fulfilledState();
  return state;
},
[fetchPatientFamily.rejected.toString()]:(state) => {
  state.formState = rejectedState();
  return state;
},
[fetchRelationships.pending.toString()]:(state) => {
  state.formState = pendingState();
  return state;
},
[fetchRelationships.fulfilled.toString()]:(state, {payload}) => {
  state.formState = fulfilledState();
  state.relationShips= payload
  return state;
},
[fetchRelationships.rejected.toString()]:(state) => {
  state.formState = rejectedState();
  return state;
},
[createPayer.pending.toString()]:(state) => {
  state.formState = pendingState();
  return state;
},
[createPayer.fulfilled.toString()]:(state, {payload}) => {
  state.formState = fulfilledState();
  return state;
},
[createPayer.rejected.toString()]:(state, {payload}) => {
  state.formState = rejectedState(payload?.error);
  return state;
},
[fetchPatientPayers.pending.toString()]:(state) => {
  state.formState = pendingState();
  return state;
},
[updateUserAccountSetting.fulfilled.toString()]:(state, {payload}) => {
  console.log(payload,374);
  if(payload.mrn){
  state = {
    ...state,
    selectedPatient: {
      ...state.selectedPatient,
      title: payload.title, 
      firstName: payload.firstName,
      middleName: payload.middleName,
      lastName: payload.lastName,
    } as AppUser,
  }
}
  return state
},
[fetchPatientPayers.fulfilled.toString()]:(state, {payload}) => {
  state.formState = fulfilledState();
  state.patientPayers = payload 
  return state;
},
[fetchPatientPayers.rejected.toString()]:(state) => {
  state.formState = rejectedState();
  return state;
},
[fetchFamilyById.pending.toString()]:(state) => {
  state.formState = pendingState();
  return state;
},
[fetchFamilyById.fulfilled.toString()]:(state, {payload}) => {
  state.formState = fulfilledState();
  state.createdFamilyMember = payload
  return state;
},
[fetchFamilyById.rejected.toString()]:(state) => {
  state.formState = rejectedState();
  return state;
},

[updateFamily.pending.toString()]:(state) => {
  state.familyUpdate = pendingState();
  return state;
},
[updateFamily.fulfilled.toString()]:(state, {payload}) => {
  state.familyUpdate = fulfilledState();
  state.createdFamilyMember = payload
  return state;
},
[updateFamily.rejected.toString()]:(state, {payload}) => {
  state.familyUpdate = rejectedState(payload?.error);
  return state;
},
 // reducer for patient adherence
 [fetchAdhrenceForPatientByAssignee.pending.toString()]: (state) => {
  state.formState = pendingState();
  return state;
},
[fetchAdhrenceForPatientByAssignee.fulfilled.toString()]: (state, { payload }) => {
  state.formState = fulfilledState();
  state.adhrence = payload
  return state;
},
[fetchAdhrenceForPatientByAssignee.rejected.toString()]: (state) => {
  state.formState = rejectedState();
  return state;
},
[fetchComplianceForPatientByAssignee.pending.toString()]: (state) => {
  state.formState = pendingState();
  return state;
},
[fetchComplianceForPatientByAssignee.fulfilled.toString()]: (state, { payload }) => {
  state.formState = fulfilledState();
  state.compliance = payload
  return state;
},
[fetchComplianceForPatientByAssignee.rejected.toString()]: (state) => {
  state.formState = rejectedState();
  return state;
},

    
    }
  });
export const { clearState , setSelectedPatient, clearPatientData} = PatientSlice.actions;
export const PatientStateSelector = (state: RootState) => state.Patients;
export default PatientSlice.reducer;