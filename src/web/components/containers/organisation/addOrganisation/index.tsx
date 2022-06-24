import { Card, Col, Row, Spin, Typography } from "antd";
import Form from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import InputBox from "../../../stateless/common/inputBox";
import SelectInput from "../../../stateless/common/selectInput";
import Button from "../../../stateless/common/button";
import { Upload, message } from "antd";
import "./addOrganisation.less";
import { PlusOutlined } from "@ant-design/icons";
import ProfileIcon from "../../../stateless/common/profileThumbnail";
import { camera, circle } from "../../../../images";
import { AppRoutes } from "../../../../router/appRoutes";
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import countriesTimezones, { getTimezonesForCountry } from 'countries-and-timezones';
import { PhoneInput } from "../../../stateless/common/phoneInput";
import Organization from "../../../../models/organization/organizaton";
import { ModalSecondaryMessages, ModalType, OrganizationTypeCodes, UnsavedChangesWarnModal } from "../../../../constants/enums";
import { useDispatch, useSelector } from "react-redux";
import { clearState, OrganizationStateSelector } from "../../../../../redux/reducers/organization/organizationReducer";
import { createdOrganization } from "../../../../../redux/actions/organization/organizationActions";
import WarnModal from "../../../stateless/common/warnModal";
import { useHistory } from "react-router-dom";
import { statusOptions } from "../../../../constants/constants";
import TextArea from "../../../stateless/common/textArea";
import { OrganizationService } from "../../../../services/organization/organizationService";
import { getUniqueZones, removeEmptyKeys } from "../../../../../utility/utils";
import WarnUnsavedChanges from "../../../stateless/common/warnUnSaveChanges";
import { getCountriesList } from "../../../../../utility/appUtil";
import { RegExpressions } from "../../../../constants/regexp";

const timeZonesMoment = require('moment-timezone')

