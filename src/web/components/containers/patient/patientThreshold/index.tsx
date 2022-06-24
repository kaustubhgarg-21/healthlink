import { Col,  Menu, message, Row, Spin } from "antd";
import  { useEffect, useState } from "react";
import BloodPressureCard from "../../../stateless/patient/patientThreshold/patientBp";
import { bpDummyData } from "../patientThreshold/bpDummyData";
import "./patientThreshold.less";
import {
  bpIcon,
  glucoMeterReading,
  spo2,
  weight,
  Spirometer,
} from "../../../../images";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import PatientGluco from "../../../stateless/patient/patientThreshold/patientGluco";
import PatientPulse from "../../../stateless/patient/patientThreshold/patientPulse";
import PatientWeight from "../../../stateless/patient/patientThreshold/patientWeight";
import PatientTemprature from "../../../stateless/patient/patientThreshold/patientTemprature";
import PatientSpirometer from "../../../stateless/patient/patientThreshold/patientSpirometer";
import { PatientDetailCard } from "../../../stateless/patient/detailsCard";
import { useDispatch, useSelector } from "react-redux";
import { setCollapsed } from "../../../../../redux/reducers/sideBarReducer";
import { fetchThresholdsForPatientByAssignee } from "../../../../../redux/actions/hrm/hrmActions";
import { PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer";
import { Threshold } from "../../../../models/patient/patientThresholds";
import { Biometricname, UserRoles } from "../../../../constants/enums";
import { clearState, patientStateSelector } from "../../../../../redux/reducers/hrm/hrmReducer";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";

const PatientThreshold = () => {
  const [dummyData, setDummyData] = useState(bpDummyData);
  const [selectedKeys, setSelectedKeys] = useState("0");
  const dispatch=useDispatch();
  const {thresholds, isUpdated, formState} = useSelector(patientStateSelector);
  const [BPThresholds, setBPThresholds] = useState<Threshold[]>([]);
  const [SpirometerThresholds, setSpirometerThresholds] = useState<Threshold[]>([]);
  const [GlucoThresholds, setGlucoThresholds] = useState<Threshold[]>([]);
  const [PulseOxThresholds, setPulseOxThresholds] = useState<Threshold[]>([]);
  const [WtThresholds, setWtThresholds] = useState<Threshold[]>([])
  const [TempratureThresholds, setTempratureThresholds] = useState<Threshold[]>([])
  const {selectedPatient} = useSelector(PatientStateSelector)
  const {appUser} = useSelector(AuthStateSelector)
  const tempratureIcon="https://www.webtreeindia.com/healthlink/development/assets/images/temperature.svg"
  useEffect(()=>{
    dispatch(setCollapsed(true))
    dispatch(fetchThresholdsForPatientByAssignee({patientId:selectedPatient?.id, assigneeId: null}))

  },[])

  useEffect(()=>{
    if(isUpdated.isSuccess){
      message.success("Thresholds updated successfully.")
      dispatch(clearState())
      dispatch(fetchThresholdsForPatientByAssignee( {
        patientId:selectedPatient?.id, assigneeId: null
      }))
    }else if(isUpdated.isError){
      message.error("Could not update thresholds!")
      dispatch(clearState())
    }
  },[isUpdated.isSuccess, isUpdated.isError])

  useEffect(()=>{
    const bp = thresholds?.filter((el)=>{
      return el.biometricName === Biometricname.BP
    });
    const spiro = thresholds?.filter((el)=>{
      return el.biometricName === Biometricname.SPIRO
    });
    const gluco = thresholds?.filter((el)=>{
      return el.biometricName === Biometricname.GLUCO
    });
    const wt = thresholds?.filter((el)=>{
      return el.biometricName === Biometricname.WEIGHT
    });
    const tmp = thresholds?.filter((el)=>{
      return el.biometricName === Biometricname.TEMPRATURE
    });
    const pulse = thresholds?.filter((el)=>{
      return el.biometricName === Biometricname.PULSE
    });

    setBPThresholds(bp);
    setGlucoThresholds(gluco);
    setSpirometerThresholds(spiro);
    setWtThresholds(wt);
    setTempratureThresholds(tmp);
    setPulseOxThresholds(pulse);

  },[thresholds])
  
  const handleChange = (e: any) => {
  };
  const isEditable = (threshold: any) => {
    if(appUser?.roleName == UserRoles.PROVIDER && appUser?.id == threshold?.assigneeId){
    return true
  }else {
    return false
  }
  } 
  const bloodPressureData = () => {
    switch (selectedKeys) {
      case "0": {
        return (
          <div>
            <CompWrapper observeOn="bpMenu">
              {BPThresholds?.map((el:Threshold, id) => (
                <BloodPressureCard el={el} handleChange={handleChange} isEditable={isEditable(el)}/>
              ))}
            </CompWrapper>
          </div>
        );
      }
      case "1": {
        return (
          <div>
            <CompWrapper observeOn="bpMenu">
              {GlucoThresholds?.map((el, id) => (
                <PatientGluco el={el} handleChange={handleChange} isEditable={isEditable(el)}/>
              ))}
            </CompWrapper>
          </div>
        );
      }
      case "2": {
        return (
          <div>
            <CompWrapper observeOn="bpMenu">
              {PulseOxThresholds?.map((el, id) => (
                <PatientPulse el={el} handleChange={handleChange} isEditable={isEditable(el)}/>
              ))}
            </CompWrapper>
          </div>
        );
      }
      case "3": {
        return (<div>
           <CompWrapper observeOn="bpMenu">
              {WtThresholds?.map((el, id) => (
                <PatientWeight el={el} handleChange={handleChange} isEditable={isEditable(el)}/>
              ))}
            </CompWrapper>
        </div>);
      }
      case "4": {
        return (<div>
           <CompWrapper observeOn="bpMenu">
              {TempratureThresholds?.map((el, id) => (
                <PatientTemprature el={el} handleChange={handleChange} isEditable={isEditable(el)}/>
              ))}
            </CompWrapper>
        </div>);
      }
      case "5": {
        return (<div><CompWrapper observeOn="bpMenu">
        {SpirometerThresholds?.map((el, id) => (
          <PatientSpirometer el={el} handleChange={handleChange} isEditable={isEditable(el)}/>
        ))}
      </CompWrapper></div>);
      }
    }
  };

  const onMenuChange = (key: any) => {
    setSelectedKeys(key.key);
  };

  return (
    <>
 <Spin spinning={isUpdated.loading || formState.loading}>

    <Row>
      <Col span={24}>
        <PatientDetailCard patient={selectedPatient}/>
      </Col>
    </Row>
    <div className="patinetMenu">
      <Menu
        mode="horizontal"
        className="bpMenu bpPatienttab"
        style={{ background: "none" }}
        selectedKeys={[selectedKeys]}
        onChange={onMenuChange}
        onSelect={onMenuChange}
      >
        <Menu.Item key="0" className="bpMenuLi">
          <div className="bpMenutab">
          <div className="readingLabel bpIcon">
          <img src={bpIcon} />{" "}
          </div>
           <span  className="menuItemText f-14">Blood Pressure</span>
           </div>
        </Menu.Item>
        <Menu.Item key="1">
          <div className="bpMenutab">
          <div className="readingLabel gluco">
          <img src={glucoMeterReading} />{" "}
          </div>
           <span  className="menuItemText f-14">Glucometer</span>
           </div>
        </Menu.Item>
        <Menu.Item key="2">       
          <div className="bpMenutab">
          <div className="readingLabel spo2Icon">
          <img src={spo2} />{" "}
          </div>
           <span  className="menuItemText f-14">Pulse Ox</span>
           </div>
        </Menu.Item>
        <Menu.Item key="3">
          <div className="bpMenutab">
          <div className="readingLabel weightIcon">
          <img src={weight} />{" "}
          </div>
           <span  className="menuItemText f-14">Weight</span>
           </div>
        </Menu.Item>
        <Menu.Item key="4">  
          <div className="bpMenutab">
          <div className="readingLabel tempratureIcon">
          <img src={tempratureIcon} />{" "}
          </div>
           <span  className="menuItemText f-14">Temperature</span>
           </div>
        </Menu.Item>
        <Menu.Item key="5" className="brNone">
          <div className="bpMenutab">
          <div className="readingLabel Spirometer">
          <img src={Spirometer} />{" "}
          </div>
           <span  className="menuItemText f-14">Spirometer</span>
           </div>
         
        </Menu.Item>
      </Menu>
      </div>
      {bloodPressureData()}
      </Spin>
    </>
  );
};
export default PatientThreshold;
