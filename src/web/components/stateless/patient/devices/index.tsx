import {Row,Col,Checkbox, Form} from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPatientDevice, fetchPatientHub } from "../../../../../redux/actions/patient/patientAction"
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer"
import { PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer"
import { Biometricname, UserRoles } from "../../../../constants/enums"
import Button from "../../common/button"
import { CompWrapper } from "../../common/contentWrapper"
import InputBox from "../../common/inputBox"
import "./devices.less"
import { DevicesTable } from "./devicesTable"
import { HubsTable } from "./hubsTable"

const DeviceDetails = (props: any) => {
    const {setSelectedTab, setList, onAssign, setHubInfo, hubInfo, disableButton , bio, biometricNextDisabled , setDisableSave} = props
    const { appUser } = useSelector(AuthStateSelector)
    const {patientDevices, patientHub , selectedPatient} = useSelector(PatientStateSelector)
    const [tableData, setTableData] = useState<any>([])
    const [disableBiometric , setDisableBiometric]= useState(true)
    const [deviceData , setDeviceData] = useState<any>([])
    const [preSelectedDevices, setSelectedDevices] = useState<any[]>([])
    const dispatch = useDispatch()
    const onDeviceSelect = (checkedValues: any[])=>{
        setList(checkedValues.map((value: any)=>{return ({biometricName: value})}))
        onValueChange(checkedValues)
    }

    const onValueChange = (checkedValues:any)=>{
        if(checkedValues.length>0 && selectedPatient?.id ){
        setDisableBiometric(false)

        }else if(checkedValues.length==0){
      setDisableBiometric(true)

            return true;
        }
    }
    const handeleChange = (e: any) => {
        const {name , value} = e.target
        setSelectedDevices([])
        setHubInfo({...hubInfo, ["id"]: value})
    }




    
    useEffect(()=>{
        dispatch(fetchPatientHub(selectedPatient))  
    },[])

    useEffect(()=>{
        dispatch(fetchPatientDevice(selectedPatient)) 
    },[])
 useEffect(()=>{
     setDeviceData(patientDevices? patientDevices:[])
     setSelectedDevices(patientDevices?.map((dev:any)=>dev?.biometricName))
 },[patientDevices])

    useEffect(()=>{
        setTableData(patientHub? patientHub: [])
    },[patientHub])  

    return (
        <CompWrapper observeOn="mainRow" name="patientDevices-container">
        <div className="patientDevices-container">
        {appUser?.roleName == UserRoles.PROVIDER || appUser?.roleName==UserRoles.PATIENT || appUser?.roleName==UserRoles.FAMILY? null :
            <Row gutter={20} className="patientDevicesInput">
            <Col md={24} lg={9} xl={14} style={{minHeight:"55px"}}>
            <Form onFinish={onAssign} id="deviceForm" layout="vertical">
            <Row  gutter={[20,20]}>
            <Col span={4} md={8} lg={4} xl={10}>
                <InputBox name="id" onChange={handeleChange} placeholder="Enter or Scan Hub ID" rules={[{required: true, message: "Please enter a HUB ID"}]}/>
            </Col>
          
            <Col span={3} md={6} lg={3} xl={7}>
                <Button type="primary" htmlType="submit" form="deviceForm" 
                disabled={disableBiometric}
                >Save</Button>
            </Col>
            <Col span={3} md={10} lg={4} xl={7}>
                <Button type="primary" disabled>Scan HUB ID</Button>
            </Col>
            <Col span={24}></Col>
            </Row>
            </Form>
            </Col>
            <Col span={14} md={24} lg={13} xl={10}>
               <Row gutter={[0,10]}>
                   <Col span={24} className="assnDevice">
                       Assigned Devices
                   </Col>
                   <Checkbox.Group onChange={onDeviceSelect} className="assncheck" defaultValue={preSelectedDevices} key={preSelectedDevices?.toString()} >
                   <Checkbox value={Biometricname.BP}> Blood Pressure </Checkbox>
                   
                   <Checkbox value={Biometricname.GLUCO}> Glucometer</Checkbox>
                  
                   <Checkbox value={Biometricname.TEMPRATURE}>   Temperature </Checkbox>
                  
                   <Checkbox value={Biometricname.PULSE}>  Pulse Oximeter </Checkbox>
                   
                   <Checkbox value={Biometricname.SPIRO}>  Spirometer </Checkbox>
                  
                   <Checkbox value={Biometricname.WEIGHT}>  Weight </Checkbox>
                  
                   </Checkbox.Group>
               </Row>
            </Col>
            </Row>

            }
            <Row className="devicesTable-container" gutter={[20,20]}>
                <Col span={24} className="tableTitle f-16">
                    Hubs
                </Col>
                <Col span={24}>

                <div className="hubTable"><HubsTable data={tableData}/></div>
                </Col>
                <Col span={24} className="tableTitle f-16">
                    Devices 
                </Col>
                <Col span={24}>
             <div className="deviceTable"> <DevicesTable data ={deviceData}/> </div> 
                </Col>
            </Row>
            {setSelectedTab?
        <Row className="btnpateintfooter" justify="end" gutter={20}>
        <Col span={4}>
        <Button type="primary" disabled={biometricNextDisabled} onClick={()=>setSelectedTab("3")}>Next</Button>
        </Col>
        <Col span={4}>
        <Button type="primary"  onClick={() => setSelectedTab("1")}>Cancel</Button>
        </Col>
      </Row>
      : null}
        </div>
     
        </CompWrapper>
    )
}

export default DeviceDetails