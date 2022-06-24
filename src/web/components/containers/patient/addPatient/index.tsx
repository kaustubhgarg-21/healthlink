import { Row, Col, Tabs, message, Spin } from "antd";
import Button from "../.././../stateless/common/button";
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs";
import { AppRoutes } from "../../../../router/appRoutes";
import { useEffect, useState } from "react";
import { PatientForm } from "../../../stateless/patient/form";
import FamilyListTable from "../../../stateless/patient/family";
import { PatientOrganization } from "../../../stateless/patient/patientOrg";
import { org } from "../../organisation/organisationDetails/dumData";
import PayerListing from "../../../stateless/patient/payer";
import { ProviderTableList } from "../../../stateless/patient/providerTable";
import { FamilyForm } from "../../../stateless/patient/family/addFamily";
import DeviceDetails from "../../../stateless/patient/devices";
import { assignHubToPatients, assignPayerToPatients, assignProviderToPatients, createFamily, createPatient, fetchPatientDevice, fetchPatientFamily, fetchPatientHub, fetchPatientPayers, fetchProviderOfPatient, fetchRelationships } from "../../../../../redux/actions/patient/patientAction";

import "./addPatient.less";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import { useDispatch, useSelector } from "react-redux";
import Patient from "../../../../models/patient/patient";
import { RoleStateSelector } from "../../../../../redux/reducers/role/roleReducer";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";
import { fetchProviderList, getProviderTypes } from "../../../../../redux/actions/providerActions/providerAction";
import { ProviderStateSelector } from "../../../../../redux/reducers/provider/providerReducer";
import { clearPatientData, clearState, PatientStateSelector, setSelectedPatient } from "../../../../../redux/reducers/patient/patientReducer";
import WarnModal from "../../../stateless/common/warnModal";
import { ModalSecondaryMessages, ModalType, UnsavedChangesWarnModal, UserRoles } from "../../../../constants/enums";
import { concatNames } from "../../../../../utility/appUtil";
import { PayerForm } from "../../../stateless/payer/payerForm";
import Payer from "../../../../models/payer/payer";
import { createPayer, fetchPayers } from "../../../../../redux/actions/payer/payerAction";
import { PasswordModal } from "../../../stateless/common/passwordModal";
import { Demo } from "../../../stateless/demo";
import { useHistory } from "react-router-dom";
import { getFullName, removeEmptyKeys } from "../../../../../utility/utils";
import WarnUnsavedChanges from "../../../stateless/common/warnUnSaveChanges";
import { EventHistory } from "../../../stateless/patient/eventHistory";

