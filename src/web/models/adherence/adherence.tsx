import { BaseModel } from "../../../core/models/baseModel";

interface Adherence extends BaseModel {
    id: string | null,
adherencePerc: string,
biometricName: string,
compliancePerc: string,
fiveDayPerc: string,
intraPerc:string,
twoDayPerc:string,
fourteenDayPerc: string,
isCritical: boolean,
thirtyDayPerc:string,
expectedAdherence:any,
}
export default Adherence