const AddOrganisation = (props: any) => {
  const { formState, selectedOrganization } = useSelector(OrganizationStateSelector)
  const dispatch = useDispatch()
  const history = useHistory()
  const [saveInit, setSaveInit] = useState(false)
  const [showModal, setShowModal] =useState(false)
  const [detectOrgFormChange, setDetectOrgFormChange]= useState(true)
  const [timeZones, setZones] = useState<any>([])
  const [primaryContact, setPrimary] = useState({
    isPrimary: true,
    firstName: "",
    lastName: "",
    middleName: "",
    phoneNumber: "",
    mobile: "",
    email: "",
  })
  const [secondary, setSecondary] = useState({
    isPrimary: false,
    firstName2: "",
    lastName2: "",
    middleName2: "",
    phoneNumber2: "",
    mobile2: "",
    email2: "",
  })
  const [organisationDetails, setDetails] = useState<Organization | any>({
    id: null,
    levelCode: OrganizationTypeCodes.organization,
    parentId: null,
    orgName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    isActive: false,
    country: "",
    zipcode: "",
    timezone: "",
    imageURL: "",
    notes: "",
    contacts: [primaryContact, secondary],
  });
  const orgSrv = new OrganizationService()
  useEffect(() => {
    setDetails({ ...organisationDetails, contacts: [removeEmptyKeys(primaryContact), removeEmptyKeys({  
      isPrimary: false,
      firstName: secondary?.firstName2? secondary?.firstName2: "",
      lastName: secondary?.lastName2? secondary?.lastName2: "",
      middleName: secondary?.middleName2? secondary?.middleName2: "",
      email: secondary?.email2? secondary?.email2: "",
      mobile: secondary?.mobile2?  secondary?.mobile2: "",
      phoneNumber: secondary?.phoneNumber2? secondary?.phoneNumber2 : ""
      })] })
  }, [primaryContact,secondary])

  useEffect(()=>{
    if(formState.isSuccess == true){
      setShowModal(true)
      setDetectOrgFormChange(false)

      dispatch(clearState())
    }else if(formState.isError){
      message.error({content:formState.errorStack ? formState.errorStack : "Something went wrong" , key:"appNotification"})
      dispatch(clearState())
    }
  },[formState.isSuccess, formState.isError])
  const onModalClose = () => {
    history.push(AppRoutes.ORGANIZATIONLIST)
  }
  const handleChange = (e: any) => {
    var { name, value } = e.target;
    setDetails({ ...organisationDetails, [name]: value });

  };
  const handlePrimaryChange = (e: any) => {
    var { name, value } = e.target
    setPrimary({ ...primaryContact, [name]: value })
  }
  const handleSecondaryChange = (e: any) => {
    var { name, value } = e.target
    setSecondary({ ...secondary, [name]: value })
  }
  const handleSubscriptionStatus = (value: any) => {
    setDetails({ ...organisationDetails, isActive: value });
  };

  const handleTimezone = (value: any) => {
    setDetails({ ...organisationDetails, timezone: value });
  };

  const onSubmit = () => {
    dispatch(createdOrganization(removeEmptyKeys(organisationDetails)))
  };

  useEffect(()=>{
    var a=Object.keys(organisationDetails).filter((items)=>items!="isActive" && items!="levelCode" && items!="zipcode" && items!="contacts").reduce( (res:any, key: any) => (res[key] = organisationDetails[key], res), {} );
       let test =removeEmptyKeys(a)
    if( Object.keys(test).length > 0){
      setDetectOrgFormChange(true)
  
    }else {
      setDetectOrgFormChange(false)
  
    }
  }, [organisationDetails])

  const handleUpload = async ({ fileList }: any) => {  
    var form = new FormData();
    form.append("logo", fileList?.[0].originFileObj);
    if(form){
    orgSrv.uploadImage(form).then(data=>setDetails({
      ...organisationDetails,
      imageURL:data,
    })).catch(e=> message.error("Failed to upload image."))
  }
}
const handleCountrySelect = (value: any) => {
  setDetails({ ...organisationDetails, ["country"]: value, ["timezone"]: null })
}
  const breadCrumbs = [
    {
      text: "Dashboard",
      link: AppRoutes.LANDING,
    },
    {
      text: "Organizations",
      link: AppRoutes.ORGANIZATIONLIST,
    },
  ];
  const handleBeforeUpload = async (file: any, fileList: any) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 0.25;
    if (!isLt2M) {
      message.error("Image must smaller than 250K!");
    }
    const isValid = await checkImageWH(file, 250, 250);
    return isJpgOrPng && isLt2M && isValid ? false : Upload.LIST_IGNORE;
  };

  const checkImageWH = (file: any, width: number, height: number) => {
    return new Promise<boolean>(function (resolve, reject) {
      let filereader = new FileReader();
      filereader.onload = (e: any) => {
        let src = e.target.result;
        const image: any = new Image();
        image.onload = function () {
          if (
            (this.width && this.width > width) ||
            (this.height && this.height > height)
          ) {
            message.error(
              "Please upload picture of size less than or equal to " +
              width +
              " * " +
              height
            );
            return false;
          } else {
            resolve(true);
          }
        };
        image.onerror = reject;
        image.src = src;
      };
      filereader.readAsDataURL(file);
    });
  };
  const getBase64 = (file: any) => {
    return new Promise<string| any>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  useEffect(()=>{
    var x:any = organisationDetails?.country? organisationDetails.country : ""
    if (x) {
      var temp:any[] =  getUniqueZones(countriesTimezones.getTimezonesForCountry(x))
      setZones(
        temp?.map((zone:any)=>{
          return {
            text: `${x} ${timeZonesMoment().tz(zone?.name).format("z")} (GMT ${zone?.utcOffsetStr})`,
            value: `${timeZonesMoment().tz(zone?.name).format("z")} (GMT ${zone?.utcOffsetStr})`
          }
        })
      );
    }
},[organisationDetails?.country])
  return (
    <Spin spinning={formState.loading}>
      <div className="">
      <Row className="innerHeader" gutter={30}>
        <Col span={20}>
          <Breadcrumbs breadcrumbs={breadCrumbs} />
          <span className="brdOrganisations f-20">Add Organization</span>
        </Col>
        <Col span={4} className="addAd">
          <Button type="primary" className="brdOrganisations"  htmlType="submit" form="organisationAdd">
            save
          </Button>
        </Col>
      </Row>
      </div>

      {/* <div className="addOrgCardContainer"> */}
      <CompWrapper observeOn="innerHeader" name="infoContainerOrg">
      <div className="addOrgCardContainer">
      <Card  className="infoContainerOrg" >
        <Form id="organisationAdd" layout="vertical" onFinish={onSubmit} key={organisationDetails?.timezone}>
          <Row>
            <Col span={6} style={{ textAlign: "center" }}>
              <Upload
                beforeUpload={handleBeforeUpload}
                maxCount={1}
                openFileDialogOnClick={true}
                onChange={handleUpload}
                showUploadList={false}
              >
                {organisationDetails?.imageURL ? (
                  <div className="uploadContainer f-10">
                  <ProfileIcon src={organisationDetails?.imageURL} size="100" />
                  <span>
                      Upload Logo JPG, PNG, Max Size 250K Max Resolution 250px X
                      250px,
                    </span>
                    <span>
                      <img src={circle} className="circleImg"></img>
                      <img src={camera} className="cameraImg"></img>
                    </span>
                  {/* <span>
                      <img src={circle} className="circleImg" style={{bottom:"3rem", left:"3.563rem"}}></img>
                      <img src={camera} className="cameraImg" style={{bottom:"3rem", left:"2rem"}}></img>
                    </span> */}
                    </div>
                ) : (
                  <div className="uploadContainer f-10">
                    <div className="orgInfoLogo">
                      <PlusOutlined />
                      <p>Logo</p>
                    </div>
                    <span>
                      Upload Logo JPG, PNG, Max Size 250K Max Resolution 250px X
                      250px,
                    </span>
                    <span>
                      <img src={circle} className="circleImg"></img>
                      <img src={camera} className="cameraImg"></img>
                    </span>
                  </div>
                )}
              </Upload>
            </Col>

                <Col span={18}>
                  <Row gutter={[10, 10]}>
                    <Col span={18} md={16}>
                      <InputBox
                        labelSubName="Organization Name"
                        placeholder="Organization Name"
                        initialValue={organisationDetails?.orgName}
                        name="orgName"
                        value={organisationDetails.orgName}
                        rules={[
                          {
                            required: true,
                            message: "Please enter organization name",
                          },
                          {
                            pattern: RegExpressions.OrgName,
                            message: "Please enter valid organization name"
                          }
                        ]}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col span={6} md={8}>
                      <SelectInput
                        labelSubName="Subscription Status"
                        placeholder="select"
                        name="status"
                        className="card-dropdown with-search"
                        bordered={true}
                        initialValue={organisationDetails?.isActive}
                        value={organisationDetails.isActive}
                        optionValue={statusOptions}
                        onChange={handleSubscriptionStatus}
                      />
                    </Col>
                    <Col span={12}>
                      <InputBox
                        labelSubName="Address 1"
                        name="address1"
                        initialValue={organisationDetails?.address1}
                        value={organisationDetails.address1}
                        rules={[
                          {
                            required: true,
                            message: "Please enter organization address.",
                          },
                        ]}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col span={12}>
                      <InputBox
                        labelSubName="Address 2"
                        name="address2"
                        initialValue={organisationDetails?.address2}
                        value={organisationDetails.address2}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col span={6} md={12} lg={6} xl={6}>
                                    <InputBox
                                        labelSubName="City"
                                        name="city"
                                        initialValue={organisationDetails?.city}
                                        value={organisationDetails?.city}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please select city",
                                            },
                                            {
                                                pattern: RegExpressions.City,
                                                message: "Please enter valid city"
                                            }
                                        ]}
                                        className="card-dropdown with-search"
                                        bordered={true}
                                        onChange={handleChange}
                                    />

                                </Col>
                                <Col span={6} md={12} lg={6} xl={6}>
                                    <InputBox
                                        labelSubName="State/Province"
                                        name="state"
                                        initialValue={organisationDetails?.state}
                                        value={organisationDetails?.state}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please select state",
                                            },
                                            {
                                                pattern: RegExpressions.State,
                                                message: "Please enter valid city"
                                            }
                                        ]}
                                        className="card-dropdown with-search"
                                        bordered={true}
                                        onChange={handleChange}
                                    />

                                </Col>
                                <Col span={6} md={12} lg={6} xl={6}>
                                    <SelectInput
                                        labelSubName="Country"
                                        placeholder="Select country"
                                        name="country"
                                        initialValue={organisationDetails?.country}
                                        value={organisationDetails?.country}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please select Country",
                                            },
                                        ]}
                                        className="card-dropdown with-search"
                                        bordered={true}
                                        optionValue={
                                            getCountriesList()
                                        }
                                        onChange={handleCountrySelect}
                                        showSearch
                                    />
                                </Col>
                    <Col md={12} lg={6} xl={6}>
                      <InputBox
                        labelSubName="Zip/Postal Code"
                        name="zipcode"
                        initialValue={organisationDetails?.zipcode}
                        value={organisationDetails.zipcode}
                        placeholder="eg. 00000-0000"
                        rules={[
                          {
                            required: true,
                            message: "Please enter zip/postal code",
                          },
                          {
                            pattern: RegExpressions.ZipCode, 
                            message: "Please enter valid Zip/Postal code",
                          }
                        ]}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={[30, 30]} className="timeZoneRow">
                <Col span={6}>
                  <SelectInput
                    labelSubName="TimeZone"
                    placeholder="Select timezone"
                    name="timezone"
                    initialValue={organisationDetails?.timezone}
                    value={organisationDetails?.timezone}
                    rules={[
                      {
                        required: true,
                        message: "Please select timezone",
                      },
                    ]}
                    className="card-dropdown with-search"
                    bordered={true}
                    optionValue={timeZones}
                    onChange={handleTimezone}
                  />
                </Col>
                <Col span={18}>
                <TextArea labelSubName ="Notes" name="notes" value={organisationDetails.notes} onChange={handleChange} />
                </Col>
              </Row>
              <Row gutter={[30, 10]} className="form-container">
                <Col span={24} className="primaryContactCol">
                  <Typography className="contactCol">
                    Primary Contact Details<span className="redAstericks">*</span>
                  </Typography>
                </Col>
                <Col md={6} lg={6} xl={4}>
                  <InputBox
                    labelSubName="First Name"
                    name="firstName"
                    initialValue={primaryContact?.firstName}
                    value={primaryContact.firstName}
                    rules={[
                      {
                        required: true,
                        message: "Please enter first name",
                      },
                      {
                        pattern: RegExpressions.FirstName,
                        message: "Please enter valid name"
                      }
                    ]}
                    onChange={handlePrimaryChange}
                  />
                </Col>
                <Col md={4} lg={3} xl={2}>
                  <InputBox
                    labelSubName="MI"
                    name="middleName"
                    initialValue={primaryContact?.middleName}
                    value={primaryContact.middleName}
                    rules={[{
                      pattern: RegExpressions.Middlename,
                      message: "Invalid MI"
                  }]}
                    onChange={handlePrimaryChange}
                  />
                </Col>
                <Col md={6} lg={6} xl={4}>
                  <InputBox
                    labelSubName="Last Name"
                    name="lastName"
                    initialValue={primaryContact?.lastName}
                    value={primaryContact.lastName}
                    rules={[
                      {
                        required: true,
                        message: "Please enter last name",
                      },
                      {
                        pattern: RegExpressions.LastName,
                        message: "Please enter valid name"
                      }
                    ]}
                    onChange={handlePrimaryChange}
                  />
                </Col>
                <Col md={8} lg={6} xl={4}>
                  <PhoneInput
                    name="phoneNumber"
                    label="Contact Number"
                    mask = "(999) 999-999"
                    obj={primaryContact}
                    setObj={setPrimary}
                    expanded= "true"
                    detectChange={()=>{}}

                  />
                </Col>
                <Col md={8} lg={6} xl={4}>
                  <PhoneInput
                    name="mobile"
                    label="Mobile Number"
                    rules={{
                      required: true,
                      message: "",
                    }}
                    obj={primaryContact}
                    setObj={setPrimary}
                    expanded= "true"
                    detectChange={()=>{}}

                  />
                </Col>
                <Col md={8} lg={6} xl={6}>
                  <InputBox
                    labelSubName="Email Address"
                    name="email"
                    initialValue={primaryContact?.email}
                    value={primaryContact.email}
                    rules={[
                      {
                        required: true,
                        message: "Please enter email address",
                      },
                        {
                         pattern: RegExpressions.Email,
                         message: "Please enter valid email"
                        }
                    ]}
                    onChange={handlePrimaryChange}
                  />
                </Col>
              </Row>
              <Row gutter={[30, 10]}>
                <Col span={24} className="primaryContactCol">
                  <Typography className="contactCol rowMargin">
                    Support Contact Details
                  </Typography>
                </Col>
                <Col md={6} lg={6} xl={4}>
                  <InputBox
                    labelSubName="First Name"
                    name="firstName2"
                    initialValue={secondary?.firstName2}
                    value={secondary.firstName2}
                    rules={[
                      {
                        required: true,
                        message: "Please enter first name",
                      },
                      {
                        pattern: RegExpressions.FirstName,
                        message: "Please enter valid name"
                      }
                    ]}
                    onChange={handleSecondaryChange}
                  />
                </Col>
                <Col md={4} lg={3} xl={2}>
                  <InputBox
                    labelSubName="MI"
                    name="middleName2"
                    rules={[{
                      pattern: RegExpressions.Middlename,
                      message: "Invalid MI"
                  }]}
                  initialValue={secondary?.middleName2}
                    value={secondary.middleName2}
                    onChange={handleSecondaryChange}
                  />
                </Col>
                <Col md={6} lg={6} xl={4}>
                  <InputBox
                    labelSubName="Last Name"
                    name="lastName2"
                    rules={[{
                      required: true,
                      message: "Please enter last name",
                    },                      {
                      pattern: RegExpressions.LastName,
                      message: "Please enter valid name"
                    }
                    ]}
                    initialValue={secondary?.lastName2}
                    value={secondary.lastName2}
                    onChange={handleSecondaryChange}
                  />
                </Col>
                <Col md={8} lg={6} xl={4}>
                  <PhoneInput
                    name="phoneNumber2"
                    label="Contact Number"
                    obj={secondary}
                    setObj={setSecondary}
                    expanded= "true"
                    detectChange={()=>{}}
                  />
                </Col>
                <Col  md={8} lg={6} xl={4}>
                  <PhoneInput
                    name="mobile2"
                    rules={{
                      required: true,
                      message: "",
                    }}
                    label="Mobile Number"
                    obj={secondary}
                    setObj={setSecondary}
                    expanded= "true"
                    detectChange={()=>{}}
                  />
                </Col>
                <Col md={8} lg={6} xl={6}>
                  <InputBox
                    labelSubName="Email Address"
                    name="email2"
                    rules={[
                      {
                        required: true,
                        message: "Please enter email address",
                      },
                      {
                       pattern: RegExpressions.Email,
                       message: "Please enter valid email"
                      }
                  ]}
                  initialValue={secondary?.email2}
                    value={secondary.email2}
                    onChange={handleSecondaryChange}
                  />
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      </CompWrapper>
      <WarnModal cancelButton={null} confirmButton={null} isModalVisible={showModal} type={ModalType.SUCCESS} cancelCallback={onModalClose} primaryText={selectedOrganization? selectedOrganization?.orgName: ""} secondaryText={ModalSecondaryMessages.ENTITY_ADDED}/>
      <WarnUnsavedChanges
        ignorePrompt={saveInit}
        navigateOnCancel={true}
        title={UnsavedChangesWarnModal.TITLE}   
        content={UnsavedChangesWarnModal.CONTENT}
        cancelBtnText={UnsavedChangesWarnModal.DISCARD_BTN_TEXT}
        confirmBtnText={UnsavedChangesWarnModal.CONFIRM_BTN_TEXT}
        isDirty = {detectOrgFormChange }
      />
    </Spin>

  );
};
export default AddOrganisation;
