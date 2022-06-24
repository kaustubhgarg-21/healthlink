import BaseService from "../../../core/service/baseService";
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apiEnvironment";
import Auditlog from "../../models/auditlog/auditlog";



export class AuditLogService extends BaseService{
    constructor(){
        super(getAPIBaseUrl(PortalModule.AUDIT));
    }
    async fetchAuditLogs(audit?: any): Promise<Auditlog[] | any> {
        let params: any = {}
    if(audit?.startDate){
      params["startDate"] =  audit?.startDate
    }
    if(audit?.endDate){
      params["endDate"] =  audit?.endDate
    }
    if(audit?.organisation){
      params["organisation"] =  audit?.organisation
    }
   
    let endpoint = `${PortalModule.AUDIT}`;
     const response = await this.get(endpoint, {params: params});
        if (response.data.statusCode == 1) {
          const { result } = response.data;
          const audits = this.setAuditListData(result);
          return audits;
        } else {
          return null;
        }
    

      }

      private setAuditListData(data: any[]) {
        const processedList: Auditlog[] = data?.map((audit: any) => {
          return {
               id: audit?._id,
               userId: audit?.userId,
               orgId: audit?.orgId,
               eventId: audit?.eventId,
               category: audit?.category,
               description: audit?.description,
               auditName: audit?.auditName,
               isAudit: audit?.isAudit,
               severity: audit?.severity,
               source: audit?.source,
               data: audit?.data,
               metadata: audit?.data?.metadata,
               beforeData: audit?.data?.metadata?.beforeData,
               afterData: audit?.data?.metadata?.afterData,
               ipAddress: audit?.ipAddress,
               userName: audit?.username,
              timestamp: audit?.timestamp,
             
           
          };
        });
        return processedList;
      }
    
    
}


