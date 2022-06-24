import { Card, Checkbox, Col, Form, Row } from "antd";
import { getCountriesList } from "../../../../../utility/appUtil";
import { titleOptions } from "../../../../constants/constants";
import InputBox from "../../common/inputBox";
import { PhoneInput } from "../../common/phoneInput";
import SelectInput from "../../common/selectInput";
import "./accountSettings.less";
import { UserRoles } from "../../../../constants/enums";
import { useState } from "react";
import { CompWrapper } from "../../common/contentWrapper";
import { RegExpressions } from "../../../../constants/regexp";
export const Settings = (props: any) => {
  const { formID, settings, setSettings, roleOptions, specialities, onSubmit , disableSave, setDisableSave} =
    props;
  const handleChange = (e: any) => {
    var { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };
  const [disabled , setdisabled] = useState(true);
  function onChecked(checkedValues: any) {
    if(checkedValues.length)
    setSettings({...settings,["preferredCommumnication"]: checkedValues.join(",")
    })
    setDisableSave(false)
  }
  const plainOptions = ["SMS", "Email"];
  const titleType = (value: any) => {
    setSettings({ ...settings, ["title"]: value });
  };
  const roleStatus = (value: any) => {
    setSettings({ ...settings, ["roleId"]: value });
  };
  const handleCountrySelect = (value: any) => {
    setSettings({
      ...settings,
      ["country"]: value,
    });
  };
  const specialityType = (value: any) => {
    setSettings({ ...settings, ["specialty"]: value });
  };
  const emailRule = () => {
    if(settings?.roleName == UserRoles?.PLATFORM_ADMIN || settings?.roleName == UserRoles?.ORG_ADMIN ||settings?.roleName == UserRoles?.PROVIDER){
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
    <CompWrapper observeOn="innerHeader">
      <div className="settingsDiv" key={settings?.id}>
        <Card className="cardAccountSettings">
          <Form
            id={formID}
            layout="vertical"
            onFinish={() => onSubmit(settings)}
            onValuesChange={detectChange}
          >
            <Row gutter={[30, 20]}>
              <Col span={2} md={6} lg={2}>
                <SelectInput
                  labelSubName="Title"
                  name="title"
                  className="title-dropdown"
                  bordered={true}
                  value={settings?.title}
                  initialValue={settings?.title}
                  optionValue={titleOptions}
                  onChange={titleType}
                />
              </Col>
              <Col span={6}>
                <InputBox
                  labelSubName="First Name"
                  name="firstName"
                  value={settings?.firstName}
                  initialValue={settings?.firstName}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your first name",
                    },
                    {
                      pattern: RegExpressions.FirstName,
                      message: "Please enter valid name",
                    },
                  ]}
                  onChange={handleChange}
                />
              </Col>
              <Col span={2} md={6} lg={2}>
                <InputBox
                  labelSubName="MI"
                  name="middleName"
                  value={settings?.middleName}
                  rules={[
                    {
                      pattern: RegExpressions.Middlename,
                      message: "Invalid MI",
                    },
                  ]}
                  initialValue={settings?.middleName}
                  onChange={handleChange}
                />
              </Col>
              <Col span={6}>
                <InputBox
                  labelSubName="Last Name"
                  name="lastName"
                  value={settings?.lastName}
                  initialValue={settings?.lastName}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your last name",
                    },
                    {
                      pattern: RegExpressions.LastName,
                      message: "Please enter valid name",
                    },
                  ]}
                  onChange={handleChange}
                />
              </Col>
              <Col span={2} md={0} lg={2}></Col>
              <Col span={6}>
                {settings?.roleName === UserRoles.SUPER_ADMIN ||
                settings?.roleName === UserRoles.ORG_ADMIN ||
                settings?.roleName === UserRoles.PLATFORM_ADMIN ||
                settings?.roleName === UserRoles.PATIENT ||
                settings?.roleName === UserRoles.FAMILY ? (
                  <SelectInput
                    labelSubName="Role"
                    placeholder="select"
                    name="role"
                    className="title-dropdown"
                    bordered={true}
                    disabled={disabled}
                    value={settings?.roleId}
                    initialValue={settings?.roleName}
                    optionValue={roleOptions}
                    onChange={roleStatus}
                  />
                ) : (
                  <InputBox
                    labelSubName="Designation"
                    name="designation"
                    value={settings?.designation}
                    initialValue={settings?.designation}
                    onChange={handleChange}
                    disabled
                  />
                )}
              </Col>

              <Col span={16} md={18} lg={16}>
                {settings?.roleName == UserRoles.ORG_ADMIN ? null : (
                  <InputBox
                    labelSubName="Address 1"
                    name="address1"
                    value={settings?.address1}
                    initialValue={settings?.address1}
                    rules={[
                      {
                        required: true,
                        message: "Please enter address",
                      },
                    ]}
                    onChange={handleChange}
                  />
                )}
              </Col>
              <Col span={2} md={0} lg={2}></Col>
              {settings?.roleName === UserRoles.PROVIDER ? (
                <Col span={6}>
                  <SelectInput
                    labelSubName="Role"
                    placeholder="select"
                    name="role"
                    className="title-dropdown"
                    bordered={true}
                    value={settings?.roleId}
                    initialValue={settings?.roleName}
                    optionValue={roleOptions}
                    onChange={roleStatus}
                    disabled={true}
                  />
                </Col>
              ) : settings?.roleName === UserRoles.PATIENT ? (
                <Col className="patientCheckbox" span={6}>
                  <Col span={24}>
                    <span className="checkBox">
                      Preferred Communication Method{" "}
                    </span>
                  </Col>
                  <Col span={24}>
                    <Checkbox.Group
                      name="preferredCommumnication"
                      key={settings?.preferredCommumnication}
                      // value={"SMS,EMAIL".split(",")}
                      value={settings?.preferredCommumnication?.split(",")}
                      onChange={onChecked}
                    >
                      <Checkbox value="SMS" className="sms">
                        SMS
                      </Checkbox>
                      <Checkbox value="Email" className="emailCheck">
                        Email
                      </Checkbox>
                    </Checkbox.Group>
                  </Col>
                </Col>
              ) : null}
              <Col span={16} md={18} lg={16}>
                {settings?.roleName == UserRoles.ORG_ADMIN ? null : (
                  <InputBox
                    labelSubName="Address 2"
                    name="address2"
                    value={settings?.address2}
                    initialValue={settings?.address2}
                    rules={[
                      {
                        required: false,
                        message: "Please enter address",
                      },
                    ]}
                    onChange={handleChange}
                  />
                )}
              </Col>
              <Col span={2} md={0} lg={2}></Col>
              <Col span={6} md={8} lg={6} xl={6}>
                {settings?.roleName === UserRoles.PROVIDER ? (
                  <SelectInput
                    labelSubName="Specialty"
                    placeholder="select"
                    name="specialty"
                    className="title-dropdown"
                    bordered={true}
                    value={settings?.specialty}
                    initialValue={settings?.specialty}
                    optionValue={specialities}
                    onChange={specialityType}
                    disabled
                  />
                ) : null}
              </Col>
              <Col md={8} lg={4} xl={4}>
                {settings?.roleName == UserRoles.ORG_ADMIN ? null : (
                  <InputBox
                    labelSubName="City"
                    name="city"
                    initialValue={settings?.city}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the city",
                      },
                      {
                        pattern: RegExpressions.City,
                        message: "Please enter valid city",
                      },
                    ]}
                    value={settings?.city}
                    onChange={handleChange}
                  />
                )}
              </Col>
              <Col md={8} lg={4} xl={4}>
                {settings?.roleName == UserRoles.ORG_ADMIN ? null : (
                  <InputBox
                    labelSubName="State/Province"
                    name="state"
                    initialValue={settings?.state}
                    rules={[
                      {
                        required: true,
                        message: "Please enter state/province",
                      },
                      {
                        pattern: RegExpressions.State,
                        message: "Please enter valid state/province",
                      },
                    ]}
                    value={settings?.state}
                    onChange={handleChange}
                  />
                )}
              </Col>
              <Col md={8} lg={4} xl={4}>
                {settings?.roleName == UserRoles.ORG_ADMIN ? null : (
                  <InputBox
                    labelSubName="Zip/Postal Code"
                    name="zipCode"
                    placeholder="eg. 00000-0000"
                    initialValue={settings?.zipCode}
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
                    value={settings?.zipCode}
                    onChange={handleChange}
                  />
                )}
              </Col>
              <Col md={8} lg={4} xl={4}>
                {settings?.roleName == UserRoles.ORG_ADMIN ? null : (
                  <SelectInput
                    labelSubName="Country"
                    placeholder="Select country"
                    name="country"
                    initialValue={settings?.country}
                    rules={[
                      {
                        required: true,
                        message: "Please select your Country",
                      },
                    ]}
                    className="card-dropdown with-search"
                    bordered={true}
                    value={settings?.country}
                    optionValue={getCountriesList()}
                    onChange={handleCountrySelect}
                    showSearch
                  />
                )}
              </Col>
              <Col span={2} md={0} lg={2} xl={2}></Col>
              <Col span={6} md={8} lg={6} xl={6}>
                {settings?.roleName === UserRoles.PROVIDER ? (
                  <InputBox
                    labelSubName="Organization"
                    name="Organization"
                    initialValue={settings?.organization}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the organization",
                      },
                    ]}
                    value={settings?.organization}
                    onChange={handleChange}
                    disabled
                  />
                ) : null}
              </Col>
              <Col span={8}>
                <InputBox
                  labelSubName="Email Address"
                  name="email"
                  value={settings?.email}
                  initialValue={settings?.email}
                  rules={[
                    {
                      required: emailRule(),
                      message: "Please enter email address",
                    },
                    {
                      pattern: RegExpressions.Email,
                      message: "Please enter valid email",
                    },
                  ]}
                  onChange={handleChange}
                />
              </Col>
              <Col md={0} lg={1} xl={10}></Col>
              <Col className="patientCheckbox" md={12} lg={8} xl={6}>
                {settings?.roleName === UserRoles.PROVIDER ? (
                  <>
                    <Col span={24}>
                      <span className="checkBox">
                        Preferred Communication Method{" "}
                      </span>
                    </Col>
                    <Col span={24}>
                      <Checkbox.Group
                        name="preferredCommumnication"
                        key={settings?.preferredCommumnication}
                        value={settings?.preferredCommumnication?.split(",")}
                        onChange={onChecked}
                      >
                        <Checkbox value="SMS" className="sms">
                          SMS
                        </Checkbox>
                        <Checkbox value="Email" className="emailCheck">
                          Email
                        </Checkbox>
                      </Checkbox.Group>
                    </Col>
                  </>
                ) : null}
              </Col>
              <Col span={8} md={12} lg={8} xl={8}>
                <PhoneInput
                  name="contactNumber"
                  value={settings.contactNumber}
                  label="Contact Number"
                  obj={settings}
                  setObj={setSettings}
                  detectChange={detectChange}
                />
              </Col>
              <Col span={8} md={12} lg={8} xl={8}>
                <PhoneInput
                  name="mobileNumber"
                  value={settings.mobileNumber}
                  label="Mobile Number"
                  rules={{
                    required: true,
                    message: "",
                  }}
                  obj={settings}
                  setObj={setSettings}
                  detectChange={detectChange}
                />
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </CompWrapper>
  );
};