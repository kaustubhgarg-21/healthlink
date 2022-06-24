import axios from "axios";
import BaseService from "../../../core/service/baseService";
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apiEnvironment";
import { getFullName } from "../../../utility/utils";
import { APIResponseError } from "../../constants/enums";
import { Messages } from "../../constants/messages";
import { Readings } from "../../models/biometricData/readings";
import { Threshold } from "../../models/patient/patientThresholds";
import Schedule from "../../models/schedule/schedule";

export class HRMService extends BaseService {
    constructor() {
        super(getAPIBaseUrl(PortalModule.HRM))
    }

    // this function will fetch thresholds for biometric devices of a patient by patientId and assigneeId
    async fetchThresholdsByPatientByAssignee(data:any):Promise<any> {
        try{
            let params:any = {};

            if(data.patientId) {
                params['patientId'] = data.patientId
            }
    
            if(data.assigneeId) {
                params['assigneeId'] = data.assigneeId
            }
    const response = await this.get(`${PortalModule.HRM}/patient/threshold`, {params:params})
            if(!response) return Promise.reject(null)
            const thresholds:Threshold = response?.data?.result?.rows
            return Promise.resolve(thresholds);

        } catch(err:any) {
            console.log('Error in fetching thresholds',err)
            return Promise.reject(null)
        }
    }   

