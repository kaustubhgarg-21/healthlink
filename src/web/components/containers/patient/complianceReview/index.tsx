import { Card, Col, Row } from "antd";
import  { useState } from "react";
import "./complianceReview.less"
import { auditLogMenu, tableIcon } from "../../../../images";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import { AdherenceGraph } from "../../../stateless/patient/adherenceTable/adherenceGraph";
import { AdherenceScheduleTable } from "../../../stateless/patient/adherenceTable/adherenceTable";
import { PatientDetailCard } from "../../../stateless/patient/detailsCard";
import { useSelector } from "react-redux";
import { PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer";


const ComplianceReview = ()=>{
    const [tableContent, setTableContent] = useState([])
    const [buttonClick , setButtonClick] = useState(true)
    const {selectedPatient} = useSelector(PatientStateSelector)
    return(
        <div>
             <Row>
            <Col span={24}>
                <PatientDetailCard patient={selectedPatient}/>
            </Col>
        </Row>

        <Row className="complianceRow">
            <Col span={24}>
            <Card className="adherenceCtableIconard">
            <Row className="rowAdherence">
                <Col md={10} lg={8} xl={14}>
                    <span className="adherenceHeader">COMPLIANCE REVIEW</span>
                </Col>
                <Col md={2} lg={1} xl={1} onClick={()=>setButtonClick(!buttonClick)} className="icon">
               {buttonClick==true ? <img src={tableIcon} /> : <img src={auditLogMenu}/>} 
                </Col>
            </Row>
            <CompWrapper observeOn="rowAdherence" name="tableSpecial">
            <Row className="tableSpecial">
                <Col span={24}>
                {buttonClick==true ? <AdherenceGraph /> : <AdherenceScheduleTable tableContent={tableContent}/>} 
                </Col>
            </Row>
            </CompWrapper>
        </Card>
            </Col>
        </Row>
        </div>
    )
}
export default ComplianceReview;
