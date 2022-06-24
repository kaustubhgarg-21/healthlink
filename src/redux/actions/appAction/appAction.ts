import { createAsyncThunk } from "@reduxjs/toolkit";


export const warnUnsave = createAsyncThunk(
    "app/warnUnsave",
    async (
        _args: any,
        thunkAPI
    ) => {
        try {
            const data = {
                calledBy : _args.calledBy,
                isWarnUnsaveOpen : _args.isWarnUnsaveOpen,
                closeWarn : false,
                applyChanges : false,
            }
            return data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const warnConfirm = createAsyncThunk(
    "app/warnConfirm",
    async (
        _args: any,
        thunkAPI
    ) => {
        try {
            const data ={
            goTo : _args.goTo,
            applyChanges : true,
            }
            return data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const warnDiscard = createAsyncThunk(
    "app/warnDiscard",
    async (
        _args,
        thunkAPI
    ) => {
        try {
            return true;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

