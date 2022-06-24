import { Row, Col, Menu, Dropdown, Typography } from "antd";
import { downIcon, notifcationIcon,warningIcon } from "../../../../images";
import "./mainHeader.less"
import ProfileIcon from "../profileThumbnail";
import { CommonIcons, UserRoles } from "../../../../constants/enums";
import { useDispatch, useSelector } from "react-redux";
import { AuthStateSelector, logout, clearState } from "../../../../../redux/reducers/authReducer/authReducer";
import CustomTooltip from "../toolTip";
import { useEffect, useRef, useState } from "react";
import { OrganizationStateSelector, setSelectedOrganization } from "../../../../../redux/reducers/organization/organizationReducer";
import { fetchOrganizationById } from "../../../../../redux/actions/organization/organizationActions";
import { useHistory } from "react-router-dom";
import { AppRoutes } from "../../../../router/appRoutes";
import { AlertBar } from "../../../containers/alert";
import { getFullName } from "../../../../../utility/utils";
import { fetchNotifications } from "../../../../../redux/actions/notification/notificationAction";
import { _io, _manager, _url } from '../../../../services/websocket/websocket'
import { fetchAlerts } from "../../../../../redux/actions/alerts/alertAction";
import { AlertStateSelector } from "../../../../../redux/reducers/alertReducer/alertReducer";
import { NotificationSelector } from "../../../../../redux/reducers/notification/notificationReducer";


export const AppHeader = (props: any) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { appUser, isAuthenticated } = useSelector(AuthStateSelector)
    const { formState, selectedOrganization } = useSelector(OrganizationStateSelector)
    const {notifications} = useSelector(NotificationSelector)
    const {alerts} = useSelector(AlertStateSelector)
    const [openAlert , setOpenAlert] = useState(false)
    const [notificationCount, setNotificationCount] =  useState(0)
    const [alertCount, setAlertCount] =  useState(0)
    const [socketData, setSocketData] = useState<any>([])
    var menuRef = useRef<HTMLElement>(null)
    var iconRef = useRef<HTMLImageElement>(null)
    const socket = _io(_url, {
        autoConnect: false,
      })
    const onLogout = () => {
        dispatch(logout())
    }
    const handleClick = () => {
       setOpenAlert(!openAlert)
    }
    const onAccountSetting = () => {
        history.push(AppRoutes.ACCOUNTSETTINGS)
    }
    const onNotificationClick = () => {
        history.push(AppRoutes.NOTIFICATION)
    }
    useEffect(() => {
        if(appUser?.roleName != UserRoles.PLATFORM_ADMIN && appUser?.roleName != UserRoles.SUPER_ADMIN){
        if (appUser && appUser.orgId) {
            dispatch(fetchOrganizationById(appUser.orgId))
        }}
    }, [appUser])

//For Connecting Websocket, Fetching Notification and alerts
    useEffect(() => {
        if (appUser?.id && isAuthenticated) {
         dispatch(fetchNotifications({userId: appUser?.id}))
         dispatch(fetchAlerts({receiverId: appUser?.id}))
        }
      }, [appUser?.id])

//After Connect Websocket
      socket.on('connect', () => {
        console.log('Socket', {
          connected: socket?.connected,
          socketID: socket?.id,
          userID: appUser?.id,
        })
      })
      socket.on('message', (msg: any) => {
        setSocketData(msg)
      })
      socket.on('disconnect', () => {
        console.log('socket disconnected!')
      })
    
      socket.on('close', () => {
        console.log('Socket closed!!')
      })

