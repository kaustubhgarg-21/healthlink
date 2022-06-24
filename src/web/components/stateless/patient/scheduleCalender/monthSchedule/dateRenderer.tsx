import {Row, Col} from "antd"
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer";
import { getThresholdsAccToUser } from "../../../../../../utility/utils";
import { Biometricname, CriticalityColorCodes } from "../../../../../constants/enums";
import { bpIcon, glucoMeterReading, Spirometer, spo2, Temperature, weightIcon } from "../../../../../images";
import { TableModal } from "../readingModal";


export const MonthCellRenderer = (props:any) => {
const {date, schedule} = props;
const scheduleDate = Object.keys(schedule)[0]
const currentDate = moment().format("YYYY-MM-DD")
const readings = schedule[scheduleDate]?.readings
const [showTable, setShowTable] = useState(false)
const [selectedReading,setSelectedReading] = useState<any>()
const {appUser} = useSelector(AuthStateSelector)
const getColor = (info: any) => {
    if(moment(scheduleDate).isAfter(moment(currentDate))){
        return CriticalityColorCodes.FUTURE_READING
    }else if(info){
        return getThresholdsAccToUser(info,appUser)? CriticalityColorCodes.CRITICAL : CriticalityColorCodes.NON_CRITICAL
    } else {
        return CriticalityColorCodes.MISSED_READING
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
        <div className="readingLabel" style={{background: getColor(reading?.complianceInfo) }}>
            <img src={getIcon(reading.biometricName)} />
        </div>
    )
}
const onReadingSelect = (reading:any) => {
    setSelectedReading(reading)
    setShowTable(true)
}
return(
    <>
    <Row gutter={20}>
    
        {readings?.map((reading:any, index: number)=>{
            return (
            <>
            <Col md={12} lg={10} xl={8} key={index} onClick={()=>onReadingSelect(reading)}>{getContent(reading)}</Col>
            </>
            )
        })}
    </Row>
    <TableModal expanded={showTable} setExpanded={setShowTable} reading={selectedReading} selectedDay={moment(scheduleDate)} filterMonth>
    </TableModal> 
</>
)
}