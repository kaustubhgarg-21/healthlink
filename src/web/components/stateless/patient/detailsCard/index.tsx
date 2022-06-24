import { Row, Col, Card, Menu } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";
import { concatNames } from "../../../../../utility/appUtil";
import CustomTooltip from "../../common/toolTip";
import { CommonIcons, ModalCallBackTypes, ModalPrimaryMessages, ModalType, PatientDetailIcons, UserRoles } from "../../../../constants/enums";
import {
  backButton,
} from "../../../../images";
import Patient from "../../../../models/patient/patient";
import { AppRoutes } from "../../../../router/appRoutes";
import { Breadcrumbs } from "../../common/breadCrumbs";
import Button from "../../common/button";
import InputModal from "../../common/inputModal";
import ProfileIcon from "../../common/profileThumbnail";
import SetupModal from "../../common/setupModal";
import "./patientDetailsCard.less";
import moment from "moment";
import { PatientReviewModal } from "../../common/patientReviewModal";
import { getFullName } from "../../../../../utility/utils";
import { UserStateSelector } from "../../../../../redux/reducers/user/userReducer";
interface PatientDetailCardProps {
  patient: Patient,
  showButton?: any,
  selectedItem?: "adherence" | "compliance",
  setSelectedItem?: any
}
export const PatientDetailCard = (props: PatientDetailCardProps) => {
  const { patient, showButton, selectedItem, setSelectedItem } = props;
  const history = useHistory();
  const { appUser } = useSelector(AuthStateSelector)
  const {selectedUser}=useSelector(UserStateSelector)
  const [isSetupModalVisible, setIsSetupModalVisible] = useState(false);
  const [isWarnModalVisible, setIsWarnModalVisible] = useState(false);
  const [isPatientReviewModalVisible, setisPatientReviewModalVisible] = useState(false);

  const getBreadCrumb = () => {
    switch (window.location?.pathname) {
      case AppRoutes.PATIENTREPORTS:
        return PatientDetailIcons.BD
      case AppRoutes.PATIENTTHRESHOLD:
        return PatientDetailIcons.MngThresholds
      case AppRoutes.PATIENTSCHEDULE :
        return PatientDetailIcons.Mngscheduls
      case AppRoutes.PATIENTADHERENCE :
        return PatientDetailIcons.Mngscheduls
      case AppRoutes.ADHERENCEREVIEW:
        return PatientDetailIcons.Reports
      case AppRoutes.PATIENTDETAILS:
        return PatientDetailIcons.PI
    }
  }

const detailCardBreadCrumb = ()=>{
  if(appUser?.roleName == UserRoles.PROVIDER){
return [{
  text: "Dashboard",
  link: AppRoutes.LANDING,
},
{
  text: "Patients",
  link: AppRoutes.PATIENTLIST,
},
{
  text: getBreadCrumb()
},]
  }else{
    return [{
      text: "Dashboard",
      link: AppRoutes.LANDING,
    },
    {
      text: getBreadCrumb()
    },]
  }
}

  const breadCrumbs = detailCardBreadCrumb()
  
  

  const addingAdherence = () => {
    setSelectedItem("adherence")
  }

  const compliancehistory = useHistory();
  const addingCompliance = () => {
    setSelectedItem("compliance")
  }
  const handleModalChange = () => { };
  const showModal = () => {
    setIsWarnModalVisible(true);
  };
  const handleReviewModal = () => {
    setisPatientReviewModalVisible(true)
  }

  const handleCancel = () => {
    setIsWarnModalVisible(false);
  };

  const handleDelete = () => {
    setIsWarnModalVisible(false);
  };

  const consultationModal = () => {
    setIsSetupModalVisible(true);
  };
  const continueConsultationModal = () => {
    setIsSetupModalVisible(false);
  };
  const cancelConsultationModal = () => {
    setIsSetupModalVisible(false);
  };
  const cancelPatientReviewModal = () => {
    setisPatientReviewModalVisible(false)
  }

  const text = <span>Biometric DashBoard</span>;
  const menu = (
    <Menu className="actionMenu">
      <Menu.Item key="0" onClick={consultationModal}>Setup Consultation</Menu.Item>
      <Menu.Item key="1" onClick={showModal}>Add Notes</Menu.Item>
    </Menu>
  );
  const onMenuChange = (route: string) => {
    history.push(route);
  };
  const getMenuColor = (route: any) => {
    if (route == window.location?.pathname) {
      return " #000099";
    } else {
      return "#898989"
    }
  }
  const getManagaeSchActiveRoute = () => {
    if(window.location?.pathname == AppRoutes.PATIENTSCHEDULE){
      return AppRoutes.PATIENTSCHEDULE
    }else if(window.location?.pathname == AppRoutes.PATIENTADHERENCE){
      return AppRoutes.PATIENTADHERENCE
    }
  }
  const isPrimary = () => {
    return (patient?.pcpId == appUser?.id)
  }
  return (
    <Card className="patientDetailsCard">
      <Row style={{ maxHeight: "15px" }}>
        <Col span={24} className="brdCrumbs">
          <CustomTooltip placement="left" title={"Back"} color="#ffffff" >
            <div style={{ position: "relative", left: "-2px" }}> <button className="bckBtn" onClick={() => history.goBack()}><img src={backButton} className="bckIcon"></img></button></div>
          </CustomTooltip>
          <div style={{marginLeft:'5px'}}><Breadcrumbs breadcrumbs={breadCrumbs} /></div>
        </Col>
      </Row>
      <Row style={{ alignItems: "center" }} gutter={20}>
        <Col span={18} md={17} lg={14} xl={18}>
          <Row className="pt-10">
            <Col xl={1} lg={2} md={2} xxl={1}>
              <ProfileIcon
                name={concatNames(patient?.firstName, patient?.lastName, patient?.middleName)}
                src={patient?.imageUrl}
                size="48"
              />
            </Col>
            <Col>
              <div className="patientNametra"> 
              <p className="patientName">
                {getFullName(patient?.title, patient?.firstName, patient?.middleName, patient?.lastName)}
              </p>
              {isPrimary()?  <p className="pateintType f-12">Primary Patient</p>: null} 
              </div>
            </Col>
            <Col xl={2} lg={4} md={4} className="PatentDetailtext">
              <p className="patientDetails f-12 key" style={{ color: '#898989' }}>DOB  &nbsp; &nbsp; &nbsp;:&nbsp;</p>
              <p className="patientDetails f-12 key" style={{ color: '#898989' }}>P-MRN  &nbsp;:&nbsp;</p>
        
            </Col>
            <Col xl={4} lg={8} md={8} xxl={5} >
              <p className="patientDetails f-12 value">{moment(patient?.dob).format("DD MMM YYYY")} ({patient?.age} Yrs)</p>
              <p className="patientDetails f-12 value">{patient?.mrn}</p>

            </Col>
            <Col xxl={6} xl={8} lg={6} md={0} className="web-View">
              {showButton && <div className="adherenceBorder">
                <Row gutter={10} className="commplianceBorder">
                  <Col span={12}>
                    <Button type="primary" className={selectedItem == "adherence" ? "colorChange" : "adherenceBtn"} onClick={addingAdherence}>
                      ADHERENCE
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button type="primary" className={selectedItem == "compliance" ? "colorChange" : "adherenceBtn"} onClick={addingCompliance}>
                      COMPLIANCE
                    </Button>
                  </Col>
                </Row>
              </div>}
            </Col>
            <div className="mbView-adherenceBtn mob-View" style={{ display: 'none' }}>
              {showButton && <div className="adherenceBorder">
                <div className="commplianceBorder">
                  <div >
                    <Button type="primary" className={selectedItem == "adherence" ? "colorChange" : "adherenceBtn"} onClick={addingAdherence}>
                      ADHERENCE
                    </Button>
                  </div>
                  <div >
                    <Button type="primary" className={selectedItem == "compliance" ? "colorChange" : "adherenceBtn"} onClick={addingCompliance}>
                      COMPLIANCE
                    </Button>
                  </div>
                </div>
              </div>}
            </div>
          </Row>
        </Col>
        <Col  xl={6} lg={10} md={7} >
          <Row justify="end">
          <Col span={0} md={0} lg={6} xl={0} ></Col>
          <Col span={4} md={4} lg={3} xl={4} >
          <div className="logoCenter">
          <CustomTooltip placement="top" title={PatientDetailIcons.BD} color="#ffffff" >
            <span
              className="material-icons-outlined calendar"
              onClick={() => onMenuChange(AppRoutes.PATIENTREPORTS)}
              style={{ color: getMenuColor(AppRoutes.PATIENTREPORTS) }}
            >
              {"dashboard"}
            </span>
            
          </CustomTooltip>
          </div>
        </Col>
        <Col span={4} md={4} lg={3} xl={4}>
          <div className="logoCenter"> 
          <CustomTooltip placement="top" title={PatientDetailIcons.PI} color="#ffffff">
            <span
              className="material-icons-outlined calendar"
              onClick={() => onMenuChange(AppRoutes.PATIENTDETAILS)}
              style={{ color: getMenuColor(AppRoutes.PATIENTDETAILS) }}
            >
              {CommonIcons.perContactCalender}
            </span>
          </CustomTooltip>
          </div>
        </Col>
        <Col span={4} md={4} lg={3} xl={4}>
          <div className="logoCenter"> 
          <CustomTooltip placement="top" title={PatientDetailIcons.MngThresholds} color="#ffffff">
            <span
              className="material-icons-outlined calendar"
              onClick={() => onMenuChange(AppRoutes.PATIENTTHRESHOLD)}
              style={{ color: getMenuColor(AppRoutes.PATIENTTHRESHOLD) }}
            >
              {CommonIcons.menu}
            </span>
          </CustomTooltip>
          </div>
        </Col>
        <Col span={4} md={4} lg={3} xl={4}>
          <div className="logoCenter"> 
          <CustomTooltip placement="top" title={PatientDetailIcons.Mngscheduls} color="#ffffff">
            <span
              className="material-icons-outlined calendar"
              onClick={() => onMenuChange((appUser?.roleName == UserRoles.PROVIDER) ? AppRoutes.PATIENTSCHEDULE : AppRoutes.PATIENTADHERENCE)}
              style={{ color: getMenuColor(getManagaeSchActiveRoute()) }}
            >
              {CommonIcons.calendar}
            </span>
          </CustomTooltip>
          </div>
        </Col>
        <Col span={4} md={4} lg={3} xl={4}>
          <div className="logoCenter"> 
          <CustomTooltip placement="top" title={PatientDetailIcons.Reports} color="#ffffff">
            <span
              className="material-icons-outlined calendar"
              onClick={() => onMenuChange(AppRoutes.ADHERENCEREVIEW)}
              style={{ color: getMenuColor(AppRoutes.ADHERENCEREVIEW) }}
            >
              {CommonIcons.report}
            </span>
          </CustomTooltip>
          </div>
        </Col>
        {
          appUser?.roleName == UserRoles.PATIENT || appUser?.roleName == UserRoles.FAMILY ?
            null
            :
            <Col span={4} md={4} lg={3} xl={4}>
              <div className="logoCenter">
              <CustomTooltip content="show" title={PatientDetailIcons.PR} color="#ffffff" placement="top">
                <span
                  className="material-icons-outlined calendar"
                  style={{ color: '#898989' }}
                  onClick={handleReviewModal}
                >
                  {CommonIcons.calendarCheck}
                </span>
              </CustomTooltip>
              </div>
            </Col>
        }
          </Row>
        </Col>
        
      </Row>
      <InputModal
        type={ModalType.WARN}
        isWarnModalVisible={isWarnModalVisible}
        labelSubName="Add notes"
        value="addNotes"
        name="addNotes"
        onChange={handleModalChange}
        cancelButton={ModalCallBackTypes.CANCEL}
        confirmButton={ModalCallBackTypes.SAVE}
        cancelCallback={handleCancel}
        confirmCallback={handleDelete}
      />
      <SetupModal
        type={ModalType.SUCCESS}
        isSetupModalVisible={isSetupModalVisible}
        primaryText={ModalPrimaryMessages.SETUP_CONSULTATION}
        cancelButton={ModalCallBackTypes.CANCEL}
        confirmButton={ModalCallBackTypes.CONTINUE}
        cancelCallback={cancelConsultationModal}
        confirmCallback={continueConsultationModal}
      />
      <PatientReviewModal
        patient={patient}
        isPatientReviewModalVisible={isPatientReviewModalVisible}
        cancelCallback={cancelPatientReviewModal}
      />
    </Card>
  );
};
