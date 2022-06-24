import { BaseModel } from "../../../core/models/baseModel";
interface Payer extends BaseModel {
  id?: string | null;
  companyName: string;
  contactName: string;
  contactNumber?: string;
  mobileNumber?: string;
  address1?: string;
  address2?: string;
  email?:string
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  isPrimary?: boolean
}
export default Payer;
