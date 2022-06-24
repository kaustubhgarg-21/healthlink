import { Card, Col, Dropdown, Menu, Row, Spin } from "antd";
import { elipse, inactive, mail, mobileIcon, phoneIcon } from "../../../../../images";
import "./familyCard.less"
import ProfileIcon from "../../../common/profileThumbnail";
import Family from "../../../../../models/patient/family";
import { concatNames } from "../../../../../../utility/appUtil";
import WarnModal from "../../../common/warnModal";
import { ModalCallBackTypes, ModalPrimaryMessages, ModalType, UserRoles } from "../../../../../constants/enums";
import { contactNoFormat, getFullName } from "../../../../../../utility/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer";
import { unAssignFamilyOfPatient } from "../../../../../../redux/actions/patient/patientAction";
import { PatientStateSelector} from "../../../../../../redux/reducers/patient/patientReducer";
import CustomTooltip from "../../../common/toolTip";

interface FamilyCardProps {
  familyMember : Family
}
export const FamilyCardDetail = (props: FamilyCardProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { familyMember } = props;
  const dispatch = useDispatch();
  console.log(familyMember,25)
  const {  unAssigned, selectedPatient } =
  useSelector(PatientStateSelector);
  const {appUser} = useSelector(AuthStateSelector)
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (unAssigned.isSuccess) {
      setIsModalVisible(false);
    }
  }, [unAssigned.isSuccess, unAssigned.isError]); 

  const handleDelete = () => {
    dispatch(unAssignFamilyOfPatient({ id: familyMember.id, organisationId: appUser?.orgId}));
    setIsModalVisible(false);
  };
  const menu = (
    <Menu className="actionMenu">
      <Menu.Item key="0" onClick={showModal}>
        <img className="inactiveIcon" src={inactive} />{(appUser?.roleName==UserRoles.PATIENT || appUser?.roleName==UserRoles.FAMILY) ? "Request to unassign" : "Unassign" }
      </Menu.Item>
    </Menu>
  );
  return (
    <Spin spinning={unAssigned.loading}>
    <div>

      <Card className="familyCardDetail" >
       
        {
          (appUser?.roleName != UserRoles.FAMILY) ? 
        <Dropdown overlay={menu} overlayClassName="actionMenu"  getPopupContainer={(trigger:any)=>trigger.parentNode}>
          <img src={elipse} className="cardPlistIcon" />
         </Dropdown> 
         :
         null
        }  
 
        <Row className="orgRow2">
          <Col span={5}>
            <div className="orgIconSlicing">
              <ProfileIcon name={concatNames(familyMember?.firstName, familyMember?.lastName)} size="45" />

            </div>
          </Col>
          <Col span={18} >
            <div className="orgNameSlicing f-14">{familyMember?.title} {concatNames(familyMember?.firstName, familyMember?.middleName, familyMember?.lastName)}</div>
            <CustomTooltip content="show" title={familyMember?.relation} color="#ffffff" placement="right"> 
             <div className="orgStateSlicing  customPara slice f-12"  style={{marginBottom:'5px',maxWidth:'100%' ,display:'block'}}>{familyMember?.relation}</div></CustomTooltip>
            <div className="orgStateSlicing f-12">{familyMember?.address1}</div>
            <div className="orgStateSlicing f-12">{familyMember?.city} {familyMember?.state} {familyMember?.country} {familyMember?.zipCode}</div>
            <div className="orgStateSlicing f-12">
            
                {
             
                  familyMember?.contactNumber?
                 <>
                        <div  style={{marginRight:'18px'}}> 
                 <img className="phoneClass" src={phoneIcon} />{contactNoFormat(familyMember?.contactNumber)}
                 </div>
                 </> 
                  :null
                    
           
                }
           
              <div> 
              {
                  familyMember?.mobileNumber?
                 <>
               <img className="ProvMobile" src={mobileIcon} />{contactNoFormat(familyMember?.mobileNumber)}
                 </> 
                  :null
                }
             
              </div>
              </div>
            <div className="orgStateSlicing f-12">
            {
                  familyMember?.email?
                 <>
              <img className="phoneClass emailIcn" src={mail}  />{familyMember?.email}
                 </> 
                  :null
                }
             
              </div>
          </Col>
        </Row>
      </Card>
      <WarnModal
        type={ModalType.WARN}
        isModalVisible={isModalVisible}
        primaryText={""}
        secondaryText={ModalPrimaryMessages.UNASSIGN_USER}
        tertiaryText={getFullName(familyMember?.title,familyMember?.firstName,familyMember?.middleName, familyMember?.lastName)}
        cancelButton={ModalCallBackTypes.CANCEL} confirmButton={ModalCallBackTypes.Confirm}
        cancelCallback={handleCancel}
        confirmCallback={handleDelete}
      ></WarnModal>
    </div>
    </Spin>
  );
}