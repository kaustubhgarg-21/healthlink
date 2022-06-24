import { createAsyncThunk } from "@reduxjs/toolkit";
import Alert from "../../../web/models/alert/alert";
import { AlertService } from "../../../web/services/alerts/alertService";

const alertSrv = new AlertService()

export const fetchAlerts = createAsyncThunk(
    "api/fetchAlerts",
    async (_args:any,thunkAPI) => {
        try {
          const data: Alert[] = await alertSrv.fetchAlerts(_args)
          if (data && data.length) { 
            return data;
          } else {
            return thunkAPI.rejectWithValue(data);
          }
        } catch (e: any) {
          return thunkAPI.rejectWithValue(e.data);
        }
      }
)
