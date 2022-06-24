import { createAsyncThunk } from "@reduxjs/toolkit";
import NotificationService from "../../../web/services/notification/notificationService";

const notificationService = new NotificationService();

// fetch notification
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (getNotification: any | null, thunkAPI) => {
    try {
      const data = await notificationService.fetchNotifications(getNotification);
      if (data) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// post readed notification
export const postReadNotification = createAsyncThunk(
  "notifications/postReadNotification",
  async (notificationInput: any | null, thunkAPI) => {
    try {
      const data = await notificationService.postAcknowlege(notificationInput);
      if (data) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
);