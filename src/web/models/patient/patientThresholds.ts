import { BaseModel } from "../../../core/models/baseModel";

export interface Threshold extends BaseModel {
    id?: string
    patientId: string
    assigneeId: string
    thresholdId: string
    biometricName: string
    intraPerc: string
    twoDayPerc: string
    fiveDayPerc: string
    fourteenDayPerc: string
    thirtyDayPerc: string
    adherencePerc: string
    compliancePerc: string
    isModified: boolean
    ThresholdAssigner?: ThresholdAssigner
    patientThresholdBounds?: ThresholdBounds[]
    
}


export interface ThresholdAssigner extends BaseModel {
    id?: string
    assigneeId: string
    title:string
    designation: string
    firstName: string
    middleName: string
    lastName: string
    providerType: string
    specialtyType: string
}

export interface ThresholdBounds extends BaseModel {
    id?: string
    patientThresholdId: string
    thresholdId: string
    boundType: string
    maxBound: string
    minBound: string 
    intraPerc?: string
    twoDayPerc?:string
    fiveDayPerc?:string
    fourteenDayPerc?:string
    thirtyDayPerc?:string
    adherencePerc?:string
}