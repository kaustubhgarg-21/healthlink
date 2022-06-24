
import { createSlice } from "@reduxjs/toolkit";
import {
  fulfilledState,
  rejectedState,
  pendingState,
  resetState,
} from "../../../utility/stateUtility";
import {createRole, deleteRole, fetchPermission, fetchRoles, fetchTransformedRoleById, updateRole } from "../../actions/role/roleAction";
import { RootState } from "../../store/rootReducer";
import RoleState from "../../states/role/roleState";

const initialState: RoleState = {

  roleCount: 0,
  roles:[],
  formState: resetState(),
  selectedRole: null,
  permissionCount: 0,
  permissions: [],
  isCreated: resetState(),
  isUpdated: resetState(),
  roleDetails: {},
  isDeleted: resetState()
};
export const RoleSlice = createSlice({
    name: "Role",
    initialState: initialState,
    reducers: {
      clearState: (state) => {
        state.formState = resetState();
        state.isCreated = resetState()
        state.isUpdated = resetState()
        state.isDeleted = resetState()
        return state;
      },
      setSelectedRole: (state, {payload}) => {
        state.selectedRole = payload;
        return state;
      },
      clearRoleDetail: (state) => {
        state.roleDetails = {};
        return state;
      },
     
    },
    extraReducers:{
  
    [fetchRoles.pending.toString()]:(state) => {
      state.formState = pendingState();
      return state;
  },
  [fetchRoles.fulfilled.toString()]:(state, {payload}) => {
      state.formState = fulfilledState();
      state.roles = payload.roleList
      state.roleCount=payload.count
      return state;
  },
  [fetchRoles.rejected.toString()]:(state) => {
      state.formState = rejectedState();
      return state;
  },
  [updateRole.pending.toString()]:(state) => {
    state.isUpdated = pendingState();
    return state;
  },
  [updateRole.fulfilled.toString()]:(state, {payload}) => {
      state.isUpdated = fulfilledState();
      state.roleDetails = payload
      return state;
  },
  [updateRole.rejected.toString()]:(state, {payload}) => {
      state.isUpdated = rejectedState(payload?.error);
      return state;
  },
    
  [fetchPermission.pending.toString()]:(state) => {
    state.formState = pendingState();
    return state;
},
[fetchPermission.fulfilled.toString()]:(state, {payload}) => {
  // console.log("76",payload);
    state.formState = fulfilledState();
    state.permissions = payload.permissionList
    state.permissionCount=payload.count
    return state;
},
[fetchPermission.rejected.toString()]:(state) => {
  state.formState = rejectedState();
  return state;
},
[createRole.rejected.toString()]:(state, {payload}) => {
    state.isCreated = rejectedState(payload?.error);
    return state;
},
[createRole.pending.toString()]:(state) => {
  state.isCreated = pendingState();
  return state;
},
[createRole.fulfilled.toString()]:(state, {payload}) => {
// console.log("76",payload);
  state.isCreated = fulfilledState();
  state.selectedRole = payload
  return state;
},
[deleteRole.rejected.toString()]:(state) => {
  state.isDeleted = rejectedState();
  return state;
},
[deleteRole.pending.toString()]:(state) => {
state.isDeleted = pendingState();
return state;
},
[deleteRole.fulfilled.toString()]:(state, {payload}) => {
// console.log("76",payload);
state.isDeleted = fulfilledState();
state.selectedRole = payload
return state;
},

// fetch tranformed role details
[fetchTransformedRoleById.pending.toString()]:(state) => {
  state.formState = pendingState();
  return state;
},
[fetchTransformedRoleById.fulfilled.toString()]:(state, {payload}) => {
  state.formState = fulfilledState();
  state.roleDetails = payload
  return state;
},
[fetchTransformedRoleById.rejected.toString()]:(state) => {
  state.formState = rejectedState();
  return state;
},

    // [createdUser.fulfilled.toString()]:(state, {payload}) => {
    //     state.formState = fulfilledState();
    //     state.selectedUser = payload
    //     return state;
    // },
    
    }
  });
  
  export const { clearState,setSelectedRole, clearRoleDetail } = RoleSlice.actions;
  export const RoleStateSelector = (state: RootState) => state.Role;
  export default RoleSlice.reducer;