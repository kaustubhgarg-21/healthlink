import { Row, Col, Dropdown, Menu, Card, message } from 'antd';
import "./userList.less"
import ProfileIcon from "../../common/profileThumbnail";
import { active, bin, resetPass, inactive, invited, elipse } from "../../../../images"
import { AppRoutes } from '../../../../router/appRoutes';
import { useHistory } from 'react-router-dom';
import { setSelectedUser, UserStateSelector } from "../../../../../redux/reducers/user/userReducer"
import { useDispatch , useSelector} from 'react-redux';
import { concatNames, replaceAll } from '../../../../../utility/appUtil';
import User from '../../../../models/users/user';
import CustomTooltip from '../../common/toolTip';
import { deleteUser, updateUser } from '../../../../../redux/actions/user/userAction';
import { ModalCallBackTypes, ModalPrimaryMessages, ModalSecondaryMessages, ModalType, UserRoles } from '../../../../constants/enums';
import { AuthStateSelector ,clearPassword, clearState} from '../../../../../redux/reducers/authReducer/authReducer';
import { useEffect, useState } from 'react';
import WarnModal from '../../common/warnModal';
import { ResetModal } from '../../common/resetModal';
import { changePassword, requestChangePassword } from '../../../../../redux/actions/auth/authAction';
import { PasswordModal } from '../../common/passwordModal';
import { contactNoFormat } from '../../../../../utility/utils';
interface UserCardProps {
    user: User
    showAdminDetails?: any
    adminDetail?: any
}
const UserRow = (props: UserCardProps) => {
    const { user, showAdminDetails } = props;
    const {appUser, newPasswordGenerated, passwordGenerated} = useSelector(AuthStateSelector)
    const [showPasswordModal, setShowPasswordModal] = useState(false)
    const [search, setSearch] = useState("")
    const [resetPassUser, setResetPassUser] = useState({
        username: user?.username,        
      })
      const [reqPassUser, setReqPassUser] = useState({
        email: user?.email,        
      })
    const [status, setStatus] = useState<any>(null);
    const {selectedUser} = useSelector(UserStateSelector)
    const [showResetModal, setShowResetModal] = useState(false)
    const [isWarnModalVisible , setIsWarnModalVisible] = useState(false)
    const [sendReset, setSendReset] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const onListClick = () => {
       if (user?.roleName==UserRoles.ORG_ADMIN){
        dispatch(setSelectedUser(user))
        showAdminDetails(true)
       }
       else {
        dispatch(setSelectedUser(user))
        history.push(AppRoutes.USERDETAILSFORM)
    }}
    const showModal = () => {
        setIsModalVisible(true);
      };
      const resetPasswordModalLink = () => {
        dispatch(requestChangePassword({
            email: user?.email    
          }))
        setSendReset(true)
      }  
      const handleCancelPass = () => {
        setIsWarnModalVisible(false);
      };
      const handleCancel = () => {
        setIsModalVisible(false);
      };
      const handleCancelCall = () => {
        setShowResetModal(false)
      }
      const onModalClose = ()=>{
        setShowPasswordModal(false)
      }
    useEffect (()=>{
        if(passwordGenerated.isSuccess){
          if(sendReset){
            message.success({content:`Link to change Password sent succesfully.`, key:"appNotification"})
            setShowResetModal(false)
            setShowPasswordModal(false)
            dispatch(clearState())
          }else if(isWarnModalVisible){
            setIsWarnModalVisible(false)
          setShowPasswordModal(true)
          dispatch(clearState())
          }
          dispatch(clearPassword()) 
        }
          },[passwordGenerated.isSuccess])
    const showResetModalBtn = () => {
        if (user?.email == null || user?.email =="") {
            setIsWarnModalVisible(true)
        } else {
          setShowResetModal(true)
        }
      }    
const sureChangePassword = ()=>{    
    dispatch(changePassword(resetPassUser))
}
    const onActiveClick =()=>{
        const menuData = {...user, "status" : "active"}
        dispatch(updateUser(menuData as User))}
    const onDeactiveClick = ()=>{
        const menuData ={...user,  "status": "inactive",}
        dispatch(updateUser(menuData as User))}  
const onDeleteClick = ()=>{
    dispatch(deleteUser(user))
    setIsModalVisible(false)
} 
    const menu = (
        <Menu className="actionMenu">
            <Menu.Item key="0" onClick ={showResetModalBtn}>
                <img src={resetPass} className="red" alt="status"
                 />Reset Password
            </Menu.Item>          
            <>{user.status!="invited"?
            (appUser?.id==user?.id||user?.roleName==UserRoles.SUPER_ADMIN) ? null :
            user.status == "active" ?
                <Menu.Item key="1" onClick={onDeactiveClick} className="border">
                    <img src={inactive} className="red" alt="status" />Deactivate
                </Menu.Item>
                :
                <Menu.Item key="1" onClick={onActiveClick} className="border">                     
                    <img src={active} className="red" alt="status" /><span className="activeDropDown">Activate</span>
                </Menu.Item>
            : null}</>          
            {(appUser?.id==user?.id||user?.roleName==UserRoles.SUPER_ADMIN) ? null :
            <Menu.Item key="2"  onClick={showModal} className="border">
         <img src={bin} className="red" alt="status" />Delete
            </Menu.Item>
            }
        </Menu>
    );
    return (
        <div className='userListContainer'>
            <Card className="userListCard">
                <Row >
                    <Col  md={22} lg={23} xl={23} xxl={23} onClick={onListClick} className='userRow1'>
                        <Row className="userCard f-12" >
                            <Col md={2} lg={2} xl={1} className="userProfileIcon">
                                <ProfileIcon src={user?.imageUrl} name={concatNames(user?.firstName, user?.lastName)} size="48" />
                            </Col>
                            <CustomTooltip content="show" title={concatNames(user?.firstName, user?.lastName, user?.middleName)} color="#ffffff" placement="bottomLeft">
                            <Col md={3} lg={3} xl={4} className="userName f-14">
                             <div className="orgNameContentSlicing"> <p className="orgDetailSliceCLass slice">{concatNames(user?.firstName, user?.lastName, user?.middleName)}</p></div>
                            </Col></CustomTooltip>
                            <Col md={3} lg={2} xl={3} className="userStatus orgStatusMargin">

                                {user?.status == "active" ?
                                    <> <img src={active} className="Green-button" alt="status" />Active</>
                                    :
                                    user?.status == "inactive" ?
                                        <>   <img src={inactive} className="Green-button" alt="status" />Inactive</>
                                        :
                                        <> <img src={invited} className="Green-button" alt="status" />Invited</>
                                }
                            </Col>
                            <Col md={2} lg={2} xl={3} className="userProfile userCiti">
                                {user?.city}
                            </Col>
                            <Col md={3} lg={5} xl={4} className="userProfile slice userEmail">
                                {user?.email}
                            </Col>
                            <Col md={4} lg={3} xl={3} className="userProfile slice userMob">
                                {contactNoFormat(user?.mobileNumber)}
                            </Col>
                            <Col md={4} lg={4} xl={3} className="userRole ">
                                {user?.roleName}
                            </Col>
                        </Row>
                    </Col>
                    <Col md={2} xl={1} lg={1} className="userButton mbpadding userRow2">
                        <Dropdown placement="bottomLeft" overlayClassName='actionMenu' overlay={menu}>
                            <img src={elipse} />
                        </Dropdown>
                    </Col>
                </Row>
            </Card>
            <WarnModal
            type={ModalType.WARN}
            isModalVisible={isModalVisible}
            primaryText={ModalPrimaryMessages.DELETE_USER}
            secondaryText={replaceAll(
            /\{0\}/gi,
            ModalSecondaryMessages.DELETE_ORGANIZATION,
            user.firstName + "  " + user.lastName
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
        </div>
    )
}
export default UserRow;