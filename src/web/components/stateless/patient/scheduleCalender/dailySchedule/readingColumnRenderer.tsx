import { Col, Row } from "antd";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer";
import { getFullName, getThresholdsAccToUser } from "../../../../../../utility/utils";
import { Biometricname, CriticalityColorCodes } from "../../../../../constants/enums";
import { bpIcon, glucoMeterReading, spo2, Temperature, Spirometer, weightIcon } from "../../../../../images";
import { TableModal } from "../readingModal";


export const ReadingsRenderer = (props: any) => {
    const {readings, row, day, sch} = props;
    const {time} = row
    const currentTime = moment().format("ha")
    const [showTable, setShowTable] = useState(false)
    const [selectedReading,setSelectedReading] = useState<any>()
    const {appUser} = useSelector(AuthStateSelector)
    const getColor = (info:any) => {
        if(moment(day, "DD-MMM-YYYY").isAfter(moment())){
            return CriticalityColorCodes.FUTURE_READING
        }else if(moment(day, "DD-MMM-YYYY").format("DD-MMM-YYYY")  == moment().format("DD-MMM-YYYY")){
            if(moment(time, 'ha').isAfter(moment(currentTime, "ha"))){
                return CriticalityColorCodes.FUTURE_READING
            }else if(info){
                return getThresholdsAccToUser(info, appUser)? CriticalityColorCodes.CRITICAL : CriticalityColorCodes.NON_CRITICAL
            } else {
                return CriticalityColorCodes.MISSED_READING
            }
        }
        else if(moment(day, "DD-MMM-YYYY").isBefore(moment())){
            if(info){
                return info[appUser?.id? appUser?.id : ""]?  CriticalityColorCodes.CRITICAL : CriticalityColorCodes.NON_CRITICAL
            } else {
                return CriticalityColorCodes.MISSED_READING
            }
        }
    }
    const getIcon = (measurmentType: string) => {
        switch (measurmentType) {
          case Biometricname.BP:
            return bpIcon;
          case Biometricname.GLUCO:
            return glucoMeterReading;
          case Biometricname.PULSE:
            return spo2;
          case Biometricname.SPIRO:
            return Spirometer;
          case Biometricname.TEMPRATURE:
            return Temperature;
          case Biometricname.WEIGHT:
            return weightIcon;
        }
    }
    const getContent = (reading:any) => {
        return (
            <div className="readingLabel" style={{background: getColor(reading.complianceInfo) }}>
                <img src={getIcon(reading.biometricName)} />
            </div>
        )
    }
    const onReadingSelect = (reading:any) => {
        setSelectedReading(reading)
        setShowTable(true)
    }
    return(
        <Row align="middle" style={{padding: "10px"}}>

            {readings?.map((reading:any, index: number)=>{
                return (
                <>
                <Col md={8} lg={5} xl={4}>
                 <div className="readingday" >
                    <div key={index} onClick={()=>onReadingSelect(reading)} >
                    {getContent(reading)}
                    </div>
                <div style={{marginLeft: "10px"}}>
                <p  className="providerName f-12">{getFullName(reading?.title, reading?.firstName,reading?.middleName,reading?.lastName)}</p>
                <p className="instructions f-12">{reading?.instruction}</p>
                </div>
                </div>
                </Col>
                </>
                )
            })}
            <TableModal expanded={showTable} setExpanded={setShowTable} reading={selectedReading} selectedDay={moment(day, "DD-MMM-YYYY")} startTime={sch?.start} endTime={sch?.end}/>
                
    
        </Row>
    )
}