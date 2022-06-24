import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuditLogService } from "../../../web/services/auditlog/auditlog";



const audSrv = new AuditLogService()


export const fetchAuditLogs = createAsyncThunk(
    "api/fetchAuditLogList",
    async (_args:any,thunkAPI) => {
        try {
          const data = await audSrv.fetchAuditLogs(_args)
          console.log(">>>>>>>>>>>>>",data)
          if (data != null) { 
            return data;
          } else {
            return thunkAPI.rejectWithValue(data);
          }
        } catch (e: any) {
          return thunkAPI.rejectWithValue(e.data);
        }
      }
)