import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import "./orgDashboard.less";
import { Months } from "../../../../constants/enums";
import PatientGrowth from "./organizationGraphs/patientGrowthGraph";
import { CompWrapper } from "../../common/contentWrapper";
import PatientReviewGraphs from "../providerDashboard/patientReviewGraph";
import DailyLoginGraph from "./organizationGraphs/dailyLoginGraph";
import BiometricDataGraphs from "../providerDashboard/biometricDataGraph";

const OrgDashboard = (props: any) => {
  const { biometricData, patientReview, dailyLoginrate, patientGrowth } = props;
  const [biometricGraphData, setBiometricData] = useState([]);
  const [patientGraphData, setPatientData] = useState([]);
  const [loginGraphData, setLoginData] = useState([]);
  const [patientGrowthData, setPatientGrowthData] = useState([]);
  const [legendShift, setLegendShift] = useState(25)
  const [showBiometricLabel, setShowBiometricLabel] = useState(false)
  const [showPatientLabel, setShowPatientLabel] = useState(false)
  const [showGrowthLabel, setShowGrowthLabel] = useState(false)
  const [showLoginLabel, setShowLoginLabel] = useState(false)
  const [legendShiftDaily,setLegendShiftDaily]=useState(66)
  const [legendShiftGrowth,setLegendShiftGrowth]=useState(56)
  const [legendShiftBiometric,setLegendShiftBiometric]=useState(28)


  useEffect(()=>{
    console.log("resize window")
    if(window.innerWidth>= 1920){
      setLegendShift(35)
      setLegendShiftDaily(77)
      setLegendShiftGrowth(68)
      setLegendShiftBiometric(38)
    }else if(window.innerWidth>1600 && window.innerWidth<1920 ){
      setLegendShift(20)
      setLegendShiftDaily(70)
      setLegendShiftGrowth(60)
      setLegendShiftBiometric(20)
    }
    
    else if(window.innerWidth<1600 && window.innerWidth>1440 ){
      setLegendShift(25)
      setLegendShiftBiometric(28)
      setLegendShiftDaily(64)
      setLegendShiftGrowth(55)
    }
    else if(window.innerWidth<1440 && window.innerWidth>1200 ){
      setLegendShift(25)
      setLegendShiftBiometric(28)
      setLegendShiftDaily(65)
      setLegendShiftGrowth(45)
    }
    else if(window.innerWidth<1340 && window.innerWidth>1200 ){
      setLegendShift(2)
      setLegendShiftBiometric(2)
      setLegendShiftDaily(65)
      setLegendShiftGrowth(45)
    }else if(window.innerWidth<1200 && window.innerWidth>998 ){
      setLegendShift(6)
      setLegendShiftBiometric(2)
      setLegendShiftDaily(64)
      setLegendShiftGrowth(48)
    }
    else if(window.innerWidth<998){
      setLegendShift(15)
      setLegendShiftBiometric(20)
      setLegendShiftDaily(70)
      setLegendShiftGrowth(57)
    }
  },[window.innerWidth])

  window.onresize = ()=>{
    if(window.innerWidth>= 1920){
      setLegendShift(30)
      setLegendShiftDaily(77)
      setLegendShiftGrowth(68)
      setLegendShiftBiometric(38)
    }else if(window.innerWidth>1600 && window.innerWidth<1920 ){
      setLegendShift(20)
      setLegendShiftDaily(70)
      setLegendShiftGrowth(60)
      setLegendShiftBiometric(20)
    }else if(window.innerWidth<1600 && window.innerWidth>1440 ){
      setLegendShift(25)
      setLegendShiftBiometric(28)
      setLegendShiftDaily(64)
      setLegendShiftGrowth(55)
    }else if(window.innerWidth<1440 && window.innerWidth>1200 ){
      setLegendShift(25)
      setLegendShiftBiometric(28)
      setLegendShiftDaily(65)
      setLegendShiftGrowth(45)
    }else if(window.innerWidth<1200 && window.innerWidth>998 ){
      setLegendShift(6)
      setLegendShiftBiometric(2)
      setLegendShiftDaily(66)
      setLegendShiftGrowth(48)
    }else if(window.innerWidth<998){
      setLegendShift(10)
      setLegendShiftBiometric(20)
      setLegendShiftDaily(70)
      setLegendShiftGrowth(57)
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
  useEffect(() => {
    let x: any = [];
    if (dailyLoginrate?.length) {
      dailyLoginrate?.map((element: any) => {
        const exist: any = x.findIndex(
          (el: any) => el.year === Months[element?.month - 1]
        );
        if (exist >= 0) {
          const key: string = element?.rolename;
          const updatedEl: any = { ...x[exist] };
          updatedEl[key] = element?.loginRate;
         
          x.splice(exist, 1, updatedEl);
        } else {
          const obj: any = {};
          const key: string = element?.rolename;
          obj[key] = element?.loginRate;
          obj["year"] = getMonthByNumber(element?.month - 1);
          x.push(obj);
        }
      });
      setShowLoginLabel(false)
    } else {
      x = getDummyData();
      setShowLoginLabel(true)
    }
    //   setGraphData(formatted)
    setLoginData(x);
    let y: any = [];
    if (patientGrowth?.length) {
      patientGrowth?.map((element: any) => {
        console.log(element,155)
        const exist: any = y.findIndex(
          (el: any) => el.year === Months[element?.month - 1]
        );
        console.log(exist,159)
        console.log(Months[element?.month - 1],160)
        console.log()
        if (exist >= 0) {
          const key: string = element?.roleName;
          const updatedEl: any = { ...y[exist] };
          updatedEl[key] = element?.totalCount;
          y.splice(exist, 1, updatedEl);
        } else {
          const obj: any = {};
          const key: string = element?.roleName;
          obj[key] = element?.totalCount;
          obj["year"] = getMonthByNumber(element?.month - 1);
          y.push(obj);
        }
      });
      setShowGrowthLabel(false)
    } else {
      y = getDummyData();
      setShowGrowthLabel(true)
    }
    setPatientGrowthData(y);
  }, [dailyLoginrate, patientGrowth]);

  const getMonthByNumber = (number: any) => {
    return Months[number];
  };
  return (
    <>
      <CompWrapper observeOn="innerHeader">
        <Row gutter={[10, 10]} className="graphCardContainer">
          <Col md={24} lg={12} xl={12}>
            <Card className="graphCard">
              <Row align="middle">
                <Col md={5} lg={24} xl={5} xxl={5}>
                  <p className="orgDailyRoutine">Daily Login Rate</p>
                </Col>
                <Col
                  md={19} lg={24} xl={19} xxl={19}
                  id="adherenceLegendDiv"
                  style={{ width: "100%", height: "20px" }}
                ></Col>
              </Row>
              <DailyLoginGraph chartData={loginGraphData}  legendShiftDaily={legendShiftDaily} showLabel={showLoginLabel}/>
            </Card>
          </Col>
          <Col md={24} lg={12} xl={12}>
            <Card className="graphCard">
              <Row align="middle">
                <Col md={5} lg={24} xl={5} xxl={5}>
                  <p className="orgDailyRoutine">Patient Growth</p>
                </Col>
                <Col
                  md={19} lg={24} xl={19} xxl={19}
                  id="adherenceLegendDivPatient"
                  style={{ width: "100%", height: "20px" }}
                ></Col>
              </Row>

              <PatientGrowth chartData={patientGrowthData}  legendShiftGrowth={legendShiftGrowth} showLabel={showGrowthLabel}/>
            </Card>
          </Col>
          <Col md={24} lg={12} xl={12}>
            <Card className="graphCard">
              <Row align="middle">
                <Col md={4} lg={24} xl={24} xxl={4}>
                  <p className="providerDailyRoutine">Biometric Data</p>
                </Col>
                <Col
                  md={20} lg={24} xl={24} xxl={20}
                  id="adherenceLegendDivBiometric"
                  style={{ width: "100%", height: "20px" }}
                ></Col>
              </Row>

              <BiometricDataGraphs chartData={biometricGraphData} legendShiftBiometric={legendShiftBiometric} showLabel={showBiometricLabel}/>
            </Card>
          </Col>
          <Col md={24} lg={12} xl={12}>
            <Card className="graphCard">
              <Row align="middle">
              <Col md={4} lg={24} xl={24} xxl={4}>
                  <p className="providerDailyRoutine">Patient Review</p>
                </Col>
                <Col
                    md={20} lg={24} xl={24} xxl={20}
                  id="adherenceLegendDivPatientReview"
                  style={{ width: "100%", height: "20px" }}
                ></Col>
              </Row>
              <PatientReviewGraphs chartData={patientGraphData} legendShift={legendShift} showLabel={showPatientLabel}/>{" "}
            </Card>
          </Col>
        </Row>
      </CompWrapper>
    </>
  );
};
export default OrgDashboard;
