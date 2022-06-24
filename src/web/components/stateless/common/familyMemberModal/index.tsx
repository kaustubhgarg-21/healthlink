import { Col, Form, message, Modal, Row, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignFamily, fetchRelationships } from "../../../../../redux/actions/patient/patientAction";
import { fetchRoles } from "../../../../../redux/actions/role/roleAction";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";
import { clearState, PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer";
import { RoleStateSelector } from "../../../../../redux/reducers/role/roleReducer";
import { concatNames, getCountriesList } from "../../../../../utility/appUtil";
import { removeEmptyKeys } from "../../../../../utility/utils";
import { titleOptions } from "../../../../constants/constants";
import { UserRoles } from "../../../../constants/enums";
import { RegExpressions } from "../../../../constants/regexp";
import Button from "../button";
import InputBox from "../inputBox";
import { PhoneInput } from "../phoneInput";
import SelectInput from "../selectInput";
import "./familyMemberModal.less"

interface FamilyMemberModalProps {
  confirmCallback?: Function,
  isModalVisible: boolean,
  confirmButton: string | null,
  cancelButton: string | null,
  cancelCallback: Function,
  setIsModalVisible: any
}
const FamilyMemberModal = (props: FamilyMemberModalProps) => {
  const { confirmCallback, isModalVisible, cancelCallback, setIsModalVisible } = props;
  const { relationShips, selectedPatient, isApproved } = useSelector(PatientStateSelector)
  const dispatch = useDispatch();
  const { appUser } = useSelector(AuthStateSelector)
  const [familyDetails, setFamilyDetails] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    email: "",
    relationshipId: "",
    contactNumber: "",
    mobileNumber: "",
  })
  const [form] = Form.useForm()
  const onConfirmCallback = () => {
    if (confirmCallback) {
      confirmCallback();
    }
  };
  const onCancelCallback = () => {
    if (cancelCallback) {
      form.resetFields()
      cancelCallback();
     
    }
  };
  const handleChange = (e: any) => {
    var { name, value } = e.target;
    setFamilyDetails({ ...familyDetails, [name]: value })
  }
  console.log(familyDetails, 49)
  const handleSubmit = (e: any) => {
    console.log(familyDetails, 58);
  }

  useEffect(() => {
    dispatch(fetchRelationships())
  }, [])

  const sendRequestFamily = () => {
    dispatch(assignFamily(
      removeEmptyKeys({
        ...familyDetails, organisationId: appUser?.orgId, patientId: selectedPatient?.id,

      })
    ))
  }

  useEffect(() => {
    if (isApproved.isSuccess) {
      message.success("Request sent successfully")
      setIsModalVisible(false)
      dispatch(clearState())
    } else if (isApproved.isError) {
      message.error({content:isApproved.errorStack ? isApproved.errorStack : "Something went wrong", key:"appNotification"})
      dispatch(clearState())
    }
  }, [isApproved.isSuccess, isApproved.isError])

  const getRelationOptions = () => {
    if (relationShips) {
      return relationShips?.map((type) => {
        return (
          {
            text: type.name,
            value: type.id
          }
        )
      })
    } else return []
  }
  const titleType = (value: any) => {
    setFamilyDetails({ ...familyDetails, ["title"]: value });
  }

  const relationType = (value: any) => {
    setFamilyDetails({ ...familyDetails, ["relationshipId"]: value })
  }

  const handleCountrySelect = (value: any) => {
    setFamilyDetails({
      ...familyDetails,
      ["country"]: value,
    });
  };
  // const detectChange=()=>{
  //   if(setDisableSave){
  //     setDisableSave(false)
  //   }
  // }
  return (
    <Modal
      wrapClassName="familyModal"
      onCancel={onCancelCallback}
      centered
      footer={null}
      visible={isModalVisible}
    >
<Spin spinning={isApproved.loading}>
      <Form form={form} layout="vertical" onFinish={sendRequestFamily}>
        <Row className="familyCardHead">Add Patient Family Member</Row>
        <Row className="patientFamily">
          <p className="family">Patient Name: <span className="familyName">{concatNames(selectedPatient?.firstName, selectedPatient?.lastName, selectedPatient?.middleName)}</span> &nbsp; &nbsp; &nbsp; P-MRN:<span className="familyName">{selectedPatient.mrn}</span> </p>
        </Row>
        <Row gutter={[10, 20]}>
          <Col className="patientLeftDetails" md={4} lg={4} xl={4}>
            <SelectInput
              labelSubName="Title"
              placeholder="select"
              name="title"
              className="title-dropdown"
              bordered={true}
              value={familyDetails?.title}
              optionValue={titleOptions}
              onChange={titleType}
            />
          </Col>
          <Col className="patientLeftDetails" md={9} lg={9} xl={9}>
            <InputBox
              labelSubName="First Name"
              name="firstName"
              value={familyDetails?.firstName}
              rules={[
                {
                  required: true,
                  message: "Please enter your first name",
                },
                {
                  pattern: RegExpressions.FirstName,
                  message: "Please enter valid name"
                }
              ]}
              onChange={handleChange}
            />
          </Col>
          <Col className="patientLeftDetails" md={3} lg={3} xl={3}>
            <InputBox
              labelSubName="MI"
              name="middleName"
              rules={[{
                pattern: RegExpressions.Middlename,
                message: "Invalid MI"
              }]}
              value={familyDetails?.middleName}
              onChange={handleChange}
            />
          </Col>
          <Col className="patientLeftDetails" md={8} lg={8} xl={8}>
            <InputBox
              labelSubName="Last Name"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please enter your last name",
                },
                {
                  pattern: RegExpressions.LastName,
                  message: "Please enter valid name"
                }
              ]}
              value={familyDetails?.lastName}
              onChange={handleChange}
            />
          </Col>

          <Col className="patientLeftDetails" md={24} lg={24} xl={24}>
            <InputBox
              labelSubName="Address 1"
              name="address1"
              value={familyDetails?.address1}
              rules={[
                {
                  required: true,
                  message: "Please enter your Address",
                },

              ]}
              onChange={handleChange}
            />
          </Col>
          <Col className="patientLeftDetails" md={24} lg={24} xl={24}>
            <InputBox
              labelSubName="Address 2"
              name="address2"
              value={familyDetails?.address2}
              rules={[
                {
                  required: false,
                  message: "Please enter your Address",
                },

              ]}
              onChange={handleChange}
            />
          </Col>
          <Col className="patientLeftDetails" md={6} lg={6} xl={6}>
            <InputBox
              labelSubName="City"
              name="city"
              value={familyDetails?.city}
              rules={[
                {
                  required: true,
                  message: "Please enter the city",
                },
                {
                  pattern: RegExpressions.City,
                  message: "Please enter valid city"
                }
              ]}
              onChange={handleChange}
            />
          </Col>
          <Col className="patientLeftDetails" md={6} lg={6} xl={6} >
            <InputBox
              labelSubName="State/Province"
              name="state"
              value={familyDetails?.state}
              rules={[
                {
                  required: true,
                  message: "Please enter state/province",
                },
                {
                  pattern: RegExpressions.State,
                  message: "Please enter valid state/province"
                }
              ]}
              onChange={handleChange}
            />
          </Col>
          <Col className="patientLeftDetails" md={6} lg={6} xl={6}>
            <InputBox
              labelSubName="Zip/Postal Code"
              name="zipCode"
              value={familyDetails?.zipCode}
              placeholder="eg. 00000-0000"
              rules={[
                {
                  required: true,
                  message: "Please enter Zip/Postal code",
                },
                {
                  pattern: RegExpressions.ZipCode,
                  message: "Please enter valid Zip/Postal code",
                },
              ]}
              onChange={handleChange}
            />
          </Col>
          <Col className="patientLeftDetails" md={6} lg={6} xl={6}>
            <SelectInput
              labelSubName="Country"
              placeholder="Select country"
              name="country"
              value={familyDetails?.country}
              rules={[
                {
                  required: true,
                  message: "Please select your Country",
                },
              ]}
              className="card-dropdown with-search"
              bordered={true}
              optionValue={getCountriesList()}
              onChange={handleCountrySelect}
              showSearch
            />
          </Col>
          <Col className="patientLeftDetails" md={12} lg={12} xl={12}>
            <InputBox
              labelSubName="Email Address"
              name="email"
              value={familyDetails?.email}
              rules={[
                {
                  required: false,
                  message: "Please select your Country",
                },
                {
                  pattern: RegExpressions.Email,
                  message: "Please enter valid email"
                }
              ]}
              className="card-dropdown with-search"
              bordered={true}
              onChange={handleChange}
              showSearch
            />
          </Col>
          <Col md={12} lg={12} xl={12}>
            <SelectInput
              labelSubName="Relation"
              placeholder="select"
              name="relationshipId"
              value={familyDetails?.relationshipId}
              rules={[
                {
                  required: true,
                  message: "Please select your Relation",
                },
              ]}
              className="title-dropdown"
              bordered={true}
              optionValue={getRelationOptions()}
              onChange={relationType}
            />
          </Col>
          <Col md={12} lg={12} xl={12}>
            <PhoneInput
              name="contactNumber"
              label="Contact Number"
              value={familyDetails?.contactNumber}
              setObj={setFamilyDetails}
              onChange={handleChange}
              obj={familyDetails}
              detectChange={()=>{}}
            />
          </Col>
          <Col md={12} lg={12} xl={12}>
            <PhoneInput
              name="mobileNumber"
              label="Mobile Number"
              onChange={handleChange}
              value={familyDetails?.mobileNumber}
              rules={{
                required: true,
                message: "",
              }}
              setObj={setFamilyDetails}
              obj={familyDetails}
              detectChange={()=>{}}
            />
          </Col>

        </Row>
        <Row className="sendReqBtn">
          <Col md={6} lg={7} xl={7}>
            <Button type="primary">Send Request</Button>
          </Col>
        </Row>
      </Form>
    </Spin>  
    </Modal>

  )
}
export default FamilyMemberModal;