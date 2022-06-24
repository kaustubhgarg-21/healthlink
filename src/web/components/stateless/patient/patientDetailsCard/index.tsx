import { Card, Col, Radio, Row, Checkbox, Divider } from "antd";
import moment from "moment";
import React from "react";
import { concatNames } from "../../../../../utility/appUtil";
import { contactNoFormat, getFullName } from "../../../../../utility/utils";
import { mail, mobileIcon, phoneIcon } from "../../../../images";
import Patient from "../../../../models/patient/patient";
import ProfileIcon from "../../common/profileThumbnail";
import "./patientDetailsCard.less";

interface PatientCardProps {
  patient: Patient;
}
const PatientDetailsCard = (props: PatientCardProps) => {
  const { patient } = props;

  return (
    <Card className="ProPatientDetails">
      <Row>
        <Col md={6} lg={4} xl={4} xxl={4}>
          <div className="patientsprofile">
            <ProfileIcon size="40" src={patient?.imageUrl} name={concatNames(patient?.firstName, patient?.lastName, patient?.middleName)}/>
          </div>
        </Col>
        <Col  md={18} lg={7} xl={7}>
          <div>
            <h2 className="patientName">
              {getFullName(
                patient?.title,
                patient?.firstName,
                patient?.middleName,
                patient?.lastName
              )}
            </h2>
            <div className="patientDtl">
              <b>DOB &nbsp;   &nbsp; :</b>
               {moment(patient?.dob).format("DD MMM YYYY")} ({patient?.age} Yrs)
            </div>
            <div className="patientDtl">
              <b>P-MRN &nbsp;:</b>
              {patient?.mrn}
            </div>
            <div className="patientDtl hmrnPatientDetails" style={{textTransform: 'uppercase'}}>
              <b>H-MRN &nbsp;:</b>
              {patient?.id}
            </div>
            <div className="f-12 btnRadio">
              <p className="ptntGender"><b>Gender</b></p>
              <Radio.Group value={patient?.gender}>
                <Radio value="male" disabled >Male</Radio>
                <Radio value="female" disabled>Female</Radio>
                <Radio value="non-binary" disabled>Non Binary</Radio>
                <Radio value="other" disabled>Other</Radio>
              </Radio.Group>
            </div>
            <div>
              <p className="ptntGender"><b>Preferred Communication Method</b></p>
              <Checkbox.Group
                value={
                  patient?.preferredCommumnication?.split(",")
                }
                className="chckPtnt"
              >
                <Checkbox value="SMS" className="sms" disabled>
                  SMS
                </Checkbox>
                <Checkbox value="Email" className="emailCheck" disabled>
                  Email
                </Checkbox>
              </Checkbox.Group>
            </div>
          </div>
        </Col>
        <Col className="dividerCol" md={0} lg={1} xl={3}>                            
                            <Divider className="divider" type="vertical" style={{height:'28vh'}}/>
                            </Col>
                            <Col md={6} xl={0} lg={0}></Col>
        <Col md={18} lg={10} xl={10}>
          <div style={{marginTop:"30px"}}>
            <b>CONTACT DETAILS</b>            
            <div className="ptntGender">
              <b>Address :</b>{patient?.address1} {patient?.address2},{" "}
              {patient?.city}, {patient?.state},{patient?.country} {patient?.zipCode}
            </div>
            <div className="ptntContanctInfo">
              {patient?.contactNumber?<div className="contactPtntDetail">
              <img src={phoneIcon} className="phoneNumber" /> 
              {contactNoFormat(patient?.contactNumber)}
              </div> : null}
              <div><img className={patient?.contactNumber ?"phoneNumber" : "mobileCLass2"} src={mobileIcon} />
              &nbsp;{contactNoFormat(patient?.mobileNumber)}</div>
            </div>
            {patient?.email ? 
            <div className="ptntContanctInfo">
              <img className="emailIcon" src={mail} />
              {patient?.email}
            </div>: null}
            <div className="ptntRole"> 
            <div className="patientDtl">
              <b>Role &nbsp; &nbsp; :</b>Patient
            </div>
            <div className="statusDtl">
              <b>Status :</b>
               <span style={{textTransform:'capitalize'}}>{patient?.status}</span>
            </div>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
export default PatientDetailsCard;
