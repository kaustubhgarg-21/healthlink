import { Card, Col, Divider, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateThresholdForPatientByAssignee } from "../../../../../../redux/actions/hrm/hrmActions";
import { useSelector } from "react-redux";
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer";
import { getFullName } from "../../../../../../utility/utils";
import {
  downArrow,
  upArrow,
} from "../../../../../images";
import { ThresholdBounds } from "../../../../../models/patient/patientThresholds";
import Button from "../../../common/button";
import SelectInput from "../../../common/selectInput";
import "./patientPulse.less";
import { patientStateSelector } from "../../../../../../redux/reducers/hrm/hrmReducer";

const PatientPulse = (props: any) => {
  const { el,isEditable } = props;
  const [pulseThresholds, setpulseThresholds] = useState<any>(el);
  const [spo2, setSpo2Bound] = useState<ThresholdBounds>({} as ThresholdBounds);
  const [heartRate, setHeartRateBound] = useState<ThresholdBounds>({} as ThresholdBounds);
const dispatch = useDispatch()
const {isUpdated} = useSelector(patientStateSelector);

  const {appUser} = useSelector(AuthStateSelector)
  const [pulseDays, setPulseDays] = useState({
    intraPerc: el?.intraPerc,
    twoDayPerc: el?.twoDayPerc,
    fiveDayPerc: el?.fiveDayPerc,
    fourteenDayPerc:el?.fourteenDayPerc,
    thirtyDayPerc: el?.thirtyDayPerc,
    adherencePerc: el?.adherencePerc,
    compliancePerc: el?.compliancePerc}
  )



  // to be removed just for demo
  useEffect(()=>{
     const sp = el?.patientThresholdBounds?.filter((el:any)=>{
      return el?.boundType === "spo2"
      });

      const hr = el?.patientThresholdBounds?.filter((el:any)=>{
        return el?.boundType === "heartRate"
        });

      setSpo2Bound(sp[0]);
      setHeartRateBound(hr[0]);
  },[props]);

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

 

  const pulseoxHandleChange = (e:any)=>{
    var {name, value} = e.target;
    setSpo2Bound({...spo2, [name]: value? parseInt(value): ""})
  }

  const pulserateHandleChange = (e:any)=>{
    var {name, value} = e.target;
    setHeartRateBound({...heartRate, [name]: value? parseInt(value): ""})
  }

  const pulseHandleChange = (e:any)=>{
    var {name, value} = e.target;
    if(value>=0 && value<101){
    setPulseDays({...pulseDays,[name]: value})
  }
}
  const handleSubmit = () => {
    dispatch(updateThresholdForPatientByAssignee({id:el.id , ...pulseDays, bounds:[spo2, heartRate]}))
  };
  const handleCancel =()=>{
    setEditView(true)
    setPulseDays({
      intraPerc: el?.intraPerc,
      twoDayPerc: el?.twoDayPerc,
      fiveDayPerc: el?.fiveDayPerc,
      fourteenDayPerc:el?.fourteenDayPerc,
      thirtyDayPerc: el?.thirtyDayPerc,
      adherencePerc: el?.adherencePerc,
      compliancePerc: el?.compliancePerc}
    )
    const sp = el?.patientThresholdBounds?.filter((el:any)=>{
      return el?.boundType === "spo2"
      });

      const hr = el?.patientThresholdBounds?.filter((el:any)=>{
        return el?.boundType === "heartRate"
        });

      setSpo2Bound(sp[0]);
      setHeartRateBound(hr[0]);

  }
  useEffect(()=>{
    if(isUpdated.isSuccess){
      setEditView(true)
    }
    },[isUpdated.isSuccess, isUpdated.isError])
  return (
    <div className="bpCardContainer">
      <Card className="bpCard">
        <Row>
          <Col md={12} lg={4} xl={4} xxl={4} className="BPpatientName">
            <Row>
              <Col span={16}>
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
              </Col>
            </Row>
        
          </Col>
          {editView ? (
            <>
              <Col md={12} lg={8} xl={8} xxl={8}>
                <Row style={{height:"100%"}}>
                  <Col span={10}>
                    <p className="pulseTxt f-12">Pulse Ox (90-100%)</p>  
                    <Row>
                      <Col  md={8} xl={7} lg={7} style={{borderRight: "1px solid rgba(137, 137, 137, 0.2)"}}>
                        <p className="pulseTxt f-12">
                          Low <img src={downArrow} className="downArrow" />
                        </p>
                        <p className="pulseNmbr f-12">{spo2?.minBound}</p>                      
                      </Col>
                      <Divider style={{height:"100%"}} type="vertical"/>
                      <Col span={7}>
                        <p className="pulseTxt f-12">
                          High <img src={upArrow} className="downArrow" />
                        </p>
                        <p className="pulseNmbr f-12">{spo2?.maxBound}</p>
                      </Col>
                      <Col span={8}></Col>
                    </Row>
                  </Col>
                  <Col span={10} style={{borderRight: "1px solid rgba(137, 137, 137, 0.2)"}} className="hideDivider">
                    <p className="pulseTxt f-12">Pulse Rate (bpm)</p>
                    <Row>
                      <Col   md={8} xl={7} lg={7} style={{borderRight: "1px solid rgba(137, 137, 137, 0.2)"}}>
                        <p className="pulseTxt f-12">
                          Low <img src={downArrow} className="downArrow" />
                        </p>
                        <p className="pulseNmbr f-12">{heartRate?.minBound}</p>
                      </Col>
                      <Divider style={{height:"100%"}} type="vertical"/>

                      <Col span={7}>
                        <p className="pulseTxt f-12">
                          High <img src={upArrow} className="downArrow" />
                        </p>
                        <p className="pulseNmbr f-12">{heartRate?.maxBound}</p>
                      </Col>
                      <Col span={7}></Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col md={12} lg={7} xl={7} xxl={7} className="mborder3Reverse">
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
              <Col md={12} lg={5} xl={5} xxl={5} className="mborder4Reverse">
                <Row>
                  <Col span={20}></Col>
                  <Col span={4} style={{textAlign:'right'}}>
                    {isEditable? 
                  <div>
                      {editView ? (
                        <span
                          className="material-icons-outlined notEditpencilIcon"
                          onClick={() => {
                            editView ? setEditView(false) : setEditView(true);
                          }}
                        >
                          edit
                        </span>
                      ) : null}
                    </div>
                    : (<span
                      className="material-icons-outlined pencilIcon"
                    >
                      edit
                    </span>)}
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
                  <Col md={7} lg={8} xl={7}>
                    <p className="diastolicTxt f-12">Pulse Ox (50-100%)</p>
                    <Row gutter={[20, 30]}>
                      <Col span={12}>
                        <input
                          placeholder="Low"
                        
                          className="inp"
                          name="minBound"
                          value={spo2?.minBound}
                          onChange={pulseoxHandleChange}
                        />
                      </Col>
                      <Col span={12}>
                        <input
                          placeholder="High"
                         
                          className="inp"
                          name="maxBound"
                          value={spo2?.maxBound}
                          onChange={pulseoxHandleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Divider style={{height:'5.4vh'}} className="divider dividerHeight" type="vertical"/>
                  <Col md={12} lg={8} xl={7}>
                    <p className="diastolicTxt f-12">Pulse Rate (40-120bpm)</p>
                    <Row gutter={[20, 30]}>
                      <Col span={12}>
                        <input
                          placeholder="Low"
                          name="minBound"
                          value={heartRate?.minBound}
                         
                          className="inp"
                          onChange={pulserateHandleChange}
                        />
                      </Col>
                      
                      <Col span={12}>
                        <input
                          placeholder="High"
                         
                          name="maxBound"
                          className="inp"
                          value={heartRate?.maxBound}
                          onChange={pulserateHandleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="diastolicColumn">
                    <Row gutter={[20, 30]}>
                      
                      <Col  md={7} lg={5} xl={4} xxl={3}>
                      <p className="diastolicTxt f-12">Intraday (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="intraPerc"
                          value={pulseDays.intraPerc}
                          onChange={pulseHandleChange}
                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                      <Col  md={7} lg={5} xl={4} xxl={3}>
                      <p className="diastolicTxt f-12">2 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="twoDayPerc"
                          value={pulseDays.twoDayPerc}
                          onChange={pulseHandleChange}
                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                      <Col  md={7} lg={5} xl={4} xxl={3}>
                      <p className="diastolicTxt f-12">5 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="fiveDayPerc"
                          value={pulseDays.fiveDayPerc}
                          onChange={pulseHandleChange}
                        />
                      </Col>
                      <Divider className="divider dividerHeight hideDivider" type="vertical"/>
                      <Col  md={7} lg={5} xl={4} xxl={3}>
                      <p className="diastolicTxt f-12">14 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="fourteenDayPerc"
                          value={pulseDays.fourteenDayPerc}
                          onChange= {pulseHandleChange}
                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                      <Col md={7} lg={5} xl={4} xxl={3}>
                      <p className="diastolicTxt f-12">30 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="thirtyDayPerc"
                          value={pulseDays.thirtyDayPerc}
                          onChange={pulseHandleChange}
                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                      <Col  md={8} lg={6} xl={5} xxl={4}>
                      <p className="diastolicTxt f-12">Adherence (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="adherencePerc"
                          value={pulseDays.adherencePerc}
                          onChange={pulseHandleChange}

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
export default PatientPulse;
