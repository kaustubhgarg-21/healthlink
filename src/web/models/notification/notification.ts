import {BaseModel} from "../../../core/models/baseModel";

interface Notification extends BaseModel {
    name: string;
    id: number;
    isAlert: boolean;
    isRead: boolean;
    severity: string;
    notificationMode: string;
    unSentQueueId?: string;
    userId: string;
    content: any;
    createdAt: string;
    eventId:number;
}
export default Notification;
