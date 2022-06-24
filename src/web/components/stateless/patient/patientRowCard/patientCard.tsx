import { Card, Col, Dropdown, Menu, Row } from "antd";
import ProfileIcon from "../../common/profileThumbnail";
import "./patientCard.less";

import { bpIcon, downIcon, elipse, noteBookIcon, oximeterIcon, spirometerIcon, sugarIcon, thermoIcon, weightIcon } from "../../../../images";

const PatientCard = (props: any) => {
  const menu = (
    <Menu className="actionMenu">
      <Menu.Item key="0">
        <a href="#">Deactivate</a>
      </Menu.Item>
      <Menu.Item key="1">Delete</Menu.Item>
    </Menu>
  );
  const menuList = (
    <Menu className="actionMenu">
    <Menu.Item key="0">
      <a href="#">Contact information</a>
    </Menu.Item>
    <Menu.Item key="1" >
      Shedule
    </Menu.Item>
    <Menu.Item key="1" >
      threshold
    </Menu.Item>
    <Menu.Item key="1" >
      reports
    </Menu.Item>
  </Menu>
  )
  return (
    <div>
      <Card className="patientCardMatrix">
        <Row justify="end" className="orgRow1">
          <Col >
            <div className="orgDropDown">
              <Dropdown overlay={menu} trigger={["click"]} overlayClassName="actionMenu" getPopupContainer={(trigger:any)=>trigger.parentNode}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                ><img src={elipse} />
                </a>
              </Dropdown>
            </div>
          </Col>
        </Row>
        <Row className="orgRow2">
          <Col span={5}>
            <div className="orgIconSlicing">
              <ProfileIcon name={props.el.name} size="45" />
            </div>
          </Col>
          <Col span={15}>
            <div className="patientNameSlicing f-16">{props.el.firstName}</div>
            <div className="patientStateSlicing f-12">
              DOB:<span className="patientsNameCard f-12">{props.el.dob}</span>
            </div>
            <div className="patientStateSlicing f-12">
              MRN: <span className="patientsNameCard f-12">{props.el.mrn} </span>
            </div>
            <div className="patientStateSlicing f-12">
              Payor:<span className="patientsNameCard f-12">{props.el.payor}</span>
            </div>
          </Col>
          <Col span={4}>
            <div className="patientStatusSlicing">
              
                   <Dropdown overlayClassName="actionMenu" overlay={menuList} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
              <button className="noteBookBtn"><img src={noteBookIcon} className="noteBookIcon" />
              <img src={downIcon} className="downIcon" /></button>
              </a>
              </Dropdown>
            </div>
          </Col>
        </Row>
        <Row className="patientRowCardContainer">
          <Col span={4} className="patientRowCard">
            <div className={props.el.critical == null? "dot" : props.el.critical == true ? "greenClr" : "crtClr" }>
              <img
                src={bpIcon}
                style={{ position: "relative", top: "8px", left: "2px" }}
              />
            </div>
          </Col>
          <Col span={4} className="patientRowCard">
            <div className={props.el.critical == null? "dot" : props.el.critical == true ? "greenClr" : "crtClr" }>
              <img
                src={sugarIcon}
                style={{ position: "relative", top: "8px", left: "2px" }}
              />
            </div>
          </Col>
          <Col span={4} className="patientRowCard">
            <div className={props.el.critical == null? "dot" : props.el.critical == true ? "greenClr" : "crtClr" }>
              <img
                src={weightIcon}
                style={{ position: "relative", top: "8px", left: "2px" }}
              />
            </div>
          </Col>
          <Col span={4} className="patientRowCard">
            <div className={props.el.critical == null? "dot" : props.el.critical == true ? "greenClr" : "crtClr" }>
              <img
                src={oximeterIcon}
                style={{ position: "relative", top: "8px", left: "2px" }}
              />
            </div>
          </Col>
          <Col span={4} className="patientRowCard">
            <div className={props.el.critical == null? "dot" : props.el.critical == true ? "greenClr" : "crtClr" }>
              <img
                src={thermoIcon}
                style={{ position: "relative", top: "8px", left: "2px" }}
              />
            </div>
          </Col>
          <Col span={4} className="patientRowCard">
            <div className={props.el.critical == null? "dot" : props.el.critical == true ? "greenClr" : "crtClr" }>
              <img
                src={spirometerIcon}
                style={{ position: "relative", top: "8px", left: "2px" }}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default PatientCard;
