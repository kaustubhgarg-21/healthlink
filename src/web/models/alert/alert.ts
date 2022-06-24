import { BaseModel } from "../../../core/models/baseModel";

interface Alert extends BaseModel {
  id: string | null ;
  name?: string
  patientId?: string | null;
  userId?: string;
  eventId?: number;
  severity: string| null;
  src: string | null;
  alertDetails: any,
  clearingId?: string | null;
  isCleared?: boolean;
  isActive?: boolean;
  isArchived?: boolean;
  params?: any
}
export default Alert