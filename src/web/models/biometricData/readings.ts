import { Threshold } from "../patient/patientThresholds";

export interface Readings {
    bloodpressure: any
    spirometry: any
    glucose: any
    pulseox: any
    weight: any
    temperature: any
    glucosethresholds: Threshold | any
    bloodpressurethresholds: Threshold| any
    pulseoxthresholds: Threshold | any
    spirometrythresholds: Threshold | any
    temperaturethresholds: Threshold | any
    weightthresholds: Threshold | any
}