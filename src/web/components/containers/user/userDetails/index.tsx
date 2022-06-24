import { Col, message, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import UserForm from "../../../stateless/user/form";
import Button from "../../../stateless/common/button";
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs";
import { AppRoutes } from "../../../../router/appRoutes";
import "./userDetails.less";
import {replaceAll } from "../../../../../utility/appUtil";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import WarnModal from "../../../stateless/common/warnModal";
import {
  CommonIcons,
  ModalCallBackTypes,
  ModalPrimaryMessages,
  ModalSecondaryMessages,
  ModalType,
  UnsavedChangesWarnModal,
  UserRoles,
} from "../../../../constants/enums";
import { ResetModal } from "../../../stateless/common/resetModal";
import { PasswordModal } from "../../../stateless/common/passwordModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUserById, updateFamily, updateUser } from "../../../../../redux/actions/user/userAction";
import { clearState, UserStateSelector } from "../../../../../redux/reducers/user/userReducer";
import { AuthStateSelector, clearPassword } from "../../../../../redux/reducers/authReducer/authReducer";
import { useHistory } from "react-router-dom";
import { clearState as PatientClearState } from "../../../../../redux/reducers/patient/patientReducer";
import { RoleStateSelector } from "../../../../../redux/reducers/role/roleReducer";
import { changePassword, requestChangePassword } from "../../../../../redux/actions/auth/authAction";
import { getFullName, removeEmptyKeys } from "../../../../../utility/utils";
import WarnUnsavedChanges from "../../../stateless/common/warnUnSaveChanges";
import { fetchFamilyById, fetchRelationships } from "../../../../../redux/actions/patient/patientAction";
import {  PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer";
const UserDetailsForm = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const {appUser  ,newPasswordGenerated , passwordGenerated} = useSelector(AuthStateSelector)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [disableSave , setDisableSave] = useState(true)
  const {relationShips, familyUpdate} = useSelector(PatientStateSelector)
  const [saveInit, setSaveInit] = useState(false)
  const {formState,selectedUser, isUpdated, isDeleted, users }=useSelector(UserStateSelector)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false)
  const [resetPass, setResetPass] = useState({
    username: selectedUser?.username,
  })
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [userDetailsForm,setUserDetailsForm]=useState<any>(selectedUser)
  const{roles} = useSelector(RoleStateSelector)
  const [isWarnModalVisible , setIsWarnModalVisible] = useState(false)
  useEffect(()=>{
    if(selectedUser.roleName == "Family"){
    dispatch(fetchFamilyById(selectedUser))
    }else{
      dispatch(fetchUserById(selectedUser.id))
    }
},[])
const getRelationOptions = () => {
  if (relationShips) {
    return relationShips?.map((type) => {
      return (
        {
          text: type.name,
          value: type.id
        }
      )
    })
  } else return []
}
  const onUserUpdate =()=>{
    if(selectedUser.roleName == "Family"){
    dispatch(updateFamily(userDetailsForm))
  }else{
        dispatch(updateUser(userDetailsForm))
  }}
  useEffect(()=>{
    if(formState.isSuccess){
      dispatch(clearState())
    }
  },[formState.isSuccess])
  useEffect(()=>{
    setUserDetailsForm(selectedUser)
  },[selectedUser])
  useEffect(()=>{
    if(isUpdated.isSuccess){    
      dispatch(clearState())
      dispatch(fetchUserById(selectedUser.id))    
        message.success({
        content: `${getFullName(selectedUser.title , selectedUser.firstName, selectedUser.middleName, selectedUser.lastName)} updated successfully.`,
        duration: 5, key:"appNotification"
      })
      setDisableSave(true)
    }else if(isUpdated.isError){
      dispatch(clearState())
      message.error({content:isUpdated.errorStack ? isUpdated.errorStack : "Something went wrong", key:"appNotification"})
    }
  },[isUpdated.isSuccess, isUpdated.isError])
useEffect(()=>{
  dispatch(fetchRelationships())
},[])
  useEffect(()=>{
    if(familyUpdate?.isSuccess){    
      dispatch(PatientClearState())
      dispatch(fetchFamilyById(selectedUser))    
        message.success({
        content: `${getFullName(selectedUser.title , selectedUser.firstName , 
          selectedUser.middleName, selectedUser.lastName)}  updated successfully.`,
        duration: 5, key:"appNotification"
      })
      setDisableSave(true)
    }else if(familyUpdate?.isError){
      dispatch(PatientClearState())
      message.error({content:familyUpdate.errorStack ? familyUpdate.errorStack : "Something went wrong", key:"appNotification"})
    }
  },[familyUpdate.isSuccess, familyUpdate.isError])
  const resetPasswordModalLink = () => {
    dispatch(requestChangePassword({email: selectedUser?.email}))
  }
  useEffect (()=>{
    if(passwordGenerated.isSuccess){
      if(showResetModal){
        message.success(`Link to change Password sent succesfully.`)
        setShowResetModal(false)
      }else if(isWarnModalVisible){
        setIsWarnModalVisible(false)
      setShowPasswordModal(true)
      }
      dispatch(clearPassword()) 
    }
      },[passwordGenerated.isSuccess])
      useEffect(()=>{
        if(isDeleted.isSuccess){    
          dispatch(clearState())
          setIsModalVisible(false);
          if(appUser?.roleName == UserRoles.PLATFORM_ADMIN || appUser?.roleName == UserRoles.SUPER_ADMIN){
        history.push(AppRoutes.USERLIST)  
          }else {
            history.push(AppRoutes.PROVIDERLIST)  
          }
          message.success({content:"User deleted successfully", key:"appNotification"})
        }else if(isDeleted?.isError){
          message.error({content:isDeleted?.errorStack ? isDeleted?.errorStack : "Somthing went wrong", key:"appNotification"})
        }
      },[isDeleted.isSuccess, isDeleted?.isError])
  const resetPasswordModal = () => {
    if (selectedUser?.email == null || "") {
      setIsWarnModalVisible(true)
    } else {
      setShowResetModal(true)
    }
  }
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onModalClose = ()=>{
    setShowPasswordModal(false)
  }
  const sureChangePassword = ()=>{
    dispatch(changePassword(resetPass))        
  }  
  const handleDelete = () => {
    dispatch(deleteUser(selectedUser))
  };
  const platformBreadCrumbs = [
    {
      text: "Dashboard",
      link: AppRoutes.LANDING,
    },
    {
      text: "Healthlink Users",
      link: AppRoutes.USERLIST,
    },
    {
      text: "EDIT USER",
    },
  ];
  const orgBreadCrumb = [
    {
      text: "Dashboard",
      link: AppRoutes.LANDING,
    },
    {
      text: "Users",
      link: AppRoutes.PROVIDERLIST,
    },
    {
      text: "EDIT USER",
    },
  ];
  const handleBreadCrumbs = () => {
    if(appUser?.roleName == UserRoles.PLATFORM_ADMIN || appUser?.roleName == UserRoles.SUPER_ADMIN){
      return platformBreadCrumbs
    }else{
      return orgBreadCrumb
    }
  }
  const userFormFunctionality =() => {    
    if(selectedUser?.roleName == UserRoles.SUPER_ADMIN){
      return true;
    }else {
      return false;
    }
    }
  const handleCancelCall = () => {
    setShowResetModal(false)
  }
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
  const getUserData = (userData: any) => {
    let name = Object.keys(userData)[0];
    let value = userData[name];
    setUserDetailsForm(() => ({
      ...userDetailsForm,
      [name]: value,
    }));
  };
  var obj = {
    userDetailsForm,
    getUserData,
    setUserDetailsForm,
  };
  return (
    <div className="addUserScreen">  
    <Spin spinning={isUpdated.loading || formState.loading || passwordGenerated.loading || familyUpdate.loading}> 
      <Row align="middle" className="innerHeader expand">
        <Col md={24} lg={24} xl={12}>
          <Breadcrumbs breadcrumbs={handleBreadCrumbs()} />
          <p className="brdUserName f-20">
            {selectedUser.firstName + " " + selectedUser.lastName}
          </p>
        </Col>
        <Col md={24} lg={24} xl={12}>
          <Row gutter={16}>
          
            {
            (appUser?.id == selectedUser.id) ||
             (selectedUser?.roleName == UserRoles.SUPER_ADMIN) ?
            <>
            <Col md={5} lg={0} xl={0} xxl={0}></Col>
               <Col md={6} lg={8} xl={8}>
              <Button type="primary"  onClick={() => history.goBack()}>
                Cancel
              </Button>
            </Col> 
            </>
          :
            <><Col md={4} lg={3} xl={4}>
            <Button type="primary" onClick={() => history.goBack()} >
              Cancel
            </Button>
          </Col>
            <Col md={5} lg={5} xl={5}>
              <Button type="primary" onClick={showModal}>
                <span className="material-icons-outlined">
                  {CommonIcons.delete}
                </span>
                Delete
              </Button>
            </Col></>}
            <Col md={7} lg={8} xl={8}>
              <Button type="primary" onClick={resetPasswordModal}>
                <span className="material-icons-outlined" >
                  {CommonIcons.unlock}
                </span>
                Reset Password
              </Button>
            </Col>
            <Col md={6} lg={8} xl={7}>
              <Button type="primary" htmlType="submit" form="userEdit" disabled={disableSave}>
                Save Changes
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>      
      <CompWrapper observeOn="innerHeader">
        <UserForm obj={obj} onSubmit={onUserUpdate} setObj={setUserDetailsForm} roleOptions={getRoleOptions()} formID="userEdit" disableUserName={true}  disableStatus={false} disableEdit={userFormFunctionality()}  disableSave={disableSave}
                setDisableSave={setDisableSave} 
                relationOptions={getRelationOptions()}
         />
      </CompWrapper>
      {/* delete waring modal */}
      <WarnModal
        type={ModalType.WARN}
        isModalVisible={isModalVisible}
        primaryText={ModalPrimaryMessages.DELETE_USER}
        secondaryText={replaceAll(
          /\{0\}/gi,
          ModalSecondaryMessages.DELETE_ORGANIZATION,
          selectedUser.firstName + "  " + selectedUser.lastName
        )}
        cancelButton={ModalCallBackTypes.CANCEL}
        confirmButton={ModalCallBackTypes.DELETE}
        cancelCallback={handleCancel}
        confirmCallback={handleDelete}
      />
      {/* reset password warning modal */}
      <WarnModal
            type={ModalType.WARN}
            isModalVisible={isWarnModalVisible}
            primaryText={ModalPrimaryMessages.RESET_PASSWORD}
            secondaryText={replaceAll(
            /\{0\}/gi,
            ModalSecondaryMessages.RESET_THE_PASSWORD,
            selectedUser?.firstName + "  " + selectedUser?.lastName
            )}
            cancelButton={ModalCallBackTypes.CANCEL}
            confirmButton={ModalCallBackTypes.Confirm}
            cancelCallback={handleCancel}
            confirmCallback={sureChangePassword}
      /> 
     <ResetModal isResetModalVisible={showResetModal}
        onReset={resetPasswordModalLink}
        cancelCallback={handleCancelCall}
        value={selectedUser?.email}
         /> 
         <WarnUnsavedChanges
        ignorePrompt={saveInit}
        navigateOnCancel={true}
        title={UnsavedChangesWarnModal.TITLE}   
        content={UnsavedChangesWarnModal.CONTENT}
        cancelBtnText={UnsavedChangesWarnModal.DISCARD_BTN_TEXT}
        confirmBtnText={UnsavedChangesWarnModal.CONFIRM_BTN_TEXT}
        isDirty = {disableSave? false:true }
      />
    <PasswordModal isPasswordModalVisible={showPasswordModal} onCancel={onModalClose} userName={newPasswordGenerated?.username} password={newPasswordGenerated?.password} modalText={ModalSecondaryMessages.PASSWORDCHANGE} nameText={"New Password Generated"} />
    </Spin>
    </div>
  );
};
export default UserDetailsForm;