//For updating Count of alerts and notification on recieving live notification
      useEffect(() => {
        dispatch(fetchNotifications({userId: appUser?.id}))
        dispatch(fetchAlerts({receiverId: appUser?.id}))
        if (!socketData.isAlert) {
          setNotificationCount((prevCount) => prevCount + 1)
        }
        else {
            setAlertCount((prevCount) => prevCount + 1)
        }
      }, [socketData])

    useEffect(()=>{
        setNotificationCount(notifications?.length)
    },[notifications])
    useEffect(()=>{
        setAlertCount(alerts?.length)
    },[alerts])
    useEffect(() => {
        if (formState.isSuccess) {
            dispatch(clearState())
        }
    }, [formState.isSuccess])

    useEffect(() => {
        let handler = (event: any) => {
          if (openAlert) {
            if (!menuRef.current?.contains(event.target)) {
              setOpenAlert(false)
            }
          } else if (iconRef.current?.contains(event.target)) {
            setOpenAlert(true)
          }
        }
        document.addEventListener('mousedown', handler)
        return () => {
          document.removeEventListener('mousedown', handler)
        }
      })
    
//User Left Dropdown menu
    const userMenu = () => {
        return (
            <Menu className="actionMenu header">
                <Menu.Item key="1" onClick={onAccountSetting}>
                    <span className="material-icons-outlined" >{CommonIcons.settings}</span> <span style={{ paddingLeft: "10px" }}>Account Settings</span>
                </Menu.Item>
                <Menu.Item key="2" onClick={onLogout}>
                    <span className="material-icons-outlined">{CommonIcons.logout}</span> <span style={{ paddingLeft: "10px" }}>Sign Out</span>
                </Menu.Item>
            </Menu>
        )
    }

    const getUserMenu = () => {
        return (
            <Dropdown overlay={userMenu} trigger={["click"]} overlayClassName="actionMenu"

                placement="bottomLeft">
                <div style={{ display: "flex", alignItems: "center", width: "100%" }}>

                    <ProfileIcon name={`${appUser?.firstName} ${appUser?.lastName}`} size="40" />
                    <div className="userMenu">
                        <div className="userDetails">
                            <p className="header-userName customPara f-14 slice">
                               {getFullName(appUser?.title, appUser?.firstName, appUser?.middleName, appUser?.lastName)}
                            </p>
                            <img src={downIcon} style={{ paddingLeft: "5px" }} />
                        </div>
                        <div className="userProfileHeaderName">
                            <p className="header-userRole f-12 slice">
                                {appUser?.roleName}
                            </p>
                        </div>
                    </div>
                </div>
            </Dropdown>
        )
    }
