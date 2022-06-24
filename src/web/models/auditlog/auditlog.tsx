import { BaseModel } from "../../../core/models/baseModel";

interface Auditlog extends BaseModel{
    id: string |null,
    userId: string | null,
    orgId: string | null,
    eventId: string| null,
    category: string,
    description: string,
    auditName: string,
    isAudit: boolean,
    severity: string,
    source: string,
    data: object,
    metadata: object,
    beforeData: string,
    afterData: string,
    ipAddress: string,
   timestamp: string | null,
   userName: string
   
}
export default Auditlog;