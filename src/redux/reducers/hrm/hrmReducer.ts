import { createSlice } from "@reduxjs/toolkit";
import {
    fulfilledState,
    rejectedState,
    pendingState,
    resetState,
} from "../../../utility/stateUtility";
import { applyPresetSchedule, createScheduleForPatient, deletePatientSchedule, fetchPatientBiometricReadings, fetchPresetScheduleDetail, fetchPresetSchedules, fetchScheduleForPatient, fetchSchedulePlan, fetchThresholdsForPatientByAssignee, updatePatientSchedule, updateThresholdForPatientByAssignee } from "../../actions/hrm/hrmActions";
import PatientState from "../../states/hrm/hrmState";
import { RootState } from "../../store/rootReducer";

const initialState: PatientState = {
    thresholds: [],
    adhrence: {},
    readings: {
        bloodpressure: [],
        bloodpressurethresholds: {},
        glucose: [],
        glucosethresholds: {},
        pulseox: [],
        pulseoxthresholds: {},
        spirometry: [],
        spirometrythresholds: {},
        temperature: [],
        temperaturethresholds: {},
        weight: [],
        weightthresholds: {}
    },
    schedules: [],
    schedulePlan: [],
    formState: resetState(),
    isUpdated:resetState(),
    isScheduleCreated: resetState(),
    isScheduleUpdated: resetState(),
    isScheduleDeleted: resetState(),
    conflictedSch: null,
    presetSchedules: [],
    presetScheduleDetails: [],
    isAssigned: resetState(),
    updateTime: 0
};

