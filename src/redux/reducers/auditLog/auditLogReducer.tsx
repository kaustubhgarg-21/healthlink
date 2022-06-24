import { createSlice } from "@reduxjs/toolkit";
import {
  fulfilledState,
  rejectedState,
  pendingState,
  resetState,
} from "../../../utility/stateUtility";
import { fetchAuditLogs } from "../../actions/auditLog/auditLogAction";
import AuditLogState from "../../states/auditLog/auditLogState";
import { RootState } from "../../store/rootReducer";


const initialState: AuditLogState = {
    auditLog : [],
    formState: resetState(),

}
export const AuditLogSlice = createSlice({
    name: "AuditLog",
    initialState: initialState,
    reducers:{
        clearState: (state)=>{
            state.formState = resetState();
            return state;
        },
        clearAudits:(state)=>{
            state.auditLog =[]
            return state;
        }
    },

    extraReducers:{
        [fetchAuditLogs.pending.toString()]:(state) => {
            state.formState = pendingState();
            return state;
        },
        [fetchAuditLogs.fulfilled.toString()]:(state, {payload}) => {
            state.formState = fulfilledState();
            state.auditLog = payload
            return state;
        },
        [fetchAuditLogs.rejected.toString()]:(state) => {
            state.formState = rejectedState();
            return state;
        },
    }


})

export const { clearState,clearAudits} = AuditLogSlice.actions;
export const AuditLogStateSelector = (state: RootState) => state.AuditLog;
export default AuditLogSlice.reducer;