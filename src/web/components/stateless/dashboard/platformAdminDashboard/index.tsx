import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { CompWrapper } from "../../common/contentWrapper";
import PatientReviewGraphs from "../providerDashboard/patientReviewGraph";
import OrgGrowthGraphs from "./platformGraphs/orgGrowthGraphs";
import "./platformAdminDashboard.less";
import { Months } from "../../../../constants/enums";
import DailyLoginGraph from "../orgDashboard/organizationGraphs/dailyLoginGraph";
import PatientGrowth from "../orgDashboard/organizationGraphs/patientGrowthGraph";
import BiometricDataGraphs from "../providerDashboard/biometricDataGraph";
const PlatformAdminDashboard = (props: any) => {
  const {
    biometricData,
    patientReview,
    dailyLoginrate,
    patientGrowth,
    orgGrowth,
  } = props;
  const [biometricGraphData, setBiometricData] = useState([]);
  const [patientGraphData, setPatientData] = useState([]);
  const [loginGraphData, setLoginData] = useState([]);
  const [patientGrowthData, setPatientGrowthData] = useState([]);
  const [orgGrowthData, setOrgGrowthData] = useState([]);
  const [legendShift, setLegendShift] = useState(40)
  const [legendShiftDaily,setLegendShiftDaily]=useState(40)
  const [legendShiftBiometric,setLegendShiftBiometric]=useState(28)
  const [legendShiftGrowth,setLegendShiftGrowth]=useState(45)
  const [legendShiftOrgGrowth,setlegendShiftOrgGrowth]=useState(30)
  useEffect(()=>{
    if(window.innerWidth>= 1920){
      setLegendShift(35)   
      setLegendShiftBiometric(38)
      setLegendShiftDaily(40)
      setLegendShiftGrowth(45)
      setlegendShiftOrgGrowth(30)
    }else if(window.innerWidth>1600 && window.innerWidth<1920 ){
      setLegendShift(20)
      setLegendShiftBiometric(20)
      setLegendShiftDaily(40)
      setLegendShiftGrowth(35)
      setlegendShiftOrgGrowth(32)
    }    
    else if(window.innerWidth<1600 && window.innerWidth>1500 ){
      setLegendShift(20)
      setLegendShiftBiometric(23)
      setLegendShiftDaily(40)
      setLegendShiftGrowth(25)
      setlegendShiftOrgGrowth(19)
    }
    else if(window.innerWidth<1500 && window.innerWidth>1440 ){
      setLegendShift(20)
      setLegendShiftBiometric(20)
      setLegendShiftDaily(45)
      setLegendShiftGrowth(35)
      setlegendShiftOrgGrowth(35)
    }else if(window.innerWidth<1440 && window.innerWidth>1350 ){
      setLegendShift(10)
      setLegendShiftBiometric(15)
      setLegendShiftDaily(30)
      setLegendShiftGrowth(10)
      setlegendShiftOrgGrowth(5)
    }
    else if(window.innerWidth<1350 && window.innerWidth>1300 ){
      setLegendShift(10)
      setLegendShiftBiometric(15)
      setLegendShiftDaily(30)
      setLegendShiftGrowth(1)
      setlegendShiftOrgGrowth(0)
    }
    else if(window.innerWidth<1300 && window.innerWidth>1200 ){
      setLegendShift(4)
      setLegendShiftBiometric(5)
      setLegendShiftDaily(20)
      setLegendShiftGrowth(5)
      setlegendShiftOrgGrowth(1)
    }else if(window.innerWidth<1200 && window.innerWidth>1024 ){
      setLegendShift(15)
      setLegendShiftBiometric(15)
      setLegendShiftDaily(10)
     setLegendShiftGrowth(10)
     setlegendShiftOrgGrowth(10)
    }
    else if(window.innerWidth<1024 && window.innerWidth>998 ){
      setLegendShift(10)
      setLegendShiftBiometric(10)
      setLegendShiftDaily(10)
     setLegendShiftGrowth(10)
     setlegendShiftOrgGrowth(10)
    }
    else if(window.innerWidth<998){
      setLegendShift(20)
      setLegendShiftBiometric(25)
      setLegendShiftDaily(70)
      setLegendShiftGrowth(57)
      setlegendShiftOrgGrowth(50)
    }
  },[window.innerWidth])
  window.onresize = ()=>{
    if(window.innerWidth>= 1920){
      setLegendShift(35)   
      setLegendShiftBiometric(38)
      setLegendShiftDaily(40)
      setLegendShiftGrowth(45)
      setlegendShiftOrgGrowth(30)
    }else if(window.innerWidth>1600 && window.innerWidth<1920 ){
      setLegendShift(20)
      setLegendShiftBiometric(20)
      setLegendShiftDaily(40)
      setLegendShiftGrowth(35)
      setlegendShiftOrgGrowth(32)
    }    
    else if(window.innerWidth<1600 && window.innerWidth>1500 ){
      setLegendShift(20)
      setLegendShiftBiometric(38)
      setLegendShiftDaily(40)
      setLegendShiftGrowth(35)
      setlegendShiftOrgGrowth(28)
    }
    else if(window.innerWidth<1500 && window.innerWidth>1440 ){
      setLegendShift(20)
      setLegendShiftBiometric(20)
      setLegendShiftDaily(45)
      setLegendShiftGrowth(35)
      setlegendShiftOrgGrowth(35)
    }
    else if(window.innerWidth<1440 && window.innerWidth>1300 ){
      setLegendShift(20)
      setLegendShiftBiometric(20)
      setLegendShiftDaily(30)
      setLegendShiftGrowth(30)
      setlegendShiftOrgGrowth(25)
    }
    else if(window.innerWidth<1300 && window.innerWidth>1200 ){
      setLegendShift(10)
      setLegendShiftBiometric(10)
      setLegendShiftDaily(20)
      setLegendShiftGrowth(20)
      setlegendShiftOrgGrowth(20)
    }else if(window.innerWidth<1200 && window.innerWidth>1024 ){
      setLegendShift(15)
      setLegendShiftBiometric(15)
      setLegendShiftDaily(10)
     setLegendShiftGrowth(10)
     setlegendShiftOrgGrowth(10)
    }
    else if(window.innerWidth<1024 && window.innerWidth>998 ){
      setLegendShift(10)
      setLegendShiftBiometric(10)
      setLegendShiftDaily(10)
     setLegendShiftGrowth(10)
     setlegendShiftOrgGrowth(10)
    }
    else if(window.innerWidth<998){
      setLegendShift(28)
      setLegendShiftBiometric(30)
      setLegendShiftDaily(70)
      setLegendShiftGrowth(57)
      setlegendShiftOrgGrowth(57)
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
    var x = biometricData?.length
      ? biometricData?.map((data: any) => {
          return { ...data, year: getMonthByNumber(data?.month - 1) };
        })
      : getDummyData();
    setBiometricData(x);
    var y = patientReview?.length
      ? patientReview?.map((data: any) => {
          return { ...data, year: getMonthByNumber(data?.month - 1) };
        })
      : getDummyData();
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
    } else {
      x = getDummyData();
    }
    setLoginData(x);
    let y: any = [];
    if (patientGrowth?.length) {
      patientGrowth?.map((element: any) => {
        const exist: any = y.findIndex(
          (el: any) => el.year === Months[element?.month - 1]
        );
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
    } else {
      y = getDummyData();
    }
    setPatientGrowthData(y);
    let z: any = [];
    if (orgGrowth?.length) {
      orgGrowth?.map((element: any) => {
        const exist: any = z.findIndex(
          (el: any) => el.year === Months[element?.month - 1]
        );
        if (exist >= 0) {
          const key: string = element?.name;
          const updatedEl: any = { ...z[exist] };
          updatedEl[key] = element?.totalCount;
          z.splice(exist, 1, updatedEl);
        } else {
          const obj: any = {};
          const key: string = element?.name;
          obj[key] = element?.totalCount;
          obj["year"] = getMonthByNumber(element?.month - 1);
          z.push(obj);
        }
      });
    } else {
      z = getDummyData();
    }
    setOrgGrowthData(z);
  }, [dailyLoginrate, patientGrowth, orgGrowth]);
  const getMonthByNumber = (number: any) => {
    return Months[number];
  };
  return (
    <>
      <CompWrapper observeOn="innerHeader">
        <Row gutter={[10, 10]} className="graphCardContainer">
          <Col md={24} lg={8} xl={8} xxl={8}>
            <Card className="graphCard">
              <Row align="middle">
              <Col md={5} lg={24} xl={6} xxl={5}>
                  <p className="orgDailyRoutine">Org Growth</p>
                </Col>
                <Col
                   md={19} lg={24} xl={18} xxl={19}
                  id="adherenceLegendDivOrgGrowth"
                  style={{ width: "100%", height: "20px" }}
                ></Col>
              </Row>
              <OrgGrowthGraphs chartData={orgGrowthData}  legendShift={legendShiftOrgGrowth}/>
            </Card>
          </Col>
          <Col md={24} lg={8} xl={8} xxl={8}>
            <Card className="graphCard">
              <Row align="middle">
              <Col md={5} lg={24} xl={7} xxl={5}>
                  <p className="orgDailyRoutine">Patient Growth</p>
                </Col>
                <Col  
                 md={19} lg={24} xl={17} xxl={19}
                  id="adherenceLegendDivPatient"
                  style={{ width: "100%", height: "20px" }}
                ></Col>
              </Row>
              <PatientGrowth chartData={patientGrowthData}  legendShiftGrowth={legendShiftGrowth} />
            </Card>
          </Col>
          <Col md={24} lg={8} xl={8} xxl={8}>
            <Card className="graphCard">
              <Row align="middle">
              <Col md={6} lg={24} xl={8} xxl={6}>
                  <p className="orgDailyRoutine">Daily Login Rate</p>
                </Col>
                <Col
                   md={18} lg={24} xl={16} xxl={18}
                  id="adherenceLegendDiv"
                  style={{ width: "100%", height: "20px" }}
                ></Col>
              </Row>
              <DailyLoginGraph chartData={loginGraphData}   legendShiftDaily={legendShiftDaily}  />
            </Card>
          </Col>
          <Col md={24} lg={12} xl={12}>
            <Card className="graphCard">
              <Row align="middle">
                <Col md={4} lg={24} xl={4} xxl={4}>
                  <p className="providerDailyRoutine">Biometric Data</p>
                </Col>
                <Col
                md={20} lg={24} xl={20} xxl={20}
                  id="adherenceLegendDivBiometric"
                  style={{ width: "100%", height: "20px" }}
                ></Col>
              </Row>
              <BiometricDataGraphs chartData={biometricGraphData}  legendShiftBiometric={legendShiftBiometric} />
            </Card>
          </Col>
          <Col md={24} lg={12} xl={12}>
            <Card className="graphCard">
              <Row align="middle">
                <Col md={4} lg={24} xl={4} xxl={4}>
                  <p className="providerDailyRoutine">Patient Review</p>
                </Col>
                <Col
                  md={20} lg={24} xl={20} xxl={20}
                  id="adherenceLegendDivPatientReview"
                  style={{ width: "100%", height: "20px" }}
                ></Col>
              </Row>

              <PatientReviewGraphs chartData={patientGraphData}  legendShift={legendShift}/>
            </Card>
          </Col>
        </Row>
      </CompWrapper>
    </>
  );
};
export default PlatformAdminDashboard;
