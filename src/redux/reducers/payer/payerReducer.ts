import { createSlice } from "@reduxjs/toolkit";
import {
  fulfilledState,
  rejectedState,
  pendingState,
  resetState,
} from "../../../utility/stateUtility";
import { unAssignPayerOfPatient } from "../../actions/patient/patientAction";
import { createPayer, deletePayer, fetchPayers, updatePayer } from "../../actions/payer/payerAction";
import PayerState from "../../states/payer/payerState";
import { RootState } from "../../store/rootReducer";

const initialState: PayerState = {
  formState: resetState(),
  payers: [],
  payerCount: 0,
  isDeleted: resetState(),
  isUpdated: resetState(),
  unAssigned: resetState(),

  selectedPayer: null
};
export const PayerSlice = createSlice({
    name: "Payer",
    initialState: initialState,
    reducers: {
      clearState: (state) => {
        state.formState = resetState();
        state.isDeleted = resetState();
        state.isUpdated = resetState();
        state.unAssigned = resetState();
        return state;
      },
      setSelectedPayer: (state,{ payload}) => {
        state.selectedPayer = payload;
        return state;
      },
    },
    extraReducers:{
    [fetchPayers.pending.toString()]:(state) => {
        state.formState = pendingState();
        return state;
    },
    [fetchPayers.fulfilled.toString()]:(state, {payload}) => {
        state.formState = fulfilledState();
        state.payerCount = payload.count
        state.payers = payload.payers
        return state;
    },
    [fetchPayers.rejected.toString()]:(state) => {
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
    [deletePayer.pending.toString()]:(state) => {
      state.isDeleted = pendingState();
      return state;
    },
    [deletePayer.rejected.toString()]:(state) => {
      state.isDeleted = rejectedState();
      return state;
    },
    [deletePayer.fulfilled.toString()]:(state) => {
      state.isDeleted = fulfilledState();
      return state;
    },
  
    [updatePayer.pending.toString()]:(state) => {
      state.isUpdated = pendingState();
      return state;
    },
    [updatePayer.fulfilled.toString()]:(state, {payload}) => {
        state.isUpdated = fulfilledState();
        state.selectedPayer = payload
        return state;
    },
    [updatePayer.rejected.toString()]:(state, {payload}) => {
        state.isUpdated = rejectedState(payload?.error);
        return state;
    },
    }
  });
  
  export const { clearState, setSelectedPayer } = PayerSlice.actions;
  export const PayerStateSelector = (state: RootState) => state.Payer;
  export default PayerSlice.reducer;