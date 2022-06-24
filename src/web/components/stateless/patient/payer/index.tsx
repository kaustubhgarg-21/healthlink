import { Card, Col, message, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientPayers } from "../../../../../redux/actions/patient/patientAction";
import { PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer";
import { PayerStateSelector } from "../../../../../redux/reducers/payer/payerReducer";
import { CommonIcons, UserRoles } from "../../../../constants/enums";
import { searchIcon } from "../../../../images";
import Payer from "../../../../models/payer/payer";
import Button from "../../common/button";
import InputBox from "../../common/inputBox";
import { PayerTable } from "./payerData";
import "./payerListing.less";

const PayerListing = (props: any) => {
  const { setSelectedTab, showForm, setTest, onSearch, payorNextDisabled, patient, appUser,disableButton, setDisableSave, addingPayer } = props;
  const {payers} = useSelector(PayerStateSelector)
  const {patientPayers, isAssigned} = useSelector(PatientStateSelector)
  const dispatch = useDispatch()
const [tableData, setTableData] = useState<any>([])
const [selectedRows, setSelectedRows] =useState([])
const [search,setSearch] = useState(false)
  const [searchParams, setSearchParams] = useState<any>({})
  let selectedPayers :any=[]
  
  useEffect(()=>{
    dispatch(fetchPatientPayers(patient))
  },[])
  useEffect(()=>{
    for(let i=0;i<tableData?.length;i++){
      selectedPayers?.push({"payerId":tableData[i]?.key, "isPrimary":tableData[i]?.primary })
        setTest(selectedPayers); 
    }
},[tableData])
useEffect(()=>{
if(isAssigned.isSuccess){
  setSearch(false)
  setSearchParams({})
}
},[isAssigned.isSuccess])


  useEffect(()=>{
  var temp = patientPayers?.map((payer: Payer)=>{
    return (
      {
          key: payer?.id,
          PayerName: payer?.companyName,
          primary: payer?.isPrimary,
          city: payer?.city,
          state: payer?.state,
          emailAddress: payer?.email,
          contactNumber: payer?.contactNumber,
          mobileNumber: payer?.mobileNumber
      }
  )
  })
  setTableData(temp)
  },[patientPayers])
const onChange = (row: any) => {
  setTableData((prevstate:any) => prevstate.map((payer:any)=> 
  {if(row.key == payer.key) {return {...payer, ["primary"]: true }} else { return {...payer, ["primary"]:false}} }))
}


const addNewRow = () => {
  if(selectedRows.length==0){
    message.error({ content:"please select the payer", key: "select payer"})
  }else if(tableData.some((x:any)=>selectedRows.some((y:any)=>y.key == x.key))){
    message.error({content:"Selected payer is already assigned" , key:"payer assigned"})
  }
  else{
  var temp = payers?.map((payer, index)=>{
 
   }) 
  setTableData(tableData.concat(selectedRows));
}};
const onSearchHit = () => {
  onSearch(searchParams)
  setSearch(true)
}
const handleChange = (Event: any) => {
  setSearchParams({
      ...searchParams,
      [Event.target.name]: Event.target.value,
  })
}
const isEditAllowed = () => {
  return (appUser?.roleName == UserRoles.PATIENT || appUser?.roleName==UserRoles.FAMILY || appUser?.roleName == UserRoles.PROVIDER)
}
  return (
      <Card className="payerTable">
        <PayerTable tableData={tableData} onChange={onChange} isEditAllowed={!isEditAllowed()}/>
        {isEditAllowed() ? null :
        <>
        <div>
          <Row className="selectPlayerRow">
            <Col span={5}>
              <InputBox name="search" onChange={handleChange} />
            </Col>
            <Col  md={3} lg={2} xl={2} className="payerSearchBtn" style={{textAlign:'center'}}>
              <button className="payerSearch" onClick={onSearchHit}>
                <img src={searchIcon}></img>
              </button>
            </Col>
            <Col md={6} lg={5} xl={4} xxl={4}>
              <Button type="primary" className="addOrgBtn" onClick={addNewRow}>
                <span className="material-icons-outlined">
                  {CommonIcons.add}
                </span>
                select payor
              </Button>
            </Col>
          </Row>
        </div>
        <Row style={{marginTop:"20px"}}>
                <Col span={24}>
                {search? 
                <PayerTable tableData={payers?.map((payer)=>{
                    return( {
                      key: payer?.id, 
                      PayerName: payer.companyName,
                      primary: false,
                      city: payer?.city,
                      state: payer?.state,
                      // city: `${payer?.city}, ${payer?.state}`,
                      emailAddress: payer?.email,
                      contactNumber: payer?.contactNumber,
                      mobileNumber: payer?.mobileNumber
                        }
                    )})} searchTable={true} setSelectedRows={setSelectedRows}/>
            : null}
            </Col>
            </Row>
        <Row className="addFamilyBtn">
          <Col span={24}>
            <Button type="primary addPayerButton" className="addOrgBtn" onClick={()=>addingPayer()} disabled={disableButton}>
              <span className="material-icons-outlined">{CommonIcons.plus}</span>
              add payer
            </Button>
          </Col>
        </Row>
        </>
}
{setSelectedTab ? 
      <Row className="btnpateintfooter" justify="end" gutter={20}>
        <Col span={4}>
          <Button type="primary" disabled={payorNextDisabled} onClick={() => setSelectedTab("8")}>
            Next
          </Button>
        </Col>
        <Col span={4}>
          <Button type="primary"  onClick={() => setSelectedTab("1")}>Cancel</Button>
        </Col>
      </Row>
      :
      null
      }
      </Card>
  );
};
export default PayerListing;
