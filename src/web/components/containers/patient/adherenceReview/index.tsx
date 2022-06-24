import { Col, Row, Spin } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer"
import { setCollapsed } from "../../../../../redux/reducers/sideBarReducer"
import { AdherenceTable } from "../../../stateless/patient/adherenceTable"
import { PatientDetailCard } from "../../../stateless/patient/detailsCard"
import "./adherenceReview.less"

export const AdherenceReview = () => {
  const [patientScheduleTable, setPatientScheduleTable] = useState({
    selectBioetricType: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    recurrence: "",
    selectInstruction: "",
  });
  const dispatch=useDispatch()
  const [selectedView, setSelectedView ] = useState<"adherence" | "compliance">("adherence")
  const {selectedPatient, formState} = useSelector(PatientStateSelector)
  useEffect(()=>{
    dispatch(setCollapsed(true));
  },[])
  
  return (
    <Spin spinning={formState?.loading}>
      <Row>
        <Col span={24}>
          <PatientDetailCard patient={selectedPatient} showButton selectedItem={selectedView} setSelectedItem={setSelectedView}/>
        </Col>
      </Row>    
      <Row className="summaryRow">
        <Col span={1} md={2} lg={1} className="adherenceSummary">
            <div className="articleIcon">
          <span className="material-icons-outlined artIcon">article</span>
          </div> 
          </Col>
          <Col span={2} className="summaryAdherencePage">
          <span >Summary</span>
          </Col>
        
      </Row>
      <Row className="cardRow">
        <Col span={24}>
           <AdherenceTable selectedPatient = {selectedPatient} selectedView={selectedView}/>
        </Col>
      </Row>
    </Spin>
  );
};
