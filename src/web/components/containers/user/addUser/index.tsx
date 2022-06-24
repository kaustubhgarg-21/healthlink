import { Row, Col, message, Spin } from "antd";
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs";
import Button from "../../../stateless/common/button";
import "./addUser.less";
import UserForm from "../../../stateless/user/form";
import User from "../../../../models/users/user";
import { useEffect, useState } from "react";
import { AppRoutes } from "../../../../router/appRoutes";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import { useDispatch, useSelector } from "react-redux";
import { createdUser } from "../../../../../redux/actions/user/userAction";
import { CommonIcons, ModalSecondaryMessages, ModalType, UnsavedChangesWarnModal, UserRoles } from "../../../../constants/enums";
import { useHistory } from "react-router-dom";
import { clearState, UserStateSelector } from "../../../../../redux/reducers/user/userReducer";
import WarnModal from "../../../stateless/common/warnModal";
import { PasswordModal } from "../../../stateless/common/passwordModal";
import { concatNames } from "../../../../../utility/appUtil";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";
import { RoleStateSelector } from "../../../../../redux/reducers/role/roleReducer";
import { removeEmptyKeys } from "../../../../../utility/utils";
import WarnUnsavedChanges from "../../../stateless/common/warnUnSaveChanges";
export const AddUser = () => {
  const [showModal, setShowModal] =useState(false)
  const [showModalView , setShowModalView] = useState(false)
  const history = useHistory()
  const [saveInit, setSaveInit] = useState(false)
  const {selectedUser, isCreated} = useSelector(UserStateSelector)
  const {appUser} = useSelector(AuthStateSelector)
  const dispatch = useDispatch()
  const [detectUserFormChange, setDetectUserFormChange]= useState(true)
  const{roles} = useSelector(RoleStateSelector)
const [sendInvite, setSendInvite] = useState(false)
var platformRole = roles?.filter((role)=>{return role?.name == UserRoles.PLATFORM_ADMIN})[0]?.id
  const [userDetailsForm, setUserDetailForm] = useState<User| any>({
    roleId:platformRole,
  });  
  useEffect(()=>{
    var a=Object.keys(userDetailsForm).filter((items)=>items!="roleId" && items!="status" && items!="sendInvite" && items!="mobileNumber").reduce( (res:any, key: any) => (res[key] = userDetailsForm[key], res), {} );
    let test =removeEmptyKeys(a)
    if( Object.keys(test).length > 0){
      setDetectUserFormChange(true)  
    }else {
      setDetectUserFormChange(false)  
    }
  }, [userDetailsForm])
  const onUserEdit = () => {
    if(sendInvite!=true){
    dispatch(createdUser(removeEmptyKeys({...userDetailsForm ,  organisations:{ orgId: appUser?.orgId}})))
    }else{
var user = {...userDetailsForm, sendInvite: true, organisations:{ orgId: appUser?.orgId}}
      dispatch(createdUser(removeEmptyKeys((user))))
    }   
  };
  const onModalClose = () => {
    history.push(AppRoutes.USERLIST)    
  }
  useEffect(()=>{
    if(isCreated.isSuccess == true && sendInvite != true){
      setShowModal(true)
      setDetectUserFormChange(false)
      dispatch(clearState())
    }
    if( isCreated.isSuccess == true && sendInvite == true){
      setShowModalView(true)
      dispatch(clearState())
    }
      else if(isCreated.isError){
        message.error({content:isCreated.errorStack ? isCreated.errorStack : "Something went wrong", key:"appNotification"})
        dispatch(clearState())
    }
  },[isCreated.isSuccess, isCreated.isError])
  const getUserData = (userData: any) => {
    let name = Object.keys(userData)[0];
    let value = userData[name];
    setUserDetailForm(() => ({
      ...userDetailsForm,
      [name]: value,
    }));
  };
  const nextPage = [
    {
      text: "Dashboard",
      link: AppRoutes.LANDING,
    },
    {
      text: "Healthlink Users",
      link: AppRoutes.USERLIST,
    },
    {
      text: "ADD A USER",
    },
  ];
  const obj = {
    userDetailsForm,
    getUserData,
  };
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
  return (
      <Spin spinning={isCreated.loading}>
      <Row className="innerHeader expand">
        <Col md={24} lg={16} xl={17}>
          <Breadcrumbs breadcrumbs={nextPage} />
          <span className="addUserHeader f-20">ADD A USER</span>
        </Col>
        <Col md={12} lg={0} xl={0} xxl={0}>
        </Col>
        <Col md={6} lg={4} xl={4}>
          <div className="btn-saveuser">
          <Button
            type="primary"
            htmlType="submit"
            className="saveButton"
            form="addUserDetails"
          >
            <span className="material-icons-outlined">{CommonIcons.add} </span>
            SAVE USER
          </Button>
          </div>
        </Col>
        <Col md={6} lg={4} xl={3}>
          <div className="btn-sendinvite"> 
          <Button type="primary" className="saveButton"  htmlType="submit" form="addUserDetails" onClick={()=>setSendInvite(true)} disabled={!userDetailsForm?.email?.length}>
            SEND INVITE
          </Button>
          </div>
        </Col>
      </Row>
      <CompWrapper observeOn="innerHeader">
        <UserForm obj={obj} onSubmit={onUserEdit} roleOptions={getRoleOptions()} formID="addUserDetails" setObj={setUserDetailForm} disableUserName={false} disableStatus={true} />
        <PasswordModal isPasswordModalVisible={showModal} onCancel={onModalClose} userName={selectedUser?.username} password={selectedUser?.password} modalText={ModalSecondaryMessages.ENTITY_ADDED} nameText={concatNames(selectedUser?.firstName , selectedUser?.lastName , selectedUser?.middleName)}/>
        <WarnModal cancelButton={null} confirmButton={null} isModalVisible={showModalView} type={ModalType.SUCCESS} cancelCallback={onModalClose} primaryText={selectedUser? selectedUser?.firstName + " " +selectedUser?.lastName: ""} secondaryText={ModalSecondaryMessages.ENTITY_INVITED}/>
        <WarnUnsavedChanges
        ignorePrompt={saveInit}
        navigateOnCancel={true}
        title={UnsavedChangesWarnModal.TITLE}   
        content={UnsavedChangesWarnModal.CONTENT}
        cancelBtnText={UnsavedChangesWarnModal.DISCARD_BTN_TEXT}
        confirmBtnText={UnsavedChangesWarnModal.CONFIRM_BTN_TEXT}
        isDirty = {detectUserFormChange }
      />
      </CompWrapper>
      </Spin>
  );
};
