import BaseState from "../../../core/states/baseState";
import FormState from "../../../core/states/formState";
import { Readings } from "../../../web/models/biometricData/readings";
import { Threshold } from "../../../web/models/patient/patientThresholds";
import Schedule from "../../../web/models/schedule/schedule";

interface PatientState extends BaseState {
    thresholds: Threshold[],
    readings: Readings
    adhrence: any,
    schedules: Schedule[] | []
    formState: FormState,
    isUpdated: FormState,
    schedulePlan: any[],
    isScheduleCreated: FormState,
    isScheduleUpdated: FormState,
    isScheduleDeleted: FormState,
    conflictedSch : any,
    presetSchedules : any[]
    presetScheduleDetails: any[]
    isAssigned: FormState
    updateTime: any

}

export default PatientState