//Header Change based on Roles
    const getLogo = () => {
        switch (appUser?.roleName) {
            case UserRoles.SUPER_ADMIN: {
                return (
                    <>
                        <Col md={2} lg={2} xl={2} xxl={1}></Col>
                        <Col md={12} lg={9} xl={9} xxl={15} ></Col>

                    </>
                )
            }
            case UserRoles.PLATFORM_ADMIN: {
                return <>
                    <Col md={2} lg={2} xl={2} xxl={1}></Col>
                    <Col md={12} lg={9} xl={9} xxl={15} ></Col>

                </>
            }
            case UserRoles.ORG_ADMIN: {
                return (
                    <>
                        <Col md={2} lg={2} xl={2} xxl={1} className="logoAlign">
                            {appUser?.orgName ? 
                            
                                <div className="orgLogo">
                                    {
                                    selectedOrganization?.imageURL?
                                    <img src={selectedOrganization?.imageURL} className="orgLogoHeader"/>
                                            :
                                    <ProfileIcon size="40" name={selectedOrganization?.orgName}/>
            }
                                </div>
                                :
                                null
                            }
                        </Col>
                        <Col md={8} lg={9} xl={9} xxl={15} className="nameColUser">
                            <div className="organizationLabel f-20 orgLab"><CustomTooltip content="show" title={selectedOrganization?.orgName} color="#ffffff" placement="right"><p className="orgDetailSliceCLass customPara slice">{selectedOrganization?.orgName}</p></CustomTooltip></div>
                        </Col>
                    </>
                )
            }
            case UserRoles.PROVIDER: {
                return (
                    <>
                        <Col md={2} lg={2} xl={2} xxl={1} className="logoAlign" >
                            {appUser?.orgName ? 
                                <div className="orgLogo">
                                    {
                                    selectedOrganization?.imageURL?
                                    <img src={selectedOrganization?.imageURL} className="orgLogoHeader">
                                    </img>: <ProfileIcon size="40" name={selectedOrganization?.orgName}/>
                                    }
                                </div>
                                :
                                null
                            }
                        </Col>
                        <Col md={8} lg={9} xl={9} xxl={15} className="nameColUser">
                        <div className="organizationLabel f-20">  <CustomTooltip content="show" title={selectedOrganization?.orgName} color="#ffffff" placement="right"><p className="orgDetailSliceCLass customPara slice">{selectedOrganization?.orgName}</p></CustomTooltip></div>
                        </Col>
                    </>
                )
            }
            case UserRoles.PATIENT: {
                return (
                    <>
                       <Col md={2} lg={2} xl={2} xxl={1} className="logoAlign" >
                            {appUser?.orgName ?
                            
                            <div className="orgLogo">
                                    {
                                    selectedOrganization?.imageURL?
                                    <img src={selectedOrganization?.imageURL} className="orgLogoHeader">
                                    </img>: <ProfileIcon size="40" name={selectedOrganization?.orgName}/>
                                    }
                                </div>
                                :
                                null
                            }
                        </Col>
                        <Col md={8} lg={9} xl={9} xxl={15} className="nameColUser">
                        <div className="organizationLabel f-20"><CustomTooltip content="show" title={selectedOrganization?.orgName} color="#ffffff" placement="right"><p className="orgDetailSliceCLass customPara slice">{selectedOrganization?.orgName}</p></CustomTooltip></div>
                        </Col>
                    </>
                )
            }
            case UserRoles.FAMILY: {
                return (
                    <>
                        <Col md={2} lg={2} xl={2}  xxl={1} className="logoAlign" >
                            {appUser?.orgName ?
                           <div className="orgLogo">
                           {
                           selectedOrganization?.imageURL?
                           <img src={selectedOrganization?.imageURL} className="orgLogoHeader">
                           </img>: <ProfileIcon size="40" name={selectedOrganization?.orgName}/>
                           }
                           </div>
                                :
                                null
                            }
                        </Col>
                        <Col md={8} lg={9} xl={9} xxl={15} className="nameColUser">
                        <div className="organizationLabel f-20"><CustomTooltip content="show" title={selectedOrganization?.orgName} color="#ffffff" placement="right"><p className="orgDetailSliceCLass customPara slice">{selectedOrganization?.orgName}</p></CustomTooltip></div>
                        </Col>
                    </>
                )
            }
            default: {

            }
        }
    }
    return (
        <>
        <Row style={{ textAlign: "center" }}>
            
            {getLogo()}

            <Col md={13} lg={13} xl={13} xxl={8}>
                <Row justify="end">
                    <div className="notiUserMenu">
                    <div className="notificationIcon notification">
                    <CustomTooltip content="show" title="Notifications" color="#ffffff" placement="bottom"> 
                    <img className="alertIcon"  src={notifcationIcon} onClick={onNotificationClick}/>
                    
                  
                    <span className="count">
                        {notificationCount}
                      </span>
                       </CustomTooltip>
                    </div>
                    <div className="notificationIcon notification">
                    <CustomTooltip content="show" title="Alerts" color="#ffffff" placement="bottom"> 
                    <img className="alertIcon" src={warningIcon} ref={iconRef} onClick={handleClick}/>
                    <span className="count">
                        {alertCount}
                      </span>
                      </CustomTooltip>
                    </div>
                    <div className="user-menu userMenuCol">
                    {getUserMenu()}
                    </div>
                    </div>
                </Row>
            </Col>
        </Row>
        {openAlert ? 
        <span id="servicesMenu" ref={menuRef}>
         <AlertBar openAlert={openAlert} setOpenAlert={setOpenAlert} alertList={alerts}/>
         </span> : null}

         </>
    )
}