export const HRMSlice = createSlice({
    name: "HRM",
    initialState: initialState,

    reducers: {
        clearState: (state) => {
            state.formState = resetState();
            state.isUpdated = resetState()
            state.isScheduleCreated = resetState()
            state.isScheduleUpdated= resetState()
            state.isScheduleDeleted= resetState()
            state.isAssigned = resetState()
            state.conflictedSch = null
            return state;
        },
    },

    extraReducers: {
        // // reducer for patient adherence
        // [fetchAdhrenceForPatientByAssignee.pending.toString()]: (state) => {
        //     state.formState = pendingState();
        //     return state;
        // },
        // [fetchAdhrenceForPatientByAssignee.fulfilled.toString()]: (state, { payload }) => {
        //     state.formState = fulfilledState();
        //     state.adhrence = payload
        //     return state;
        // },
        // [fetchAdhrenceForPatientByAssignee.rejected.toString()]: (state) => {
        //     state.formState = rejectedState();
        //     return state;
        // },

        // reducer for patient thresholds
        [fetchThresholdsForPatientByAssignee.pending.toString()]: (state) => {
            state.formState = pendingState();
            return state;
        },
        [fetchThresholdsForPatientByAssignee.fulfilled.toString()]: (state, { payload }) => {
            state.formState = fulfilledState();
            state.thresholds = payload
            return state;
        },
        [fetchThresholdsForPatientByAssignee.rejected.toString()]: (state) => {
            state.formState = rejectedState();
            return state;
        },
        [updateThresholdForPatientByAssignee.pending.toString()]: (state)=>{
            state.isUpdated=pendingState();
            return state;
        },
        [updateThresholdForPatientByAssignee.fulfilled.toString()]: (state, { payload }) => {
            state.isUpdated = fulfilledState();
            return state;
        },
        [updateThresholdForPatientByAssignee.rejected.toString()]: (state) => {
            state.isUpdated = rejectedState();
            return state;
        },
        [fetchPatientBiometricReadings.pending.toString()]: (state) => {
            state.formState = pendingState();
            return state;
        },
        [fetchPatientBiometricReadings.fulfilled.toString()]: (state, { payload }) => {
            state.formState = fulfilledState();
            state.readings = payload?.readingsData;
            state.updateTime = payload?.time;
            return state;
        },
        [fetchPatientBiometricReadings.rejected.toString()]: (state) => {
            state.formState = rejectedState();
            return state;
        },
        [createScheduleForPatient.pending.toString()]: (state, {payload}) => {
            state.isScheduleCreated = pendingState()
            return state;
        },
        [createScheduleForPatient.fulfilled.toString()]: (state, {payload}) => {
            state.isScheduleCreated = fulfilledState()
            return state;
        },
        [createScheduleForPatient.rejected.toString()]: (state, {payload}) => {
            if(payload?.conflicted){
                state.conflictedSch = payload?.schErr
                state.isScheduleCreated = rejectedState()
            }else{
                state.isScheduleCreated = rejectedState(payload?.error)
            }
            return state;
        },
        [fetchScheduleForPatient.pending.toString()]: (state) => {
            state.formState = pendingState()
            return state;
        },
        [fetchScheduleForPatient.fulfilled.toString()]: (state, {payload}) => {
            state.schedules = payload
            state.formState = fulfilledState()
            return state;
        },
        [fetchScheduleForPatient.rejected.toString()]: (state, {payload}) => {
            state.formState = rejectedState(payload?.error)
            return state;
        },
        [updatePatientSchedule.pending.toString()]: (state, {payload}) => {
            state.isScheduleUpdated = pendingState()
            return state;
        },
        [updatePatientSchedule.fulfilled.toString()]: (state, {payload}) => {
            state.isScheduleUpdated = fulfilledState()
            return state;
        },
        [updatePatientSchedule.rejected.toString()]: (state, {payload}) => {
            if(payload?.conflicted){
                state.conflictedSch = payload?.schErr
                state.isScheduleCreated = rejectedState()
            }else{
                state.isScheduleCreated = rejectedState(payload?.error)
            }
            return state;
        },
        [deletePatientSchedule.pending.toString()]: (state, {payload}) => {
            state.isScheduleDeleted= pendingState()
            return state;
        },
        [deletePatientSchedule.fulfilled.toString()]: (state, {payload}) => {
            state.isScheduleDeleted = fulfilledState()
            return state;
        },
        [deletePatientSchedule.rejected.toString()]: (state, {payload}) => {
            state.isScheduleDeleted = rejectedState(payload?.error)
            return state;
        },
        [fetchSchedulePlan.pending.toString()]: (state, {payload}) => {
            state.formState= pendingState()
            return state;
        },
        [fetchSchedulePlan.fulfilled.toString()]: (state, {payload}) => {
            state.formState = fulfilledState()
            state.schedulePlan = payload
            return state;
        },
        [fetchSchedulePlan.rejected.toString()]: (state, {payload}) => {
            state.formState = rejectedState(payload?.error)
            return state;
        },
        [fetchPresetSchedules.pending.toString()]: (state, {payload}) => {
            state.formState= pendingState()
            return state;
        },
        [fetchPresetSchedules.fulfilled.toString()]: (state, {payload}) => {
            state.formState = fulfilledState()
            state.presetSchedules = payload
            return state;
        },
        [fetchPresetSchedules.rejected.toString()]: (state, {payload}) => {
            state.formState = rejectedState(payload?.error)
            return state;
        },
        [fetchPresetScheduleDetail.pending.toString()]: (state) => {
            state.formState= pendingState()
            return state;
        },
        [fetchPresetScheduleDetail.fulfilled.toString()]: (state, {payload}) => {
            state.formState = fulfilledState()
            state.presetScheduleDetails = payload
            return state;
        },
        [fetchPresetScheduleDetail.rejected.toString()]: (state, {payload}) => {
            state.formState = rejectedState(payload?.error)
            return state;
        },
        [applyPresetSchedule.pending.toString()]: (state) => {
            state.isAssigned= pendingState()
            return state;
        },
        [applyPresetSchedule.fulfilled.toString()]: (state, {payload}) => {
            state.isAssigned = fulfilledState()
            return state;
        },
        [applyPresetSchedule.rejected.toString()]: (state, {payload}) => {
            state.isAssigned = rejectedState(payload?.error)
            return state;
        },
    }
});

export const { clearState } = HRMSlice.actions;
export const patientStateSelector = (state: RootState) => state.HRMReducer;
export default HRMSlice.reducer;