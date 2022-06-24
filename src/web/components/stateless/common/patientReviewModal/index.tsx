import { Col, Form, Modal, Radio, Row, Checkbox, message, Spin } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPatientReview,
  fetchProviderOfPatient,
  patientReviewHistory,
} from "../../../../../redux/actions/patient/patientAction";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";
import {
  clearState,
  PatientStateSelector,
} from "../../../../../redux/reducers/patient/patientReducer";
import {
  ProviderStateSelector,
  setSelectedProvider,
} from "../../../../../redux/reducers/provider/providerReducer";
import { getFullName, removeEmptyKeys } from "../../../../../utility/utils";
// import { cptCodeOptions, diagnosisOptions, drgCodeOptions, recipientEmailOptions } from "../../../../constants/constants";
import Button from "../button";
import SelectInput from "../selectInput";
import TextArea from "../textArea";
import "./patientReviewModal.less";
import { PatientReviewTable } from "./patientReviewTable";
import CustomTooltip from "../../common/toolTip";
import { ReviewActionTypes } from "../../../../constants/enums";

const diagnosisOptions = [
  {
    value: `AMI - Acute Myocardial Infarction`,
    text: `AMI - Acute Myocardial Infarction`,
  },
  {
    value: `CM – Cardiomyopathy`,
    text: `CM – Cardiomyopathy`,
  },
  {
    value: `COPD – Chronic Obstructive Pulmonary Disease`,
    text: `COPD – Chronic Obstructive Pulmonary Disease`,
  },
  {
    value: `DM1 – Diabetes Mellitus, Type 1`,
    text: `DM1 – Diabetes Mellitus, Type 1`,
  },
  {
    value: `DM2 – Diabetes Mellitus, Type 1`,
    text: `DM2 – Diabetes Mellitus, Type 1`,
  },
  {
    value: ` HT – Hypertension`,
    text: ` HT – Hypertension`,
  },
  {
    value: `HF – Heart Failure`,
    text: `HF – Heart Failure`,
  },
  {
    value: `OBS - Obesity`,
    text: `OBS - Obesity`,
  },
];

const drgCodeOptions = [
  {
    value: "280 Acute myocardial infarction, discharged alive with mcc",
    text: "280 Acute myocardial infarction, discharged alive with mcc",
  },
  {
    value: "281 Acute myocardial infarction, discharged alive with cc",
    text: "281 Acute myocardial infarction, discharged alive with cc",
  },
  {
    text: "282 Acute myocardial infarction, discharged alive without cc/mcc",
    value: "282 Acute myocardial infarction, discharged alive without cc/mcc",
  },
  {
    text: "291 Heart failure and shock with mcc",
    value: "291 Heart failure and shock with mcc",
  },
  {
    text: "292 Heart failure and shock with cc",
    value: "292 Heart failure and shock with cc",
  },
  {
    text: "293 Heart failure and shock without cc/mcc",
    value: "293 Heart failure and shock without cc/mcc",
  },
  {
    text: "296 Cardiac arrest, unexplained with mcc",
    value: "296 Cardiac arrest, unexplained with mcc",
  },
  {
    text: "297 Cardiac arrest, unexplained with cc",
    value: "297 Cardiac arrest, unexplained with cc",
  },
  {
    text: "298 Cardiac arrest, unexplained without cc/mcc",
    value: "298 Cardiac arrest, unexplained without cc/mcc",
  },
  {
    text: "304 Hypertension with mcc",
    value: "304 Hypertension with mcc",
  },
  {
    text: "305 Hypertension without mcc",
    value: "305 Hypertension without mcc",
  },
  {
    text: "637 Diabetes with mcc",
    value: "637 Diabetes with mcc",
  },
  {
    text: "638 Diabetes with cc",
    value: "638 Diabetes with cc",
  },
  {
    text: "639 Diabetes without cc/mcc",
    value: "639 Diabetes without cc/mcc",
  },
];

