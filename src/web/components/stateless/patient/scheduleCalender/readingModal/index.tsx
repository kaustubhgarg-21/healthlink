import { Col, Modal, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patientStateSelector } from "../../../../../../redux/reducers/hrm/hrmReducer";
import { PatientStateSelector } from "../../../../../../redux/reducers/patient/patientReducer";
import { Biometricname } from "../../../../../constants/enums";
import { BPTable } from "../../readingsData/bloodPressure/bpTable";
import { GlucoMeterTable } from "../../readingsData/glucoMeter/glucoMeterTable";
import { OxymeterTable } from "../../readingsData/pulseOxymeter/oxymeterTable";
import { SpirometerTable } from "../../readingsData/spiroMeter/spirometerTable";
import { TemperatureTable } from "../../readingsData/temperature/temperatureTable";
import { WeightTable } from "../../readingsData/weight/weightTable";

import { bpIcon, glucoMeterReading, Spirometer, spo2, Temperature, weightIcon } from "../../../../../images";
import "./tableModal.less"
import { fetchPatientBiometricReadings } from "../../../../../../redux/actions/hrm/hrmActions";
import moment from "moment";
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer";
import { getFullName } from "../../../../../../utility/utils";

export const TableModal = (props: any) => {
    const {expanded, children, setExpanded, reading, selectedDay, startTime,endTime, filterMonth} = props;
    const {selectedPatient} = useSelector(PatientStateSelector)
    const {appUser} = useSelector(AuthStateSelector)
    const {readings, formState} = useSelector(patientStateSelector)
    const dispatch = useDispatch()
    var providerName = getFullName(reading?.title, reading?.firstName, reading?.middleName, reading?.lastName)
    const [tableData,setTableData] = useState<any[]>([])
    const onCancel = () => {
        setExpanded(false)
    }
    const getActiveBound = (data: any) => {
        var x = ""
        const bound = data?.Bounds ? data?.Bounds : {}
        var id = appUser?.id? appUser?.id: ""
        if(bound[id]?.some((th:any)=>th?.boundType == "heartFailure")){
        x= "heartFailure"
        }else if(bound[id]?.some((th:any)=>th?.boundType == "obesity")){
          x= "obesity"
        }
        return x
        }
    useEffect(()=>{
        if(expanded){
dispatch( fetchPatientBiometricReadings({
            startDate: selectedDay.format("YYYY-MM-DD"),
            endDate: selectedDay.format("YYYY-MM-DD"),
            patientId: selectedPatient?.id,
            
          }))
        }      
    },[expanded])

    const getReadingForSchedule = (readings: any) => {
        if(!filterMonth){
        return readings?.filter((read:any)=>{
            return (moment.utc(read?.date).local().hours() >= startTime && moment.utc(read?.date).local().hours() <= endTime )
        })
    }else{
        return readings
    }
    }
    useEffect(()=>{
        switch(reading?.biometricName){
            case Biometricname.BP : 
                setTableData(getReadingForSchedule(readings?.bloodpressure?.bloodpressure));
                break
            case Biometricname.GLUCO :
               setTableData(getReadingForSchedule(readings?.glucose?.glucose));
               break
            case Biometricname.PULSE :
                setTableData(getReadingForSchedule(readings?.pulseox?.pulseox));
               break
            case Biometricname.SPIRO :
                setTableData(getReadingForSchedule(readings?.spirometry?.spirometry));
               break
            case Biometricname.TEMPRATURE:
                setTableData(getReadingForSchedule(readings?.temperature?.temperature));
               break
            case Biometricname.WEIGHT :
                setTableData(getReadingForSchedule(readings?.weight?.weight));
               break
        }
    },[readings])

    const getIcon = () => {
        switch(reading?.biometricName){
            case Biometricname.BP : 
            return bpIcon;
            case Biometricname.GLUCO :
                return glucoMeterReading;
            case Biometricname.PULSE :
                return spo2;
            case Biometricname.SPIRO :
                return Spirometer 
            case Biometricname.TEMPRATURE:
                return Temperature
            case Biometricname.WEIGHT :
                return weightIcon
            }
    }
    const getTitle = () => {
        switch(reading?.biometricName){
            case Biometricname.BP : 
                return "Blood Pressure";
            case Biometricname.GLUCO :
                return "Glucometer";
            case Biometricname.PULSE :
                return "PulseOx";
            case Biometricname.SPIRO :
                return "Spirometer" 
            case Biometricname.TEMPRATURE:
                return "Temperature"
            case Biometricname.WEIGHT :
                return "Weight"
        }
    }
    const getTable = () => {
        switch(reading?.biometricName){
            case Biometricname.BP : 
                return <BPTable data={tableData} showProvider providerName={providerName} />;
            case Biometricname.GLUCO :
                return <GlucoMeterTable data={tableData} thresholds={[]} showProvider providerName={providerName}/>
            case Biometricname.PULSE :
                return <OxymeterTable data={tableData} showProvider providerName={providerName}/>
            case Biometricname.SPIRO :
                return  <SpirometerTable data={tableData} showProvider providerName={providerName}/>
            case Biometricname.TEMPRATURE :
                return <TemperatureTable data={tableData} showProvider providerName={providerName}/>
            case Biometricname.WEIGHT :
                return <WeightTable data={tableData} showProvider getActiveBound={getActiveBound} providerName={providerName}/>
        }
    }
    return (
        <Modal visible={expanded} wrapClassName="tableModal" centered footer={null} onCancel={onCancel}>
            <Spin spinning={formState.loading}>
            <Row gutter={[20,0]}>
                <Col span={2}>
                    <div className="readingLabelMIcon">
                    <img src={getIcon()}/>
                    </div>
         
                </Col>
                <Col span={20}>
                   <span className="readingTitle f-14"> {getTitle()} </span>
                </Col>
            <Col span={24}>
            {getTable()}
            </Col>
            </Row>
            </Spin>
        </Modal>
        
    )
    }