import BaseService from "../../../core/service/baseService";
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apiEnvironment";
import Alert from "../../models/alert/alert";

export class AlertService extends BaseService {
    constructor() {
        super(getAPIBaseUrl(PortalModule.ALERT))
    }

    async fetchAlerts(data:any):Promise<any> {
        try{
            let params:any = {
                ["isAlert"]: true,
                ["isWeb"]: true,
                ['isCleared']: false
            };

            if(data.patientId) {
                params['patientId'] = data.patientId
            }
    
            if(data.receiverId) {
                params['receiverId'] = data.receiverId
            }
            if(data.eventId) {
                params['eventId'] = data.eventId
            }
    
            if(data.severity) {
                params['severity'] = data.severity
            }
            if(data.src) {
                params['src'] = data.src
            }
    
            if(data.clearingId) {
                params['clearingId'] = data.clearingId
            }
            if(data.isCleared) {
                params['isCleared'] = data.isCleared
            }
            if(data.isActive) {
                params['isArchived'] = data.isArchived
            }
    const response = await this.get(`${PortalModule.ALERT}`, {params:params})
            if(!response) return Promise.reject(null)
            const alerts: Alert[] = this.setAlertList(response?.data?.result?.rows)
            return Promise.resolve(alerts);

        } catch(err:any) {
            console.log('Error in fetching Alerts',err)
            return Promise.reject(null)
        }
    }   

    
    
    private setAlertList(data: any[]) {
        var alerts: Alert[] = data.map((data: any)=>{
            return (
                {
                    id: data?.id,
                    patientId: data?.patientId, 
                    userId: data?.userId, 
                    eventId: data?.eventId,
                    severity: data?.severity,
                    src: data?.src,
                    name: data?.alertDetails?.name,
                    alertDetails: data?.alertDetails,
                    params: data?.alertDetails?.params,
                    clearingId: data?.clearingId,
                    isCleared: data?.isCleared,
                    isActive: data?.isActive,
                    isArchived: data?.isArchived,
                    createdAt: data?.createdAt,
                }
            )
        }) 
        return alerts
    }
}