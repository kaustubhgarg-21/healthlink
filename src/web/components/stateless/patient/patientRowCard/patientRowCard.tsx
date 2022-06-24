import { Card, Col, Dropdown, Menu, Row, Typography } from "antd";
import { useState } from "react";
import {
  bpIcon,
  elipse,
  glucoMeterReading,
  primaryIcon,
  redHeartIcon,
  spo2,
  weight,
  Spirometer,
 
} from "../../../../images";
import ProfileIcon from "../../common/profileThumbnail";
import "./patientRowCard.less";
import { Link, useHistory } from "react-router-dom";
import { AppRoutes } from "../../../../router/appRoutes";

import {
  Biometricname,
  CommonIcons,
  PercentageTypes,
} from "../../../../constants/enums";
import { useDispatch,useSelector } from "react-redux";
import { PatientStateSelector, setSelectedPatient } from "../../../../../redux/reducers/patient/patientReducer";
import Patient from "../../../../models/patient/patient";
import CustomTooltip from "../../common/toolTip";
import moment from "moment";
import { PatientReviewModal } from "../../common/patientReviewModal";
import { getFullName } from "../../../../../utility/utils";
const tempratureIcon="https://www.webtreeindia.com/healthlink/development/assets/images/temperature.svg"

interface PatientCardProps {
  patient: Patient;
}
const primarylogo="https://www.webtreeindia.com/healthlink/development/assets/images/primary.svg"
const PatientRowCard = (props: any) => {
  const { el, appUser } = props;
  const [isSetupModalVisible, setIsSetupModalVisible] = useState(false);
  const [isPatientReviewModalVisible, setisPatientReviewModalVisible] = useState(false);
  const [adverseButton, setAdverseButton] = useState();
  const {selectedPatient, isCreated} = useSelector(PatientStateSelector)

  const [isWarnModalVisible, setIsWarnModalVisible] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const patientReports = () => {
    dispatch(setSelectedPatient(el));
    history.push(AppRoutes.PATIENTREPORTS);
  };
  let profileIconName = el.firstName + " " + el.lastName;
  const { customColor } = props;
  const showModal = () => {
    setIsWarnModalVisible(true);
  };

  const handleReviewModal = () =>{
    setisPatientReviewModalVisible(true)
  }
  const cancelPatientReviewModal =() =>{
    setisPatientReviewModalVisible(false)
  }

  const consultationModal = () => {
    setIsSetupModalVisible(true);
  };



  const getIconColor = (thresholdType: Biometricname) => {
if(el?.devices[thresholdType]){
  if(el?.summary[thresholdType]){
    return el?.summary[thresholdType][PercentageTypes.fiveDay]
  }else{
    return "#626262"
  }
  

}else{
return "rgba(98, 98, 98, 0.5)"
}
  };

    const getDayColor = (thresholdType: Biometricname, type: PercentageTypes) => {
      if(el?.devices[thresholdType]){
        if(el?.summary[thresholdType]){
          return el?.summary[thresholdType][type]
        }
 }else{
        return "rgba(98, 98, 98, 0.5)"
        }
      }

  const getAdherenceCompliance = (thresholdType: Biometricname, type: PercentageTypes) => {
    if(el?.devices[thresholdType]){
      if(el?.summary[thresholdType]){
        return el?.summary[thresholdType][type]
      }
}else{
      return "rgba(98, 98, 98, 0.5)"
      }
    }
   
   
   const getCritical = ()=>{
    if(el?.isCritical[appUser?.id]){
      return <img src={redHeartIcon} className="adherentIcon" />

    } else{
      return null

    }
   }
   
   
    const patientDetailsMenu = () => {
    dispatch(setSelectedPatient(el))
  }
  const isPrimary = () => {
    return(el?.pcpId == appUser?.id)   
  }
  const menu = (
    <Menu className="actionMenu">
      <Menu.Item key="0" onClick={consultationModal}>
        Setup Consultation
      </Menu.Item>
      <Menu.Item key="1" onClick={showModal}>
        Add Notes
      </Menu.Item>
    </Menu>
  );

  const menuList = (
    <Menu className="actionMenu">
      <Menu.Item key="0" onClick={patientDetailsMenu}>
        <span className="material-icons-outlined">
          {CommonIcons.perContactCalender}
        </span>
        <Link to={AppRoutes.PATIENTDETAILS}>
          <span style={{ paddingLeft: "10px" }}> Patient Information</span>
        </Link>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="1" onClick={patientDetailsMenu}>
        <span className="material-icons-outlined">
          {CommonIcons.calendar}
        </span>
        <Link to={AppRoutes.PATIENTSCHEDULE}>
          <span style={{ paddingLeft: "10px" }}>Manage Schedules</span>
        </Link>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="2" onClick={patientDetailsMenu}>
        <span className="material-icons-outlined">{CommonIcons.menu}</span>
        <Link to={AppRoutes.PATIENTTHRESHOLD}>
          <span style={{ paddingLeft: "10px" }}>Manage Thresholds</span>
        </Link>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="3" onClick={patientDetailsMenu}>
        <span className="material-icons-outlined">{CommonIcons.report}</span>
        <Link to={AppRoutes.ADHERENCEREVIEW}>
          <span style={{ paddingLeft: "10px" }}>Reports</span>
        </Link>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="4" onClick={handleReviewModal}>
        <span className="material-icons-outlined">{CommonIcons.calendarCheck}</span>
          <span style={{ paddingLeft: "10px" }}>Patient Review</span>
      </Menu.Item>
     
    </Menu>
  );

  return (
    <Card className={isPrimary()?"patientRowCardList patientRowCardBody1":"patientRowCardList patientRowCardBody2"}>
      
      <Dropdown
              overlay={menuList}
              placement="bottomLeft"
              trigger={["click"]}
              overlayClassName="actionMenu"
            >
              {isPrimary()?<img className="plistColumn2 isprimaryplistCoulumn2" src={elipse} style={{cursor: "pointer"}}/>:<img className="plistColumn2" src={elipse} style={{cursor: "pointer"}}/>}
        </Dropdown>
          {isPrimary() ? <img className="primaryIcon" src={primaryIcon} /> : null}
          
      <Row gutter={[0,10]} style={{cursor: "pointer"}}>
        <Col md={1} lg={1} xl={1} onClick={patientReports}>
          <div className="pro">
            <ProfileIcon
              size="45"
              name={profileIconName}
              src={el?.imageUrl}
            />
            {getCritical()}
          </div>
        </Col>
        <Col md={23} lg={5} xl={4} onClick={patientReports} className="ptntRowCritical">
          <div className="patientDetails">
          <span className="ptName f-16" style={{marginBottom:'10px'}}>
            {getFullName(el?.title ,el?.firstName, el?.middleName, el?.lastName)}
          </span>
          <Typography className="dob f-12">
    
            <span style={{marginRight:'16px'}}>DOB</span>&nbsp;:<span className="birtDate f-12">
            &nbsp;{moment(props.el.dob).format("DD MMM YYYY")}&nbsp;({el?.age} Yrs)
            </span>

          </Typography>
          <Typography className="dob f-12">
            
            <span style={{marginRight:'2px'}}>P-MRN</span>&nbsp;:<span className="birtDate f-12">&nbsp;{props.el?.mrn}</span>
          </Typography>
          <Typography className="dob f-12">
            <span style={{marginRight:'9px'}}>Payor</span>&nbsp;:&nbsp;  <span className="birtDate f-12"> &nbsp;{props.el?.payor}</span>
          </Typography>
          </div>
        </Col>{" "}
        <Col
          md={4}
          lg={3}
          xl={3}
          className="readingStatus"
          onClick={patientReports}
        >
          <CustomTooltip title="Blood Pressure" color="#FFFFFF" content="show" placement="top">
          <div className="dot" style={{background: getIconColor(Biometricname.BP)}}>
            <img src={bpIcon} />
          </div></CustomTooltip>
          <div className="daysLabel">
            <span style={{
                color: getDayColor(Biometricname.BP, PercentageTypes.singleDay),
              }}>
                {" "}
              ID {" "}
            </span> 
            <span style={{
                color: getDayColor(Biometricname.BP, PercentageTypes.twoDay),
              }}>
                {" "}
              2D
            </span >
            <span style={{
                color: getDayColor(Biometricname.BP, PercentageTypes.fiveDay),
              }}>
                {" "}
              5D
            </span>
            <span style={{
                color: getDayColor(Biometricname.BP, PercentageTypes.fourteenDay),
              }}>
                {" "}
              14D
            </span>{" "}
            <span style={{
                color: getDayColor(Biometricname.BP, PercentageTypes.thirtyDay),
              }}>
                {" "}
              30D
            </span>
            <span style={{
                color: getAdherenceCompliance(Biometricname.BP, PercentageTypes.adherence),
              }}>
              A % {" "}
            </span>        
            <span style={{
                color: getAdherenceCompliance(Biometricname.BP, PercentageTypes.compliance),
              }}>
              C %
            </span>
          </div>
        </Col>{" "}
        <Col
          md={4}
          lg={3}
          xl={3}
          className="readingStatus"
          onClick={patientReports}
        ><CustomTooltip title="Glucose" color="#FFFFFF" content="show" placement="top">
          <div className="dot" style={{background: getIconColor(Biometricname.GLUCO)}}>
            <img src={glucoMeterReading} />
          </div></CustomTooltip>
          <div className="daysLabel">
            {" "}
            <span
              style={{
                color: getDayColor(Biometricname.GLUCO, PercentageTypes.singleDay),
              }}
            >
              ID {" "}
            </span>
            <span
              style={{
                color: getDayColor(Biometricname.GLUCO, PercentageTypes.twoDay),
              }}
            >
              2D {" "}
            </span>
            <span
              style={{
                color: getDayColor(Biometricname.GLUCO, PercentageTypes.fiveDay),
              }}
            >
              5D {" "}
            </span>
            <span
              style={{
                color: getDayColor(
                  Biometricname.GLUCO,
                  PercentageTypes.fourteenDay
                ),
              }}
            >
              14D {" "}
            </span>{" "}
            <span
              style={{
                color: getDayColor(Biometricname.GLUCO, PercentageTypes.thirtyDay),
              }}
            >
              30D
            </span>{" "}
            <span style={{
                color: getAdherenceCompliance(Biometricname.GLUCO, PercentageTypes.adherence),
              }}>
              A % {" "}
            </span>        
            <span style={{
                color: getAdherenceCompliance(Biometricname.GLUCO, PercentageTypes.compliance),
              }}>
              C %
            </span>
          </div>
        </Col>
        <Col
          md={4}
          lg={3}
          xl={3}
          className="readingStatus"
          onClick={patientReports}
        ><CustomTooltip title="Weight" color="#FFFFFF" content="show" placement="top">
          <div className="dot" style={{background: getIconColor(Biometricname.WEIGHT)}}>
            <img src={weight} />
          </div></CustomTooltip>
          <div className="daysLabel">
          <span style={{
                color: getDayColor(Biometricname.WEIGHT, PercentageTypes.singleDay),
              }}>
                {" "}
              ID
            </span> 
            <span style={{
                color: getDayColor(Biometricname.WEIGHT, PercentageTypes.twoDay),
              }}>
                {" "}
              2D
            </span >
            <span style={{
                color: getDayColor(Biometricname.WEIGHT, PercentageTypes.fiveDay),
              }}>
                {" "}
              5D
            </span>
            <span style={{
                color: getDayColor(Biometricname.WEIGHT, PercentageTypes.fourteenDay),
              }}>
                {" "}
              14D
            </span>{" "}
            <span style={{
                color: getDayColor(Biometricname.WEIGHT, PercentageTypes.thirtyDay),
              }}>
                {" "}
              30D
            </span> {" "}
            <span style={{
                color: getAdherenceCompliance(Biometricname.WEIGHT, PercentageTypes.adherence),
              }}>
              A % {" "}
            </span>        
            <span style={{
                color: getAdherenceCompliance(Biometricname.WEIGHT, PercentageTypes.compliance),
              }}>
              C %
            </span>
          </div>
        </Col>
        <Col
          md={4}
          lg={3}
          xl={3}
          className="readingStatus"
          onClick={patientReports}
        ><CustomTooltip title="Pulse Ox" color="#FFFFFF" content="show" placement="top">
          <div className="dot" style={{background: getIconColor(Biometricname.PULSE)}}>
            <img src={spo2} style={{ left: "5px" }} />
          </div></CustomTooltip>
          <div className="daysLabel">
          <span style={{
                color: getDayColor(Biometricname.PULSE, PercentageTypes.singleDay),
              }}>
                {" "}
              ID
            </span> 
            <span style={{
                color: getDayColor(Biometricname.PULSE, PercentageTypes.twoDay),
              }}>
                {" "}
              2D
            </span >
            <span style={{
                color: getDayColor(Biometricname.PULSE, PercentageTypes.fiveDay),
              }}>
                {" "}
              5D
            </span>
            <span style={{
                color: getDayColor(Biometricname.PULSE, PercentageTypes.fourteenDay),
              }}>
                {" "}
              14D
            </span>{" "}
            <span style={{
                color: getDayColor(Biometricname.PULSE, PercentageTypes.thirtyDay),
              }}>
                {" "}
              30D
            </span> {" "}
            <span style={{
                color: getAdherenceCompliance(Biometricname.PULSE, PercentageTypes.adherence),
              }}>
              A % {" "}
            </span>        
            <span style={{
                color: getAdherenceCompliance(Biometricname.PULSE, PercentageTypes.compliance),
              }}>
              C %
            </span>
          </div>
        </Col>
        <Col
          md={4}
          lg={3}
          xl={3}
          className="readingStatus"
          onClick={patientReports}
        ><CustomTooltip title="Temperature"color="#FFFFFF" content="show" placement="top">
          <div className="dot" style={{background: getIconColor(Biometricname.TEMPRATURE)}}>
            <img src={tempratureIcon} />
          </div></CustomTooltip>
          <div className="daysLabel">
          <span style={{
                color: getDayColor(Biometricname.TEMPRATURE, PercentageTypes.singleDay),
              }}>
                {" "}
              ID
            </span> 
            <span style={{
                color: getDayColor(Biometricname.TEMPRATURE, PercentageTypes.twoDay),
              }}>
                {" "}
              2D
            </span >
            <span style={{
                color: getDayColor(Biometricname.TEMPRATURE, PercentageTypes.fiveDay),
              }}>
                {" "}
              5D
            </span>
            <span style={{
                color: getDayColor(Biometricname.TEMPRATURE, PercentageTypes.fourteenDay),
              }}>
                {" "}
              14D
            </span>{" "}
            <span style={{
                color: getDayColor(Biometricname.TEMPRATURE, PercentageTypes.thirtyDay),
              }}>
                {" "}
              30D
            </span> {" "}
            <span style={{
                color: getAdherenceCompliance(Biometricname.TEMPRATURE, PercentageTypes.adherence),
              }}>
              A % {" "}
            </span>        
            <span style={{
                color: getAdherenceCompliance(Biometricname.TEMPRATURE, PercentageTypes.compliance),
              }}>
              C %
            </span>
          </div>
        </Col>
        <Col
          md={4}
          lg={3}
          xl={3}
          className="readingStatus"
          onClick={patientReports}
        ><CustomTooltip title="Spirometry" color="#FFFFFF" content="show" placement="top">
          <div className="dot" style={{background: getIconColor(Biometricname.SPIRO)}}>
            <img src={Spirometer} />
          </div></CustomTooltip>
          <div className="daysLabel">
          <span style={{
                color: getDayColor(Biometricname.SPIRO, PercentageTypes.singleDay),
              }}>
                {" "}
              ID
            </span> 
            <span style={{
                color: getDayColor(Biometricname.SPIRO, PercentageTypes.twoDay),
              }}>
                {" "}
              2D
            </span >
            <span style={{
                color: getDayColor(Biometricname.SPIRO, PercentageTypes.fiveDay),
              }}>
                {" "}
              5D
            </span>
            <span style={{
                color: getDayColor(Biometricname.SPIRO, PercentageTypes.fourteenDay),
              }}>
                {" "}
              14D
            </span>{" "}
            <span style={{
                color: getDayColor(Biometricname.SPIRO, PercentageTypes.thirtyDay),
              }}>
                {" "}
              30D
            </span> {" "}
            <span style={{
                color: getAdherenceCompliance(Biometricname.SPIRO, PercentageTypes.adherence),
              }}>
              A % {" "}
            </span>        
            <span style={{
                color: getAdherenceCompliance(Biometricname.SPIRO, PercentageTypes.compliance),
              }}>
              C %
            </span>
          </div>
        </Col>
      </Row>
      <PatientReviewModal
      patient={el}
      isPatientReviewModalVisible={isPatientReviewModalVisible}
      cancelCallback={cancelPatientReviewModal}
      />
    </Card>
  );
};
export default PatientRowCard;
