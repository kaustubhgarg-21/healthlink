import { Card, Col, Dropdown, Menu, message, Row } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setSelectedProvider } from "../../../../../redux/reducers/provider/providerReducer";
import { setSelectedUser } from "../../../../../redux/reducers/user/userReducer";
import { concatNames, replaceAll } from "../../../../../utility/appUtil";
import { ModalCallBackTypes, ModalPrimaryMessages, ModalSecondaryMessages, ModalType, UserRoles } from "../../../../constants/enums";
import { active, bin, elipse, inactive, invited, resetPass } from "../../../../images"
import Patient from "../../../../models/patient/patient";
import Provider from "../../../../models/provider/provider";
import User from "../../../../models/users/user";
import { AppRoutes } from "../../../../router/appRoutes";
import ProfileIcon from "../../common/profileThumbnail";
import CustomTooltip from "../../common/toolTip";
import { deleteUser, updateUser } from '../../../../../redux/actions/user/userAction';
import { setSelectedPatient } from "../../../../../redux/reducers/patient/patientReducer";
import "./providerDetailList.less"
import { AuthStateSelector ,clearPassword} from "../../../../../redux/reducers/authReducer/authReducer";
import WarnModal from "../../common/warnModal";
import { useEffect, useState } from "react";
import { contactNoFormat, getFullName } from "../../../../../utility/utils";
import { ResetModal } from "../../common/resetModal";
import { PasswordModal } from "../../common/passwordModal";
import { changePassword, requestChangePassword } from "../../../../../redux/actions/auth/authAction";

interface UserCardProps{
  user: User| Provider
  provider?: Provider
  patient?: Patient
}
export const ProviderDetail = (props: UserCardProps) => {
  const { user , provider, patient} = props
  const history = useHistory()
  const dispatch = useDispatch()
  const {appUser, newPasswordGenerated, passwordGenerated} = useSelector(AuthStateSelector)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)
  const [sendReset, setSendReset] = useState(false)
  const [resetPassUser, setResetPassUser] = useState({
    username: user?.username,
  })
  const [isWarnModalVisible , setIsWarnModalVisible] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onSelect = (selected:any) => {
    switch( selected?.roleName){
      case UserRoles.PROVIDER:{
         return (
          dispatch(setSelectedProvider(selected)),
          history.push(AppRoutes.PROVIDERDETAILS)
        )
      }
      case UserRoles.PATIENT:{
          return(
            dispatch(setSelectedPatient(selected)),
            history.push(AppRoutes.PATIENTDETAILS)
          )
       }
      default:{
          return (
            dispatch(setSelectedUser(selected)),
            history.push(AppRoutes.USERDETAILSFORM)
          )
      }
  }
  }
  const onModalClose = ()=>{
    setShowPasswordModal(false)
  }

  const handleCancelPass = () => {
    setIsWarnModalVisible(false);
  };
  const onActiveClick =()=>{
    const menuData = {...user, "status" :"active"}
    dispatch(updateUser(menuData))}