export const AddPatient = () => {
  const { TabPane } = Tabs;
  const [sendInvite, setSendInvite] = useState(false);
  const [showModal, setShowModal] =useState(false)
  const [saveInit, setSaveInit] = useState(false)
  const [showFamilyModal, setFamilyModal] = useState(false)
  const [familyPasswordModal, setFamilyPasswordModal] = useState(false)
  const [sendFamilyInvite, setFamilyInvite]= useState(false)
  const [nextBtnDisabled , setNextBtnDisabled] = useState(true)
const history = useHistory()
  const dispatch = useDispatch();
  const{roles} = useSelector(RoleStateSelector)
  const getRoleOptions = () => {
    return roles?.map((role)=>{
       return(
         {
           text: role.name,
           value: role.id
         }
       )
     })
   }
var patientRole : string = `${getRoleOptions().filter((role)=>{return role.text == UserRoles.PATIENT})[0]?.value}`
  const [patientDetailForm, setPatientDetailForm] = useState<Patient | any>({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    mrn: "",
    age:"",
    preferredCommumnication:"",
    imageUrl:"",
    roleId: patientRole,
    status: "",
    timezone: "",
    address1: "",
    address2: "",
    notes:"",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    email: "",
    sendInvite: sendInvite,
    username: "",
    contactNumber: "",
    mobileNumber: "",
   
  });
var familyRole = getRoleOptions().filter((role)=>{return role.text == UserRoles.FAMILY})[0]?.value
  const [familyDetailForm, setFamilyDetailForm] = useState({
    username: "",
    title: "",
    relationshipId:"",
    firstName: "",
    middleName: "",
    lastName: "",
    imageUrl: "",
    contactNumber: "",
    email: "",
    roleId: familyRole,
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
});
const [payerDetails, setPayerDetails] = useState<Payer>({
  companyName: "",
  contactName: "",
  contactNumber: "",
  mobileNumber: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
});
  const {appUser} = useSelector(AuthStateSelector)
  const {providerTypes, specialities} = useSelector(ProviderStateSelector)
  const {formState, relationShips, isCreated,isAssigned, createdFamilyMember, unAssigned} = useSelector(PatientStateSelector)
  const {selectedPatient} = useSelector(PatientStateSelector)
  const [test,setTest]=useState<any>({
    id:"",
    isPCP:false
})
const [payerList,setPayerList]=useState<any>({
  id:"",
  isPrimary:false
})
  const [selectedTab, setSelectedTab] = useState("1");
  // const [showModal, setShowModal] =useState(false)
  const [showModalView , setShowModalView] = useState(false)
 const [payorNextDisabled, setPayorNextDisabled] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [familyForm, setFamilyForm] = useState(false);
  const [familyNextDisabled , setFamilyNextDisabled] = useState(true);
  const [payerForm, setpayerForm] = useState(false);
  const [detectPatientFormChange, setDetectPatientFormChange]= useState(false)
  const [biometricNextDisabled, setBiometricNextDisabled] = useState(true)
  const [addPatientNextDisabled, setAddPatientNextDisabled] = useState(true)
  const [providerNextDisabled, setProviderNextDisabled] = useState(true)
  const [ biometricArray , setBiometricArray] = useState([])
  const [biometricEmpty , setBiometricEmpty] = useState(true)

  const [familyFormNextDisabled, setFamilyFormNextDisabled] = useState(true)
  const [hubList,setHubList]=useState<any>({
    biometricName: ""
  })

  const [hubInfo, setHubInfo] = useState<any>({
    id: "",
    patientId: selectedPatient?.id,
    companyName: "STEL",
    isActive: true,
  })
  const breadCrumbs = [
    {
      text: "Dashboard",
      link: AppRoutes.LANDING,
    },
    {
      text: "Users",
      link: AppRoutes.PROVIDERLIST,
    },
    {
      text: "Add User",
    },
  ];
  const addFamilyBtn = ()=>{
    setFamilyDetailForm( {username: "",
      title: "",
    relationshipId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    imageUrl: "",
    contactNumber: "",
    email: "",
    roleId: familyRole,
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",})
    setFamilyForm(true)
 
  }
  const isBiometricEmpty = ()=>{
  }
  useEffect(() => {
    if (unAssigned.isSuccess) {
      if(selectedTab == "3"){
        dispatch(fetchProviderOfPatient(selectedPatient));
        message.success({
          content:`Provider unassigned successfully.`, key: "appNotification",
          duration: 5,
        });
      }else if(selectedTab == "6"){
        dispatch(fetchPatientPayers(selectedPatient))
        message.success({
          content:`Payor unassigned successfully.`, key: "appNotification",
          duration: 5,
        });
        setDetectPatientFormChange(false)
      }else if(selectedTab == "4"){
        dispatch(fetchPatientFamily(selectedPatient));
        message.success({
          content: `Family member unassigned successfully.`,
          duration: 5,key:"appNotification"
        });
      }
      dispatch(clearState());
    } else if (unAssigned.isError) {
      message.error({content: unAssigned?.errorStack ? unAssigned?.errorStack : "Something went wrong", key: "appNotification"});
      dispatch(clearState());
    }
  }, [unAssigned.isSuccess, unAssigned.isError]);

 
  
  useEffect(()=>{
  var a=Object.keys(patientDetailForm).filter((items)=>items!="status" && items!="roleId" && items!="sendInvite").reduce( (res:any, key: any) => (res[key] = patientDetailForm[key], res), {} );
    let test =removeEmptyKeys(a)
    if( Object.keys(test).length > 0){
      setDetectPatientFormChange(true)
     
    }else {
      setDetectPatientFormChange(false)
  
    }
  }, [patientDetailForm])
  const onUpdate = () => {
    if (sendInvite != true) {
      dispatch(createPatient(removeEmptyKeys({...patientDetailForm, organisations:{["orgId"]: appUser?.orgId}})));
    } else {
      var patient = { ...patientDetailForm, organisations:{["orgId"]: appUser?.orgId}, sendInvite: true };
      dispatch(createPatient(removeEmptyKeys(patient)));
      setAddPatientNextDisabled(false)
    }
  };

useEffect(()=>{
  if(familyForm){
    if(formState.isSuccess){
      if(sendFamilyInvite!= true){   
        setFamilyPasswordModal(true)
        setDetectPatientFormChange(false)
      }else{
        setFamilyModal(true)
        setDetectPatientFormChange(false)
      }
      dispatch(clearState()) 
      setFamilyFormNextDisabled(false)
    }else if(formState.isError){
      message.error({content:formState?.errorStack ? formState?.errorStack : "Something went wrong" , key:"appNotification"})
      dispatch(clearState())
    }
}
},[formState.isSuccess, formState.isError])

  useEffect(()=>{
    if(isCreated.isSuccess == true && sendInvite!= true){
      setShowModal(true)
      setAddPatientNextDisabled(false)
      setDetectPatientFormChange(false)

      dispatch(clearState())
    }if(isCreated.isSuccess == true &&  sendInvite==true){
      setShowModalView(true)
      setAddPatientNextDisabled(true)

      dispatch(clearState())
    }
    else if(isCreated.isError){
      message.error({content: isCreated?.errorStack ? isCreated?.errorStack : "Something went wrong" , key:"appNotification"})
      dispatch(clearState())
    }
  },[isCreated.isSuccess, isCreated.isError])
  useEffect(()=>{
    if(isAssigned.isSuccess){    
      dispatch(clearState())
      if(selectedTab == "3"){
        dispatch(fetchProviderOfPatient(
          selectedPatient
        )) 
        message.success({
          content: `Assigned provider to ${selectedPatient.firstName} ${selectedPatient?.lastName} successfully.`,
          key:"appNotification"
        })
        setProviderNextDisabled(false)
      }else if(selectedTab == "2"){
        message.success({
          content: `Assigned Hub to ${selectedPatient.firstName} ${selectedPatient?.lastName} successfully.`,
          key:"appNotification"
        })
        dispatch(fetchPatientHub(selectedPatient)) 
        dispatch(fetchPatientDevice(selectedPatient))
        setBiometricNextDisabled(false)
      }else if(selectedTab == "6"){
        message.success({
          content: `Assigned payer to ${selectedPatient.firstName} ${selectedPatient?.lastName} successfully.`,
          key:"appNotification"
        })
        dispatch(fetchPatientPayers(selectedPatient)) 
        setPayorNextDisabled(false)
      }
    } else if(isAssigned.isError){
      message.error({
        content: isAssigned?.errorStack? isAssigned?.errorStack : "Something went wrong.",
        key:"appNotification"
      })
    }
  },[isAssigned.isSuccess, isAssigned.isError])
  useEffect(()=>{
    if(payerForm){
    if(formState.isSuccess){  
      dispatch(clearState()) 
        message.success({
        content: `Payor assigned to patient successfully.`,
       key: "appNotification"
      })
      dispatch(fetchPatientPayers(selectedPatient))
      setPayorNextDisabled(false)
      setpayerForm(false)
    }else if(formState.isError){
      dispatch(clearState()) 
      message.error({
        content: formState?.errorStack? formState?.errorStack : "Something went wrong.",
       key: "appNotification"
      })
    }
  }
  },[formState.isSuccess,formState.isSuccess])
  useEffect(()=>{
    dispatch(getProviderTypes())
    dispatch(fetchRelationships())
  },[])
  const onProviderSearch = (searchParam: any) => {
    dispatch(fetchProviderList({...searchParam, organization: appUser?.orgId}))
  }
  const onPayerSearch = (searchParam: any) => {
    dispatch(fetchPayers({...searchParam, organization: appUser?.orgId}))
  }
  const getTypeOptions = () => {
    if(providerTypes){
    return providerTypes?.map((type)=>{
      return(
        {
          text: type.name,
          value: type.id
        }
      )
    })
  }else return []
}
const addingPayer = ()=>{
  setPayerDetails({
    companyName: "",
  contactName: "",
  contactNumber: "",
  mobileNumber: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
  })
  setpayerForm(true)

}

const onModalClose = () => {
  setShowModal(false)
  setShowModalView(false)
  setFamilyModal(false)
  setFamilyPasswordModal(false) 
  setFamilyForm(false)
  setFamilyInvite(false)
  setSendInvite(false)
  dispatch(clearState())
   }
const getRelationOptions = () => {
  if(relationShips){
  return relationShips?.map((type)=>{
    return(
      {
        text: type.name,
        value: type.id
      }
    )
  })
}else return []
}
const onAssignProviders = () => {
  if(!test?.some((t:any)=>t.isPcp == true)){
    message.error({content: "Please Select one provider as PCP.", key:"appNotification"})
  }else{
  dispatch(assignProviderToPatients({patientId: selectedPatient?.id,providers:test}))
  }
}
const onAssignPayers = () => {
  if(!payerList?.some((t:any)=>t.isPrimary == true)){
    message.error({content: "Please Select one payor as primary.", key:"appNotification"})
  }else{
  dispatch(assignPayerToPatients({patientId: selectedPatient?.id,payers:payerList}))
  }
}
const onAssignHubs = () => {
  dispatch(assignHubToPatients({...hubInfo,patientId: selectedPatient?.id, device: hubList}))
}
  const onTabChange = (key: any) => {
    setSelectedTab(key);
  };
  
  useEffect(()=>{
    dispatch(setSelectedPatient({}))
    dispatch(clearPatientData())
    return(()=>{
      dispatch(setSelectedPatient({}))
      dispatch(clearPatientData())
    })
  },[])

  const onFamilyCreate = () => {
    dispatch(createFamily(removeEmptyKeys({...familyDetailForm, patientId: selectedPatient?.id, organisations : {orgId: appUser?.orgId}})))
  }

  const onPayerCreate = () => {
    dispatch(createPayer(removeEmptyKeys({...payerDetails, ["patientId"]: selectedPatient?.id, organizationId: appUser?.orgId})))
  }
  const handleCancelCallback = () => {
   history.push(AppRoutes.PROVIDERLIST)
  }
  const getHeaderContent = () => {
    switch (selectedTab) {
      case "1": {
        return (
          <>
            <Col md={7} lg={5} xl={5}>
              <Button type="primary" htmlType="submit" form="patientForm">
                Save
              </Button>
            </Col>
            <Col md={8} lg={5} xl={5}>
              <Button type="primary" htmlType="submit" form="patientForm" onClick={()=>setSendInvite(true)} disabled={!patientDetailForm?.email?.length}>
                Send Invite
              </Button>
            </Col>
          </>
        );
      }
      case "4": {
        if(familyForm){
        return(
        <>
            <Col md={7} lg={5} xl={5}>
              <Button type="primary" htmlType="submit" form="addFamily">
                Save
              </Button>
            </Col>
            <Col md={8} lg={5} xl={5}>
              <Button type="primary" htmlType="submit" form="addFamily" disabled={!familyDetailForm?.email?.length} onClick={()=>setFamilyInvite(true)}>
                Send Invite
              </Button>
            </Col>
          </>
        )
        }
        else{
          return null
      }
      }
      case "3": {
        return (
          <Col md={6} lg={5} xl={5}>
            <Button type="primary" htmlType="submit" onClick={onAssignProviders} disabled={disableButton()}>
              Save
            </Button>
          </Col>
        );
      }
      case "6": {
        return (
          <Col md={6} lg={5} xl={5}>
            {
              payerForm?
              <Button type="primary" htmlType="submit" form="payerId" disabled={disableButton()} >
              Save
            </Button>:
            <Button type="primary" htmlType="submit"  onClick={onAssignPayers} disabled={disableButton()} >
            Save
          </Button>
            }
          </Col>
        );
      }
    }
  };
  const disableButton = () => {
    if(selectedPatient?.id ){
      return false
    }else{
      return true
    }
  }
  return (
    <Spin
      spinning={formState.loading || isCreated.loading || isAssigned.loading}
    >
      <Row className="innerHeader" style={{ alignItems: "center" }}>
        <Col span={10}>
          <Breadcrumbs breadcrumbs={breadCrumbs} />
          <p className="orgName f-20">Add Patient</p>
        </Col>
        <Col span={14}>
          <Row justify="end" gutter={[20, 10]}>
            {getHeaderContent()}
          </Row>
        </Col>
      </Row>
      <Row className="mainRow">
        <Tabs
          className="organization-tabs patient-tab f-14"
          activeKey={selectedTab}
          onChange={onTabChange}
        >
          <TabPane tab="Patient Details" key="1">
            <CompWrapper observeOn="mainRow">
              <PatientForm
                setPatientForm={setPatientDetailForm}
                patientForm={patientDetailForm}
                addPatientNextDisabled={addPatientNextDisabled}
                onSubmit={onUpdate}
                formID="patientForm"
                setSelectedTab={setSelectedTab}
                roleOptions={getRoleOptions()}
                disableStatus={true}
                disableUserName={false}
                cancelCallback={handleCancelCallback}
              />
              <WarnModal
                cancelButton={null}
                confirmButton={null}
                isModalVisible={showModalView}
                type={ModalType.SUCCESS}
                cancelCallback={onModalClose}
                primaryText={
                  selectedPatient
                    ? selectedPatient?.firstName +
                      " " +
                      selectedPatient?.lastName
                    : ""
                }
                secondaryText={ModalSecondaryMessages.ENTITY_INVITED}
              />
              <PasswordModal
                isPasswordModalVisible={showModal}
                onCancel={onModalClose}
                userName={selectedPatient?.username}
                password={selectedPatient?.password}
                modalText={ModalSecondaryMessages.ENTITY_ADDED}
                nameText={concatNames(
                  selectedPatient?.firstName,
                  selectedPatient?.lastName,
                  selectedPatient?.middleName
                )}
              />
            </CompWrapper>
          </TabPane>

          <TabPane tab="Biometric Device" key="2">
            <DeviceDetails
              setSelectedTab={setSelectedTab}
              hubList={hubList}
              setList={setHubList}
              onAssign={onAssignHubs}
              setHubInfo={setHubInfo}
              bio={isBiometricEmpty}
              hubInfo={hubInfo}
              disableButton={disableButton()}
              biometricNextDisabled={biometricNextDisabled}
            />
          </TabPane>
          <TabPane tab="Provider" key="3">
            <CompWrapper observeOn="innerHeader" name="provider">
              <ProviderTableList
                setSelectedTab={setSelectedTab}
                onSearch={onProviderSearch}
                typeOptions={getTypeOptions()}
                setTest={setTest}
                providerNextDisabled={providerNextDisabled}
                selectedPatient={selectedPatient}
              />
            </CompWrapper>
          </TabPane>
          <TabPane tab="Family" key="4">
            {familyForm == false ? (
              <FamilyListTable
                showFamilyForm={setFamilyForm}
                setSelectedTab={setSelectedTab}
                disableButton={disableButton()}
                addFamilyBtn={addFamilyBtn}
                familyFormNextDisabled={familyFormNextDisabled}
              />
            ) : (
              <CompWrapper observeOn="innerHeader" name="addFamily">
                <FamilyForm
                  familyFormNextDisabled={familyFormNextDisabled}
                  data={familyDetailForm}
                  setData={setFamilyDetailForm}
                  showFamilyForm={setFamilyForm}
                  setSelectedTab={setSelectedTab}
                  onSubmit={onFamilyCreate}
                  relationOptions={getRelationOptions()}
                  roleOptions={getRoleOptions()}
                  disableStatus
                />
              </CompWrapper>
            )}
          </TabPane>
          <TabPane tab="HSO/HO" key="5">
            <PatientOrganization
              patientOrgDetails={org}
              setSelectedTab={setSelectedTab}
            />
          </TabPane>
          <TabPane tab="Payor" key="6">
            {payerForm ? (
              <CompWrapper observeOn="mainRow" name="addPayer">
                <PayerForm
                formId="payerId"
                  payerDetails={payerDetails}
                  setDetails={setPayerDetails}
                  handleSave={onPayerCreate}
                  setSelectedTab={setSelectedTab}
                  setpayerForm={setpayerForm}
                  disableButton={disableButton()}
                />
              </CompWrapper>
            ) : (
              <CompWrapper observeOn="mainRow" name="payerTable">
                <PayerListing
                  setSelectedTab={setSelectedTab}
                  addingPayer={addingPayer}
                  payorNextDisabled={payorNextDisabled}
                  showForm={setpayerForm}
                  onSearch={onPayerSearch}
                  setTest={setPayerList}
                  disableButton={disableButton()}
                />
              </CompWrapper>
            )}
          </TabPane>      
          <TabPane disabled tab="HIE" key="7"><Demo/></TabPane>
          <TabPane tab="Treatment History" key="8"><EventHistory/></TabPane>
        </Tabs>
      </Row>
      <WarnUnsavedChanges
        ignorePrompt={saveInit}
        navigateOnCancel={true}
        title={UnsavedChangesWarnModal.TITLE}
        content={UnsavedChangesWarnModal.CONTENT}
        cancelBtnText={UnsavedChangesWarnModal.DISCARD_BTN_TEXT}
        confirmBtnText={UnsavedChangesWarnModal.CONFIRM_BTN_TEXT}
        isDirty={detectPatientFormChange}
      />
      <PasswordModal
        isPasswordModalVisible={familyPasswordModal}
        onCancel={onModalClose}
        userName={createdFamilyMember?.username}
        password={createdFamilyMember?.password}
        modalText={ModalSecondaryMessages.ENTITY_ADDED}
        nameText={getFullName(
          createdFamilyMember?.title,
          createdFamilyMember?.firstName,
          createdFamilyMember?.middleName,
          createdFamilyMember?.lastName
        )}
      />

      <WarnModal
        cancelButton={null}
        confirmButton={null}
        isModalVisible={showFamilyModal}
        type={ModalType.SUCCESS}
        cancelCallback={onModalClose}
        primaryText={getFullName(
          createdFamilyMember?.title,
          createdFamilyMember?.firstName,
          createdFamilyMember?.middleName,
          createdFamilyMember?.lastName
        )}
        secondaryText={ModalSecondaryMessages.ENTITY_INVITED}
      />
    </Spin>
  );
};
