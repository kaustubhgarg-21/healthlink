import BaseService from "../../../core/service/baseService";
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apiEnvironment";
import { eventDeliveryModeCode } from "../../../web/constants/enums";
import Notification from "../../models/notification/notification"
// import { getNotification } from "../../models/notification/notifications";

export default class NotificationService extends BaseService {
  constructor() {
    super(getAPIBaseUrl(PortalModule.NOTIFICATION));
  } 

  // fetch all Notifications 
  async fetchNotifications(getNotification: any | null): Promise<any> {
    var parameters: any = { 
        isRead: false,
        isAlert: false,
        notificationMode: eventDeliveryModeCode.WEB_DELIVERY
    }
    if(getNotification?.userId){
        parameters["userId"] = getNotification?.userId
    }
    if(getNotification?.startDate){
        parameters["startDate"] = getNotification?.startDate
    }
    if(getNotification?.endDate){
        parameters["endDate"] = getNotification?.endDate
    }
    if(getNotification?.organizationId){
        parameters["organizationId"] = getNotification?.organizationId
    }
    if(getNotification?.centerId){
        parameters["centerId"] = getNotification?.centerId
    }
    if(getNotification?.userId){
        parameters["departmentId"] = getNotification?.departmentId
    }
    const response = await this.get(`${PortalModule.NOTIFICATION}`, {params: parameters});
    if (response.data.statusCode === 1) {
      const {result} = response.data 
      var notifications = this.setNotificatonsData(result.rows)
      return notifications;
    }else{
      return null;
    }
  
  }

  
    // acknowledge Notification 
    async postAcknowlege(notificationInput: any | null): Promise<any> {
      const response: any = await this.patch(`${PortalModule.NOTIFICATION}`, notificationInput);
      if(response && response.data) {
        return response;
      }
      return await Promise.resolve(null);
    }

    private setNotificatonsData(data: any[]) {
      var x: Notification[]
      x = data?.map((not:any)=>{
        return {
            id: not?.id,
            name: not?.name,
            isAlert: not?.isAlert,
            isRead: not?.isRead,
            severity: not?.severity,
            notificationMode: not?.notificationMode,
            unSentQueueId: not?.unSentQueueId,
            userId: not?.userId,
            content:not?.content,
            createdAt: not?.createdAt,
            eventId: not?.eventId
          }
      
      })
      return x
    }
}
