import { Card, Col, Dropdown, Menu, Row } from "antd";
import { elipse, inactive, mail, mobileIcon, phoneIcon, primaryIcon } from "../../../../images";
import ProfileIcon from "../../common/profileThumbnail";
import "./providerCardDetail.less"
import Provider from "../../../../models/provider/provider";
import { concatNames } from "../../../../../utility/appUtil";
import { useState } from "react";
import WarnModal from "../../common/warnModal";
import { ModalCallBackTypes, ModalPrimaryMessages, ModalType, UserRoles } from "../../../../constants/enums";
import { contactNoFormat, getFullName } from "../../../../../utility/utils";
import { useDispatch, useSelector } from "react-redux";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";
import CustomTooltip from "../../common/toolTip";
import { unAssignProviderOfPatient } from "../../../../../redux/actions/patient/patientAction";
import { PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer";
import { ProviderStateSelector } from "../../../../../redux/reducers/provider/providerReducer";
interface ProviderCardProps {
  provider : Provider
}
export const ProviderCardDetail = (props: ProviderCardProps) => {
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false)
  const dispatch = useDispatch()
  const { provider } = props;
  const {patientProvider,unAssigned, selectedPatient} =useSelector(PatientStateSelector)
  const {  selectedProvider, } = useSelector(ProviderStateSelector);
  const [selectRowProvider, setSelectRowProvider] = useState<any>()
  const {appUser} = useSelector(AuthStateSelector)
  const handleCancel = () => {
    setModalVisible(false);
  };
  const showModal = () => {
    setModalVisible(true);
  };
  const handleUnAssign = () => {
    // setIsModalVisible(false);
    dispatch(unAssignProviderOfPatient({ id: provider?.id, patientId:selectedPatient?.id }))
        setModalVisible(false)
  };
  const menu = (
    <Menu className="actionMenu">
      <Menu.Item key="0" onClick={showModal}>
        <img className="inactiveIcon" src={inactive} /><span> {" "} Unassign </span>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>

      <Card className="familyCardDetail" >
      {(appUser?.roleName==UserRoles.PATIENT || appUser?.roleName==UserRoles.FAMILY || appUser?.id== provider?.id) ? null :
         <Dropdown overlay={menu} trigger={["click"]} overlayClassName="actionMenu" getPopupContainer={(trigger:any)=>trigger.parentNode}>
         <img src={elipse} className="cardPlistIcon" />
         </Dropdown>   
       }
{provider?.isPcp? <img src={primaryIcon} className="cardPrimaryIcon" /> : null}

        <Row className={provider?.isPcp?"orgRowpadding":"orgRow2"}>

          <Col span={5}>
            <div className="orgIconSlicing">
              <ProfileIcon name={concatNames(provider?.firstName, provider?.lastName)} size="45" />

            </div>
          </Col>
          <Col span={19}>
            <div className="orgNameSlicing f-14">{provider?.title} {provider?.firstName} {provider?.middleName} {provider?.lastName}</div>
            <div className="orgStateSlicing f-12">{provider?.designation}</div>
            <CustomTooltip content="show" title={provider?.specialtyList?.name} color="#ffffff" placement="right"><div className="orgStateSlicing f-12  customPara slice" style={{marginBottom:'5px',maxWidth:'100%' ,display:'block'}}>{provider?.specialtyList?.name}</div></CustomTooltip>
            <div className="orgStateSlicing f-12">{provider?.address1},</div>
            <div className="orgStateSlicing f-12">{provider?.city}, {provider?.state} {provider?.zipCode}, {provider?.country}</div>
            <div className="orgStateSlicing f-12">
          
             
             { 
             provider?.contactNumber ?
             <>
              <div style={{marginRight:'18px'}}>
               <img className="phoneClass" src={phoneIcon} />{contactNoFormat(provider?.contactNumber)}
               </div>
               </>
                :null
              }
                
              
              { provider?.mobileNumber ?
             <>
             <div>
               <img className="ProvMobile" src={mobileIcon} />{contactNoFormat(provider?.mobileNumber)}
               </div>
               </>
                :null
              }
               
                
              </div>
              {
              provider?.email ?
              <div className="orgStateSlicing f-12">
              <CustomTooltip title={provider?.email} color="#FFFFFF" content="show" placement="right">
              <p className="customPara slice"> <img className="phoneClass emailIcn" src={mail} />{provider?.email}</p>
              </CustomTooltip>
                </div>:null
            }
            
          </Col>
        </Row>
      </Card>
      <WarnModal
        type={ModalType.WARN}
        isModalVisible={isModalVisible}
        primaryText={""}
        secondaryText={ModalPrimaryMessages.UNASSIGN_USER}
        tertiaryText={`${getFullName(provider?.title,provider?.firstName,provider?.middleName, provider?.lastName)} ?`}
        cancelButton={ModalCallBackTypes.CANCEL} confirmButton={ModalCallBackTypes.Confirm}
        cancelCallback={handleCancel}
        confirmCallback={handleUnAssign}
      ></WarnModal>
    </div>
  );
}