    async updateThresholdForPatient(threshDetails: any): Promise<any> {
        var {id}= threshDetails
        const response = await this.patch(`${PortalModule.HRM}/patient/threshold/${id}`, threshDetails)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            // var updatedThresh = (result)
            return result;
        } else {
            return null
        }
    }

    async fetchBiometricData (args: any): Promise<any>{
        var params:any = {}
        if(args?.startDate){
            params["startDate"] = args?.startDate
        }
        if(args?.endDate){
            params["endDate"] = args?.endDate
        }
        if(args?.patientId){
            params["patientId"] = args?.patientId
        }
        if(args?.assigneeId){
            params["assigneeId"] = args?.assigneeId
        }
        const response = await this.get(`${PortalModule.HRM}/biometricData`, {params:params})
        if(response?.data?.statusCode == 1){
           const {result} = response?.data
           var dataObj = {
            readingsData : this.setBiometricData(result),
            time: response?.data?.time
           }
           return dataObj
        } else {
            return null
        }
    }
    async fetchScheduleList (args: any): Promise<any>{
        var params:any = {}
        if(args?.order){
            params["order"] = args?.order
        }
        if(args?.sortBy){
            params["sortBy"] = args?.sortBy
        }
        if(args?.startTime){
            params["startTime"] = args?.startTime
        }
        if(args?.fromDate){
            params["fromDate"] = args?.fromDate
        }
        if(args?.toDate){
            params["toDate"] = args?.toDate
        }
        if(args?.patientId){
            params["patientId"] = args?.patientId
        }
        if(args?.assigneeId){
            params["assigneeId"] = args?.assigneeId
        }
        const response = await this.get(`${PortalModule.HRM}/schedules`, {params:params})
        if(response?.data?.statusCode == 1){
           const {result} = response?.data
           var scheduleList = this.setScheduleData(result?.rows)
           return scheduleList
        } else {
            return null
        }
    }
    async createSchedule(schDetails: any): Promise<any> {
        const response = await this.post(`${PortalModule.HRM}/schedules`, schDetails)
        if (response.data.statusCode == 1) {
            const { result } = response.data            
            return result?.scheduleCreated;
        } else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType == APIResponseError.ALREADY_EXIST) {
              const conflictErr = error?.message
              return {schErr: conflictErr, conflicted: true};
            }else {
                const userData = this.setScheduleError(
                    this.getErrorMessage(error)
                  );
                  return userData;
            }
          } 
    }

    async updateSchedule(schDetails: any): Promise<any> {
        const {id} = schDetails
        const response = await this.patch(`${PortalModule.HRM}/schedules/${id}`, schDetails)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            return result;
        } else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType == APIResponseError.ALREADY_EXIST) {
              const conflictErr = error?.message
              return {schErr: conflictErr, conflicted: true};
            }else {
                const userData = this.setScheduleError(
                    this.getErrorMessage(error)
                  );
                  return userData;
            }
          }
    }
    
    async deleteSchedule(schDetails: any): Promise<any> {
        const {id} = schDetails
        var reqBody = {
            patientId: schDetails?.patientId
        }
        const response = await this.delete(`${PortalModule.HRM}/schedules/${id}`, {data: reqBody})
        if (response.data.statusCode == 1) {
            const { result } = response.data
            return result;
        } else if (response.data?.error) {
            const error = response.data?.error;
            if (error) {
              const userData = this.setScheduleError(
                this.getErrorMessage(error)
              );
              return userData;
            }
          } 
    }

    
    async fetchDailySchedule (args:any): Promise<any> {
       const {patientId, fromDate, toDate} = args
        const response = await this.get(`${PortalModule.HRM}/patient/schedule/${patientId}/${fromDate}/${toDate}`)
        if(response?.data?.statusCode == 1){
           const {result} = response?.data
           var scheduleList = result?.rows
           return result
        } else {
            return null
        }
    }
    async applySchedule (args:any): Promise<any> {
        const response = await this.post(`${PortalModule.HRM}/presetSchedule`, args)
        if(response?.data?.statusCode == 1){
           const {result} = response?.data
           return result
        } else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType) {
              const errSch = this.setScheduleError(
                this.getErrorMessage(error)
              );
              return errSch;
            }
          } 
         else {
            return null
        }
     }
    async fetchPresetSchedules (args: any) : Promise<any> {
        let params: any = {}

        if(args?.scheduleName){
            params["scheduleName"] = args?.scheduleName
        }
        if(args?.patientId){
            params["patientId"] = args?.patientId
        }
        if(args?.assigneeId){
            params["assigneeId"] = args?.assigneeId
        }

        const response = await this.get(`${PortalModule.HRM}/fetchSchedule`, {params: params})
        if(response?.data?.statusCode == 1){
           const {result} = response?.data
           return result
        } else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType) {
              const errSch = this.setScheduleError(
                this.getErrorMessage(error)
              );
              return errSch;
            }
          } 
         else {
            return null
        }
    }
    private setBiometricData(data: any) {
        console.log(data,180);
        var readingsObj: Readings = {
            bloodpressure: {bloodpressure : data?.bloodpressure, bloodpressureWorst : data?.bloodpressureWorst},
            glucose: {glucose: data?.glucose, glucoseWorst : data?.glucoseWorst},
            spirometry: {spirometry: data?.spirometry, spirometryWorst: data?.spirometryWorst},
            pulseox: {pulseox: data?.pulseox, pulseoxWorst: data?.pulseoxWorst},
            weight: {weight: data?.weight, weightWorst: data?.weightWorst},
            temperature: {temperature: data?.temperature, temperatureWorst: data?.temperatureWorst},
            bloodpressurethresholds: data?.bloodpressurethresholds,
            glucosethresholds: data?.glucosethresholds,
            spirometrythresholds: data?.spirometrythresholds,   
            pulseoxthresholds: data?.pulseoxthresholds,
            weightthresholds: data?.weightthresholds,
            temperaturethresholds: data?.temperaturethresholds
        }
        return readingsObj
    }
    private getErrorMessage = (err: any) => {
        let error = err?.message
        return error;
      }
    private setScheduleError(err: any) {
        var scheduleErr: Schedule = {error: err} as Schedule
        return scheduleErr
    }
    private setScheduleData(datalist: any[]) {
        var x: Schedule[] = datalist.map((data:any)=>{
            const {schedulePatient} = data;
            return (
                {
                    id: data?.id,
                    isCustom: data?.isCustom,
                    biometricName: data?.biometricName,
                    fromDate: schedulePatient?.fromDate,
                    toDate: schedulePatient?.toDate,
                    endTime: schedulePatient?.endTime,
                    startTime: schedulePatient?.startTime,
                    patientId: data?.patientId,
                    recurrence: data?.recurrence,
                    instruction: data?.instruction,
                    assigneeId: schedulePatient?.assigneeId,
                    orgId:  data?.orgId,
                    providerName: getFullName(schedulePatient?.HRMUsers[0]?.title,schedulePatient?.HRMUsers[0]?.firstName,schedulePatient?.HRMUsers[0]?.middleName,schedulePatient?.HRMUsers[0]?.lastName),
                    createdBy: data?.createdBy,
                    updatedAt:data?.updatedAt,
                    createdAt: data?.createdAt,
                    scheduleName: data?.scheduleName,
                    duration: data?.duration,
                    isDefault: data?.isDefault,
                    deletedAt: data?.deletedAt,
                  }
            )
        }) ; 
        return x
    }
}