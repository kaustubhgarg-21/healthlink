import { createAsyncThunk } from "@reduxjs/toolkit";
import User from "../../../web/models/users/user"
import Address from "../../../web/models/users/address";
import { UserService } from "../../../web/services/user/userServices";
import { PatientService } from "../../../web/services/patient/patientService";

const userSrv = new UserService()
const patientSrv = new PatientService()


export const fetchUsers = createAsyncThunk(
    "api/userList",
    async (_args:any,thunkAPI) => {
        try {
          const data = await userSrv.fetchUsers(_args)
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



export const createdUser = createAsyncThunk(
  "api/createUser",
  async (_args:User,thunkAPI) => { 
      try {
        const data = await userSrv.createUser(_args)
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

export const fetchUserById = createAsyncThunk(
  "api/fetchUserById",
  async (_args:any,thunkAPI) => { 
      try {
        const data = await userSrv.fetchSingleUser(_args)
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



export const updateUser = createAsyncThunk(
  "api/updateUser",
  async (_args:User,thunkAPI) => {
  
      try {
        const data = await userSrv.updateUser(_args)
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

export const updateFamily  = createAsyncThunk(
  "api/updateFamily",
  async (_args:User,thunkAPI) => {
  
      try {
        const data = await patientSrv.updateFamily(_args)
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

export const deleteUser = createAsyncThunk(
  "api/deleteUser",
  async (_args:User,thunkAPI) => {
  
      try {
        const data = await userSrv.deleteUser(_args)
        if (data== true) { 
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
)

export const importUsers = createAsyncThunk(
  "api/importUsers",
  async (_args:any,thunkAPI) => {
  
      try {
        const data = await userSrv.importUsers(_args)
        if (data ) { 
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
)

export const fetchDashboardData = createAsyncThunk(
  "api/fetchDashboardData",
  async (_args:any,thunkAPI) => {
      try {
        const data = await userSrv.fetchUserDashboardData(_args)
        if (data && Object.keys(data)?.length) { 
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
)