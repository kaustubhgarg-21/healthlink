import { createSlice } from "@reduxjs/toolkit";
import {
  fulfilledState,
  rejectedState,
  pendingState,
  resetState,
} from "../../utility/stateUtility";
import { privacyPolicy } from "../actions/auth/authAction";
import AppState  from "../states/app/appState";
import { RootState } from "../store/rootReducer";

const initialState: AppState = {
  selectedSideBarItem : ["Dashboard"],
  isCollapsed: false,
  filesList: {},
  formState: resetState(),
};
export const AppSlice = createSlice({
    name: "App",
    initialState: initialState,
    reducers: {
      clearState: (state) => {
        state.formState = resetState();
        state.selectedSideBarItem = ["Dashboard"];
        return state;
      },
      setSideBarItem: (state, {payload}) => {
          state.selectedSideBarItem = [payload];
          return state;
      },
      setCollapsed: (state, {payload}) => {
        state.isCollapsed = payload;
        return state;
    },
    },
    extraReducers:{
      [privacyPolicy.fulfilled.toString()]:(state, {payload}) => {
        state.formState= fulfilledState()
        state.filesList = payload
        return state;
    },
    [privacyPolicy.rejected.toString()]:(state, {payload}) => {
        state.formState = rejectedState(payload?.error);
        return state;
    },  
      [privacyPolicy.pending.toString()]:(state) => {
        state.formState = pendingState();
        return state;
    },
  }
  });
  
  export const { clearState, setSideBarItem, setCollapsed } = AppSlice.actions;
  export const SideBarStateSelector = (state: RootState) => state.App;
  export default AppSlice.reducer;