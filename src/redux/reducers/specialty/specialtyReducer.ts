import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import {
  fulfilledState,
  rejectedState,
  pendingState,
  resetState,
} from "../../../utility/stateUtility";
import { createSpeciality, deleteSpecialty, getSpecialityList, updateSpecialty } from "../../actions/specialty/specialtyAction";
import SpecialtyState from "../../states/specialty/specialtyState";
import { RootState } from "../../store/rootReducer";

const initialState : SpecialtyState = {
    formState: resetState(),
    isUpdated: resetState(),
    isCreated: resetState(),
    isDeleted: resetState(),
    specialities: []
}

export const SpecialtySlice = createSlice({
name: "Specialty",
initialState: initialState,
reducers: {
  clearState: (state) => {
    state.formState = resetState();
    state.isCreated = resetState()
    state.isUpdated = resetState()
    state.isDeleted = resetState()
    return state;
  }
  },
  extraReducers:{
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
    [createSpeciality.pending.toString()]: (state) => {
        state.isCreated = pendingState();
        return state;
      },
      [createSpeciality.fulfilled.toString()]: (state, { payload }) => {
        state.isCreated = fulfilledState();
        return state;
      },
      [createSpeciality.rejected.toString()]: (state, {payload}) => {
        state.isCreated = rejectedState(payload?.error);
        return state;
      },
      [updateSpecialty.pending.toString()]: (state) => {
        state.isUpdated = pendingState();
        return state;
      },
      [updateSpecialty.fulfilled.toString()]: (state, { payload }) => {
        state.isUpdated = fulfilledState();
        return state;
      },
      [updateSpecialty.rejected.toString()]: (state) => {
        state.isUpdated = rejectedState();
        return state;
      },
      [deleteSpecialty.pending.toString()]: (state) => {
        state.isDeleted = pendingState();
        return state;
      },
      [deleteSpecialty.fulfilled.toString()]: (state) => {
        state.isDeleted = fulfilledState();
        return state;
      },
      [deleteSpecialty.rejected.toString()]: (state) => {
        state.isDeleted = rejectedState();
        return state;
      }

  }
})

export const { clearState } = SpecialtySlice.actions;
export const SpecialtyStateSelector = (state: RootState) => state.Specialty;
export default SpecialtySlice.reducer;
