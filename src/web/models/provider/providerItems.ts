import { BaseModel } from "../../../core/models/baseModel";

export interface Specialty extends BaseModel {
    id: string
    name: string
    isCustom: boolean
    error?:any
}

export interface ProviderType extends BaseModel {
    id: string
    name: string
    isCustom: boolean
}