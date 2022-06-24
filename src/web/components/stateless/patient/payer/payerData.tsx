import { Radio, Table, Spin ,Checkbox} from "antd";
import { useEffect, useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer";
import { PayerStateSelector } from "../../../../../redux/reducers/payer/payerReducer";
import { PayerRenderer } from "./payerRowEdit";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";

export const payerData = [
    {
      key: 0,
      PayerName: "Payer Name 1",
      primary: "Father",
      city: "",
      emailAddress: "",
      contactNumber: "",
    },
    {
        key: 1,
        PayerName: "Payer Name 2",
        primary: "Father",
        city: "",
        emailAddress: "",
        contactNumber: "",     
    },
    {
        key: 2,
        PayerName: "Payer Name 3",
        primary: "Father",
        city: "",
        emailAddress: "",
        contactNumber: "",
    },
    
  ];
  export const PayerTable =(props:any)=>{
    const { value, record, patient } = props;
    const { appUser} =
    useSelector(AuthStateSelector);
      const [Tableindex,setTableindex] = useState(null)
     const {tableData, onChange, searchTable, setSelectedRows, isEditAllowed} = props;
      const [isModalVisible, setModalVisible] = useState(false)
      const {patientProvider,unAssigned, selectedPatient} =useSelector(PatientStateSelector)
      const {selectedPayer} = useSelector(PayerStateSelector)
     


const dispatch = useDispatch()
   
    const handleTableData =(row: any, ev: any) =>{
      const {checked} = ev.target
      if(checked){
        setSelectedRows((prevState:any)=>prevState.concat(row))
      }
      else{
        
        setSelectedRows((prevState:any[]) =>prevState?.filter((x:any)=>x.key != row?.key))
      }
    }
    useEffect(() => {
      if (unAssigned.isSuccess) {
        setModalVisible(false);
      }
    }, [unAssigned.isSuccess, unAssigned.isError]);
   
   
const columns =[
    {
      title: "Payor Name",
      dataIndex: "PayerName",
      key: "PayerName",
      width: "25%",
    
    },
    {
      title: "Primary",
      dataIndex: "primary",
      key: "primary",
      width: "10%",
      
   
    render:(Value:any,row:any)=>{
        return(
          searchTable ?
          null :
          <Radio
          checked={Value} 
          disabled={!isEditAllowed}
          onClick={()=>onChange(row)}
          />              
    )}
      
      
   
    },
    {
      title: "City, State",
      dataIndex: "city",
      key: "city",
      width: "10%",
      render :(city:any , row:any)=>{
        return(
          <span>{row?.city}{row?.state? `, ${row?.state}`: ""}</span>
        )
      },
    },
    { 
     title: 'Email Address',
     dataIndex: 'emailAddress', 
     key: 'emailAddress',
     width: "25%",
   
   },
   { 
    title: 'Mobile Number',
    dataIndex: 'mobileNumber', 
    key: 'mobileNumber',
    width: "20%",
    
  },
  { 
    title: 'Action',
    dataIndex: 'delete', 
    key: 'delete',
    width: "15%",
    render: (del: any , record:any) => {
        return (

          searchTable ?
          <Checkbox onChange={(event)=>handleTableData(record , event)} />
           : 
          isEditAllowed?<PayerRenderer  record={record} value={del} />: null
          )
    }
  },
    ];
  return(
    <>
    <Spin spinning={unAssigned.loading}>
    <Table
    className="centreTable"
    dataSource={tableData}
 
    columns={columns}
    pagination={false}
  /> 
  </Spin>
  
</>
  )
}