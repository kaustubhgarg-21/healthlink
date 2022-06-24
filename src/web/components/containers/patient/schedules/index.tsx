import { Col, Row, Spin } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPresetSchedules, fetchScheduleForPatient } from "../../../../../redux/actions/hrm/hrmActions"
import { fetchProviderOfPatient } from "../../../../../redux/actions/patient/patientAction"
import { patientStateSelector } from "../../../../../redux/reducers/hrm/hrmReducer"
import { PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer"
import { setCollapsed } from "../../../../../redux/reducers/sideBarReducer"
import { getFullName } from "../../../../../utility/utils"
import { CompWrapper } from "../../../stateless/common/contentWrapper"
import { PatientDetailCard } from "../../../stateless/patient/detailsCard"
import { PatientSchedule } from "../../../stateless/patient/scheduleTable"
import "./scheduleStyle.less"

export const Schedules = () => {
    const dispatch=useDispatch()
    const {selectedPatient,patientProvider} = useSelector(PatientStateSelector)
    const {schedules, formState, presetSchedules} = useSelector(patientStateSelector)
    const [selectedProvider, setSelectedProvider] = useState<any>()
      useEffect(()=>{
        dispatch(setCollapsed(true))
        dispatch(fetchProviderOfPatient(selectedPatient))
        //Fetch Default schedules >>>>>> 
        dispatch(fetchPresetSchedules())
        dispatch(fetchScheduleForPatient({patientId: selectedPatient?.id, assigneeId: selectedProvider?.id}))
      },[selectedProvider])

      const getProviderOptions = () => {
          var temp = 
          patientProvider?.map((pro)=>{
              return {
                  name: getFullName(pro?.title, pro?.firstName, pro?.middleName, pro?.lastName),
                  id: pro?.id
              }
          })
          return temp
      }

      
    return (
        <Spin spinning={formState.loading}>
        <Row className="scheduleHeader">
            <Col span={24}>
                <PatientDetailCard patient={selectedPatient}/>
            </Col>
        </Row>
        <CompWrapper observeOn="scheduleHeader">
        <Row className="cardRow">
            <Col span={24}>
                <PatientSchedule scheduleTableData={schedules} providers={getProviderOptions()} setSelectedProvider={setSelectedProvider} selectedProvider={selectedProvider} presetSchedules={presetSchedules}/>     
            </Col>
        </Row>
        </CompWrapper>
        </Spin>
    
    )
}