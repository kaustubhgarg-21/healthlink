import { createSlice } from "@reduxjs/toolkit";
import {
  fulfilledState,
  rejectedState,
  pendingState,
  resetState,

} from "../../../utility/stateUtility";
import { fetchNotifications,postReadNotification } from "../../actions/notification/notificationAction";
import { NotificationState } from "../../states/notification/notificationState"
import { RootState } from "../../store/rootReducer";

const initialState: NotificationState = {
  notifications:[],
  formState: resetState(),
};

export const NotificationSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.formState = resetState();
      return state;
    },
    clearNotifications: (state)=>{
      state.notifications= []
      return state;
    }
  },
  extraReducers: {
    // Action - fetchAlertByOrgId
    [fetchNotifications.fulfilled.toString()]: (state, { payload }) => {
      state.notifications = payload;
      state.formState = fulfilledState();
      return state;
    },
    [fetchNotifications.rejected.toString()]: (state, { payload }) => {
      state.formState = rejectedState(payload?.message);
    },
    [fetchNotifications.pending.toString()]: (state) => {
      state.formState = pendingState();
    },

   // Action - postReadNotification
    [postReadNotification.fulfilled.toString()]: (state, { payload }) => {
       state.formState = fulfilledState()
       return state
    },
    [postReadNotification.rejected.toString()]: (state, { payload }) => {
      state.formState = rejectedState(payload?.error);
      return state;
    },
    [postReadNotification.pending.toString()]: (state) => {
      state.formState = pendingState();
      return state;
    },
  },
});

export const { clearState,clearNotifications } = NotificationSlice.actions;
export const NotificationSelector = (state: RootState) => state.Notification;
export default NotificationSlice.reducer;
