import { Card, Col, Row, Form, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviderOfPatient } from "../../../../../redux/actions/patient/patientAction";
import { PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer";
import { ProviderStateSelector } from "../../../../../redux/reducers/provider/providerReducer";
import { concatNames } from "../../../../../utility/appUtil";
import { CommonIcons } from "../../../../constants/enums";
import { searchIcon } from "../../../../images";
import Button from "../../common/button";
import InputBox from "../../common/inputBox";
import SelectInput from "../../common/selectInput";
import { ProviderTable } from "./providerData";
import { clearProviders } from "../../../../../redux/reducers/provider/providerReducer";
import "./providerData.less"

export const ProviderTableList = (props: any) => {
    const {setSelectedTab, onSearch, typeOptions , setDisableSave, providerNextDisabled, setTest, selectedPatient , assignView, setView , onAssignSave} = props
    const dispatch = useDispatch();
    const {patientProvider, isAssigned} =useSelector(PatientStateSelector)
    const {providers} = useSelector(ProviderStateSelector)
    const [tableProviderRow, setTableProviderRow] = useState<any[]>([]);
    const [selectedRows, setSelectedRows] =useState([])
    const [newProvider, setNewProvider] = useState<any>({
        Provider: "",
        PCP: "",
        providerType: "",
        Speciality: "",
        Status: ""
    });
    const [search,setSearch] = useState(false)
    const [selectedProvider, setSelectedProvider] = useState([])
    const [searchParams, setSearchParams] = useState<any>({})
    let selectedProviders :any=[]
    useEffect(()=>{
        for(let i=0;i<tableProviderRow.length;i++){
            selectedProviders.push({"providerId":tableProviderRow[i].key, "isPcp":tableProviderRow[i].PCP })
            setTest(selectedProviders); 
        }
    },[tableProviderRow])
    useEffect(()=>{
        dispatch(fetchProviderOfPatient(selectedPatient))
    },[selectedPatient])
useEffect(()=>{
if(isAssigned.isSuccess){
    setSearch(false)
    setSearchParams({})
}
},[isAssigned.isSuccess])
    useEffect(()=>{
        dispatch(clearProviders())
        return (()=>{
            dispatch(clearProviders())
        })
    },[])
    useEffect(()=>{
        var temp = patientProvider?.map((provider)=>{
            return (
                {
                    key: provider?.id,
                    Provider: concatNames(provider?.firstName, provider?.lastName),
                    PCP: provider?.isPcp,
                    ProviderType: provider?.providerType,
                    Status: provider?.status,
                    Speciality: provider?.specialtyType,
                    npi: provider?.npi

                }
            )
        }) 
        setTableProviderRow(temp)

    },[patientProvider])

    const detectChange = ()=>{
        if(setDisableSave){
            setDisableSave(false)
        }
    }
    
    const providerTypeSelect = (value: any) => {
        setSearchParams({
            ...searchParams,
            ["providerType"]: value
        })
    }
    const onChange = (row: any) => {
        setTableProviderRow((prevstate:any) => prevstate.map((provider:any)=> 
        {if(row.key == provider.key) {return {...provider, ["PCP"]: true }} else { return {...provider, ["PCP"]:false}} }))
     }
    const handleChange = (Event: any) => {
        setSearchParams({
            ...searchParams,
            [Event.target.name]: Event.target.value,
        })
    }
    let providerData:any = [];
    
    const addNewRow = () => {
        if(selectedRows.length==0){
            message.error({content:"please select the provider",key:"appNotification"})
          }else if(tableProviderRow.some((x:any)=>selectedRows.some((y:any)=>y.key == x.key))){
            message.error({content:"Selected provider is already assigned" , key:"appNotification"})
          }
          else{
        setTableProviderRow(tableProviderRow.concat(selectedRows));
        setSelectedRows([])
    }};
    const onSearchHit = () => {
        onSearch(searchParams)
        setSearch(true)
    }
    return (
        <>
       
            <Card className="provider">
                <div className="familyTable">
                    <ProviderTable tableProviderRow={tableProviderRow} onChange={onChange}  />
                </div>
                <Form onFinish={onSearchHit} id="providerSearch" onValuesChange={detectChange}>
                <Row className="NewProviderRow" gutter={19}>
                    <Col span={5}>
                        <SelectInput
                            name="provider"
                            className="providerClass"
                            bordered={true}
                            value={newProvider.providerType}
                            initialValue="Select Provider Type"
                            optionValue={typeOptions}
                            onChange={providerTypeSelect} />
                    </Col>
                    <Col span={5}>
                        <InputBox
                            name="search"
                            placeholder="Search By Name"
                            value={searchParams.search}
                            onChange={handleChange}
                            
                            rules={[{required: true, message: "please enter provider's name!"}]}
                        />
                    </Col>
                    <Col md={3} lg={2} xl={2} xxl={1} className="searchibtn">
                        <Button type="secondary" htmlType="submit" form="providerSearch" style={{width:'40px',height:'40px'}}>
                        <img src={searchIcon}></img>
                        </Button>
                    </Col>
        
                    <Col  md={8} lg={6} xl={6} xxl={4} >
                        <Button type="primary" className="addOrgBtn" onClick={addNewRow}  >
                            
                            <span className="material-icons-outlined">{CommonIcons.add}
                            </span>
                            SELECT PROVIDER
                        </Button>
                    </Col>
                </Row>
                </Form>
                <Row style={{marginTop:"20px"}}>
                <Col span={24}>
                {search? 
                <ProviderTable tableProviderRow={providers?.map((provider)=>{
                    return( {
                            key: provider?.id,
                            Provider: concatNames(provider?.firstName, provider?.lastName, provider?.middleName),
                            ProviderType: provider?.providerType,
                            Status: provider?.status,
                            Speciality: provider?.specialtyType,
                            PCP: false,
                            npi: provider?.npi
                        
                        }
                    )})} searchTable={true} setSelectedRows={setSelectedRows}/>
            : null}
            </Col>
            </Row>
            {assignView? 
        <Row className="btnpateintfooter" justify="end" gutter={20}>
        <Col span={4}>
        <Button type="primary" onClick={onAssignSave}>Save</Button>
        </Col>
        <Col span={4}>
        <Button type="primary"  onClick={()=>setView(false)}>Cancel</Button>
        </Col>
      </Row>
      : setSelectedTab?
            <Row className="btnpateintfooter" justify="end" gutter={20}>
        <Col span={4}>
        <Button type="primary" disabled={providerNextDisabled} onClick={()=>setSelectedTab("4")}>Next</Button>
        </Col>
        <Col span={4}>
        <Button type="primary"  onClick={() => setSelectedTab("1")}>Cancel</Button>
        </Col>
      </Row> : null
}
            </Card>
           
      </>
    )
}
