import {
  Card,
  Col,
  Divider,
  Radio,
  Row,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateThresholdForPatientByAssignee } from "../../../../../../redux/actions/hrm/hrmActions";
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer";
import {
  patientStateSelector,
} from "../../../../../../redux/reducers/hrm/hrmReducer";
import {
  convertCelciusToFarhenheit,
  getFullName,
  removeEmptyKeys,
} from "../../../../../../utility/utils";
import {
  downArrow,
  upArrow,
} from "../../../../../images";
import { ThresholdBounds } from "../../../../../models/patient/patientThresholds";
import Button from "../../../common/button";
import SelectInput from "../../../common/selectInput";
import "./patientTemprature.less";

const PatientTemprature = (props: any) => {
  const { el, isEditable } = props;
  const [tempDaigno, settempDaigno] = useState<any>(el);
  const [radioValue, setRadioValue] = useState("C");
  const [maxTemp, setMaxTemp] = useState(el.maxTemp);
  const [minTemp, setMinTemp] = useState(el.minTemp);
  const [temprature, setTempratureBound] = useState<ThresholdBounds>(
    {} as ThresholdBounds
  );
  const { appUser } = useSelector(AuthStateSelector);
  const { isUpdated } = useSelector(patientStateSelector);
  const [tempDays, setTempDays] = useState({
    intraPerc: el?.intraPerc,
    twoDayPerc: el?.twoDayPerc,
    fiveDayPerc: el?.fiveDayPerc,
    fourteenDayPerc: el?.fourteenDayPerc,
    thirtyDayPerc: el?.thirtyDayPerc,
    adherencePerc: el?.adherencePerc,
    compliancePerc: el?.compliancePerc,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const celcius = el?.patientThresholdBounds?.filter((el: any) => {
      return el?.boundType === "temperature";
    });
    setTempratureBound(celcius[0]);
  }, [props]);
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
 const handleTempratureChange = (e: any) => {
    var { name, value } = e.target;
    setTempratureBound({
      ...temprature,
      [name]: value ? parseFloat(value) : "",
    });
  };

  const handleTempChange = (e: any) => {
    var { name, value } = e.target;
    if(value>=0 && value<101){
    setTempDays({ ...tempDays, [name]: value ? value : null });
   } };
  const handleCancel = () => {
    setEditView(true);
    setTempDays({
      intraPerc: el?.intraPerc,
      twoDayPerc: el?.twoDayPerc,
      fiveDayPerc: el?.fiveDayPerc,
      fourteenDayPerc: el?.fourteenDayPerc,
      thirtyDayPerc: el?.thirtyDayPerc,
      adherencePerc: el?.adherencePerc,
      compliancePerc: el?.compliancePerc,
    })
    const celcius = el?.patientThresholdBounds?.filter((el: any) => {
      return el?.boundType === "temperature";
    });
    setTempratureBound(celcius[0]);
  };
  const handleSubmit = () => {
    dispatch(
      updateThresholdForPatientByAssignee({
        id: el?.id,
        ...removeEmptyKeys(tempDays),
        bounds: [removeEmptyKeys(temprature)],
      })
    );
  };

  const handleRadioButton = async (e: any) => {
    setRadioValue(e.target.value);
    if (e.target.value === "F") {
      let max = await convertCelciusToFarhenheit(parseInt(temprature?.maxBound));
      let min = await convertCelciusToFarhenheit(parseInt(temprature?.minBound));
      setMaxTemp(max);
      setMinTemp(min)
    } else {
      setMinTemp(temprature?.minBound);
      setMaxTemp(temprature?.maxBound);
    }
  };
  useEffect(() => {
    setMinTemp(temprature?.minBound);
    setMaxTemp(temprature?.maxBound);
  }, [temprature?.minBound, temprature?.maxBound]);
  useEffect(() => {
    if (isUpdated.isSuccess) {
      setEditView(true);
    }
  }, [isUpdated.isSuccess, isUpdated.isError]);
  return (
    <div className="bpCardContainer">
      <Card className="bpCard">
        <Row>
          <Col md={12} lg={4} xl={4} xxl={4} className="BPpatientName">
            <Row>
              <Col span={16}>
                <Typography className="drTxt f-16">
                  {el.ThresholdAssigner
                    ? getFullName(
                        el.ThresholdAssigner?.title,
                        el?.ThresholdAssigner?.firstName,
                        el?.ThresholdAssigner?.middleName,
                        el?.ThresholdAssigner?.lastName
                      )
                    : getFullName(
                        appUser?.title,
                        appUser?.firstName,
                        appUser?.middleName,
                        appUser?.lastName
                      )}
                </Typography>
                <Typography className="bpCardTxt">
                  {el?.ThresholdAssigner?.providerType},
                </Typography>
                <Typography className="bpCardTxt">
                  {el?.ThresholdAssigner?.specialtyType}
                </Typography>
              </Col>
            </Row>
          </Col>
          {editView ? (
            <>
              <Col md={12} lg={7} xl={7} xxl={7}>
                <Row style={{ height: "100%" }}>
                  <Col xl={5} md={0} lg={5}></Col>
                  <Col
                    span={10}
                    md={18}
                    lg={12}
                    style={{
                      borderRight: "1px solid rgba(137, 137, 137, 0.2)",
                    }}
                    className="hideDivider"
                  >
                    <p className="glucoTxt f-12">
                      Temperature (<span>&#176;</span>{radioValue} )
                    </p>
                    <Row>
                      <Col span={10} md={9} lg={9}>
                        <p className="glucoTxt f-12">
                          Low <img src={downArrow} className="downArrow" />
                        </p>
                        <p className="glucoNmbr f-12">{minTemp}</p>
                      </Col>
                      <Divider style={{ height: "100%" }} type="vertical" />
                      <Col span={10} md={9} lg={9}>
                        <p className="glucoTxt f-12">
                          High <img src={upArrow} className="downArrow" />
                        </p>
                        <p className="glucoNmbr f-12">{maxTemp}</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col md={12} lg={8} xl={8} xxl={8} className="mborder3Reverse">
                <Row>
                  <Col span={7}>
                    <p className="bloodPressureTxt f-12">Intraday %</p>
                    <p className="systolicTxtNmbr f-12">{el?.intraPerc}</p>
                    <p className="bloodPressureTxt f-12">14 Day %</p>
                    <p className="systolicTxtNmbr f-12">
                      {el?.fourteenDayPerc}
                    </p>
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
                  <Col
                    span={20}
                    style={{ textAlign: "center" }}
                  >
                    <Radio.Group
                      className="tempRdo"
                      defaultValue={"C"}
                      value={radioValue}
                      onChange={(e) => handleRadioButton(e)}
                    >
                      <Radio value={"F"}>
                        <span className="fRadioGroup f-14">
                          <span>&#176;</span>F
                        </span>
                      </Radio>
                      <Radio value={"C"}>
                        <span className="fRadioGroup f-14">
                          <span>&#176;</span>C
                        </span>
                      </Radio>
                    </Radio.Group>
                  </Col>
                  <Col span={4} style={{ textAlign: "right" }}>
                    {isEditable ? (
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
                    ) : (
                      <span className="material-icons-outlined pencilIcon">
                        edit
                      </span>
                    )}
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
                  <Col xxl={6} md={12} lg={8} xl={7}>
                    <p className="diastolicTxt f-12">
                      Temperature (<span>&#176;</span>F)
                    </p>
                    <Row gutter={[20, 30]}>
                      <Col span={12}>
                        <input
                          placeholder="Low"
                          type="number"
                          step="any"
                        
                          className="inp"
                          name="minBound"
                          value={temprature?.minBound}
                          onChange={handleTempratureChange}
                        />
                      </Col>
                      <Col span={12}>
                       
                        <input
                        
                            placeholder="High"
                            type="number"
                            className="inp"
                            name="maxBound"
                            value={temprature?.maxBound}
                            onChange={handleTempratureChange}
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
                          value={tempDays.intraPerc}
                          onChange={handleTempChange}
                        />
                      </Col>
                      <Divider
                        className="divider dividerHeight"
                        type="vertical"
                      />
                      <Col span={3} md={6} lg={5} xl={4} xxl={3}>
                        <p className="diastolicTxt f-12">2 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="twoDayPerc"
                          value={tempDays.twoDayPerc}
                          onChange={handleTempChange}
                        />
                      </Col>
                      <Divider
                        className="divider dividerHeight"
                        type="vertical"
                      />
                      <Col span={3} md={6} lg={5} xl={4} xxl={3}>
                        <p className="diastolicTxt f-12">5 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="fiveDayPerc"
                          value={tempDays.fiveDayPerc}
                          onChange={handleTempChange}
                        />
                      </Col>
                      <Divider
                        className="divider dividerHeight hideDivider"
                        type="vertical"
                      />
                      <Col span={3} md={6} lg={5} xl={4} xxl={3}>
                        <p className="diastolicTxt f-12">14 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="fourteenDayPerc"
                          value={tempDays.fourteenDayPerc}
                          onChange={handleTempChange}
                        />
                      </Col>
                      <Divider
                        className="divider dividerHeight"
                        type="vertical"
                      />
                      <Col span={3} md={6} lg={5} xl={4} xxl={3}>
                        <p className="diastolicTxt f-12">30 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="thirtyDayPerc"
                          value={tempDays.thirtyDayPerc}
                          onChange={handleTempChange}
                        />
                      </Col>
                      <Divider
                        className="divider dividerHeight"
                        type="vertical"
                      />
                      <Col span={4} md={8} lg={6} xl={5} xxl={4}>
                        <p className="diastolicTxt f-12">Adherence (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="adherencePerc"
                          value={tempDays.adherencePerc}
                          onChange={handleTempChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col md={7} xl={5} lg={5} xxl={5}>
                <Row>
                  <Col
                    span={20}
                    className="cradio"
                    style={{ textAlign: "center" }}
                  >
                    <Radio.Group
                      name="tempFormat"
                      defaultValue={"C"}
                      onChange={handleRadioButton}
                    >
                      <Radio value={"F"}>
                        <span className="fRadioGroup f-14">
                          <span>&#176;</span>F
                        </span>
                      </Radio>
                      <Radio value={"C"}>
                        <span className="fRadioGroup f-14">
                          <span>&#176;</span>C
                        </span>
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

               
                <Row
                  className="thresholdSaveBtn"
                  gutter={[20, 30]}
                  justify="end"
                >
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
export default PatientTemprature;
