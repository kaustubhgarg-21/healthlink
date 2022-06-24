import { Card, Checkbox, Col, Form, Row } from "antd"
import { useState } from "react"
import { UserRoles } from "../../../../constants/enums"
import { RegExpressions } from "../../../../constants/regexp"
import { CompWrapper } from "../../common/contentWrapper"
import InputBox from "../../common/inputBox"
import { PhoneInput } from "../../common/phoneInput"
import SelectInput from "../../common/selectInput"
import "./accountSettings.less";

export const OrgAdminSettings = (props: any) => {
    const { settings, setSettings, roleOptions, onSubmit, formID, setDisableSave } = props
    const handleChange = (e: any) => {
        var { name, value } = e.target;
        setSettings({ ...settings, [name]: value });
    };
    const [disabled, setdisabled] = useState(true);
    const roleStatus = (value: any) => {
        setSettings({ ...settings, ["roleId"]: value });
    };
    const emailRule = () => {
        if (settings?.roleName == UserRoles?.PLATFORM_ADMIN || settings?.roleName == UserRoles?.ORG_ADMIN) {
            return true
        } else {
            return false
        }
    }
    const detectChange=()=>{
        if(setDisableSave){
          setDisableSave(false)
        }
      }

      function onChecked(checkedValues: any) {
        if(checkedValues.length){
        setSettings({...settings,["preferredCommumnication"]: checkedValues.join(",")
       })
        setDisableSave(false)
      }}
    return (
        <div className="settingsDiv">
            <CompWrapper observeOn="innerHeader">
            <Card className="cardAccountSettings" key={settings?.id}>
                <Form layout="vertical" id={formID} onFinish={onSubmit} onValuesChange={detectChange}>
                    <Row gutter={[30, 20]}>
                        <Col span={7}>
                            <InputBox
                                labelSubName="First Name"
                                name="firstName"
                                initialValue={settings?.firstName}
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
                                value={settings?.firstName}
                            />
                        </Col>
                        <Col md={3} lg={2} xl={2} xxl={2}>
                            <InputBox
                                labelSubName="MI"
                                name="middleName"
                                value={settings?.middleName}
                                rules={[{
                                    pattern: RegExpressions.Middlename,
                                    message: "Invalid MI"
                                }]}
                                initialValue={settings?.middleName}
                                onChange={handleChange}
                            />
                        </Col>
                        <Col span={7}>
                            <InputBox
                                labelSubName="Last Name"
                                name="lastName"
                                initialValue={settings?.lastName}
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
                                value={settings?.lastName}
                            />
                        </Col>
                        <Col md={0} lg={2} xl={2}></Col>
                        <Col span={6}>
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
                                onChange={roleStatus} />
                        </Col>
                        <Col md={24} lg={16} xl={16} xxl={16}>
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
                        <Col md={0} lg={2} xxl={2} xl={2}></Col>
                        <Col md={24} lg={6} xl={6} xxl={6} className="patientCheckbox">
                            <Col span={24}>
                                <span className="checkBox">
                                    Preferred Communication Method{" "}
                                </span>
                            </Col>
                            <Col span={24}>
                                <Checkbox.Group
                                    name="preferredCommumnication"
                                    key={settings?.preferredCommumnication}
                                    value = {settings?.preferredCommumnication?.split(",")}
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
                        <Col md={0} lg={1} xl={1} xxl={1}></Col>
                        <Col className="patientLeftDetails" md={12} lg={8} xl={8} xxl={8}  >
                            <InputBox
                                labelSubName="Center"
                                value={settings?.centers}
                                initialValue={settings?.centers}
                                name="center"
                                className="card-dropdown with-search"
                                bordered={true}
                                disabled={disabled}
                            />
                        </Col>
                        <Col className="patientLeftDetails" md={12} lg={8} xl={8} xxl={8}>
                            <InputBox
                                labelSubName="Department"
                                mode="multiple"
                                value={settings?.departments}
                                initialValue={settings?.departments}
                                name="department"
                                className="card-dropdown with-search"
                                bordered={true}
                                disabled={disabled}
                            />
                        </Col>
                    </Row>
                </Form>
            </Card>
            </CompWrapper>
        </div>
    )
}