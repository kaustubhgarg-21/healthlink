import { createSlice } from "@reduxjs/toolkit";
import UserState from "../../states/user/userState";
import {
  fulfilledState,
  rejectedState,
  pendingState,
  resetState,
} from "../../../utility/stateUtility";
import { fetchUsers,createdUser, updateUser, deleteUser,fetchUserById, importUsers, fetchDashboardData} from "../../actions/user/userAction";
import { RootState } from "../../store/rootReducer";
import { fetchFamilyById } from "../../actions/patient/patientAction";

const initialState: UserState = {
  users : [],
  userCount: 0,
  selectedUser:{
    id:"",
    firstName: "",
    middleName: "",
    title: "",
    imageUrl:"",
    createdBy:"",
    roleId:"",
    lastName: "",
    roleName: "",
    email: "",
    username: "",
    contactNumber: "",
    mobileNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    preferredCommumnication:"",
    isPrimary:true,
    sendInvite:false,
    zipCode: 0,
    organisations:{},
    status: "",
    userRoles:[]

  },
  isUpdated: resetState(),
  isDeleted: resetState(),
  isCreated: resetState(),
  formState: resetState(),
  isUploaded: resetState(),
  dashboardData: {},
  uploadedUsers: 0,
  // createdFamilyMember = null

};
export const UserSlice = createSlice({
    name: "Users",
    initialState: initialState,
    reducers: {
      clearState: (state) => {
        // state=initialState;
        state.isCreated=resetState();
        state.formState = resetState();
        state.isUpdated = resetState();
        state.isDeleted = resetState();
        state.isUploaded = resetState()
        
        return state;
      },
      setSelectedUser: (state,{ payload}) => {
        state.selectedUser = payload;
        return state;
      },
      clearUsers: (state) => {
        state.users = []
        return state;
      },
      clearDashboardData: (state) => {
        state.dashboardData = {};
        return state;
      }
    },
    extraReducers:{
    [fetchUsers.pending.toString()]:(state) => {
        state.formState = pendingState();
        return state;
    },
    [fetchUsers.fulfilled.toString()]:(state, {payload}) => {
        state.formState = fulfilledState();
        state.users = payload.userList
        state.userCount=payload.count
        return state;
    },
    [fetchUsers.rejected.toString()]:(state) => {
        state.formState = rejectedState();
        return state;
    },
    [fetchUserById.pending.toString()]: (state) => {
      state.formState = pendingState();
      return state;
    },
    [fetchUserById.fulfilled.toString()]: (state, { payload }) => {
      state.formState = fulfilledState();
      state.selectedUser = payload;
      return state;
    },
    [fetchUserById.rejected.toString()]: (state) => {
      state.formState = rejectedState();
      return state;
    },
    [createdUser.pending.toString()]:(state) => {
      state.isCreated = pendingState();
      return state;
    },
    [createdUser.fulfilled.toString()]:(state, {payload}) => {
        state.isCreated = fulfilledState();
        state.selectedUser = payload
        return state;
    },
    [createdUser.rejected.toString()]:(state, {payload}) => {
        state.isCreated = rejectedState(payload?.error);
        return state;
    },
    [updateUser.pending.toString()]:(state) => {
      state.isUpdated = pendingState();
      return state;
    },
    [updateUser.fulfilled.toString()]:(state, {payload}) => {
        state.isUpdated = fulfilledState();
        state.selectedUser = payload
        return state;
    },
    [updateUser.rejected.toString()]:(state, {payload}) => {
        state.isUpdated = rejectedState(payload?.error);
        return state;
    },
    [deleteUser.pending.toString()]:(state) => {
      state.isDeleted = pendingState();
      return state;
    },
    [deleteUser.fulfilled.toString()]:(state, {payload}) => {
        state.isDeleted = fulfilledState();
        // state.selectedUser = payload
        return state;
    },
    [deleteUser.rejected.toString()]:(state, {payload}) => {
        state.isDeleted = rejectedState(payload?.error);
        return state;
    },
    [importUsers.pending.toString()]:(state) => {
      state.isUploaded = pendingState();
      return state;
    },
    [importUsers.fulfilled.toString()]:(state, {payload}) => {
        state.isUploaded = fulfilledState();
        state.uploadedUsers = payload
        return state;
    },
    [importUsers.rejected.toString()]:(state, {payload}) => {
        state.isUploaded = rejectedState(payload?.error);
        return state;
    },
    [fetchDashboardData.pending.toString()]:(state) => {
      state.formState = pendingState();
      return state;
    },
    [fetchDashboardData.fulfilled.toString()]:(state, {payload}) => {
        state.formState = fulfilledState();
        state.dashboardData= payload
        return state;
    },
    [fetchDashboardData.rejected.toString()]:(state, {payload}) => {
        state.formState = rejectedState(payload?.error);
        return state;
    },
    [fetchFamilyById.pending.toString()]:(state) => {
      state.formState = pendingState();
      return state;
    },
    [fetchFamilyById.fulfilled.toString()]:(state, {payload}) => {
        state.formState = fulfilledState();
        state.selectedUser = payload
        return state;
    },
    [fetchFamilyById.rejected.toString()]:(state, {payload}) => {
        state.formState = rejectedState(payload?.error);
        return state;
    },
    }
  });
  
  export const { clearState, setSelectedUser,clearUsers,clearDashboardData } = UserSlice.actions;
  export const UserStateSelector = (state: RootState) => state.User;
  export default UserSlice.reducer;