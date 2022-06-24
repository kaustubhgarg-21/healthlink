import { createAsyncThunk } from "@reduxjs/toolkit";
import Organization from "../../../web/models/organization/organizaton";
import OrganizationCentre from "../../../web/models/organization/organiztaionCentre";
import { OrganizationService } from "../../../web/services/organization/organizationService";

const orgSrv = new OrganizationService()

export const fetchOrganizations = createAsyncThunk(
    "api/fetchOrganizationList",
    async (_args:any,thunkAPI) => {
        try {
          const data = await orgSrv.fetchOrganizations(_args)
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
export const createdOrganization = createAsyncThunk(
  "api/createOrganization",
  async (_args:Organization,thunkAPI) => { 
      try {
        const data = await orgSrv.createOrganization(_args)
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
export const fetchOrganizationById = createAsyncThunk(
  "api/fetchOrganizationById",
  async (_args:any,thunkAPI) => { 
      try {
        const data = await orgSrv.fetchSingleOrganization(_args)
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

export const deleteOrganization = createAsyncThunk(
  "api/deleteOrganization",
  async (_args:Organization,thunkAPI) => {
  
      try {
        const data = await orgSrv.deleteOrganization(_args)
        if (data == true) { 
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
)

export const deleteDepartment = createAsyncThunk(
  "api/deleteDepartment",
  async (_args:Organization,thunkAPI) => {
  
      try {
        const data = await orgSrv.deleteDepartment(_args)
        if (data == true) { 
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
)

export const deleteCenter = createAsyncThunk(
  "api/deleteCenter",
  async (_args:Organization,thunkAPI) => {
  
      try {
        const data = await orgSrv.deleteCenter(_args)
        if (data == true) { 
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.data);
      }
    }
)


export const fetchOrganizationSummary = createAsyncThunk(
  "api/fetchOrganizationSummary",
  async (_args:any,thunkAPI) => { 
      try {
        const data = await orgSrv.organizationSummary(_args) 
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

export const updateOrganization = createAsyncThunk(
  "api/updateOrganization",
  async (_args:Organization,thunkAPI) => {
   var updatedOrg = {
          orgName: _args.orgName,
          orgId: _args.id,
          levelCode: _args.levelCode,
          parentId: _args.parentId,
          isActive: _args.isActive,
          address1: _args.address1,
          address2: _args.address2,
          imageURL: _args.imageURL,
          city: _args.city,
          state: _args.state,
          country: _args.country,
          zipcode: _args.zipcode,
          timezone: _args.timezone,
          notes: _args.notes,
          contacts: _args.contacts?.map((contact:any)=>{
            return{
                    contactId:contact?.id,
                    isPrimary: contact?.isPrimary,
                    email: contact?.email,
                    firstName: contact?.firstName,
                    lastName: contact?.lastName,
                    middleName: contact?.middleName,
                    mobile: contact?.mobile,
                    phoneNumber: contact?.phoneNumber
            }
          })
        } 
      try {
        const data = await orgSrv.updateOrganization(updatedOrg)
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
export const createdOrganizationCentre = createAsyncThunk(
  "api/createdOrganizationCentre",
  async (_args:OrganizationCentre,thunkAPI) => { 
      try {
        const data = await orgSrv.createOrganizationCentre(_args)
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

export const updateOrganizationCentre = createAsyncThunk(
  "api/updateOrganizationCentre",
  async (_args:any,thunkAPI) => { 
      try {
        const data = await orgSrv.updateCentre(_args)
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

export const createdOrganizationDepartment = createAsyncThunk(
  "api/createdOrganizationDepartment",
  async (_args:OrganizationCentre,thunkAPI) => { 
      try {
        const data = await orgSrv.createOrganizationDepartment(_args)
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


export const updateOrganizationDepartment = createAsyncThunk(
  "api/updateOrganizationDepartment",
  async (_args:any,thunkAPI) => { 
      try {
        const data = await orgSrv.updateDepartment(_args)
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
