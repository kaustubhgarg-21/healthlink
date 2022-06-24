import { Card, Checkbox, Col, Divider, Radio, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateThresholdForPatientByAssignee } from "../../../../../../redux/actions/hrm/hrmActions";
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer";
import { patientStateSelector } from "../../../../../../redux/reducers/hrm/hrmReducer";
import { convertLbsTokgs, getFullName, removeEmptyKeys } from "../../../../../../utility/utils";
import {
  downArrow,
  upArrow,
} from "../../../../../images";
import { ThresholdBounds } from "../../../../../models/patient/patientThresholds";
import Button from "../../../common/button";
import SelectInput from "../../../common/selectInput";
import "./patientWeight.less";

const PatientWeight = (props: any) => {
  const { el, isEditable } = props;
  const [weightDiagno, setweightDiagno] = useState<any>(el);
  const [isKg, setIsKg] = useState(true);
  const [radioValue, setRadioValue] = useState();
  const [selectedFormat, setFormat] = useState(props.el.weightFormat)
  const [maxwt, setMaxWt] = useState(el.maxwt);
  const [valueCheck , setValueCheck] = useState()
  const [heartWeight, setHeartWeight] = useState<ThresholdBounds>({} as ThresholdBounds);
  const [obesityWeight, setObesityWeight] = useState<ThresholdBounds>({} as ThresholdBounds);
  const [minWt, setMinWt] = useState(el.minWt);
  const [ weight, setWeightBound] = useState<ThresholdBounds>({} as ThresholdBounds);
  const [weightPercent, setWeightPercent] = useState<ThresholdBounds>({} as ThresholdBounds);
  const [weightDays , setWeightDays] = useState({
    intraPerc: el?.intraPerc,
    twoDayPerc: el?.twoDayPerc,
    fiveDayPerc: el?.fiveDayPerc,
    fourteenDayPerc:el?.fourteenDayPerc,
    thirtyDayPerc: el?.thirtyDayPerc,
    adherencePerc: el?.adherencePerc,
    compliancePerc: el?.compliancePerc
  })

  const { appUser } = useSelector(AuthStateSelector)
  const {isUpdated} = useSelector(patientStateSelector);
const dispatch = useDispatch()
  useEffect(() => {
    const wtlbs = el?.patientThresholdBounds?.filter((el: any) => {
      return el?.boundType === "weight"
    });
    setWeightBound(wtlbs[0]);
    
  }, [props])


  useEffect(() => {
    const wtlbs = el?.patientThresholdBounds?.filter((el: any) => {
      return el?.boundType === "obesity"
    });
    const wtHeart = el?.patientThresholdBounds?.filter((el: any) => {
      return el?.boundType === "heartFailure"
    });
    setHeartWeight(wtHeart[0]);
    setObesityWeight(wtlbs[0]);
    
  }, [props])


const handleCheckBox = (checkedValues: any)=>{

setValueCheck(checkedValues?.map((value:any)=>{
  if(value == "Heart Failure"){
    return "Heart Failure"
  }else return "Obesity"
})[0])
}
  
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

 const handleWeightDays = (e:any)=>{
   var {name, value} = e.target;
   if(value>=0 && value<101){
setWeightDays({...weightDays, [name]: value})
 }}

 const handleHeartPercent = (e:any)=>{
  var {name,value} = e.target;
  setHeartWeight({...heartWeight, [name]:value?parseInt(value): ""});
}

const handleObesityPercent = (e:any)=>{
  var {name,value} = e.target;
  setObesityWeight({...obesityWeight, [name]: value?parseInt(value): ""});
}



   

  const handleSubmit = () => {  
    dispatch(updateThresholdForPatientByAssignee({id:el.id, ...removeEmptyKeys(weightDays), bounds:[removeEmptyKeys(heartWeight), removeEmptyKeys(obesityWeight)]}))

  };
  const handleCancel =()=>{
    setEditView(true)
    setWeightDays({
      intraPerc: el?.intraPerc,
      twoDayPerc: el?.twoDayPerc,
      fiveDayPerc: el?.fiveDayPerc,
      fourteenDayPerc:el?.fourteenDayPerc,
      thirtyDayPerc: el?.thirtyDayPerc,
      adherencePerc: el?.adherencePerc,
      compliancePerc: el?.compliancePerc
    })
    const wtlbs = el?.patientThresholdBounds?.filter((el: any) => {
      return el?.boundType === "obesity"
    });
    const wtHeart = el?.patientThresholdBounds?.filter((el: any) => {
      return el?.boundType === "heartFailure"
    });
    setHeartWeight(wtHeart[0]);
    setObesityWeight(wtlbs[0]);
  }

  
useEffect(()=>{

setMaxWt(Math.round(parseInt(weight?.maxBound) * 100) / 100 || 0)
setMinWt(Math.round(parseInt(weight?.minBound) * 100) / 100 || 0)

},[weight?.maxBound, weight?.minBound])

  const handleRadioButton = async (e: any) => {
    setRadioValue(e.target.value)
    let hfMax : any;
    let hfMin: any;
    let obMax: any;
    let obMin: any;
    if (e.target.value === "kgs") {
      hfMax = await convertLbsTokgs(parseInt(heartWeight?.maxBound));
      hfMin = await convertLbsTokgs(parseInt(heartWeight?.minBound));
      obMax = await convertLbsTokgs(parseInt(obesityWeight?.maxBound));
      obMin = await convertLbsTokgs(parseInt(obesityWeight?.minBound));
    } else if(e.target.value === "lbs") {
      hfMax = el?.patientThresholdBounds?.find((el: any) => {
        return el?.boundType === "heartFailure"
      })?.maxBound;
      hfMin = el?.patientThresholdBounds?.find((el: any) => {
        return el?.boundType === "heartFailure"
      })?.minBound;
      obMax = 
      el?.patientThresholdBounds?.find((el: any) => {
        return el?.boundType === "obesity"
      })?.maxBound;
      obMin = el?.patientThresholdBounds?.find((el: any) => {
        return el?.boundType === "obesity"
      })?.minBound;
    }
    setHeartWeight({...heartWeight, maxBound: hfMax.toString(), minBound: hfMin.toString()})
    setObesityWeight({...obesityWeight, maxBound: obMax.toString(), minBound: obMin.toString()})
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
          <Col  md={12} lg={4} xl={4} xxl={4} className="BPpatientName">
            <Row>
            <Col span={16}>
            <Typography className="drTxt f-16">{
              el.ThresholdAssigner ?
                getFullName(el.ThresholdAssigner?.title,
                  el?.ThresholdAssigner?.firstName,
                  el?.ThresholdAssigner?.middleName,
                  el?.ThresholdAssigner?.lastName)
                :
                getFullName(appUser?.title, appUser?.firstName, appUser?.middleName, appUser?.lastName)
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
              <Col  md={12} lg={8} xl={8} xxl={8}>
                <Row>
                  <Col span={20}>  
                  <div className="weightIndication">
                    <Row>
                      <Col span={14}>
                      <p className="pulseTxt f-12">Indication</p>
                      </Col>
                      <Col  span={10}>
                      <p className="pulseTxt f-12">Weight Change</p>
                      </Col>
                    </Row>
                

                  </div>
                  </Col>
                </Row>
              <Row>
                  <Col span={12}>
                  
                    <Row>
                      <Col md={24} lg={20} xl={20} >
                      <div className="PHeartFObesity" >
                      <Checkbox.Group
                  >
                    <Space direction="vertical">
                    <Checkbox value="Heart Failure" disabled={true} className="heartFailure">
                    Heart Failure (24 Hrs)
                    </Checkbox>
                    <Checkbox value="Obesity" disabled={true} className="Obesity">
                    Obesity
                    </Checkbox>
                    </Space>
                  </Checkbox.Group>
                  </div>
                      </Col>                  
                      <Col md={0} lg={4} xl={4}></Col>
                    </Row>
                  </Col>
                  <Col span={10} className="boredrRight1 hideDivider">
                  
                    <Row>
                      <Col md={9} lg={7} xl={7} xxl={7}  className="boredrRight">
                        <p className="pulseTxt f-12">
                          Loss <img src={downArrow} className="downArrow" />
                        </p>
                        <p className="pulseNmbr f-12">
                          {parseFloat(heartWeight?.minBound).toFixed(2)}
                        </p>
                        <p className="pulseNmbr f-12">
                        {parseFloat(obesityWeight?.minBound).toFixed(2)}
                        </p>
                      </Col>
                      <Divider style={{height:"100%"}} type="vertical"/>
                      <Col md={9} lg={7} xl={7} xxl={7} >
                        <p className="pulseTxt f-12">
                          Gain <img src={upArrow} className="downArrow" />
                        </p>
                        <p className="pulseNmbr f-12">
                          {parseFloat(heartWeight?.maxBound).toFixed(2)}
                        </p>
                        <p className="pulseNmbr  f-12">
                        {parseFloat(obesityWeight?.maxBound).toFixed(2)}
                        </p>
                      </Col>
                      <Col span={8}></Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col  md={12} lg={7} xl={7} xxl={7} className="mborder3Reverse">
                <Row>
                  <Col md={8} lg={7} xl={7}>
                    <p className="bloodPressureTxt f-12">Intraday</p>
                    <p className="systolicTxtNmbr f-12">{el?.intraPerc}</p>
                    <p className="bloodPressureTxt f-12">14 Day</p>
                    <p className="systolicTxtNmbr f-12">
                      {el?.fourteenDayPerc}
                    </p>
                  </Col>
                  <Col  md={8} lg={7} xl={7}>
                    <p className="bloodPressureTxt f-12">2 Day</p>
                    <p className="systolicTxtNmbr f-12">{el?.twoDayPerc}</p>
                    <p className="bloodPressureTxt f-12">30 Day</p>
                    <p className="systolicTxtNmbr f-12">
                      {el?.thirtyDayPerc}
                    </p>
                  </Col>
                  <Col  md={8} lg={8} xl={8} className="">
                    <p className="bloodPressureTxt f-12">5 Day</p>
                    <p className="systolicTxtNmbr f-12">{el?.fiveDayPerc}</p>
                    <p className="bloodPressureTxt f-12">Adherence % </p>
                    <p className="systolicTxtNmbr f-12">{el?.adherencePerc}</p>
                  </Col>
                </Row>
              </Col>
              <Col  md={12} lg={5} xl={5} xxl={5} className="mborder4Reverse">
                <Row>
               
                  <Col span={20} style={{textAlign:'center'}}>

                  <Radio.Group defaultValue={"lbs"} value={radioValue} onChange={(e) => handleRadioButton(e)}
                    >
                      <Radio value={"kgs"}>
                        <span className="fRadioGroup f-14">kgs</span>
                      </Radio>
                      <Radio value={"lbs"}>
                        <span className="fRadioGroup f-14">lbs</span>
                      </Radio>
                    </Radio.Group>
                  </Col>
                
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
                  <Col  md={12} lg={12} xl={8} xxl={6}>
                    <p className="diastolicTxt f-12">Indication</p>
                    <Row gutter={[20, 30]}>
                      <Col md={20} lg={16} xl={16} >
                      <div className="PHeartFObesity editView" >
                      <Checkbox.Group 
                      onChange={handleCheckBox}
                      value = {valueCheck}
                  >
                 
                    <Checkbox value="Heart Failure" className="heartFailure">
                    Heart Failure (24 Hrs)
                    </Checkbox>
                    <Checkbox value="Obesity" className="Obesity">
                    Obesity
                    </Checkbox>
                  </Checkbox.Group>
                  </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col  md={12} lg={12} xl={8} xxl={6}>
                    <p className="diastolicTxt f-12">Weight Change (Kg)</p>
                   
                    <Row gutter={[20, 30]}>
                    <Col span={7} >
                        <p className="pulseTxt f-12">
                          Loss <img src={downArrow} className="downArrow" />
                        </p>
                        <input
                          placeholder="Low"
                          name="minBound"
                          value={parseFloat(heartWeight?.minBound).toFixed(2)}
                          type="number"
                          className="inp"
                          onChange={handleHeartPercent}
                        />
                          <input
                          placeholder="Low"
                          name="minBound"
                          type = "number"
                          step = ".01"
                          className="inp"
                          value={parseFloat(obesityWeight?.minBound).toFixed(2)}
                          onChange={handleObesityPercent}

                        />
                      </Col>
                      <Divider style={{height:"100%"}} type="vertical"/>
                      <Col span={7}>
                        <p className="pulseTxt f-12">
                          Gain <img src={upArrow} className="downArrow" />
                        </p>
                     
                        <input
                          placeholder="High"
                          type="number"
                          name="maxBound"
                          step = ".01"
                          className="inp"
                          value={parseFloat(heartWeight?.maxBound).toFixed(2)}
                          onChange={handleHeartPercent}
                        />
                         <input
                          placeholder="High"
                          type="number"
                          name="maxBound"
                          step = ".01"
                          className="inp"
                          value={parseFloat(obesityWeight?.maxBound).toFixed(2)}
                          onChange={handleObesityPercent}
                          
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="diastolicColumn">
                    <Row gutter={[20, 30]}>
                      <Col md={7} lg={6} xl={4} xxl={3}>
                      <p className="diastolicTxt f-12">Intraday (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="intraPerc"
                          value={weightDays?.intraPerc}
                          onChange={handleWeightDays}
                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                      <Col  md={6} lg={6} xl={4} xxl={3}>
                      <p className="diastolicTxt f-12">2 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="twoDayPerc"
                          value={weightDays?.twoDayPerc}
                          onChange={handleWeightDays}
                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                      <Col  md={6} lg={6} xl={4} xxl={3}>
                      <p className="diastolicTxt f-12">5 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="fiveDayPerc"
                          value={weightDays?.fiveDayPerc}
                          onChange={handleWeightDays}
                        />
                      </Col>
                      <Divider className="divider dividerHeight hideDivider" type="vertical"/>
                      <Col  md={6} lg={6} xl={4} xxl={3}>
                      <p className="diastolicTxt f-12">14 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="fourteenDayPerc"
                          value={weightDays?.fourteenDayPerc}
                          onChange={handleWeightDays}

                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                      <Col  md={6} lg={6} xl={4} xxl={3}>
                      <p className="diastolicTxt f-12">30 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="thirtyDayPerc"
                          value={weightDays?.thirtyDayPerc}
                          onChange={handleWeightDays}

                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                      <Col  md={8} lg={6} xl={6} xxl={4} >
                      <p className="diastolicTxt f-12">Adherence (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="adherencePerc"
                          value={weightDays?.adherencePerc}
                          onChange={handleWeightDays}

                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col md={7} xl={5} lg={5} xxl={5}>
                <Row>
               
                  <Col span={20} style={{textAlign:'center'}}>
                  <Radio.Group
                      value={radioValue} onChange={handleRadioButton}
                    >
                      <Radio value={"kgs"}>
                        <span className="fRadioGroup f-14">kgs</span>
                      </Radio>
                      <Radio value={"lbs"}>
                        <span className="fRadioGroup f-14">lbs</span>
                      </Radio>
                    </Radio.Group>
                  </Col>
                </Row>
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
export default PatientWeight;
