import { createSlice } from "@reduxjs/toolkit";
import {
  fulfilledState,
  rejectedState,
  pendingState,
  resetState,
} from "../../../utility/stateUtility";
import { createdOrganization, createdOrganizationCentre, createdOrganizationDepartment, deleteCenter, deleteDepartment, deleteOrganization, fetchOrganizationById, fetchOrganizations, fetchOrganizationSummary, updateOrganization, updateOrganizationCentre, updateOrganizationDepartment } from "../../actions/organization/organizationActions";
import OrganizationState from "../../states/organization/organizationState";
import { RootState } from "../../store/rootReducer";

const initialState: OrganizationState = { 
  organizations : [],
  organizatonsCount: 0,
  selectedOrganization: 
  {
    id: "",
    parentId: null,
    orgName: "",
    isActive: false,
    levelCode: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zipcode: 0,
    notes: "",
    timezone: "",
    orgCentres: [],
    orgDepartments: [],
  },
  isUpdated: resetState(),
  isCreated: resetState(),
 isDeleted:resetState(),
  formState: resetState(),
  familyCount: 0,
  providerCount: 0,
  patientCount: 0,
  adminCount:0
};
export const OrganizationSlice = createSlice({
    name: "Organization",
    initialState: initialState,
    reducers: {
      clearState: (state) => {
        state.formState = resetState();
        state.isUpdated = resetState();
        state.isDeleted = resetState();
        return state;
      },
      setSelectedOrganization: (state,{ payload}) => {
        state.selectedOrganization = payload;
        return state;
      },
    },
    extraReducers:{
    [fetchOrganizations.pending.toString()]:(state) => {
        state.formState = pendingState();
        return state;
    },
    [fetchOrganizations.fulfilled.toString()]:(state, {payload}) => {
        state.formState = fulfilledState();
        state.organizations = payload.organizationList
        state.organizatonsCount= payload.count
        return state;
    },
    [fetchOrganizations.rejected.toString()]:(state) => {
        state.formState = rejectedState();
        return state;
    },
    [createdOrganization.pending.toString()]:(state) => {
      state.formState = pendingState();
      return state;
    },
    [createdOrganization.fulfilled.toString()]:(state, {payload}) => {
        state.formState = fulfilledState();
        state.selectedOrganization = payload
        return state;
    },
    [createdOrganization.rejected.toString()]:(state, {payload}) => {
      state.formState = rejectedState(payload?.error);
      return state;
    },
    [fetchOrganizationById.pending.toString()]:(state) => {
      state.formState = pendingState();
      return state;
    },
    [fetchOrganizationById.fulfilled.toString()]:(state, {payload}) => {
        state.formState = fulfilledState();
        state.selectedOrganization = payload
        return state;
    },
    [fetchOrganizationById.rejected.toString()]:(state) => {
        state.formState = rejectedState();
        return state;
    },

    [fetchOrganizationSummary.pending.toString()]:(state) => {
      state.formState = pendingState();
      return state;
    },
    [fetchOrganizationSummary.fulfilled.toString()]:(state, {payload}) => {
        state.formState = fulfilledState();
        state.familyCount = payload.familyCount?  payload.familyCount: 0
        state.providerCount = payload.providerCount?  payload.providerCount: 0
        state.patientCount = payload.patientCount?  payload.patientCount: 0
        state.adminCount = payload.adminCount?  payload.adminCount: 0
        return state;
    },
    [fetchOrganizationSummary.rejected.toString()]:(state) => {
        state.formState = rejectedState();
        return state;
    },

    [updateOrganization.pending.toString()]:(state) => {
      state.isUpdated = pendingState();
      return state;
    },
    [updateOrganization.fulfilled.toString()]:(state, {payload}) => {
        state.isUpdated = fulfilledState();
        state.selectedOrganization = payload
        return state;
    },
    [updateOrganization.rejected.toString()]:(state, {payload}) => {
        state.isUpdated = rejectedState(payload?.error);
        return state;
    },
    [deleteOrganization.pending.toString()]:(state) => {
      state.isDeleted = pendingState();
      return state;
    },
    [deleteOrganization.fulfilled.toString()]:(state, {payload}) => {
        state.isDeleted = fulfilledState();
        return state;
    },
    [deleteOrganization.rejected.toString()]:(state, {payload}) => {
        state.isDeleted = rejectedState(payload?.error);
        return state;
    },
    [deleteCenter.pending.toString()]:(state) => {
      state.isDeleted = pendingState();
      return state;
    },
    [deleteCenter.fulfilled.toString()]:(state, {payload}) => {
        state.isDeleted = fulfilledState();
        return state;
    },
    [deleteCenter.rejected.toString()]:(state, {payload}) => {
        state.isDeleted = rejectedState(payload?.error);
        return state;
    },
    [deleteDepartment.pending.toString()]:(state) => {
      state.isDeleted = pendingState();
      return state;
    },
    [deleteDepartment.fulfilled.toString()]:(state, {payload}) => {
        state.isDeleted = fulfilledState();
        return state;
    },
    [deleteDepartment.rejected.toString()]:(state, {payload}) => {
        state.isDeleted = rejectedState(payload?.error);
        return state;
    },
    [createdOrganizationCentre.pending.toString()]:(state) => {
      state.isUpdated = pendingState();
      return state;
    },
    [createdOrganizationCentre.fulfilled.toString()]:(state, {payload}) => {
        state.isUpdated = fulfilledState();
        return state;
    },
    [createdOrganizationCentre.rejected.toString()]:(state, {payload}) => {
        state.isUpdated = rejectedState(payload?.error);
        return state;
    },
    [updateOrganizationCentre.pending.toString()]:(state) => {
      state.isUpdated = pendingState();
      return state;
    },
    [updateOrganizationCentre.fulfilled.toString()]:(state, {payload}) => {
        state.isUpdated = fulfilledState();
        return state;
    },
    [updateOrganizationCentre.rejected.toString()]:(state, {payload}) => {
        state.isUpdated = rejectedState(payload?.error);
        return state;
    },
    [createdOrganizationDepartment.pending.toString()]:(state) => {
      state.isUpdated = pendingState();
      return state;
    },
    [createdOrganizationDepartment.fulfilled.toString()]:(state, {payload}) => {
        state.isUpdated = fulfilledState();
        return state;
    },
    [createdOrganizationDepartment.rejected.toString()]:(state, {payload}) => {
        state.isUpdated = rejectedState(payload?.error);
        return state;
    },
    [updateOrganizationDepartment.pending.toString()]:(state) => {
      state.isUpdated = pendingState();
      return state;
    },
    [updateOrganizationDepartment.fulfilled.toString()]:(state, {payload}) => {
        state.isUpdated = fulfilledState();
        return state;
    },
    [updateOrganizationDepartment.rejected.toString()]:(state, {payload}) => {
        state.isUpdated = rejectedState(payload?.error);
        return state;
    },
    
    }
  });
  
  export const { clearState,setSelectedOrganization } = OrganizationSlice.actions;
  export const OrganizationStateSelector = (state: RootState) => state.Organization;
  export default OrganizationSlice.reducer;