const onDeactiveClick = ()=>{
    const menuData ={...user,  "status": "inactive",}
    dispatch(updateUser(menuData))}  
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    }; 
    const handleCancelCall = () => {
      setShowResetModal(false)
    }
    const showResetModalBtn =()=>{
      if(user?.email == null|| user?.email == ""){
        setIsWarnModalVisible(true)

      }else{
        setShowResetModal(true)

      }
    }
  let ddlId=document.getElementById('cardItem')
    useEffect (()=>{
      if(passwordGenerated.isSuccess){
        if(sendReset){
          message.success({content:`Link to change Password sent succesfully.`, key:"appNotification"})
          setShowResetModal(false)
          setShowPasswordModal(false)

        }else if(isWarnModalVisible){
          setIsWarnModalVisible(false)
        setShowPasswordModal(true)
        }
        dispatch(clearPassword()) 
      }
        },[passwordGenerated.isSuccess])
   
    const onDeleteClick=()=>{
      if(user?.roleName == UserRoles.PROVIDER){
        dispatch(deleteUser({id: user?.id, orgId: appUser?.orgId} as User))
      }else{
      dispatch(deleteUser( user))
      }
      setIsModalVisible(false)
  }   
  const sureChangePassword = ()=>{
    
    dispatch(changePassword(resetPassUser))
}
const resetPasswordModalLink = () => {
  dispatch(requestChangePassword({email: user?.email}))
  setSendReset(true)
}
const parent : HTMLElement = document.getElementById("ddlitem")!
  const menu = (
    <Menu className="actionMenu">
      <>{(user.status!="invited" && appUser?.id != user?.id )? 
      user.status == "active" ?
        <Menu.Item key="0" onClick={onDeactiveClick}>
          <img src={inactive} className="red" alt="status" />Deactivate
        </Menu.Item> :
        <Menu.Item key="0" onClick={onActiveClick} >
          <img src={active} className="red" alt="status" />Activate
        </Menu.Item>
     :null }</>
     {appUser?.id != user?.id ?
      <Menu.Item key="1" onClick={showModal}>
        <img src={bin} className="red" alt="status" />Delete
      </Menu.Item> : null }
      <Menu.Item key="2" onClick={showResetModalBtn}>
        <img src={resetPass} className="red" alt="status" width="13px" height="13px" />Reset Password
      </Menu.Item>
    </Menu>
  );
  return (
      <Card className="organisationListCard" id="cardItem"  key={user.id}>
        <Row >
          <Col md={22} lg={23} xl={23} xxl={23} className="orgColumn1" onClick={()=>onSelect(provider? provider: user)}>
            <Row className="orgCard">
              <Col md={2} lg={2} xl={1} className="organisationLogoPic">
                <ProfileIcon src={user?.imageUrl} name={concatNames(user?.firstName, user?.lastName, user.middleName)} size="48" />
              </Col>
              <Col md={4} lg={3} xl={4} className="nameClass">
                <CustomTooltip content="show" title={concatNames(user?.firstName, user?.lastName, user.middleName)} color="#ffffff" placement="bottomLeft">
                <p className="orgDetailSliceCLass slice">{user.title} {user.firstName} {user.middleName} {user.lastName}</p></CustomTooltip>
              </Col>
              <Col md={2} lg={2} xl={3} className="nameClass classRole">
                {user?.roleName}
              </Col>
              <Col md={2} lg={3} xl={3} className="nameClass classRole">
                 {user?.userRoles?  user?.userRoles[0]?.providerTypeName: ""}
              </Col>
              <Col md={3} lg={3} xl={4} className="nameClass classRole slice">
              {contactNoFormat(user?.mobileNumber)}
              </Col>
              <Col md={4} lg={4} xl={4} className="nameClass classRole slice">
                {user.email}
              </Col>
              <Col md={3} lg={2} xl={2} className="nameClass classRole">
                {user.status == "active" ?
                <>  <img src={active} className="Green-button" alt="status" />Active</>
                  : user.status == "invited" ? 
                  <><img src={invited} className="Green-button" alt="status" />Invited</>
                  :
                <>  <img src={inactive} className="Green-button" alt="status" />Inactive</>
                }
              </Col>
            </Row>
          </Col>
          <Col md={2} lg={1} xl={1} xxl={1} className="orgColumn2 mbpadding" >
            <Dropdown overlay={menu} placement="bottomLeft" arrow>
            <img src={elipse} />
            </Dropdown>
          </Col>
        </Row>
      <WarnModal
            type={ModalType.WARN}
            isModalVisible={isModalVisible}
            primaryText={ModalPrimaryMessages.DELETE_USER}
            secondaryText={replaceAll(
            /\{0\}/gi,
            ModalSecondaryMessages.DELETE_ORGANIZATION,
            getFullName(user?.title, user.firstName, user?.middleName, user.lastName)
            )}
            cancelButton={ModalCallBackTypes.CANCEL}
            confirmButton={ModalCallBackTypes.DELETE}
            cancelCallback={handleCancel}
            confirmCallback={onDeleteClick}
      />
        <WarnModal
            type={ModalType.WARN}
            isModalVisible={isWarnModalVisible}
            primaryText={ModalPrimaryMessages.RESET_PASSWORD}
            secondaryText={replaceAll(
            /\{0\}/gi,
            ModalSecondaryMessages.RESET_THE_PASSWORD,
            user.firstName + "  " + user.lastName
            )}
            cancelButton={ModalCallBackTypes.CANCEL}
            confirmButton={ModalCallBackTypes.Confirm}
            cancelCallback={handleCancelPass}
            confirmCallback={sureChangePassword}
      />    
        <ResetModal isResetModalVisible={showResetModal}
        onReset={resetPasswordModalLink}
        cancelCallback={handleCancelCall}
        value={user?.email}
         /> 
     <PasswordModal isPasswordModalVisible={showPasswordModal} onCancel={onModalClose} userName={newPasswordGenerated?.username} password={newPasswordGenerated?.password} modalText={ModalSecondaryMessages.PASSWORDCHANGE} nameText={"New Password Generated"} />
     </Card>
  )
}