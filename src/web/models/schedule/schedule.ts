import {BaseModel} from "../../../core/models/baseModel"
import { Biometricname } from "../../constants/enums";

interface Schedule extends BaseModel {
  id?: string;
  biometricName?: string;
  assigneeId?: string | any;
  startTime?: string | any;
  endTime?: string | any;
  recurrence?: any[] | [];
  instruction?: string | any;
  fromDate?: string | any;
  toDate?: string | any;
  patientId?: string | any;
  scheduleName?: string | null;
  duration?: any | null;
  isDefault?: boolean | null;
  isCustom?: boolean;
  orgId?: string | null,
  providerName?: string 
}

export default Schedule