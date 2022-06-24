import { createAsyncThunk } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { Specialty } from "../../../web/models/provider/providerItems";
import Role from "../../../web/models/roles/role";
import { RoleService } from "../../../web/services/roles/roles";
import { SpecialtyService } from "../../../web/services/specialty/speciality";

const specialtySrv = new SpecialtyService()

export const updateSpecialty = createAsyncThunk(
    "api/updateSpecialty",
    async (_args: any, thunkAPI) => {
        try {
            const data = await specialtySrv.updateSpecialty(_args)
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

export const createSpeciality = createAsyncThunk(
    "api/createSpecialty",
    async (_args: any, thunkAPI) => {
        try {
            const data = await specialtySrv.createSpeciality(_args)
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

export const getSpecialityList = createAsyncThunk(
    "api/getSpecialityList",
    async (_args, thunkAPI) => {
        try {
            const data = await specialtySrv.fetchSpecialities()
            if (data != null) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.data)
        }
    }
)

export const deleteSpecialty = createAsyncThunk(
    "api/deleteSpecialty" ,
    async(_args:Specialty, thunkAPI) => {
        try {
            const data = await specialtySrv.deleteSpecialty(_args)
            if(data != null){
            return data
            } else {
                return thunkAPI.rejectWithValue(data)
            }
        } catch(e:any) {
            return thunkAPI.rejectWithValue(e.data)
        }
    }
)