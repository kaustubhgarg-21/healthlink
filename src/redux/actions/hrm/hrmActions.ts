import { createAsyncThunk } from "@reduxjs/toolkit";
import { HRMService } from "../../../web/services/hrm/hrm";

const hrmSrv = new HRMService();

// this action will call function to get Thresholds for BiometricDevices of patient by assigneeId
export const fetchThresholdsForPatientByAssignee = createAsyncThunk(
    "api/fetchThresholdsForPatientByAssignee",
    async (_args: any, thunkAPI) => {
      try {
        const data = await hrmSrv.fetchThresholdsByPatientByAssignee(_args)
        if (data) {
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
)
export const updateThresholdForPatientByAssignee = createAsyncThunk(
  "api/updateThresholdsForPatientByAssignee",
  async (_args: any, thunkAPI)=>{
    try{
      const data = await hrmSrv.updateThresholdForPatient(_args)
      if(data){
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch(e:any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
)

export const fetchPatientBiometricReadings = createAsyncThunk(
  "api/fetchPatientBiometricReadings",
  async (_args: any, thunkAPI) => {
    try {
      const data = await hrmSrv.fetchBiometricData(_args)
      if (data) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch(e:any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
)

export  const createScheduleForPatient = createAsyncThunk(
  "api/createScheduleForPatient",
  async (_args: any, thunkAPI) => {
    try {
      const data = await hrmSrv.createSchedule(_args)
      if (data && data?.length) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch(e:any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
)

export  const fetchScheduleForPatient = createAsyncThunk(
  "api/fetchScheduleForPatient",
  async (_args: any, thunkAPI) => {
    try {
      const data = await hrmSrv.fetchScheduleList(_args)
      if (data && data?.length) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch(e:any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
)

export  const updatePatientSchedule = createAsyncThunk(
  "api/updatePatientSchedule",
  async (_args: any, thunkAPI) => {
    try {
      const data = await hrmSrv.updateSchedule(_args)
      if (data && data?.id) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch(e:any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
) 
export const deletePatientSchedule = createAsyncThunk(
  "api/deletePatientSchedule",
  async (_args: any, thunkAPI) => {
    try {
      const data = await hrmSrv.deleteSchedule(_args)
      if (data) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch(e:any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
)

export const fetchSchedulePlan = createAsyncThunk(
  "api/fetchSchedulePlan",
  async (_args: any, thunkAPI) => {
    try {
      const data = await hrmSrv.fetchDailySchedule(_args)
      if (data) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch(e:any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
) 

export const fetchPresetSchedules = createAsyncThunk(
  "api/fetchPresetSchedules",
  async (_args, thunkAPI) => {
    try {
      const data = await hrmSrv.fetchPresetSchedules(_args)
      if (data  && data?.length) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch(e:any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
) 

export const fetchPresetScheduleDetail = createAsyncThunk(
  "api/fetchPresetScheduleDetail",
  async (_args: any, thunkAPI) => {
    try {
      const data = await hrmSrv.fetchPresetSchedules(_args)
      if (data  && data?.length) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch(e:any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
) 

export const applyPresetSchedule = createAsyncThunk(
  "api/applyPresetSchedule",
  async (_args:any, thunkAPI) => {
    try {
      const data = await hrmSrv.applySchedule(_args)
      if (data  && data?.length) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch(e:any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
) 

