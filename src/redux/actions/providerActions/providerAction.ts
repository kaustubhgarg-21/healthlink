import { createAsyncThunk } from "@reduxjs/toolkit";
import Provider from "../../../web/models/provider/provider";
import { NPIService } from "../../../web/services/providers/npiService";
import { ProviderService } from "../../../web/services/providers/providerService";

const npiSrv = new NPIService();
const providerSrv = new ProviderService()

export const fethProviderNpi = createAsyncThunk(
    "api/fetchProviderNpi",
    async (_args: any, thunkAPI) => {
      try {
        const data = await npiSrv.fetchProvider(_args)
        if (data && data.books.length) { 
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
)

export const fetchProviderList = createAsyncThunk(
  "api/fetchProviderList",
  async (_args: any, thunkAPI) => {
    try {
      const data = await providerSrv.fetchProviders(_args)
      if (data && data!= null) { 
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
)

export const updateProvider = createAsyncThunk(
  "api/updateProvider",
  async (_args: Provider, thunkAPI) => {
    try {
      const data = await providerSrv.updateProvider(_args)
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
export const fetchProviderByID = createAsyncThunk(
  "api/fetchProviderById",
  async (_args: any, thunkAPI) => {
    try {
      const data = await providerSrv.fetchProviderByID(_args)
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

export const createProvider = createAsyncThunk(
  "api/createProvider",
  async (_args: Provider, thunkAPI) => {
    try {
      const data = await providerSrv.createProvider(_args)
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
export const getProviderTypes = createAsyncThunk(
  "api/getProviderTypes",
  async (_args, thunkAPI) => {
    try {
      const data = await providerSrv.fetchProviderTypes()
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
export const getSpecialityList = createAsyncThunk(
  "api/getSpecialityList",
  async (_args, thunkAPI) => {
    try {
      const data = await providerSrv.fetchSpecialities()
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
export const assignedProvidertoOrganization = createAsyncThunk(
  "api/assignedProvidertoOrganization",
  async (_args: any, thunkAPI) => {
    try {
      const data = await providerSrv.assignProvider(_args)
      if (data) { 
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
)
