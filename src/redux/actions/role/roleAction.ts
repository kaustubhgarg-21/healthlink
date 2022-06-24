import { createAsyncThunk } from "@reduxjs/toolkit";
import Role from "../../../web/models/roles/role";
import { RoleService } from "../../../web/services/roles/roles";

const roleSrv = new RoleService()


export const fetchRoles = createAsyncThunk(
  "api/rolesList",
  async (_args:any,thunkAPI) => {
      try {
        const data = await roleSrv.fetchRoles(_args)
        if (data != null) { 
          console.log(data,"16")
          return data;
          
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
) 
export const updateRole = createAsyncThunk(
  "api/updateRole",
  async (_args:any,thunkAPI) => {
      try {
        const data = await roleSrv.updateRole(_args)
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
export const fetchPermission = createAsyncThunk(
  "api/permission",
  async (_args:any,thunkAPI) => {
      try {
        const data = await roleSrv.fetchPermissions(_args)
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

export const createRole = createAsyncThunk(
  "api/role",
  async (_args:any,thunkAPI) => {
      try {
        const data = await roleSrv.createRole(_args)
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

export const deleteRole = createAsyncThunk(
  "api/deleteRole",
  async (_args:any,thunkAPI) => {
      try {
        const data = await roleSrv.deleteRole(_args)
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

export const fetchTransformedRoleById = createAsyncThunk(
  "api/roleDeatils",
  async (_args:any,thunkAPI) => {
      try {
        const data = await roleSrv.fetchTransformedRoleDetails(_args)
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


