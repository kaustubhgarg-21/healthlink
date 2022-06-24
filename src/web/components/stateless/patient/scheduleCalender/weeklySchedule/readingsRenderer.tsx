import {Row, Col} from "antd"
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer";
import { getThresholdsAccToUser } from "../../../../../../utility/utils";
import { Biometricname, CriticalityColorCodes } from "../../../../../constants/enums";
import { bpIcon, glucoMeterReading, spo2, weightIcon, Spirometer, Temperature } from "../../../../../images";
import { TableModal } from "../readingModal";


export const WeeklyReadingsRenderer = (props:any) => {
const {readings, row, day, sch} = props;
const {time} = row
const currentTime = moment().format("ha")
const {appUser} = useSelector(AuthStateSelector)
const [showTable, setShowTable] = useState(false)
const [selectedReading,setSelectedReading] = useState<any>()

const getColor = (info:any) => {
if(moment(day, "DD-MM-YYYY").isAfter(moment())){
    return CriticalityColorCodes.FUTURE_READING
}else if(day  == moment().format("DD-MM-YYYY")){
    if(moment(time, 'ha').isAfter(moment(currentTime, "ha"))){
        return CriticalityColorCodes.FUTURE_READING
    }else if(info){
        return getThresholdsAccToUser(info, appUser)?  CriticalityColorCodes.CRITICAL : CriticalityColorCodes.NON_CRITICAL
    } else {
        return CriticalityColorCodes.MISSED_READING
    }
}
else if(moment(day, "DD-MM-YYYY").isBefore(moment())){
    if(info){
        return getThresholdsAccToUser(info, appUser)?  CriticalityColorCodes.CRITICAL : CriticalityColorCodes.NON_CRITICAL
    } else {
        return CriticalityColorCodes.MISSED_READING
    }
}
}
const getIcon = (measurmentType: string) => {
    switch(measurmentType){
        case Biometricname.BP : 
        return bpIcon;
    case Biometricname.GLUCO :
        return glucoMeterReading
    case Biometricname.PULSE :
        return spo2
    case Biometricname.SPIRO :
        return  Spirometer
    case Biometricname.TEMPRATURE:
        return Temperature
    case Biometricname.WEIGHT :
        return weightIcon
    }
}
const getContent = (reading:any) => {
    return (
        <div className="readingLabel" style={{width: "30px", height:"30px",background: getColor(reading.complianceInfo) }}>
            <img src={getIcon(reading.biometricName)} />
        </div>
    )
}
const onReadingSelect = (reading:any) => {
    setSelectedReading(reading)
    setShowTable(true)
}

return(
    <Row gutter={[30,0]}>    
        {readings?.map((reading:any, index: number)=>{
            return (
            <>
            <Col md={18} lg={12} xl={9} key={index}onClick={()=>onReadingSelect(reading)}>{getContent(reading)}</Col>
            </>
            )
        })}
         <TableModal expanded={showTable} setExpanded={setShowTable} reading={selectedReading} selectedDay={moment(day, "DD-MM-YYYY")} startTime={sch?.start} endTime={sch?.end}/>
    </Row>
)
}