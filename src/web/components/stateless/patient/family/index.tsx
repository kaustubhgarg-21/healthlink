import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import Button from "../../common/button";
import { FamilyTable } from "./familyData";
import "./familyListing.less"
import { CompWrapper } from "../../common/contentWrapper";
import { CommonIcons } from "../../../../constants/enums";
import { useDispatch, useSelector } from "react-redux";
import { PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer";
import { fetchPatientFamily } from "../../../../../redux/actions/patient/patientAction";
import { concatNames } from "../../../../../utility/appUtil";

const FamilyListTable = (props: any) => {
  const {showFamilyForm , setSelectedTab, disableButton, familyDetailForm, familyRole ,addFamilyBtn,familyFormNextDisabled
} = props;
  const {selectedPatient, patientFamily} =useSelector(PatientStateSelector)
  const [tableRow, setTableRow] = useState<any>([]);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchPatientFamily(selectedPatient))
  },[])
  useEffect(()=>{
  var temp = patientFamily?.map((family)=>{
    return (
      {
      key: family.id,
      name: concatNames(family?.firstName, family?.lastName, family?.middleName),
      relation: family?.relation,
      status: family?.status,
    })
  })
  setTableRow(temp)
  },[patientFamily])
  

  return (
    <CompWrapper observeOn="innerHeader" name="familyTableContainer">
      <Card className="familyTableContainer">
        <Row>
          <Col md={18} lg={20} xl={20} xxl={21}></Col>
          <Col md={6} lg={4} xl={4} xxl={3}>
            <Button type="primary" className="addOrgBtn" onClick={()=>addFamilyBtn()} disabled={disableButton}>
              <span className="material-icons-outlined">{CommonIcons.add}
               </span>
              add family
            </Button>
          </Col>
        </Row>
        <div className="familyTable">
        <FamilyTable tableRow={tableRow} />
        </div>
        {setSelectedTab ? 
      <Row className="btnpateintfooter" justify="end" gutter={20}>
        <Col span={4}>
        <Button type="primary" disabled={familyFormNextDisabled} onClick={()=>setSelectedTab("5")}>Next</Button>
        </Col>
        <Col span={4}>
        <Button type="primary"  onClick={() => setSelectedTab("1")}>Cancel</Button>
        </Col>
      </Row>
      :
      null}
      </Card>
    
    </CompWrapper>
  );
};
export default FamilyListTable;
