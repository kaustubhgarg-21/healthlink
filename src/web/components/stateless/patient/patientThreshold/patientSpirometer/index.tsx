import { Card, Col, Divider, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateThresholdForPatientByAssignee } from "../../../../../../redux/actions/hrm/hrmActions";
import { useSelector } from "react-redux";
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer";
import { getFullName, removeEmptyKeys } from "../../../../../../utility/utils";
import { downArrow, upArrow } from "../../../../../images";
import { ThresholdBounds } from "../../../../../models/patient/patientThresholds";
import Button from "../../../common/button";
import SelectInput from "../../../common/selectInput";
import { patientStateSelector } from "../../../../../../redux/reducers/hrm/hrmReducer";

const PatientSpirometer = (props: any) => {
  const { el, isEditable } = props;
  const dispatch = useDispatch()
  const [bloodPressureDiagno, setBloodPressureDiagno] = useState<any>(el);
  const [FVCBound, setFVCBound] = useState<ThresholdBounds>({} as ThresholdBounds);
  const [FEV1Bound, setFEV1Bound] = useState<ThresholdBounds>({} as ThresholdBounds);
  const [PEFBound, setPEFBound] = useState<ThresholdBounds>({} as ThresholdBounds);
  const [FEV6Bound, setFEV6Bound] = useState<ThresholdBounds>({} as ThresholdBounds);
  const [FEV1Ratio , setFEV1Ratio] =useState<ThresholdBounds>({} as ThresholdBounds);
  const { appUser } = useSelector(AuthStateSelector)
  const [disabled, setDisabled] = useState(true)
  const { isUpdated } = useSelector(patientStateSelector);
  const [spirodays, setSpirodays] = useState({
    intraPerc: el?.intraPerc,
    twoDayPerc: el?.twoDayPerc,
    fiveDayPerc: el?.fiveDayPerc,
    fourteenDayPerc: el?.fourteenDayPerc,
    thirtyDayPerc: el?.thirtyDayPerc,
    adherencePerc: el?.adherencePerc,
    compliancePerc: el?.compliancePerc
  })

  // to be removed just for demo
  useEffect(() => {
    const fvc = el?.patientThresholdBounds?.filter((el: any) => {
      return el?.boundType === "fvc"
    });
    const fev1 = el?.patientThresholdBounds?.filter((el: any) => {
      return el?.boundType === "fev1"
    });
    const pef = el?.patientThresholdBounds?.filter((el: any) => {
      return el?.boundType === "pef"
    });
    const fev6 = el?.patientThresholdBounds?.filter((el: any) => {
      return el?.boundType === "fev6"
    });
    const fev1R = el?.patientThresholdBounds?.filter((el: any) => {
      return el?.boundType === "fev1R"
    });
    setFVCBound(fvc[0]);
    setFEV1Bound(fev1[0]);
    setPEFBound(pef[0]);
    setFEV6Bound(fev6[0])
    setFEV1Ratio(fev1R[0])
  }, [props])
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

  
  const fvcHandleChange = (e: any) => {
    var { name, value } = e.target;
    setFVCBound({ ...FVCBound, [name]: value })
  }

  const fev1HandleChange = (e: any) => {
    var { name, value } = e.target;
    setFEV1Bound({ ...FEV1Bound, [name]: value? parseFloat(value): "" })
  }

  const fev1RatioHandleChange = (e: any) => {
    var { name, value } = e.target;
    setFEV1Ratio({ ...FEV1Ratio, [name]: value })
  }

  const pefHandleChange = (e: any) => {
    var { name, value } = e.target;
    setPEFBound({ ...PEFBound, [name]: value })
  }

  const fev6HandleChange = (e: any) => {
    var { name, value } = e.target;
    setFEV6Bound({ ...FEV6Bound, [name]:  value })
  }

  const handleSpiroChange = (e: any) => {
    var { name, value } = e.target;
    if(value>=0 && value<101){
    setSpirodays({ ...spirodays, [name]: value })
  }}
  const handleSubmit = (e: any) => {
    dispatch(updateThresholdForPatientByAssignee({ id: el.id, ...removeEmptyKeys(spirodays), bounds: [removeEmptyKeys(FEV1Bound)] }))
  };
  const handleCancel=()=>{
    setEditView(true)
    setSpirodays({
      intraPerc: el?.intraPerc,
      twoDayPerc: el?.twoDayPerc,
      fiveDayPerc: el?.fiveDayPerc,
      fourteenDayPerc: el?.fourteenDayPerc,
      thirtyDayPerc: el?.thirtyDayPerc,
      adherencePerc: el?.adherencePerc,
      compliancePerc: el?.compliancePerc
    })
    const fvc = el?.patientThresholdBounds?.filter((el: any) => {
      return el?.boundType === "fvc"
    });
    const fev1 = el?.patientThresholdBounds?.filter((el: any) => {
      return el?.boundType === "fev1"
    });
    const pef = el?.patientThresholdBounds?.filter((el: any) => {
      return el?.boundType === "pef"
    });
    const fev6 = el?.patientThresholdBounds?.filter((el: any) => {
      return el?.boundType === "fev6"
    });
    const fev1R = el?.patientThresholdBounds?.filter((el: any) => {
      return el?.boundType === "fev1R"
    });
    setFVCBound(fvc[0]);
    setFEV1Bound(fev1[0]);
    setPEFBound(pef[0]);
    setFEV6Bound(fev6[0])
    setFEV1Ratio(fev1R[0])

  }
  useEffect(() => {
    if (isUpdated.isSuccess) {
      setEditView(true)
    }
  }, [isUpdated.isSuccess, isUpdated.isError])
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
              <Col md={12} lg={8} xl={8} xxl={8}>
                <Row>
                  <Col span={8} md={8} lg={6} xl={6} style={{borderRight: "1px solid rgba(137, 137, 137, 0.2)"}}>
                    <p className="bloodPressureTxt f-12">Spirometer</p>
                    <p className="systolicTxt f-12">FVC (L)</p>
                    <p className="systolicTxt f-12">FEV1(L)</p>
                    <p className="systolicTxt f-12">PEF(L/min)</p>
                    <p className="systolicTxt f-12">FEV6(L)</p>
                    <p className="systolicTxt f-12">FEV1 / FEV6</p>


                  </Col>
                  <Divider style={{height:"100%"}} type="vertical"/>
                  <Col span={6}>
                      <p className="bloodPressureTxt f-12">
                        Low <img src={downArrow} className="downArrow" />{" "}
                      </p>
                      <p className="systolicTxtNmbr f-12">{FVCBound?.minBound ? FVCBound?.minBound : "-"}</p>
                      <p className="systolicTxtNmbr f-12">{FEV1Bound?.minBound}</p>
                      <p className="systolicTxtNmbr f-12">{PEFBound?.minBound ? PEFBound?.minBound : "-"}</p>
                     
                      <p className="systolicTxtNmbr f-12">{FEV6Bound?.minBound ? FEV6Bound?.minBound : "-"}</p>
                      <p className="systolicTxtNmbr f-12">{FEV1Ratio?.minBound ? FEV1Ratio?.minBound : "-"}</p>

                    </Col>
                    <Col span={6} md={6} lg={6} xl={6} style={{borderRight: "1px solid rgba(137, 137, 137, 0.2)"}}>
                      <p className="bloodPressureTxt f-12">
                        High <img src={upArrow} className="downArrow" />{" "}
                      </p>
                      <p className="systolicTxtNmbr f-12">{FVCBound?.maxBound ? FVCBound?.maxBound : "-"}</p>
                      <p className="systolicTxtNmbr f-12">{FEV1Bound?.maxBound}</p>
                      <p className="systolicTxtNmbr f-12">{PEFBound?.maxBound ? PEFBound?.maxBound : "-"}</p>
                      <p className="systolicTxtNmbr f-12">{FEV6Bound?.maxBound ? FEV6Bound?.maxBound : "-"}</p>
                      <p className="systolicTxtNmbr f-12">{FEV1Ratio?.maxBound ? FEV1Ratio?.maxBound : "-"}</p>

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
              <Col  md={12} lg={5} xl={5} xxl={5} className="mborder4Reverse">
                <Row>
                  <Col span={20}></Col>
                  <Col span={4} style={{textAlign:'right'}}>
                    {isEditable ?
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
                  <Col span={6} md={6} lg={8} xl={7}>
                    <p className="diastolicTxt f-12">FVC (L)</p>
                    <Row gutter={[20, 30]}>
                      <Col span={12}>
                        <input
                          placeholder="Low"
                          type="text"
                          className="inp"
                          disabled={disabled}
                          name="minBound"
                          value={FVCBound?.minBound}
                          onChange={fvcHandleChange}
                        />
                      </Col>
                      <Col span={12}>
                        <input
                          placeholder="High"
                          type="text"
                          className="inp"
                          disabled={disabled}

                          name="maxBound"
                          value={FVCBound?.maxBound}
                          onChange={fvcHandleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Divider style={{height:'5.4vh'}} className="divider dividerHeight" type="vertical"/>
                  <Col span={6} md={6} lg={8} xl={7}>
                    <p className="diastolicTxt f-12">FEV1 (L)</p>
                    <Row gutter={[20, 30]}>
                      <Col span={12}>
                        <input
                          placeholder="Low"
                          name="minBound"
                          value={FEV1Bound?.minBound}
                          type="number"
                          className="inp"
                          onChange={fev1HandleChange}
                        />
                      </Col>
                      <Col span={12}>
                        <input
                          placeholder="High"
                          type="number"
                          name="maxBound"
                          className="inp"
                          value={FEV1Bound?.maxBound}
                          onChange={fev1HandleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Divider style={{height:'5.4vh'}} className="divider dividerHeight" type="vertical"/>
                  <Col span={6} md={6} lg={8} xl={7}>
                    <p className="diastolicTxt f-12">PEF (L/min)</p>
                    <Row gutter={[20, 30]}>
                      <Col span={12}>
                        <input
                          placeholder="Low"
                          type="text"
                          className="inp"
                          name="minBound"
                          disabled={disabled}
                          value={PEFBound?.minBound}
                          onChange={pefHandleChange}
                        />
                      </Col>
                      <Col span={12}>
                        <input
                          placeholder="High"
                          type="text"
                          className="inp"
                          disabled={disabled}
                          name="maxBound"
                          value={PEFBound?.maxBound}
                          onChange={pefHandleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={6} md={6} lg={8} xl={7}>
                    <p className="diastolicTxt f-12">FEV6 (L)</p>
                    <Row gutter={[20, 30]}>
                      <Col span={12}>
                        <input
                          placeholder="Low"
                          type="text"
                          className="inp"
                          name="minBound"
                          disabled={disabled}
                          value={FEV6Bound?.minBound}
                          onChange={fev6HandleChange}
                        />
                      </Col>
                      <Col span={12}>
                        <input
                          placeholder="High"
                          type="text"
                          className="inp"
                          disabled={disabled}
                           name="maxBound"
                          value={FEV6Bound?.maxBound}
                          onChange={fev6HandleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Divider style={{height:'5.4vh'}} className="divider dividerHeight" type="vertical"/>
                  <Col span={6} md={6} lg={8} xl={7}>
                    <p className="diastolicTxt f-12">FEV1 / FEV6</p>
                    <Row gutter={[20, 30]}>
                      <Col span={12}>
                        <input
                          placeholder="Low"
                          name="minBound"
                          value={FEV1Ratio?.minBound}
                          type="number"
                          disabled={disabled}
                          className="inp"
                          onChange={fev1RatioHandleChange}
                        />
                      </Col>
                      <Col span={12}>
                        <input
                          placeholder="High"
                          type="number"
                          name="maxBound"
                          className="inp"
                          value={FEV1Ratio?.maxBound}
                          disabled={disabled}
                          onChange={fev1RatioHandleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="diastolicColumn">
                    <Row gutter={[20, 30]}>
                      <Col span={3} md={7} lg={6} xl={5} xxl={3}>
                      <p className="diastolicTxt f-12">Intraday (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="intraPerc"
                          value={spirodays.intraPerc}
                          onChange={handleSpiroChange}
                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                      
                      <Col span={3} md={6} lg={6} xl={5} xxl={3}>
                      <p className="diastolicTxt f-12">2 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="twoDayPerc"
                          value={spirodays.twoDayPerc}
                          onChange={handleSpiroChange}
                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                      <Col span={3} md={6} lg={6} xl={5} xxl={3}>
                      <p className="diastolicTxt f-12">5 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="fiveDayPerc"
                          value={spirodays.fiveDayPerc}
                          onChange={handleSpiroChange}
                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                      <Col span={3} md={6} lg={6} xl={5} xxl={3}>
                      <p className="diastolicTxt f-12">14 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="fourteenDayPerc"
                          value={spirodays.fourteenDayPerc}
                          onChange={handleSpiroChange}
                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                      <Col span={3} md={6} lg={6} xl={5} xxl={3}>
                      <p className="diastolicTxt f-12">30 day (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="thirtyDayPerc"
                          value={spirodays.thirtyDayPerc}
                          onChange={handleSpiroChange}
                        />
                      </Col>
                      <Divider className="divider dividerHeight" type="vertical"/>
                      <Col span={4} md={8} lg={7} xl={5} xxl={4}>
                      <p className="diastolicTxt f-12">Adherence (1-100)%</p>
                        <input
                          placeholder="1%-100%"
                          type="text"
                          className="inp"
                          name="adherencePerc"
                          value={spirodays.adherencePerc}
                          onChange={handleSpiroChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col  md={7} xl={5} lg={5} xxl={5}>
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
  )
}
export default PatientSpirometer;