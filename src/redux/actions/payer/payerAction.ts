import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { PayerService } from "../../../web/services/payor/payorService";
const payerSrv = new PayerService()

export const fetchPayers = createAsyncThunk(
    "api/fetchPayers",
    async (_args:any,thunkAPI) => {
        try {
          const data = await payerSrv.fetchPayers(_args)
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

export const createPayer = createAsyncThunk(
    "api/createPayer",
    async (_args:any,thunkAPI) => {
        try {
          const data = await payerSrv.createPayer(_args)
          if (data && data?.id) { 
            return data;
          } else {
            return thunkAPI.rejectWithValue(data);
          }
        } catch (e: any) {
          return thunkAPI.rejectWithValue(e.data);
        }
      }
)

export const deletePayer = createAsyncThunk(
  "api/deletePayer",
  async (_args:any,thunkAPI) => {
    try {
      const data = await payerSrv.deletePayer(_args)
      if(data != null) {
        return data;
      }else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e:any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
)

export const updatePayer = createAsyncThunk(
  "api/updatePayer",
  async (_args:any,thunkAPI) => {
      try {
        const data = await payerSrv.updatePayer(_args)
        if (data && data?.id) { 
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
)