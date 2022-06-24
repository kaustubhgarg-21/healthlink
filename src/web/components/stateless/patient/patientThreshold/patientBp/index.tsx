import { Card, Col, Divider, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import {
  downArrow,
  upArrow,
} from "../../../../../images";
import Button from "../../../common/button";
import SelectInput from "../../../common/selectInput";
import "./bloodPressure.less";
import { getFullName, removeEmptyKeys } from "../../../../../../utility/utils";
import { ThresholdBounds } from "../../../../../models/patient/patientThresholds";
import { useDispatch,useSelector } from "react-redux";
import { updateThresholdForPatientByAssignee } from "../../../../../../redux/actions/hrm/hrmActions";
import { patientStateSelector } from "../../../../../../redux/reducers/hrm/hrmReducer";
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer";
import { PatientStateSelector } from "../../../../../../redux/reducers/patient/patientReducer";

const BloodPressureCard = (props: any) => {
  const { el,isEditable } = props;
  const dispatch = useDispatch();
  const {thresholds, isUpdated} = useSelector(patientStateSelector);
  const {selectedPatient} = useSelector(PatientStateSelector)

  const [bloodPressureDiagno, setBloodPressureDiagno] = useState<any>(el);
  const [systolicBound, setSystolicBound] = useState<ThresholdBounds>({} as ThresholdBounds);
  const [diastolicBound, setDiastolicBound] = useState<ThresholdBounds>({} as ThresholdBounds);
  const [heartRateBound, setHeartRateBound] = useState<ThresholdBounds>({} as ThresholdBounds);
  const [bpDays ,setBpDays] = useState({
    intraPerc: el?.intraPerc,
  twoDayPerc: el?.twoDayPerc,
  fiveDayPerc: el?.fiveDayPerc,
  fourteenDayPerc:el?.fourteenDayPerc,
  thirtyDayPerc: el?.thirtyDayPerc,
  adherencePerc: el?.adherencePerc,
  compliancePerc: el?.compliancePerc})
  

  const {appUser} = useSelector(AuthStateSelector)

 

 
  useEffect(()=>{
     const sys = el?.patientThresholdBounds?.filter((el:any)=>{
      return el?.boundType === "systolic"
      });
    const dia = el?.patientThresholdBounds?.filter((el:any)=>{
      return el?.boundType === "diastolic"
    });
    const hr = el?.patientThresholdBounds?.filter((el:any)=>{
      return el?.boundType === "heartRate"
    });
    setSystolicBound(sys[0]);
    setDiastolicBound(dia[0]);
    setHeartRateBound(hr[0]);
  },[props])
  const [editView, setEditView] = useState(true);
  const selectValue = [
    {
      text: "Standard Threshold",
      value: "Standard Threshold",
    },
    {
      text: "Custom Threshold",
      value: "Custom Threshold",
    },
  ];
 
 

  const systolicHandleChange = (e:any) =>{
    var {name ,value} = e.target;
    setSystolicBound({...systolicBound, [name]: value? parseInt(value):""})
  }

  const diastolicHandleChange = (e:any)=>{
    var {name , value} = e.target;
    setDiastolicBound({...diastolicBound, [name]: value? parseInt(value): ""})

  }

  const handleBpDaysChange = (e:any)=>{
    var {name, value} = e.target;
    if(value>=0 && value<101){
         setBpDays({...bpDays, [name]: value})
    }
  }    



  const heartRateHandleChange = (e:any)=>{
    var {name ,value} = e.target;
 setHeartRateBound({...heartRateBound, [name]: value?parseInt(value): ""})
  }

useEffect(()=>{
if(isUpdated.isSuccess){
  setEditView(true)
}
},[isUpdated.isSuccess, isUpdated.isError])



  const handleSubmit = (e: any) => {
    dispatch(updateThresholdForPatientByAssignee({
      id:el.id,
      ...removeEmptyKeys(bpDays), bounds:[removeEmptyKeys(systolicBound) , removeEmptyKeys(diastolicBound), removeEmptyKeys(heartRateBound)]
    }
    ))
  };
  const handleCancel=()=>{
    setEditView(true)
    setBpDays({
      intraPerc: el?.intraPerc,
    twoDayPerc: el?.twoDayPerc,
    fiveDayPerc: el?.fiveDayPerc,
    fourteenDayPerc:el?.fourteenDayPerc,
    thirtyDayPerc: el?.thirtyDayPerc,
    adherencePerc: el?.adherencePerc,
    compliancePerc: el?.compliancePerc
  })
  const sys = el?.patientThresholdBounds?.filter((el:any)=>{
    return el?.boundType === "systolic"
    });
  const dia = el?.patientThresholdBounds?.filter((el:any)=>{
    return el?.boundType === "diastolic"
  });
  const hr = el?.patientThresholdBounds?.filter((el:any)=>{
    return el?.boundType === "heartRate"
  });
  setSystolicBound(sys[0]);
  setDiastolicBound(dia[0]);
  setHeartRateBound(hr[0]);
  }

  return (
    <div className="bpCardContainer">
      <Card className="bpCard">
        <Row>
          <Col md={10} lg={4} xl={4} xxl={4} className="BPpatientName">
            <Row>
              <Col span={16}>
                <div className="bpPatient">
            <Typography className="drTxt f-16">{
            el.ThresholdAssigner ?
            getFullName(el.ThresholdAssigner?.title,
              el?.ThresholdAssigner?.firstName,
              el?.ThresholdAssigner?.middleName,
              el?.ThresholdAssigner?.lastName)
            :
            getFullName(appUser?.title, appUser?.firstName , appUser?.middleName, appUser?.lastName)
            }</Typography>
            <Typography className="bpCardTxt">{el?.ThresholdAssigner?.providerType},</Typography>
            <Typography className="bpCardTxt">
              {el?.ThresholdAssigner?.specialtyType}
            </Typography>
            </div>
            </Col>
            </Row>
          </Col>
          {editView ? (
            <>
              <Col md={14} lg={8} xl={8} xxl={8}>
                <Row>
                  <Col md={12} xl={9} lg={9}   style={{borderRight: "1px solid rgba(137, 137, 137, 0.2)"}}>
                    <p className="bloodPressureTxt f-12">Blood Pressure (mmHg)</p>
                    <p className="systolicTxt f-12">Systolic</p>
                    <p className="systolicTxt f-12">Diastolic</p>
                    <p className="systolicTxt f-12">Pulse</p>
                  </Col>
                  <Divider style={{height:"100%"}} type="vertical"/>
                  <Col md={6} lg={5} xl={5}>
                    <p className="bloodPressureTxt f-12">
                      Low <img src={downArrow} className="downArrow" />{" "}
                    </p>
                    <p className="systolicTxtNmbr f-12">{systolicBound?.minBound}</p>
                    <p className="systolicTxtNmbr f-12">{diastolicBound?.minBound}</p>
                    <p className="systolicTxtNmbr f-12">{heartRateBound?.minBound}</p>
                  </Col>
                  <Col span={6} md={4} lg={7} xl={5} style={{borderRight: "1px solid rgba(137, 137, 137, 0.2)"}} className="hideDivider">
                    <p className="bloodPressureTxt f-12">
                      High <img src={upArrow} className="downArrow" />{" "}
                    </p>
                    <p className="systolicTxtNmbr f-12">{systolicBound?.maxBound}</p>
                    <p className="systolicTxtNmbr f-12">{diastolicBound?.maxBound}</p>
                    <p className="systolicTxtNmbr f-12">{heartRateBound?.maxBound}</p>
                  </Col>
                  <Divider style={{height:"100%"}} type="vertical"/>
                </Row>
              </Col>
              
              <Col md={14} lg={7} xl={7} xxl={7} className="mborder3Reverse">
                <Row>
                  <Col span={7}>
                    <p className="bloodPressureTxt f-12">Intraday %</p>
                    <p className="systolicTxtNmbr f-12">{el?.intraPerc}</p>
                    <p className="bloodPressureTxt f-12">14 Day %</p>
                    <p className="systolicTxtNmbr f-12">{el?.fourteenDayPerc}</p>
                  </Col>
                  <Col span={7}>
                    <p className="bloodPressureTxt f-12">2 Day %</p>
                    <p className="systolicTxtNmbr f-12">{el?.twoDayPerc}</p>
                    <p className="bloodPressureTxt f-12">30 Day %</p>
                    <p className="systolicTxtNmbr f-12">{el?.thirtyDayPerc}</p>
                  </Col>
                  <Col span={8}>
                    <p className="bloodPressureTxt f-12">5 Day %</p>
                    <p className="systolicTxtNmbr f-12">{el?.fiveDayPerc}</p>
                    <p className="bloodPressureTxt f-12">Adherence % </p>
                    <p className="systolicTxtNmbr f-12">{el?.adherencePerc}</p>
                  </Col>
                </Row>
              </Col>
              <Col md={10} lg={5} xl={5} xxl={5} className="mborder4Reverse mborderReverse">
                <Row>
                  <Col span={20}></Col>
                  <Col span={4} style={{textAlign:'right'}}>
                    {isEditable ?
                    <div>
                      {editView ? (
                        <div
                          className="material-icons-outlined notEditpencilIcon"
                          onClick={() => {
                            editView ? setEditView(false) : setEditView(true);
                          }}
                        >
                          edit
                        </div>
                      ) : null}
                    </div>
                    : (  <div
                      className="material-icons-outlined pencilIcon "
                    >
                      edit
                    </div>)}
                  </Col>
                  <Col span={24} className="thresholdSelect">
                    <SelectInput
                      placeholder="select"
                      name="role"
                      className="card-dropdown with-search"
                      bordered={true}
                      optionValue={selectValue}
                      disabled={editView}
                    />
                  </Col>
                </Row>
              </Col>
            </>
          ) : (
            <>
              <Col md={17} lg={15} xl={15} xxl={15}>
                <Row gutter={[20, 30]}>
                  <Col md={7} lg={8} xl={7} xxl={6}>
                    <p className="diastolicTxt f-12">Systolic (mmHg)</p>
                    <Row gutter={[20, 30]}>
                      <Col span={12}>
                        <input
                          placeholder="Low"
                          className="inp"
                          name="minBound"
                          value={systolicBound?.minBound}
                          onChange={systolicHandleChange}
                        />
                      </Col>
                      <Col span={12}>
                        <input
                          placeholder="High"
                          
                          className="inp"
                          name="maxBound"
                          value={systolicBound?.maxBound}
                          onChange={systolicHandleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Divider style={{height:'5.4vh'}} className="divider dividerHeight" type="vertical"/>
                  <Col md={7} lg={8} xl={7} xxl={6}>
                    <p className="diastolicTxt f-12">Diastolic (mmHg)</p>
                    <Row gutter={[20, 30]}>
                      <Col span={12}>
                        <input
                          placeholder="Low"
                          name="minBound"
                          value={diastolicBound?.minBound}
                          className="inp"
                          onChange={diastolicHandleChange}
                        />
                      </Col>
                      <Col span={12}>
                        <input
                          placeholder="High"
                          name="maxBound"
                          className="inp"
                          value={diastolicBound?.maxBound}
                          onChange={diastolicHandleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Divider style={{height:'5.4vh'}} className="divider dividerHeight" type="vertical"/>
                  <Col  md={7} lg={6} xl={7} xxl={6}>
                    <p className="diastolicTxt f-12">Pulse Rate (mmHg)</p>
                    <Row gutter={[20, 30]}>
                      <Col span={12}>
                        <input
                          placeholder="Low"
                          className="inp"
                          name="minBound"
                          value={heartRateBound?.minBound}
                          onChange={heartRateHandleChange}
                        />
                      </Col>
                     
                      <Col span={12}>
                        <input
                          placeholder="High"
                         
                          className="inp"
                          name="maxBound"
                          value={heartRateBound?.maxBound}
                          onChange={heartRateHandleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="diastolicColumn">
               
                    <Row gutter={[20, 30]}>
               
                      <Col md={7} lg={5} xl={4} xxl={3}>
                      <p className="diastolicTxt f-12">Intraday (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="intraPerc"
                          value={bpDays.intraPerc}
                          onChange={handleBpDaysChange}
                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                   
                      <Col md={6} lg={5} xl={4} xxl={3}>
                      <p className="diastolicTxt f-12">2 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="twoDayPerc"
                          value={bpDays.twoDayPerc}
                          onChange={handleBpDaysChange}
                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                      <Col  md={6} lg={5} xl={4} xxl={3}>
                      <p className="diastolicTxt f-12">5 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="fiveDayPerc"
                          value={bpDays.fiveDayPerc}
                          onChange={handleBpDaysChange}
                        />
                      </Col>
                      <Divider className="divider dividerHeight hideDivider" type="vertical"/>
                      <Col  md={6} lg={5} xl={4} xxl={3}>
                      <p className="diastolicTxt f-12">14 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="fourteenDayPerc"
                          value={bpDays.fourteenDayPerc}
                          onChange ={handleBpDaysChange}
                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                      <Col md={6} lg={5} xl={4} xxl={3}>
                      <p className="diastolicTxt f-12">30 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="thirtyDayPerc"
                          value={bpDays.thirtyDayPerc}
                          onChange ={handleBpDaysChange}
                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                      <Col md={8} lg={6} xl={5} xxl={4}>
                      <p className="diastolicTxt f-12">Adherence (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="number"
                          min={0}
                          max={100}
                          className="inp"
                          name="adherencePerc"
                          value={bpDays.adherencePerc}
                          onChange = {handleBpDaysChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col md={7} xl={5} lg={5} xxl={5}>
                <Row>
                  <Col span={24} className="thresholdSelect">
                  <SelectInput
                  placeholder="select"
                  name="role"
                  className="card-dropdown with-search"
                  bordered={true}
                  optionValue={selectValue}
                />
                  </Col>
                </Row>
              

                <Row className="thresholdSaveBtn" gutter={[20, 30]} justify="end">
                  <Col md={10} lg={9} xl={10}>
                  <Button
                      className="filter"
                      type="secondary"
                      htmlType="search"
                      onClick={handleCancel}
                    >
                    cancel
                    </Button>
                  </Col>
                  <Col md={14} lg={15} xl={14}>
                    <Button
                      className="filter"
                      type="secondary"
                      htmlType="search"
                      onClick={handleSubmit}
                    >
                      save changes
                    </Button>
                  </Col>
                </Row>            
              </Col>
            </>
          )}
        </Row>
      </Card>
    </div>
  );
};
export default BloodPressureCard;
