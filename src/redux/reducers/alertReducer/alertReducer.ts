import { createSlice } from "@reduxjs/toolkit";
import {
  fulfilledState,
  rejectedState,
  pendingState,
  resetState,
} from "../../../utility/stateUtility";
import { fetchAlerts } from "../../actions/alerts/alertAction";
import AlertState from "../../states/alert/alertState";
import { RootState } from "../../store/rootReducer";

const initialState: AlertState = {
  formState: resetState(),
  alerts: [],
};
export const AlertSlice = createSlice({
    name: "Alert",
    initialState: initialState,
    reducers: {
      clearState: (state) => {
        state.formState = resetState();
        return state;
      }
    },
    extraReducers:{
    [fetchAlerts.rejected.toString()]:(state) => {
        state.formState = pendingState();
        return state;
    },
    [fetchAlerts.fulfilled.toString()]:(state, {payload}) => {
        state.formState = fulfilledState();
        state.alerts = payload
        return state;
    },
    [fetchAlerts.rejected.toString()]:(state) => {
        state.formState = rejectedState();
        return state;
    },
    }
  });
  export const { clearState } = AlertSlice.actions;
  export const AlertStateSelector = (state: RootState) => state.Alert;
  export default AlertSlice.reducer;