import { Card, Col, Row, Empty } from "antd";
import React, { useEffect, useState } from "react";
import "./providerDashboard.less";
import { CompWrapper } from "../../common/contentWrapper";
import BiometricDataGraphs from "./biometricDataGraph";
import PatientReviewGraphs from "./patientReviewGraph";
import { CommonIcons, Months } from "../../../../constants/enums";

const ProviderDashboard = (props: any) => {
  const { biometricData, patientReview, providerReport } = props;
  const [biometricGraphData, setBiometricData] = useState([]);
  const [patientGraphData, setPatientData] = useState([]);
  const [showBiometricLabel, setShowBiometricLabel] = useState(false)
  const [showPatientLabel, setShowPatientLabel] = useState(false)
  const [legendShift, setLegendShift] = useState(42)
 const [legendShiftBiometric, setlegendShiftBiometric] = useState(45)
  useEffect(()=>{
    if(window.innerWidth>= 1920){
      setLegendShift(42)
      setlegendShiftBiometric(45)
    }else if(window.innerWidth>1600 && window.innerWidth<1920 ){
      setLegendShift(30)
      setlegendShiftBiometric(35)

    }else if(window.innerWidth<1600 && window.innerWidth>1500 ){
      setLegendShift(25)
      setlegendShiftBiometric(30)
    }
    else if(window.innerWidth<1500 && window.innerWidth>1440 ){
      setLegendShift(20)
      setlegendShiftBiometric(25)
    }
    else if(window.innerWidth<1440 && window.innerWidth>1300 ){
      setLegendShift(18)
      setlegendShiftBiometric(22)
    }
    else if(window.innerWidth<1300 && window.innerWidth>1200 ){
      setLegendShift(10)
      setlegendShiftBiometric(15)
    }
    else if(window.innerWidth<1200 && window.innerWidth>998 ){
      setLegendShift(10)
      setlegendShiftBiometric(15)
    }
    else if(window.innerWidth<998){
      setLegendShift(20)
      setlegendShiftBiometric(25)
    }  
  },[window.innerWidth])
  window.onresize = ()=>{
    if(window.innerWidth>= 1920){
      setLegendShift(42)
      setlegendShiftBiometric(45)
    }
    else if(window.innerWidth>1600 && window.innerWidth<1920 ){
      setLegendShift(30)
      setlegendShiftBiometric(35)
    }
    else if(window.innerWidth<1600 && window.innerWidth>1500 ){
      setLegendShift(25)
      setlegendShiftBiometric(30)
    }
    else if(window.innerWidth<1500 && window.innerWidth>1440 ){
      setLegendShift(20)
      setlegendShiftBiometric(25)
    }
    else if(window.innerWidth<1440 && window.innerWidth>1300 ){
      setLegendShift(18)
      setlegendShiftBiometric(22)
    }
    else if(window.innerWidth<1300 && window.innerWidth>1200 ){
      setLegendShift(10)
      setlegendShiftBiometric(15)
    }
    else if(window.innerWidth<1200 && window.innerWidth>998 ){
      setLegendShift(10)
      setlegendShiftBiometric(15)
    }
    else if(window.innerWidth<998){
      setLegendShift(20)
      setlegendShiftBiometric(25)
    }
  }
  const getDummyData = () => {
    var dum: any = [];
    for (var i = 0; i < 6; i++) {
      dum.push({
        ["year"]: getMonthByNumber(i),
      });
    }
    return dum;
  };
  useEffect(() => {
    var x : any= []
    if(biometricData?.length){
     x  =   biometricData?.map((data: any) => {
          return { ...data, year: getMonthByNumber(data?.month - 1) };
        })
        setShowBiometricLabel(false)
    }else{
      x= getDummyData();
      setShowBiometricLabel(true)
    }
    setBiometricData(x);
    var y:any =[]
     if(patientReview?.length){
      y =  patientReview?.map((data: any) => {
          return { ...data, year: getMonthByNumber(data?.month - 1) };
        })
        setShowPatientLabel(false)
       }else{
       y = getDummyData();
       setShowPatientLabel(true)
       } 
    setPatientData(y);
  }, [biometricData, patientReview]);

  const getMonthByNumber = (number: any) => {
    return Months[number];
  };
  return (
    <>
      <CompWrapper observeOn="innerHeader">
        <Row gutter={[18, 10]} className="graphCardContainer providerDashBoard">
          <Col span={6}>
            <Card className="graphCard providerGraphCard">
              <Row>
                <Col span={20}>
                  <p className="proDashText">{providerReport?.patientCount}</p>
                </Col>
                <Col span={4}>
                  <span className="material-icons-outlined grpIcon">
                    {CommonIcons.group}
                  </span>
                </Col>
                <p className="totalPatientTxt">Total Patients</p>
              </Row>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="graphCard providerGraphCard">
              <Row>
                <Col span={20}>
                  <p className="proDashText">{providerReport?.pcpCount}</p>
                </Col>
                <Col span={4}>
                  <span className="material-icons-outlined grpIcon">
                    {CommonIcons.group}
                  </span>
                </Col>
                <p className="totalPatientTxt">Primary Patients</p>
              </Row>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="graphCard providerGraphCard">
              <Row>
                <Col span={20}>
                  <p className="proDashText">{providerReport?.YTDCount}</p>
                </Col>
                <Col span={4}>
                  <span className="material-icons-outlined grpIcon">
                    {CommonIcons.schedule}
                  </span>
                </Col>
                <p className="totalPatientTxt">YTD Time Recorded (mins)</p>
              </Row>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="graphCard providerGraphCard">
              <Row>
                <Col span={20}>
                  <p className="proDashText">{providerReport?.MTDCount}</p>
                </Col>
                <Col span={4}>
                  <span className="material-icons-outlined grpIcon">
                    {CommonIcons.schedule}
                  </span>
                </Col>
                <p className="totalPatientTxt">MTD Time Recorded (mins)</p>
              </Row>
            </Card>
          </Col>
          <Col md={24} lg={12} xl={12}>
            <Card className="graphCard ">
              <Row align="middle">
                <Col md={4} lg = {12} xl={4}xxl={4}>
                  <p className="providerDailyRoutine">Biometric Data</p>
                </Col>
                <Col
                 md={20} lg = {24} xl={20} xxl={20}
                  id="adherenceLegendDivBiometric"
                  className="dashboardLegends"
                  style={{ width: "100%", height: "20px" }}
                ></Col>
              </Row>
              <BiometricDataGraphs chartData={biometricGraphData} legendShiftBiometric={legendShiftBiometric} showLabel={showBiometricLabel}/>
            </Card>
          </Col>
          <Col md={24} lg={12} xl={12}>
            <Card className="graphCard">
              <Row align="middle">
              <Col md={4} lg = {12} xl={4}xxl={4}>
                  <p className="providerDailyRoutine">Patient Review</p>
                </Col>
                <Col
                 md={20} lg = {24} xl={20}xxl={20}
                  id="adherenceLegendDivPatientReview"
                  className="dashboardLegends"
                  style={{ width: "100%", height: "20px" }}
                ></Col>   
              <Col span={1}></Col>
              </Row>{" "}
              <PatientReviewGraphs chartData={patientGraphData} legendShift={legendShift} showLabel={showPatientLabel}/>
            </Card>
          </Col>
        </Row>
      </CompWrapper>
    </>
  );
};
export default ProviderDashboard;