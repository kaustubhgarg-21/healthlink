import {Row, Col, Spin} from "antd"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { patientStateSelector } from "../../../../../redux/reducers/hrm/hrmReducer"
import { PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer"
import { setCollapsed } from "../../../../../redux/reducers/sideBarReducer"
import { CompWrapper } from "../../../stateless/common/contentWrapper"
import { PatientDetailCard } from "../../../stateless/patient/detailsCard"
import PatientCalendar from "../../../stateless/patient/scheduleCalender"

export const AdherenceCalender = () => {
    const dispatch=useDispatch()
    const {selectedPatient} = useSelector(PatientStateSelector)
    const {formState} = useSelector(patientStateSelector)
  
  useEffect(()=>{
    dispatch(setCollapsed(true));
  },[])
    return(
        <Spin spinning={formState.loading}>
        <Row className="container">
            <Col span={24}>
                <PatientDetailCard patient={selectedPatient}/>
            </Col>
        </Row>
        <CompWrapper observeOn="container">
        <Row>
            <Col span={24}>
                <PatientCalendar selectedPatient={selectedPatient}/>
            </Col>
        </Row>
        </CompWrapper>
        </Spin>
    )
}