import { BaseModel } from "../../../core/models/baseModel";


interface Address extends BaseModel {
id: string | null,
address1: string,
address2: string,
userId?: string | null,
city: string,
state: string,
country: string,
zipCode: any,
isPrimary: boolean,

}
export default Address;