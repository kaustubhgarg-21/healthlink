import { Card, Col, Row } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAdhrenceForPatientByAssignee, fetchComplianceForPatientByAssignee } from "../../../../../redux/actions/patient/patientAction"
import { PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer"
import { chartIcon, tableIcon } from "../../../../images"
import { CompWrapper } from "../../common/contentWrapper"
import { AdherenceGraph } from "./adherenceGraph"
import { AdherenceScheduleTable } from "./adherenceTable"
import "./adherenceTable.less"
import { ComplianceGraph } from "./complianceReview"
import { ComplianceScheduleTable } from "./complianceTable"

export const AdherenceTable = (props: any) => {
    const {selectedView} = props
    const {adhrence , compliance} = useSelector(PatientStateSelector);
    const [buttonClick , setButtonClick] = useState(true);
    const dispatch = useDispatch();
    const [legendShift, setLegendShift] = useState(45)
    useEffect(()=>{
        if(window.innerWidth>= 1920){
          setLegendShift(30)   
        }else if(window.innerWidth>1600 && window.innerWidth<1920 ){
          setLegendShift(20)
        }
        else if(window.innerWidth<1600 && window.innerWidth>1500 ){
          setLegendShift(20)
    
        }
        else if(window.innerWidth<1500 && window.innerWidth>1440 ){
          setLegendShift(20)
        }else if(window.innerWidth<1440 && window.innerWidth>1350 ){
          setLegendShift(10)
        }
        else if(window.innerWidth<1350 && window.innerWidth>1300 ){
          setLegendShift(10)
        }
        else if(window.innerWidth<1300 && window.innerWidth>1200 ){
          setLegendShift(10)
        }else if(window.innerWidth<1200 && window.innerWidth>1024 ){
          setLegendShift(8)
        }
        else if(window.innerWidth<1024 && window.innerWidth>998 ){
          setLegendShift(4)
        }
        else if(window.innerWidth<998){
          setLegendShift(10)
        }
      },[window.innerWidth])
    
      window.onresize = ()=>{
        if(window.innerWidth>= 1920){
          setLegendShift(35)   
        }else if(window.innerWidth>1600 && window.innerWidth<1920 ){
          setLegendShift(20)
        }
        else if(window.innerWidth<1600 && window.innerWidth>1500 ){
          setLegendShift(20)
        }
        else if(window.innerWidth<1500 && window.innerWidth>1440 ){
          setLegendShift(20)
        }else if(window.innerWidth<1440 && window.innerWidth>1300 ){
          setLegendShift(20)
        }
        else if(window.innerWidth<1300 && window.innerWidth>1200 ){
          setLegendShift(10)
    
        }else if(window.innerWidth<1200 && window.innerWidth>1024 ){
          setLegendShift(8)
        }
        else if(window.innerWidth<1024 && window.innerWidth>998 ){
          setLegendShift(4)
        }
        else if(window.innerWidth<998){
          setLegendShift(10)
        }
      }
    useEffect(()=>{
        let firstDateOfYear = new Date(new Date().getFullYear(), 0, 1);
        const formatYmd  = firstDateOfYear.toISOString().slice(0, 10);
        const todayDate = new Date().toISOString().slice(0, 10);

        let params = {
            patientId: props?.selectedPatient?.id,
            startDate: formatYmd,
            endDate: todayDate
        }
        props?.selectedPatient?.id && dispatch(fetchAdhrenceForPatientByAssignee(params))
        props?.selectedPatient?.id && dispatch(fetchComplianceForPatientByAssignee(params))
    },[])

    return (
        <CompWrapper observeOn="summaryRow" name="adherenceCard">
        <Card className="adherenceCard">    
            <Row className="rowAdherence">
                <Col md={12} lg={6} xl={4}>
                    <span className="adherenceHeader f-14">{selectedView == "adherence"? "ADHERENCE REVIEW" : "COMPLIANCE REVIEW"}</span>
                </Col>
                {
                    buttonClick? <Col  md={24} lg={17} xl={19} id={"adherenceLegendDiv"} className="adherencetLegend" style={{height:"20px"}}></Col>: null
                }
                <Col md={2} lg={1} xl={1} onClick={()=>setButtonClick(!buttonClick)} className="iconT" style={{justifyContent:'center'}}>
               {buttonClick==true ? <img src={tableIcon}  className="utility"/> : <img src={chartIcon} className="utility"/>} 
                </Col> 
            </Row>
            {selectedView == "adherence"?
            <Row className="tableSpecial">
                <Col span={24}>
                {buttonClick ? <AdherenceGraph legendShift={legendShift}/> : <AdherenceScheduleTable />} 
                </Col>
                <Col className="adherenceDefine" span={24}>
        <span><b>Adherence Review</b> indicates days when the readings received are within or outside the threshold limits set by Provider and/or Family members</span>
      </Col>
            </Row>

            : 
            <Row className="tableSpecial">
                <Col span={24}>
                {buttonClick ? <ComplianceGraph legendShift={legendShift}/> : <ComplianceScheduleTable />} 
                </Col>
                <Col className="adherenceDefine" span={24}>
        <span><b>Compliance Review</b> indicates days when the patient has been  compliant with the schedules created by Providers and/or Family members</span>
      </Col>
            </Row>

    }
            
        </Card>
        </CompWrapper>
    )

}