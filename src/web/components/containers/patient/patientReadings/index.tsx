import {Row,Col, Spin} from "antd"
import moment from "moment"
import { useEffect,  useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPatientBiometricReadings } from "../../../../../redux/actions/hrm/hrmActions"
import { PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer"
import { patientStateSelector } from "../../../../../redux/reducers/hrm/hrmReducer"
import { setCollapsed } from "../../../../../redux/reducers/sideBarReducer"
import { leftFilled, redo, rightFilled } from "../../../../images"
import { CompWrapper } from "../../../stateless/common/contentWrapper"
import { PatientDetailCard } from "../../../stateless/patient/detailsCard"
import { BloodPressure } from "../../../stateless/patient/readingsData/bloodPressure"
import { GlucoMeter } from "../../../stateless/patient/readingsData/glucoMeter"
import { Oxymeter } from "../../../stateless/patient/readingsData/pulseOxymeter"
import { Spirometer } from "../../../stateless/patient/readingsData/spiroMeter"
import { Temperature } from "../../../stateless/patient/readingsData/temperature"
import { Weight } from "../../../stateless/patient/readingsData/weight"
import "./patientReadings.less"
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer"
import { UserRoles } from "../../../../constants/enums"

export const PatientReadings = (props: any) => {
    const dispatch=useDispatch()
    const [params, setParams] = useState<any>({
      startDate: moment().subtract(6,"day"),
      endDate: moment(),
    }) 
    const {selectedPatient} = useSelector(PatientStateSelector)
    const {formState, readings, updateTime} = useSelector(patientStateSelector)
    const {appUser} = useSelector(AuthStateSelector)
  useEffect(()=>{
    dispatch(setCollapsed(true))
  },[])
  const getAssigneeId = () => {
    if(appUser?.roleName == UserRoles.PROVIDER){
      return appUser?.id 
    }else{
      return null
    }
  }
  useEffect(()=>{
    if(selectedPatient && selectedPatient?.id){
    dispatch(fetchPatientBiometricReadings(
      {
        startDate: params?.startDate.format("YYYY-MM-DD"),
        endDate: params?.endDate.format("YYYY-MM-DD"),
        patientId: selectedPatient?.id,
        assigneeId: getAssigneeId()
      }
      ))
    }
  },[params,selectedPatient])

  const onNextClick = () => {
    setParams({...params, startDate: params.startDate.add(6,"day"), endDate: params.endDate.add(6,"day")})
  }
  const onPrevClick = () => {
    setParams({...params, startDate: params.startDate.subtract(6,"day"), endDate: params.endDate.subtract(6,"day")})
  }
  const onRefresh =() => {
    if(selectedPatient && selectedPatient?.id){
    dispatch(fetchPatientBiometricReadings(
      {
        startDate: params?.startDate.format("YYYY-MM-DD"),
        endDate: params?.endDate.format("YYYY-MM-DD"),
        patientId: selectedPatient?.id,
        assigneeId: getAssigneeId()
      }
      ))
    }
  }

    return (
        <div>
        <Row>
        <Col span={24}>
            <PatientDetailCard patient={selectedPatient}/>
        </Col>
        </Row>
        <Spin spinning={formState.loading}>
        <Row className="filterRow" justify="space-between">
          <Col span={24}>
        <div className="filterPDetails">
        <div>
         <img src={redo} onClick={onRefresh} style={{cursor:'pointer'}}/><span className="refreshtext" key={moment(updateTime, 'x').fromNow()}> Updated {moment(updateTime, 'x').fromNow()}</span>
        </div>
        <div className="duration-filter f-14">
        <img src={leftFilled} onClick={onPrevClick} className="navigationIcon"/>
        <span>{params?.startDate?.format("DD")} - {params?.endDate?.format("DD")} {moment(params?.endDate).format("MMMM YYYY")}</span>
        <img src={rightFilled} onClick={onNextClick} className="navigationIcon"/>
        </div>
        </div>
        </Col>
     
        </Row>
        <CompWrapper observeOn="filterRow" name="data-container">
        <Row gutter={[18,15]} className="data-container ProPatientDetails">
            <Col md={24} lg={12} xl={8} xxl={9}>
            <BloodPressure data={readings?.bloodpressure} thresholds={readings?.bloodpressurethresholds} params={params} setParams={setParams}/>
            </Col>
            <Col md={24} lg={12} xl={8} xxl={9}>
            <GlucoMeter data={readings?.glucose} thresholds={readings?.glucosethresholds} params={params} setParams={setParams}/>
            </Col>
            <Col md={24} lg={12} xl={8} xxl={6}>
            <Weight data={readings?.weight} thresholds={readings?.weightthresholds} params={params} setParams={setParams}/>
            </Col>
            <Col md={24} lg={12} xl={8} xxl={9}>
            <Oxymeter data={readings?.pulseox} thresholds={readings?.pulseoxthresholds} params={params} setParams={setParams}/>
            </Col>
            <Col md={24} lg={12} xl={8} xxl={9}>
            <Spirometer data={readings?.spirometry} thresholds={readings?.spirometrythresholds} params={params} setParams={setParams}/>
            </Col>
            <Col md={24} lg={12} xl={8} xxl={6}>
             <Temperature data={readings?.temperature} thresholds={readings?.temperaturethresholds} params={params} setParams={setParams}/>
            </Col>
        </Row>
        </CompWrapper>
        </Spin>
        </div>
    )
}