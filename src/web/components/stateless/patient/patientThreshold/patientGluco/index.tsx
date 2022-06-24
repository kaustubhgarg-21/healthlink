import { Card, Col, Divider, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateThresholdForPatientByAssignee } from "../../../../../../redux/actions/hrm/hrmActions";
import { useSelector } from "react-redux";
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer";
import { getFullName, removeEmptyKeys } from "../../../../../../utility/utils";
import {
  downArrow,
  upArrow,
} from "../../../../../images";
import { ThresholdBounds } from "../../../../../models/patient/patientThresholds";
import Button from "../../../common/button";
import SelectInput from "../../../common/selectInput";
import "./patientGluco.less";
import { patientStateSelector } from "../../../../../../redux/reducers/hrm/hrmReducer";

const PatientGluco = (props: any) => {
  const { el, isEditable } = props;
  const dispatch = useDispatch()
  const [glucoDiagno, setGlucoDiagno] = useState<any>(el);
  const {isUpdated} = useSelector(patientStateSelector);
  const [glucose, setGlucoseBound] = useState<ThresholdBounds>({} as ThresholdBounds);
  const {appUser} = useSelector(AuthStateSelector)
  const [glucoDays ,setGlucoDays] = useState({ intraPerc: el?.intraPerc,
    twoDayPerc: el?.twoDayPerc,
    fiveDayPerc: el?.fiveDayPerc,
    fourteenDayPerc:el?.fourteenDayPerc,
    thirtyDayPerc: el?.thirtyDayPerc,
    adherencePerc: el?.adherencePerc,
    compliancePerc: el?.compliancePerc})

  
  useEffect(()=>{
     const gl = el?.patientThresholdBounds?.filter((el:any)=>{
      return el?.boundType === "glucose"
      });
    setGlucoseBound(gl[0]);
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



  const glucoHandleChange = (e:any)=>{
    var {name ,value} = e.target;
    setGlucoseBound({...glucose , [name]: value?parseInt(value): ""})
  }
  const handleGlucoChange =(e:any)=>{
    var {name, value} = e.target;
    if(value>=0 && value<101){
    setGlucoDays({...glucoDays, [name]: value})
    }
  }
  const handleSubmit = () => {
    dispatch(updateThresholdForPatientByAssignee({id :el.id , ...removeEmptyKeys(glucoDays), bounds:[removeEmptyKeys(glucose)]}))
  };
  const handleCancel=()=>{
    setEditView(true)
    setGlucoDays({ intraPerc: el?.intraPerc,
      twoDayPerc: el?.twoDayPerc,
      fiveDayPerc: el?.fiveDayPerc,
      fourteenDayPerc:el?.fourteenDayPerc,
      thirtyDayPerc: el?.thirtyDayPerc,
      adherencePerc: el?.adherencePerc,
      compliancePerc: el?.compliancePerc
    })
    const gl = el?.patientThresholdBounds?.filter((el:any)=>{
      return el?.boundType === "glucose"
      });
    setGlucoseBound(gl[0]);
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
               : null
             
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
              <Col md={12} lg={7} xl={7} xxl={7}>
                <Row style={{height:"100%"}}>
                  <Col  md={0} lg={4} xl={4}></Col>
                  <Col  md={18} lg={12} xl={10}>
                    <p className="glucoTxt f-12">Glucose (mg/dL)</p>
                    <Row>
                      <Col span={10} md={9} lg={9} style={{borderRight: "1px solid rgba(137, 137, 137, 0.2)"}}>
                        <p className="glucoTxt f-12">
                          Low <img src={downArrow} className="downArrow" />
                        </p>
                        <p className="glucoNmbr f-12">
                          {glucose?.minBound}
                        </p>
                      </Col>
                      <Divider style={{height:"100%"}} type="vertical"/>
                      <Col span={12} md={9} lg={9}>
                        <p className="glucoTxt f-12">
                          High <img src={upArrow} className="downArrow" />
                        </p>
                        <p className="glucoNmbr f-12">
                          {glucose?.maxBound}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={5} md={0} lg={3} xl={3} style={{borderRight: "1px solid rgba(137, 137, 137, 0.2)"}}></Col>
                 
                </Row>
              </Col>
              <Col md={12} lg={7} xl={7} xxl={7} className="mborder3Reverse" >
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
              <Col md={12} lg={6} xl={6} xxl={6} className="mborder4Reverse">
                <Row justify="end">
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
                    :(<span
                      className="material-icons-outlined pencilIcon"
                    >
                      edit
                    </span>)}
                  </Col>
                  <Col md={0} lg={4} xl={4}  className="thresholdSelect"></Col>
                  <Col md={24} lg={20} xl={20} className="thresholdSelect">
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
                  <Col md={12} lg={6} xl={6} xxl={6}>
                    <p className="diastolicTxt f-12">Glucose (mmHg)</p>
                    <Row gutter={[20, 30]}>
                      <Col span={12}>
                        <input
                          placeholder="Low"
                          
                          className="inp"
                          name="minBound"
                          value={glucose?.minBound}
                          onChange={glucoHandleChange}
                        />
                      </Col>
                      <Col span={12}>
                        <input
                          placeholder="High"
                          
                          className="inp"
                          name="maxBound"
                          value={glucose?.maxBound}
                          onChange={glucoHandleChange}
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
                          value={glucoDays?.intraPerc}
                          onChange={handleGlucoChange}
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
                          value={glucoDays?.twoDayPerc}
                          onChange={handleGlucoChange}
                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                      <Col span={3} md={6} lg={5} xl={4} xxl={3}>
                      <p className="diastolicTxt f-12">5 day (1-100)%</p>

                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="fiveDayPerc"
                          value={glucoDays?.fiveDayPerc}
                          onChange={handleGlucoChange}
                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                      <Col span={3} md={6} lg={5} xl={4} xxl={3}>
                      <p className="diastolicTxt f-12">14 day (1-100)%</p>

                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="fourteenDayPerc"
                          value={glucoDays?.fourteenDayPerc}
                          onChange= {handleGlucoChange}
                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                      <Col span={3} md={6} lg={5} xl={4} xxl={3}>
                      <p className="diastolicTxt f-12">30 day (1-100)%</p>

                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="thirtyDayPerc"
                          value={glucoDays?.thirtyDayPerc}
                          onChange = {handleGlucoChange}
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
                          value={glucoDays?.adherencePerc}
                          onChange = {handleGlucoChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col md={7} xl={5} lg={5} xxl={5}>
                <SelectInput
                  placeholder="select"
                  name="role"
                  className="card-dropdown with-search"
                  bordered={true}
                  optionValue={selectValue}
                />

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
export default PatientGluco;
