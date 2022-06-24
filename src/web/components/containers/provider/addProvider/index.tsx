import { Col, message, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import "./addProvider.less";
import { AppRoutes } from "../../../../router/appRoutes";
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs";
import Button from "../../../stateless/common/button";
import ProviderForm from "../../../stateless/provider/form";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import { useHistory, useLocation } from "react-router-dom";
import Provider from "../../../../models/provider/provider";
import { useDispatch, useSelector } from "react-redux";
import { clearState, ProviderStateSelector } from "../../../../../redux/reducers/provider/providerReducer";
import { assignedProvidertoOrganization, createProvider, getProviderTypes, getSpecialityList } from "../../../../../redux/actions/providerActions/providerAction";
import { fetchRoles } from "../../../../../redux/actions/role/roleAction";
import { RoleStateSelector } from "../../../../../redux/reducers/role/roleReducer";
import WarnModal from "../../../stateless/common/warnModal";
import { ModalSecondaryMessages, ModalType, UnsavedChangesWarnModal, UserRoles } from "../../../../constants/enums";
import { concatNames } from "../../../../../utility/appUtil";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";
import { PasswordModal } from "../../../stateless/common/passwordModal";
import { removeEmptyKeys } from "../../../../../utility/utils";
import WarnUnsavedChanges from "../../../stateless/common/warnUnSaveChanges";

const AddProviderForm = (props: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);  
  const location = useLocation<any>()
  const [showModal, setShowModal] = useState(false)
  const [ showModalView, setShowModalView] = useState(false)
  const [saveInit, setSaveInit] = useState(false)
  const history = useHistory()
  const [detectProviderFormChange, setDetectProviderFormChange]= useState(true)
  const dispatch = useDispatch()
  const [sendInvite , setSendInvite]= useState(false)
  const {formState, providerTypes, specialities, isCreated, selectedProvider, isAssigned} = useSelector(ProviderStateSelector)
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
  const {appUser} = useSelector(AuthStateSelector)
  const selectedProviderList = location?.state? location?.state?.selected : {}
  var providerRole = getRoleOptions().filter((role)=>{return role.text == UserRoles.PROVIDER})[0]?.value
  const [providerDetailsForm, setProviderDetailForm] = useState<Provider| any>({...selectedProviderList, ["roleId"]: providerRole,  specialty: selectedProviderList?.specialtyId,  providerType: selectedProviderList?.providerTypeId, preferredCommumnication: selectedProviderList?.preferredCommunication});

  useEffect(()=>{
    dispatch(getProviderTypes())
    dispatch(getSpecialityList())
    dispatch(fetchRoles({organizationId:appUser?.orgId
    }))
  },[])

  useEffect(()=>{
    if(isCreated.isSuccess == true && sendInvite!=true){
      setShowModal(true)
      setDetectProviderFormChange(false)
      dispatch(clearState())
    }
    if(isCreated.isSuccess == true && sendInvite == true){
      setShowModalView(true)
      setDetectProviderFormChange(false)
      dispatch(clearState())

    }
    else if(isCreated.isError){
      message.error({content: isCreated?.errorStack ? isCreated?.errorStack : "Something went wrong" , key:"appNotification"})
      dispatch(clearState())
    }
  },[isCreated.isSuccess, isCreated.isError])

  

  useEffect(()=>{
    if(isAssigned.isSuccess){
      setDetectProviderFormChange(false)
      message.success( {
        content :`${concatNames(
          selectedProvider?.firstName,
          selectedProvider?.lastName,
          selectedProvider?.middleName)}
          added to ${appUser?.orgName} 
          successfully. `, key: "app notification" }).then((value)=>history.push(AppRoutes.PROVIDERLIST))
      dispatch(clearState())
    }else if(isCreated.isError){
      message.error({content: isCreated?.errorStack ? isCreated?.errorStack : "Something went wrong" , key:"appNotification"})
      dispatch(clearState())
    }
  },[isAssigned.isSuccess, isAssigned.isError])
  const onProviderAdding = () => {
    if(Object.keys(selectedProviderList).length > 0){
      
        dispatch(assignedProvidertoOrganization({
          id: providerDetailsForm?.id,
          organisations : {
            orgName :appUser?.orgName? appUser?.orgName : "",
            orgId: appUser?.orgId? appUser?.orgId : ""
          },
          providerType: providerDetailsForm?.providerTypeId
         }))
    }else{
      if(sendInvite!=true){
dispatch(createProvider(removeEmptyKeys({...providerDetailsForm, organisations:{["orgId"]: appUser?.orgId}})))
  }else{
    dispatch(createProvider(removeEmptyKeys({...providerDetailsForm, sendInvite:true, organisations:{["orgId"]: appUser?.orgId}})))

  }}
};


useEffect(()=>{
  var a=Object.keys(providerDetailsForm).filter((items)=>items!="status" && items!="roleId" && items!="sendInvite").reduce( (res:any, key: any) => (res[key] = providerDetailsForm[key], res), {} );
    let test =removeEmptyKeys(a)
    if( Object.keys(test).length > 0){
      setDetectProviderFormChange(true)
     
    }else {
      setDetectProviderFormChange(false)
  
    }
}, [providerDetailsForm])

  const getSpecialityOptions = () => {
   return specialities?.map((speciality)=>{
      return(
        {
          text: speciality.name,
          value: speciality.id
        }
      )
    })
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


  const breadCrumbs = [
    {
      text: "Dashboard",
      link: AppRoutes.LANDING
    },
    {
      text: "Users",
      link : AppRoutes.PROVIDERLIST
    },
    {
      text: "Add Provider"
    }
  ];

  const handleCallBack = ()=>{
    if(Object.keys(selectedProviderList).length > 0){
        history.push(AppRoutes.SEARCHPROVIDER)
      }else{
        history.push(AppRoutes.PROVIDERLIST)
      }
    }
  const onModalClose = () => {
    setIsModalVisible(false)
    dispatch(clearState())
    history.push(AppRoutes.PROVIDERLIST)
  }
  return (
    <Spin spinning={formState.loading || isCreated.loading || isAssigned?.loading}>
      <Row className="innerHeader">
        <Col md={12} lg={15} xl={15}>
          <Breadcrumbs breadcrumbs={breadCrumbs} />
          <p className="brdUserName f-20">ADD Provider</p>
        </Col>
        
        <Col md={12} lg={9} xl={9}>
          
          <Row gutter={16} justify="end">
          <Col span={8}>
              <Button type="primary" onClick={handleCallBack}>
                CANCEL
              </Button>
            </Col>
            <Col span={8}>
              <Button type="primary" htmlType="submit" form="addProvider">
                SAVE
              </Button>
            </Col>
            {Object.keys(selectedProviderList).length == 0 ?
            <Col span={8}>
              <Button type="primary" htmlType="submit" form="addProvider" onClick={()=>setSendInvite(true)} disabled={!providerDetailsForm?.email?.length}>send invite</Button>
            </Col>
            :
            null}
          </Row>
        </Col>
      </Row>
      <CompWrapper observeOn="innerHeader">
        <ProviderForm
          providerDetails={providerDetailsForm}
          setObj={setProviderDetailForm}
          onSubmit={onProviderAdding} 
          formID="addProvider"
          specialities={getSpecialityOptions()}
          providerTypes={getTypeOptions()}
          roleOptions={getRoleOptions()}
          disableUserName={false}
          disableStatus={true}
        />
      </CompWrapper>
      <WarnModal cancelButton={null} confirmButton={null} isModalVisible={isModalVisible} type={ModalType.SUCCESS} cancelCallback={onModalClose} primaryText={concatNames(providerDetailsForm?.firstName, providerDetailsForm?.lastName, providerDetailsForm?.middleName)} secondaryText={ModalSecondaryMessages.ENTITY_ADDED}/>
      <PasswordModal isPasswordModalVisible={showModal} onCancel={onModalClose} userName={selectedProvider?.username} password={selectedProvider?.password} modalText={ModalSecondaryMessages.ENTITY_ADDED} nameText={concatNames(selectedProvider?.firstName , selectedProvider?.lastName , selectedProvider ?.middleName)}/>
        <WarnModal cancelButton={null} confirmButton={null} isModalVisible={showModalView} type={ModalType.SUCCESS} cancelCallback={onModalClose} primaryText={selectedProvider? selectedProvider?.firstName +" " + selectedProvider?.lastName: ""} secondaryText={ModalSecondaryMessages.ENTITY_INVITED}/>
        <WarnUnsavedChanges
        ignorePrompt={saveInit}
        navigateOnCancel={true}
        title={UnsavedChangesWarnModal.TITLE}   
        content={UnsavedChangesWarnModal.CONTENT}
        cancelBtnText={UnsavedChangesWarnModal.DISCARD_BTN_TEXT}
        confirmBtnText={UnsavedChangesWarnModal.CONFIRM_BTN_TEXT}
        isDirty = {detectProviderFormChange }
      />
    </Spin>
  );
};
export default AddProviderForm;
