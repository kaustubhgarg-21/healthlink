import { createAsyncThunk } from "@reduxjs/toolkit";
import Patient from "../../../web/models/patient/patient";
import { PatientService } from "../../../web/services/patient/patientService";


const patientSrv = new PatientService()

export const fetchProviderPatients = createAsyncThunk(
    "api/patientList",
    async (_args:any,thunkAPI) => {
        try {
          const data = await patientSrv.fetchProviderPatients(_args)
          if (data != null) { 
            console.log(data,"13")
            return data;
            
          } else {
            return thunkAPI.rejectWithValue(data);
          }
        } catch (e: any) {
          return thunkAPI.rejectWithValue(e.data);
        }
      }
) 

export const fetchPatientById = createAsyncThunk(
  "api/fetchPatientById",
  async (_args:any,thunkAPI) => { 
      try {
        const data = await patientSrv.fetchSinglePatient(_args)
        if (data != null) { 
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
)

export const unAssignProviderOfPatient = createAsyncThunk(
  "api/unAssignProviderOfPatient",
  async (_args:any,thunkAPI) => {
      try {
        const data = await patientSrv.unAssignProviderOfPatient(_args)
        // if (data && data.id) { 
          // if(data != null){
            if(data && data.length>0){
          return data;
          
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
) 

export const unAssignPayerOfPatient = createAsyncThunk(
  "api/unAssignPayerOfPatient",
  async (_args:any,thunkAPI) => {
      try {
        const data = await patientSrv.unAssignPayerOfPatient(_args)
        // if (data && data.id) { 
          if(data && data.length>0){

          return data;
          
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
) 

export const unAssignFamilyOfPatient = createAsyncThunk(
  "api/unAssignFamilyOfPatient",
  async (_args:any,thunkAPI) => {
      try {
        const data = await patientSrv.unAssignFamilyOfPatient(_args)
        if (data && data == true) { 
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
) 

export const fetchProviderOfPatient = createAsyncThunk(
  "api/providerforPatient",
  async (_args:Patient,thunkAPI) => {
      try {
        const data = await patientSrv.fetchProviderOfPatient(_args)
        if (data != null) { 
          return data;
          
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
) 

export const createPatient = createAsyncThunk(
    "api/createPatient",
    async (_args:Patient,thunkAPI) => { 
        try {
          const data = await patientSrv.createPatient(_args)
          if (data && data?.id) { 
            return data;
          } else {
            return thunkAPI.rejectWithValue(data);
          }
        } catch (e: any) {
          return thunkAPI.rejectWithValue(e.data);
        }
      }
  
    
  )
  export const updatePatient = createAsyncThunk(
    "api/updatePatient",
    async (_args:Patient,thunkAPI) => { 
        try {
          const data = await patientSrv.updatePatient(_args)
          if (data && data?.id) { 
            return data;
          } else {
            return thunkAPI.rejectWithValue(data);
          }
        } catch (e: any) {
          return thunkAPI.rejectWithValue(e.data);
        }
      }
  
    
  )
  export const createFamily = createAsyncThunk(
    "api/createFamily",
    async (_args:any,thunkAPI) => { 
        try {
          const data = await patientSrv.createFamily(_args)
          if (data && data?.id) { 
            return data;
          } else {
            return thunkAPI.rejectWithValue(data);
          }
        } catch (e: any) {
          return thunkAPI.rejectWithValue(e.data);
        }
      }    
  )

  export const assignFamily = createAsyncThunk(
    "api/assignFamily",
    async (_args:any,thunkAPI) => { 
        try {
          const data = await patientSrv.assignFamily(_args)
          if (data && data?.id) { 
            return data;
          } else {
            return thunkAPI.rejectWithValue(data);
          }
        } catch (e: any) {
          return thunkAPI.rejectWithValue(e.data);
        }
      }    
  )

  export const createPatientReview = createAsyncThunk(
    "api/createPatientReview",
    async (_args:any,thunkAPI) => { 
        try {
          const data = await patientSrv.createPatientReview(_args)
          if (data && data?.id) { 
            return data;
          } else {
            return thunkAPI.rejectWithValue(data);
          }
        } catch (e: any) {
          return thunkAPI.rejectWithValue(e.data);
        }
      }    
  )

  export const patientReviewHistory = createAsyncThunk(
    "api/patientReviewHistory",
    async (_args:any,thunkAPI) => {
      try {
        const data = await patientSrv.getPatientReview(_args)
        if(data != null){
          return data
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      }catch (e:any){
        return thunkAPI.rejectWithValue(e.data);
      }
    }
  )
  export const fetchRelationships = createAsyncThunk(
    "api/fetchRelationships",
    async (_args,thunkAPI) => { 
        try {
          const data = await patientSrv.fetchRelationship()
          console.log(data)
          if (data != null) { 
            return data;
          } else {
            return thunkAPI.rejectWithValue(data);
          }
        } catch (e: any) {
          console.log(e)
          return thunkAPI.rejectWithValue(e.data);
        }
      }
  )

  export const assignProviderToPatients = createAsyncThunk(
    "api/assignProviderToPatients",
    async (_args:any,thunkAPI) => { 
      console.log(_args,229)
        try {
          const data = await patientSrv.assignProviderToPatients(_args)
          console.log(data,231);
          // if(data && data.id){
          if (data && data?.rows?.length > 0) { 
            // if(data!= null){
            return data;
          } else {
            return thunkAPI.rejectWithValue(data);
          }
        } catch (e: any) {
          return thunkAPI.rejectWithValue(e.data);
        }
      }
  
    
  )

  export const assignPayerToPatients = createAsyncThunk(
    "api/assignPayerToPatients",
    async (_args:any,thunkAPI) => { 
        try {
          const data = await patientSrv.assignPayerToPatients(_args)
          if (data && data.length > 0) { 
            return data;
          } else {
            return thunkAPI.rejectWithValue(data);
          }
        } catch (e: any) {
          return thunkAPI.rejectWithValue(e.data);
        }
      }
  
    
  )

  export const assignHubToPatients = createAsyncThunk(
    "api/assignHubToPatients",
    async (_args:any,thunkAPI) => { 
        try {
          const data = await patientSrv.assignHubToPatients(_args)
          if (data && !data?.error) { 
            return data;
          } else {
            return thunkAPI.rejectWithValue(data);
          }
        } catch (e: any) {
          return thunkAPI.rejectWithValue(e.data);
        }
      }
  )
  export const fetchOrganisationPatients = createAsyncThunk(
    "api/patientListOrg",
    async (_args:any,thunkAPI) => {
        try {
          const data = await patientSrv.fetchPatients(_args)
          if (data != null) { 
            return data;   
          } else {
            return thunkAPI.rejectWithValue(data);
          }
        } catch (e: any) {
          return thunkAPI.rejectWithValue(e.data);
        }
      }
) 
export const fetchPatientHub = createAsyncThunk(
  "api/fetchPatientHub",
  async (_args:any,thunkAPI) => {
      try {
        const data = await patientSrv.fetchHubPatients(_args)
        if (data != null) { 
          return data;
          
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
) 

export const fetchPatientDevice = createAsyncThunk(
  "api/fetchPatientDevice",
  async (_args:any,thunkAPI) => {
      try {
        const data = await patientSrv.fetchDevicePatients(_args)
        if (data != null) { 
          return data;
          
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
) 
export const fetchPatientFamily = createAsyncThunk(
  "api/fetchFamily",
  async (_args:any,thunkAPI) => {
      try {
        const data = await patientSrv.fetchFamily(_args)
        if (data != null) { 
          console.log(data,"13")
          return data;
          
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
)

// this action will call function to get Adherenece of patient by assigneeId
export const fetchAdhrenceForPatientByAssignee = createAsyncThunk(
  "api/fetchAdhrenceForPatientByAssignee",
  async (_args: any, thunkAPI) => {
    try {
      const data = await patientSrv.fetchAdherenceByPatientByAssignee(_args)
      if (data !== null) {   
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
)

export const fetchComplianceForPatientByAssignee = createAsyncThunk(
  "api/fetchComplianceForPatientByAssignee",
  async (_args: any, thunkAPI) => {
    try {
      const data = await patientSrv.fetchComplianceByPatientByAssignee(_args)
      if (data !== null) {   
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
)


export const fetchPatientPayers = createAsyncThunk(
  "api/fetchPatientPayers",
  async (_args:any,thunkAPI) => {
      try {
        const data = await patientSrv.fetchPatientPayers(_args)
        if (data != null) { 
          return data;
          
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
) 
 export const fetchFamilyById  = createAsyncThunk(
  "api/fetchFamilyById",
  async (_args:any,thunkAPI) => {
      try {
        const data = await patientSrv.fetchFamilyById(_args)
        if (data != null) { 
          return data;
          
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
) 