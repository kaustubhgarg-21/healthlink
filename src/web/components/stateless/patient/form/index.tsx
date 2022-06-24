import {
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  message,
  Radio,
  Row,
  Upload,
} from "antd";
import { camera, circle } from "../../../../images";
import InputBox from "../../common/inputBox";
import ProfileIcon from "../../common/profileThumbnail";
import { PlusOutlined } from "@ant-design/icons";
import "./patientForm.less";
import moment from "moment";
import SelectInput from "../../common/selectInput";
import { getCountriesList } from "../../../../../utility/appUtil";
import countriesTimezones from 'countries-and-timezones';
import Button from "../../common/button";
import { PhoneInput } from "../../common/phoneInput";
import { titleOptions, userStatusOptions } from "../../../../constants/constants";
import { useEffect, useState } from "react";
import { UserService } from "../../../../services/user/userServices";
import { fetchRoles } from "../../../../../redux/actions/role/roleAction";
import { useDispatch , useSelector} from "react-redux";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";
import { getUniqueZones } from "../../../../../utility/utils";
import { PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer";
import { RegExpressions } from "../../../../constants/regexp";


const timeZonesMoment = require('moment-timezone')

export const PatientForm = (props: any) => {
  const { setPatientForm,addPatientNextDisabled, onSubmit, formID, patientForm, setSelectedTab ,roleOptions, disableStatus, disableUserName, setDisableSave , detectPatientFormChange,
  disableSave, setDetectPatientFormChange, cancelCallback} =
    props;
    const [timeZones, setZones] = useState<any>([])
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(false)
    const [formDisable,setDisable]=useState(true)
    const {appUser} = useSelector(AuthStateSelector)
    const {selectedPatient} = useSelector(PatientStateSelector)

    const userSrv = new UserService()
  const onChange = (Event: any) => {
    setPatientForm({
      ...patientForm,
      ["gender"]: Event.target.value,
    });
  };

  useEffect(() => {
    var x: any = patientForm?.country ? patientForm.country : "";
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
  }, [patientForm?.country]);

  const roleStatus = (value: any) => {
    setPatientForm({
      ...patientForm,
      ["roleId"]: value,
    });
  };

  const titleType = (value:any)=>{
    setPatientForm({...patientForm,["title"]: value});
  }

  const StatusChange = (value: any) => {
    setPatientForm({
      ...patientForm,
      ["status"]: value,
    });
  };

  const timeZoneChange = (value: any) => {
    setPatientForm({
      ...patientForm,
      timezone: value,
    });
  };

  function handleChange(Event: any) {
    setPatientForm({
      ...patientForm,
      [Event.target.name]: Event.target.value,
    });
  }
  function onChecked(checkedValues: any){
    setPatientForm({...patientForm,["preferredCommumnication"]: checkedValues.join(",")})
  }
  const plainOptions = ["SMS", "Email"];

  useEffect(()=>{
    dispatch(fetchRoles({organizationId: appUser?.orgId}))
},[])

  const handleCountrySelect = (value: any) => {
    setPatientForm({
      ...patientForm,
      ["country"]: value,
    });
  };

  const handleUpload = async ({ fileList }: any) => {
    var form = new FormData();
    form.append("avatar", fileList?.[0].originFileObj);
    if(form){
        userSrv.uploadImage(form).then(data=>setPatientForm({
          ...patientForm, ["imageUrl"]:data,
        })).catch(e=> message.error("Failed to upload image."))
      }
  };

  function onDatePick(date: any, dateString: any) {
    setPatientForm({
      ...patientForm,
      ["dob"]: moment(dateString, "MM/DD/YYYY").format("YYYY-MM-DD")
    });
  }
  const onUserNameCheck = (e: any) => {
    const {checked} = e.target
    setChecked(checked)
    if(checked){
      setPatientForm({
        ...patientForm,
        ["username"]: patientForm["email"]
      });
  }else{
    setPatientForm({
      ...patientForm,
      ["username"]: "",
    })
  } }

  const handleNext = () => {
    setSelectedTab("2");
    
  };

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


  const enableCheckbox = () =>{
    if (!patientForm?.email?.length){
      return true
    }else{
      return false
    }
  }

  const detectChange=()=>{
    if(setDisableSave){
      setDisableSave(false)
    }
  }
  return (
    <>
      <Card className="addPatient" key={patientForm?.country}>
        <Form layout="vertical" id={formID} onFinish={onSubmit} key={`${checked.toString()} ${patientForm?.gender}`} onValuesChange={detectChange}
          >
          <Row gutter={[20, 25]}>
            <Col span={6}>
              <Form.Item name="imageUrl" initialValue={patientForm?.imageUrl}>
              <Upload
                beforeUpload={handleBeforeUpload}
                maxCount={1}
                openFileDialogOnClick={true}
                onChange={handleUpload}
                showUploadList={false} 
                name="imageUrl"
              >
                {patientForm?.imageUrl ? (
                  <div className="uploadContainer f-10">
                  <ProfileIcon src={patientForm?.imageUrl} size="100" />
                  <span>
                      Upload Picture JPG, PNG, Max Size 250K Max Resolution 250px X
                      250px,
                    </span>
                    <span>
                      <img src={circle} className="circleImg"></img>
                      <img src={camera} className="cameraImg"></img>
                    </span>
                    </div>
                ) : (
                  <div className="uploadContainer f-10">
                    <div className="orgInfoLogo">
                      <PlusOutlined />
                      <p>Profile Picture</p>
                    </div>
                    <span>
                      Upload Picture JPG, PNG, Max Size 250K Max Resolution 250px X
                      250px,
                    </span>
                    <span>
                      <img src={circle} className="circleImg"></img>
                      <img src={camera} className="cameraImg"></img>
                    </span>
                  </div>
                )}
              </Upload>
              </Form.Item>
            </Col>

            <Col span={18}>
              <Row gutter={[20, 40]}>
                <Col className="patientLeftDetails" md={12} lg={3} xl={3}>
                   <SelectInput
                    labelSubName="Title"
                    placeholder="select"
                    name="title"
                    className="title-dropdown"
                    bordered={true}
                    value={patientForm.title}
                    initialValue={patientForm.title}
                    optionValue={titleOptions}
                    onChange={titleType}
                  />
                </Col>
                <Col className="patientLeftDetails" span={9} md={12} lg={9} xl={9}>
                  <InputBox
                    labelSubName="First Name"
                    name="firstName"
                    initialValue={patientForm.firstName}
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
                    onChange={handleChange}
                  />
                </Col>
                <Col className="patientLeftDetails" md={12} lg={3} xl={3}>
                  <InputBox
                    labelSubName="MI"
                    name="middleName"
                    initialValue={patientForm.middleName}
                    rules={[{
                      pattern: RegExpressions.Middlename,
                      message: "Invalid MI"
                  }]}
                    onChange={handleChange}
                  />
                </Col>
                <Col className="patientLeftDetails" span={9} md={12} lg={9} xl={9}>
                  <InputBox
                    labelSubName="Last Name"
                    name="lastName"
                    initialValue={patientForm.lastName}
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
                    onChange={handleChange}
                  />
                </Col>
                <Col className="patientLeftDetails" span={7} lg={7} xl={7} md={12}>
                  <Row gutter={[0, 5]}>
                    <Col span={24}>
                      <Form.Item
                        label="Date Of Birth"
                        name="dob"
                        rules={[
                          {
                            required: true,
                            message: "Please select the date of birth",
                          },
                        ]}
                      
                      initialValue={patientForm?.dob ? moment(patientForm?.dob) : undefined}
                      >
                        <DatePicker
                        name="dob"
                        key={patientForm?.dob}
                          className="dobPicker"
                          format={"MM-DD-YYYY"}
                          onChange={onDatePick}
                          placeholder="select date"
                          defaultValue={patientForm?.dob ? moment(patientForm?.dob) : undefined}
                          />

                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col className="patientLeftDetails genderCol" lg={17} xl={17} md={12}>
                  <div className="rdAddpatient">
                  <Form.Item
                    label="Gender"
                    name="gender"
                    initialValue={patientForm?.gender}
                    rules={[
                      {
                        required: true,
                        message: "Please enter ",
                      },
                    ]}
                    
                  >
                    <div className="" >
                      <Radio.Group
                      name="gender"
                        onChange={onChange}
                        value={patientForm.gender}
                      >
                        <Radio value="male">Male</Radio>
                        <Radio value="female" className="rdfemale">Female</Radio>
                        <Radio value="non-binary">Non Binary</Radio>
                        <Radio value="other">Other</Radio>
                      </Radio.Group>
                    </div>
                  </Form.Item>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={[20, 25]} justify="space-between">
            <Col className="patientLeftDetails" span={6} md={8} lg={6} xl={6}>
              <InputBox
                labelSubName="P-MRN (Patient Medical Record Number)"
                name="mrn"
                
                initialValue={patientForm?.mrn}
                rules={[
                  {
                    required: true,
                    message: "Please enter MRN",
                  },
                  {
                    pattern: RegExpressions.MRN,
                    message: "MRN must contain minimum 10 charaters"
                    
                  }
                ]}
                value={patientForm?.mrn}
                onChange={handleChange}
              />
            </Col>
         
            <Col className="patientLeftDetails" span={18} md={16} lg={18} xl={18}>
              <InputBox
                labelSubName="Address 1"
                name="address1"
                initialValue={patientForm.address1}
                rules={[
                  {
                    required: true,
                    message: "Please enter address",
                  },
                ]}
                value={patientForm.address1}
                onChange={handleChange}
              />
            </Col>
            <Col span={6} md={8} lg={6} xl={6}>
                <InputBox
                labelSubName="H-MRN (HealthLink Medical Record Number)"
                name="hmrn"
                initialValue={selectedPatient?.id}
                disabled
                value={selectedPatient?.id}
                onChange={handleChange}
              />         
            </Col>
            <Col className="patientLeftDetails" span={18} md={16} lg={18} xl={18}>
              <InputBox
                labelSubName="Address 2"
                name="address2"
                initialValue={patientForm.address2}
                rules={[
                  {
                    required: false,
                    message: "Please enter ",
                  },
                ]}
                value={patientForm.address1}
                onChange={handleChange}
              />
            </Col>
            <Col span={24}>
            <Row gutter={20}>
            <Col span={6} md={8} lg={6} xl={6}>
            <SelectInput
                key={patientForm?.roleId}
                labelSubName="Role"
                placeholder="select"
                name="role"
                className="card-dropdown with-search"
                bordered={true}
                initialValue={patientForm.roleId}
                value={patientForm.roleId}
                rules={[
                  {
                    required: true,
                    message: "Please enter timezone",
                  },
                ]}
                optionValue={roleOptions}
                disabled
                onChange={roleStatus}
              />
            </Col>
            <Col className="patientLeftDetails" span={5} md={16} lg={6} xl={4}>
              <InputBox
                labelSubName="City"
                name="city"
                initialValue={patientForm.city}
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
                value={patientForm.city}
                onChange={handleChange}
              />
            </Col>
            <Col className="patientLeftDetails" xl={5} md={8} lg={5}>
              <InputBox
                labelSubName="State/Province"
                name="state"
                initialValue={patientForm.state}
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
                value={patientForm.state}
                onChange={handleChange}
              />
            </Col>
            <Col className="patientLeftDetails" md={16} lg={6} xl={4}>
              <InputBox
                labelSubName="Zip/Postal Code"
                name="zipCode"
                initialValue={patientForm?.zipCode}
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
                value={patientForm?.zipCode}
                onChange={handleChange}
              />
            </Col>
            <Col className="patientLeftDetails" span={5} md={8} lg={5}>
              <SelectInput
                labelSubName="Country"
                placeholder="Select country"
                name="country"
                initialValue={patientForm.country}
                rules={[
                  {
                    required: true,
                    message: "Please select the Country",
                  },
                ]}
                className="card-dropdown with-search"
                bordered={true}
                value={patientForm.country}
                optionValue={getCountriesList()}
                onChange={handleCountrySelect}
                showSearch
              />
            </Col>
            </Row>
            </Col>
            <Col  md={4} lg={3} xl={3}>
            <SelectInput
                disabled= {disableStatus}
                labelSubName="Status"
                placeholder="select"
                name="status"
                className="card-dropdown with-search"
                bordered={true}
                initialValue={disableStatus? "Invited": patientForm.status}
                optionValue={userStatusOptions}
                onChange={StatusChange}
              />
            </Col>
            <Col  md={4} lg={3} xl={3}>
              <SelectInput
                labelSubName="TimeZone"
                placeholder="select"
                name="timezone"
                className="card-dropdown with-search"
                bordered={true}
                initialValue={patientForm?.timezone}
                optionValue={timeZones}
                rules={[{
                  required: true,
                  message: "Please select timezone"
                }]}
                onChange={timeZoneChange}
              />
            </Col>
            <Col className="patientLeftDetails" span={9} md={16} lg={9} xl={9}>
              <InputBox
                labelSubName="Email Address"
                name="email"
                initialValue={patientForm.email}
                rules={[
                  {
                    required: false,
                    message: "Please enter ",
                  },
                  {
                    pattern: RegExpressions.Email,
                    message: "Please enter valid email",
                  },
                ]}
                onChange={handleChange}
              />
            </Col>
            <Col md={8} lg={9} xl={9} className="patientUserName">
                <Checkbox className="checkboxEmail"  onChange={onUserNameCheck}
                defaultChecked ={patientForm?.username && patientForm?.email == patientForm?.username} disabled={enableCheckbox() || disableUserName}
                >Use email address</Checkbox>
              <InputBox
                key={`${checked}`}
                labelSubName="User Name"
                name="username"
                initialValue={patientForm?.username}
                value={patientForm?.username}
                disabled={disableUserName}
                placeholder="minimum 6 characters"
                rules={[
                  {
                    required: true,
                    message: "Please enter user name",
                  },
                  {
                    pattern: RegExpressions.UserName,
                    message: "Username can not contain space"
                  }
                ]}
                onChange={handleChange}
              />
            </Col>
            <Col md={12} lg={6} xl={6}>
              <Row gutter={[0, 20]}>
                <Col span={24}>
                  <span className="checkBox f-12">
                    Preferred Communication Method{" "}
                  </span>
                </Col>
                <Col  md={12} lg={24} xl={24}>
                <Form.Item name="preferredCommunication" initialValue={patientForm.preferredCommumnication}>
                  <Checkbox.Group
                    onChange={onChecked}
                    value={patientForm.preferredCommumnication?.split(",")}
                    name="preferredCommunication"
                  >
                    <Checkbox value="SMS" className="sms">
                      SMS
                    </Checkbox>
                    <Checkbox value="Email" className="emailCheck" disabled={enableCheckbox()}>
                      Email
                    </Checkbox>
                  </Checkbox.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={9} md={8} lg={9} xl={9}>
              <PhoneInput
                name="contactNumber"
                label="Contact Number"
                value={patientForm.contactNumber}
                obj={patientForm}
                setObj={setPatientForm}
                detectChange={detectChange}
              />
            </Col>
            <Col span={9} md={16} lg={9} xl={9}>
              <PhoneInput
                name="mobileNumber"
                label="Mobile Number"
                value={patientForm.mobileNumber}
                rules={{
                  required: true,
                  message: "",
                }}
                detectChange={detectChange}
                obj={patientForm}
                setObj={setPatientForm}
              />
            </Col>
          </Row>
        </Form>
        {setSelectedTab ? (
        <Row className="btnpateintfooter" justify="end" gutter={20}>
          <Col span={4}>
            <Button type="primary" disabled={addPatientNextDisabled} onClick={handleNext}>
              Next
            </Button>
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={()=>cancelCallback()}>Cancel</Button>
          </Col>
        </Row>
      ) : null}
      </Card>
    
    </>
  );
};