const cptCodeOptions = [
  {
    value: "99453 – Patient Orientation",
    text: "99453 – Patient Orientation",
  },
  {
    value: "99454 – Data Collection",
    text: "99454 – Data Collection",
  },
  {
    value: "99091 – Review of Pt. Generated Data",
    text: "99091 – Review of Pt. Generated Data",
  },
  {
    text: "99424 – PCM – Provider – Initial 30 min - Patient Management – Care plan / patient management – patient not present",
    value:
      "99424 – PCM – Provider – Initial 30 min - Patient Management – Care plan / patient management – patient not present",
  },
  {
    text: "99425 – PCM – Provider – Add’l 30 min - Patient Management – Care plan / Patient management – patient not present add’l  30 min",
    value:
      "99425 – PCM – Provider – Add’l 30 min - Patient Management – Care plan / Patient management – patient not present add’l  30 min",
  },
  {
    text: "99426 – PCM – Staff – Initial 30 min - Patient Management – Care plan / patient management – patient not present",
    value:
      "99426 – PCM – Staff – Initial 30 min - Patient Management – Care plan / patient management – patient not present",
  },
  {
    text: "99427 – PCM – Staff – Add’l 30 min - Patient Management – Care plan / Patient management – patient not present add’l  30 min",
    value:
      "99427 – PCM – Staff – Add’l 30 min - Patient Management – Care plan / Patient management – patient not present add’l  30 min",
  },
  {
    text: "99358 – Extended E/M",
    value: "99358 – Extended E/M",
  },
];
export const PatientReviewModal = (props: any) => {
  const {
    isPatientReviewModalVisible,
    onReset,
    value,
    cancelCallback,
    patient,
  } = props;
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState<any[] | []>([]);
  const { selectedPatient, isReview, patientReviews, patientProvider } =
    useSelector(PatientStateSelector);
  // const {selectedProvider} = useSelector(ProviderStateSelector)
  const { appUser } = useSelector(AuthStateSelector);
  const [selectedProvider, setSelectedProvider] = useState<any>();
  const [emailFollowChk, setEmailFollowChk] = useState(false);
  const onEmailChk = () => {setEmailFollowChk(!emailFollowChk)};
  const { el } = props;
  const [form] = Form.useForm();

  const [patientReviewModal, setPatientReviewModal] = useState<any>({
    action: "",
    diagnosis: "",
    cptCode: "",
    drgCode: "",
    patientReviewnote: "",
    emailMessage: "",
    email: "",
    recordTime: 0,
  });

  useEffect(() => {
    var temp = patientReviews?.map((review) => {
      return {
        id: review?.id,
        patientId: review?.patientId,
        providerId: review?.providerId,
        action: review?.action,
        diagnosis: review?.diagnosis,
        cptCode: review?.cptCode,
        drgCode: review?.drgCode,
        patientReviewnote: review?.patientReviewnote,
        emailMessage: review?.emailMessage,
        email: review?.email,
        recordTime: review?.recordTime,
        providerName: review?.providerName,
        patientName: review?.patientName,
        createdAt: review?.createdAt,
        updatedAt: review?.updatedAt,
        deletedAt: review?.deletedAt,
      };
    });
    setTableData(temp);
  }, [patientReviews]);

  const onCancelCallback = () => {
    if (cancelCallback) {
      form.resetFields();
      // form.setFieldsValue({["*"] : "undefined"})
      setEmailFollowChk(false)
      setPatientReviewModal({
        action: "",
        diagnosis: "",
        cptCode: "",
        drgCode: "",
        patientReviewnote: "",
        emailMessage: "",
        email: "",
        recordTime: 0,
      })
      cancelCallback();
    }
  };
  useEffect(() => {
    if (isReview.isSuccess == true && isPatientReviewModalVisible) {
      dispatch(clearState());
      message.success({
        content: `${
          patient?.firstName + " " + patient?.lastName
        } reviewed successfully.`,
        key: "appNotification",
      });
      form.resetFields();
      setPatientReviewModal({
        action: "",
        diagnosis: "",
        cptCode: "",
        drgCode: "",
        patientReviewnote: "",
        emailMessage: "",
        email: "",
        recordTime: 0,
      })
      cancelCallback();
    } else if (isReview.isError) {
      message.error({
        content: isReview?.errorStack
          ? isReview?.errorStack
          : "Something went wrong",
        key: "appNotification",
      });
      dispatch(clearState());
    }
  }, [isReview.isSuccess, isReview.isError]);

  const patientProviderOptions = patientProvider.map((data) => {
    return {
      text: getFullName(
        data?.title,
        data.firstName,
        data?.middleName,
        data.lastName
      ),
      value: data?.email,
    };
  });

  useEffect(() => {
    dispatch(fetchProviderOfPatient(patient));
  }, [patient]);

  useEffect(() => {
    dispatch(
      patientReviewHistory({
        patientId: selectedPatient?.id,
        providerId: appUser?.id,
        startDate: moment().subtract(7, "days").format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
      })
    );
  }, [selectedPatient]);

  const handleSubmit = () => {
    dispatch(
      createPatientReview({
        ...removeEmptyKeys(patientReviewModal),
        providerId: appUser?.id,
        patientId: patient?.id,
        providerName: getFullName(
          appUser?.title,
          appUser?.firstName,
          appUser?.middleName,
          appUser?.lastName
        ),
      })
    );
  };

  const onRadioChange = (Event: any) => {
    setPatientReviewModal({
      ...patientReviewModal,
      ["recordTime"]: Event.target.value,
    });
  };
  const onReviewAction = (checkedValues: any[]) => {
    setPatientReviewModal({
      ...patientReviewModal,
      ["action"]: [...checkedValues],
    });
  };

  const emailAddressType = (value: any) => {
    setPatientReviewModal({
      ...patientReviewModal,
      ["email"]: value,
    });
  };

  const handleChange = (e: any) => {
    var { name, value } = e.target;
    setPatientReviewModal({ ...patientReviewModal, [name]: value });
  };
  const diagnosisType = (value: any) => {
    setPatientReviewModal({
      ...patientReviewModal,
      ["diagnosis"]: value,
    });
  };

  const drgCodeType = (value: any) => {
    setPatientReviewModal({
      ...patientReviewModal,
      ["drgCode"]: value,
    });
  };
  const cptCodeType = (value: any) => {
    setPatientReviewModal({
      ...patientReviewModal,
      ["cptCode"]: value,
    });
  };

  return (
    <Modal
      wrapClassName="patientReviewModal"
      centered
      footer={null}
      onCancel={onCancelCallback}
      visible={isPatientReviewModalVisible}
    >
      <Spin spinning={isReview.loading}>
        <Form id="patientReviewModal" form={form} layout="vertical" className="ptntForm" onFinish={handleSubmit}>
          <Row justify="space-between" className="ptntBorder">
            <Col span={8} lg={10} xl={12} md={24}>
              <span className="patientReview">
                Patient review action center{" "}
              </span>
            </Col>
            <Col span={16} lg={14} xl={12} md={24}>
              <Row>
                <Col span={24} className="patienttxt">
                  <span className="ptntHead">Patient Name : </span>
                  <CustomTooltip
                    content="show"
                    title={getFullName(
                      patient?.title,
                      patient?.firstName,
                      patient?.middleName,
                      patient?.lastName
                    )}
                    color="#ffffff"
                    placement="bottomLeft"
                  >
                    <span className="ptntHead customPara f-14 patientName slice">
                      {getFullName(
                        patient?.title,
                        patient?.firstName,
                        patient?.middleName,
                        patient?.lastName
                      )}
                    </span>
                  </CustomTooltip>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="f-12 ptntCheckbox" align="middle">
            <span
              className="f-14"
              style={{ marginRight: "40px", fontWeight: "700" }}
            >
              {" "}
              Review Action :
            </span>
            
            <Checkbox.Group onChange={onReviewAction} name="recallPatient" defaultValue={patientReviewModal?.action} 
            key={patientReviewModal?.action.toString()}
            >
              <Checkbox value={ReviewActionTypes.RECALL}>
                Recall Patient
              </Checkbox>
              <Checkbox value={ReviewActionTypes.ENGAGE}>
                Engage Patient
              </Checkbox>
              <Checkbox value={ReviewActionTypes.EMFOLLOWUP}>
                E/M Follow-up
              </Checkbox>
              <Checkbox
                onClick={onEmailChk}
                value={ReviewActionTypes.EMAILFOLLOWUP}
              >
                E-Mail Follow Up
              </Checkbox>
            </Checkbox.Group>
          </Row>
          <Row gutter={20} className="ptntSelect">
            <Col span={8}>
              <SelectInput
                labelSubName="Diagnosis"
                placeholder="select"
                name="diagnosis"
                rules={[
                  {
                    required: false,
                    message: "Please select Diagnosis",
                  },
                ]}
                className="diagnosis-dropdown"
                bordered={true}
                value={patientReviewModal.diagnosis}
                optionValue={diagnosisOptions}
                onChange={diagnosisType}
              ></SelectInput>
            </Col>

            <Col span={8} className="ddldrgCode">
              <SelectInput
                labelSubName="DRG Code"
                placeholder="select"
                name="drgCode"
                className="drg-code"
                bordered={true}
                value={patientReviewModal.drgCode}
                optionValue={drgCodeOptions}
                onChange={drgCodeType}
              ></SelectInput>
            </Col>

            <Col span={8}>
              <SelectInput
                labelSubName="CPT Code"
                placeholder="select"
                name="cptCode"
                className="cpt-code"
                bordered={true}
                value={patientReviewModal.cptCode}
                optionValue={cptCodeOptions}
                onChange={cptCodeType}
              ></SelectInput>
            </Col>
          </Row>
          <Row className="txtReviewbBottom" >
            <Col span={24} className="ptntText reviewNote">
              <TextArea
                placeholder="Patient Review Notes"
                name="patientReviewnote"               
                rules={[
                  {
                    required: true,
                    message: "Please Enter Review Notes",
                  },
                ]}
                labelSubName="Add Patient Review Notes"
                value={patientReviewModal.patientReviewnote}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row gutter={22}>
            <Col span={15} >
              <Row>
                <Col span={24} className="ptntText">
                  <TextArea
                    labelSubName="Add Email Message"
                    placeholder="Email Message"
                    name="emailMessage"
                    rules={[
                      {
                        required: emailFollowChk,
                        message: "Please enter the email message",
                      },
                    ]}
                    value={patientReviewModal.email}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={9} className="recipientEmail">
              <SelectInput
                 key={patientReviewModal?.action.toString()}

                labelSubName="Select Recipient Email Address"
                placeholder="select"
                name="email"
                className="drg-code"
                bordered={true}
                rules={[
                  {
                    required: emailFollowChk,
                    message: "Please enter the email message",
                  },
                ]}
                value={selectedProvider?.email}
                // value={patientReviewModal.email}
                optionValue={patientProviderOptions}
                onChange={emailAddressType}
                mode="multiple"
              ></SelectInput>
            </Col>
          </Row>
          <Row justify="space-between" className="lastRow">
            <Col span={24} className="grpRadio">
              Record Time
            </Col>
            <Col span={16} md={12} lg={16} className="txtRecord grpRadio">
              <Radio.Group
              name="recallPatient"
                className="rdoBtn"
                value={patientReviewModal.recordTime}
                defaultValue={0}
                onChange={onRadioChange}
              >
                <Radio value={0}>None</Radio>
                <Radio value={5}>5min</Radio>
                <Radio value={10}>10min</Radio>
                <Radio value={15}>15min</Radio>
                <Radio value={20}>20min</Radio>
                <Radio value={30}>30min</Radio>
             
              </Radio.Group>
            </Col>
            <Col span={8} md={12} lg={8} className="rdoBtn">
              <Row gutter={16} justify="end">
                {" "}
                <Col span={10}>
                  <div className="primary"  
                  onClick={onCancelCallback}
                                      >
                 cancel
                  </div>
                  
                </Col>
                <Col span={10}>
                  <Button
                    type="primary"
                    className="btnsubmit"
                    htmlType="submit"
                    form="patientReviewModal"
                  >
                    SUBMIT
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="txtReview">
            <Col span={24} className="txtHistory">
              Patients Review History
            </Col>
            <Col span={24}>
              <Spin spinning={isReview.loading}>
                <PatientReviewTable eventTable={tableData} />
              </Spin>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};
