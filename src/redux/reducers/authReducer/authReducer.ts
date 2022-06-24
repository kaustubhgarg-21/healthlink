import { createSlice } from "@reduxjs/toolkit";
import {
  fulfilledState,
  rejectedState,
  pendingState,
  resetState,
} from "../../../utility/stateUtility";
import { AppUser } from "../../../web/models/app/appUser";
import { AuthService } from "../../../web/services/auth/authService";
import { authenticateUser, changePassword, resetPassword, requestChangePassword, updateUserAccountSetting, updatePolicyCheck } from "../../actions/auth/authAction";
import AuthState from "../../states/authState/authState";
import { RootState } from "../../store/rootReducer";
import { LocalStorageKeys } from "../../../web/constants/enums";
import { AppRoutes } from "../../../web/router/appRoutes";

const authSvc = new AuthService()

const initialState: AuthState = {
  formState: resetState(),
  passwordGenerated:resetState(), 
  newPasswordGenerated: {},
  isAuthenticated: false,
  accountSettingUpdate: resetState(),
  appUser: null
};
export const AuthSlice = createSlice({
    name: "Auth",
    initialState: initialState,
    reducers: {
      clearState: (state) => {
        state.formState = resetState();
        state.accountSettingUpdate = resetState();
        return state;
      },
      clearPassword:(state)=>{
        state.passwordGenerated =resetState();
        return state;
      },
      logout: (state) => {
        // state.isAuthenticated =false;
        // state.appUser = null
        // console.log("Token Expired clearing local storage >>>>>>>>")
        // localStorage.clear();
        // return state;
        try {
          authSvc.logout();
        } catch (e: any) {
          return e.data;
        }
      },
    },
    extraReducers:{
    [authenticateUser.pending.toString()]:(state) => {
        state.formState = pendingState();
        return state;
    },
    [authenticateUser.fulfilled.toString()]:(state, {payload}) => {
        state.formState = fulfilledState();
        state.appUser = payload
        window.localStorage.setItem(LocalStorageKeys.ACC_TOKEN,payload?.accessToken)
        window.localStorage.setItem(LocalStorageKeys.ID_TOKEN,payload?.idToken)
        window.localStorage.setItem(LocalStorageKeys.REF_TOKEN,payload?.refreshToken)
        window.localStorage.setItem(LocalStorageKeys.USER_ID,payload?.id)
        if(payload?.policyCheck){
          state.isAuthenticated = true
        }else{
          window.location.href = AppRoutes.AGREEMENTPOLICY
        }
        return state;
    },
    [authenticateUser.rejected.toString()]:(state, {payload}) => {
        state.formState = rejectedState(payload?.error);
        return state;
    },  
    [authenticateUser.pending.toString()]:(state) => {
      state.formState = pendingState();
      return state;
  },
  [changePassword.fulfilled.toString()]:(state, {payload}) => {
      console.log(payload,53)
      state.passwordGenerated = fulfilledState();
      state.newPasswordGenerated = payload
      return state;
  },
  [changePassword.rejected.toString()]:(state, {payload}) => {
      state.passwordGenerated = rejectedState(payload?.error);
      return state;
  },  
    [changePassword.pending.toString()]:(state) => {
      state.passwordGenerated = pendingState();
      return state;
  },
  [requestChangePassword.fulfilled.toString()]:(state, {payload}) => {
    state.passwordGenerated = fulfilledState();
    return state;
},
[requestChangePassword.rejected.toString()]:(state, {payload}) => {
    state.passwordGenerated = rejectedState(payload?.error);
    return state;
},  
  [requestChangePassword.pending.toString()]:(state) => {
    state.passwordGenerated = pendingState();
    return state;
},
[updateUserAccountSetting.fulfilled.toString()]:(state, {payload}) => {
  state = {
    ...state,
    appUser: {
      ...state.appUser,
      title: payload.title, 
      firstName: payload.firstName,
      middleName: payload.middleName,
      lastName: payload.lastName,
    } as AppUser,
    accountSettingUpdate: fulfilledState(),
  }
  return state
},
[updateUserAccountSetting.rejected.toString()]:(state, {payload}) => {
  state.accountSettingUpdate = rejectedState(payload?.error);
  return state;
},  
[updateUserAccountSetting.pending.toString()]:(state) => {
  state.accountSettingUpdate = pendingState();
  return state;
},
[resetPassword.pending.toString()]:(state, {payload}) => {
  state.formState = pendingState();
  return state;
},  
[resetPassword.fulfilled.toString()]:(state, {payload}) => {
      state.formState = fulfilledState();
      return state;
  },
  [resetPassword.rejected.toString()]:(state, {payload}) => {
      state.formState = rejectedState(payload?.error);
      return state;
  },
  [updatePolicyCheck.pending.toString()]:(state, {payload}) => {
    state.formState = pendingState();
    return state;
  },  
  [updatePolicyCheck.fulfilled.toString()]:(state, {payload}) => {
        state.formState = fulfilledState();
        state.isAuthenticated = true
        return state;
    },
    [updatePolicyCheck.rejected.toString()]:(state, {payload}) => {
        state.formState = rejectedState(payload?.error);
        return state;
    },
  
    }
  });
  
  export const { clearState,logout , clearPassword} = AuthSlice.actions;
  export const AuthStateSelector = (state: RootState) => state.Auth;
  export default AuthSlice.reducer;