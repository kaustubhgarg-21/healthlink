import { createSlice } from "@reduxjs/toolkit";
import {
  fulfilledState,
  rejectedState,
  pendingState,
  resetState,
} from "../../../utility/stateUtility";
import {
  assignedProvidertoOrganization,
  createProvider,
  fetchProviderByID,
  fetchProviderList,
  getProviderTypes,
  getSpecialityList,
  updateProvider,
} from "../../actions/providerActions/providerAction";
import { RootState } from "../../store/rootReducer";
import ProviderState from "../../states/provider/providerState";

const initialState: ProviderState = {
  formState: resetState(),
  providers: [],
  providerTypes: [],
  specialities: [],
  selectedProvider: null,
  isUpdated: resetState(),
  isCreated: resetState(),
  isAssigned: resetState()
};
export const ProviderSlice = createSlice({
  name: "Provider",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.formState = resetState();
      state.isUpdated = resetState();
      state.isCreated = resetState();
      state.isAssigned = resetState();
      return state;
    },
    setSelectedProvider: (state, { payload }) => {
      state.selectedProvider = payload;
      return state;
    },
    clearProviders: (state) => {
      state.providers = []
      return state;
    }
  },
  extraReducers: {
    [fetchProviderList.pending.toString()]: (state) => {
      state.formState = pendingState();
      return state;
    },
    [fetchProviderList.fulfilled.toString()]: (state, { payload }) => {
      state.formState = fulfilledState();
      state.providers = payload;
      return state;
    },
    [fetchProviderList.rejected.toString()]: (state) => {
      state.formState = rejectedState();
      return state;
    },
    [updateProvider.pending.toString()]: (state) => {
      state.isUpdated = pendingState();
      return state;
    },
    [updateProvider.fulfilled.toString()]: (state, { payload }) => {
      state.isUpdated = fulfilledState();
      state.selectedProvider = payload;
      return state;
    },
    [updateProvider.rejected.toString()]: (state, {payload}) => {
      state.isUpdated = rejectedState(payload?.error);
      return state;
    },
    [fetchProviderByID.pending.toString()]: (state) => {
      state.formState = pendingState();
      return state;
    },
    [fetchProviderByID.fulfilled.toString()]: (state, { payload }) => {
      state.formState = fulfilledState();
      state.selectedProvider = payload;
      return state;
    },
    [fetchProviderByID.rejected.toString()]: (state) => {
      state.formState = rejectedState();
      return state;
    },
    [createProvider.pending.toString()]: (state) => {
      state.isCreated = pendingState();
      return state;
    },
    [createProvider.fulfilled.toString()]: (state, { payload }) => {
      state.isCreated = fulfilledState();
      state.selectedProvider = payload;
      return state;
    },
    [createProvider.rejected.toString()]: (state, {payload}) => {
      state.isCreated = rejectedState(payload?.error);
      return state;
    },
    [getProviderTypes.pending.toString()]: (state) => {
      state.formState = pendingState();
      return state;
    },
    [getProviderTypes.fulfilled.toString()]: (state, { payload }) => {
      state.formState = fulfilledState();
      state.providerTypes = payload;
      return state;
    },
    [getProviderTypes.rejected.toString()]: (state) => {
      state.formState = rejectedState();
      return state;
  },
  [getSpecialityList.pending.toString()]: (state) => {
    state.formState = pendingState();
    return state;
  },
  [getSpecialityList.fulfilled.toString()]: (state, { payload }) => {
    state.formState = fulfilledState();
    state.specialities = payload;
    return state;
  },
  [getSpecialityList.rejected.toString()]: (state) => {
    state.formState = rejectedState();
    return state;
  },
  [assignedProvidertoOrganization.pending.toString()]: (state) => {
    state.isAssigned = pendingState();
    return state;
  },
  [assignedProvidertoOrganization.fulfilled.toString()]: (state, { payload }) => {
    state.isAssigned = fulfilledState();
    return state;
  },
  [assignedProvidertoOrganization.rejected.toString()]: (state) => {
    state.isAssigned = rejectedState();
    return state;
  },
}
});

export const { clearState, setSelectedProvider , clearProviders } = ProviderSlice.actions;
export const ProviderStateSelector = (state: RootState) => state.Provider;
export default ProviderSlice.reducer;
