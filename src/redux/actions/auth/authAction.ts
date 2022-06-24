import { createAsyncThunk } from "@reduxjs/toolkit";
import { LocalStorageKeys, UserRoles } from "../../../web/constants/enums";
import { AppUser } from "../../../web/models/app/appUser";
import User from "../../../web/models/users/user";
import { AuthService } from "../../../web/services/auth/authService";
import { OrganizationService } from "../../../web/services/organization/organizationService";
import { PatientService } from "../../../web/services/patient/patientService";
import { ProviderService } from "../../../web/services/providers/providerService";
import { UserService } from "../../../web/services/user/userServices";

const authSrv = new AuthService()
const patientSrv = new PatientService()
const userSrv = new UserService()
const providerSrv =new ProviderService()
const orgSrv = new OrganizationService()



export const authenticateUser = createAsyncThunk(
    "api/authenticateUser",
    async (_args:any,thunkAPI) => {
        try {
          const data: AppUser = await authSrv.login(_args)
          if (data && data.id !== '') { 
            if(data?.roleName == UserRoles.FAMILY){
              window.localStorage.setItem(LocalStorageKeys.ACC_TOKEN,data?.accessToken)
              window.localStorage.setItem(LocalStorageKeys.ID_TOKEN,data?.idToken)
              window.localStorage.setItem(LocalStorageKeys.REF_TOKEN,data?.refreshToken)
              var x = await patientSrv.fetchFamilyById(data).then((data)=>data)
              return {...data, patientId: x?.patientId}
            }
            return data;
          } else {
            return thunkAPI.rejectWithValue(data);
          }
        } catch (e: any) {
          return thunkAPI.rejectWithValue(e.data);
        }
      }
)

export const resetPassword = createAsyncThunk(
  "api/resetPassword",
  async (_args:any,thunkAPI) => {
      try {
        const data = await authSrv.resetPassword(_args)
        if (data && data.id !== '') { 
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
)

export const privacyPolicy = createAsyncThunk(
  "api/privacyPolicy",
  async (_args,thunkAPI) => {
      try {
        const data = await authSrv.fetchPrivacyPolicy(_args)
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

export const changePassword = createAsyncThunk(
  "api/changePassword",
  async (_args:any,thunkAPI) => {
      try {
        const data = await authSrv.changePassword(_args)
        if (data && data.id !== '') { 
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
)

export const updateUserAccountSetting = createAsyncThunk(
  "api/updateUserAccountSetting",
  async (_args:User,thunkAPI) => {
  
      try {
        let data: any = {}
        switch (_args.roleName){
          case UserRoles.PROVIDER:{
            data = await providerSrv.updateProvider(_args)
            break
          }
          case UserRoles.ORG_ADMIN:{
            data = await userSrv.updateUser(_args)
            break
          }
          case UserRoles.PLATFORM_ADMIN:{
            data = await userSrv.updateUser(_args)
            break
          }
          case UserRoles.FAMILY:{
            data = await userSrv.updateUser(_args)
            break
          }
          case UserRoles.SUPER_ADMIN:{
            data = await userSrv.updateUser(_args)
            break
          }
          case UserRoles.PATIENT:{
            data =await patientSrv.updatePatient(_args)
            break
          }

        }
        console.log(data,107)
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

export const requestChangePassword = createAsyncThunk(
  "api/requestChangePassword",
  async (_args:any,thunkAPI) => {
      try {
        const data = await authSrv.requestChangePassword(_args)
        if (data && data.id !== '') { 
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
)

export const updatePolicyCheck = createAsyncThunk(
  "api/updatePolicyCheck",
  async (_args:any,thunkAPI) => {
      try {
        const data = await authSrv.updatePolicyCheck(_args)
        if (data === true) { 
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
)