import { Row, Col, Form, Upload, message } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react"
import InputBox from "../../common/inputBox"
import SelectInput from "../../common/selectInput"
import "./organizationInfo.less"
import ProfileIcon from "../../common/profileThumbnail";
import { camera, circle } from "../../../../images";
import { CompWrapper } from "../../common/contentWrapper";
import Organization from "../../../../models/organization/organizaton";
import countriesTimezones, { getTimezonesForCountry } from 'countries-and-timezones';
import { getCountriesList } from "../../../../../utility/appUtil";
import { statusOptions } from "../../../../constants/constants";
import { PhoneInput } from "../../common/phoneInput";
import TextArea from "../../common/textArea";
import { OrganizationService } from "../../../../services/organization/organizationService";
import { useSelector } from "react-redux";
import {UserRoles} from "../../../../constants/enums"
import  { AuthStateSelector} from "../../../../../redux/reducers/authReducer/authReducer";
import { getUniqueZones } from "../../../../../utility/utils";
import { RegExpressions } from "../../../../constants/regexp";

const timeZonesMoment = require('moment-timezone')
interface OrgInfoProps {
    organization: Organization | null,
    onSubmit: any,
    setOrganization: any,
    primaryContact?: any,
    secondaryContact?: any,
    setPrimaryContact?: any,
    setSecondaryContact?: any
    formState?: any,
    setDisableSave?:any,
    disableSave?: any
}
export const OrgansationInfo = (props: OrgInfoProps) => {
    const {
        organization,
        onSubmit,
        primaryContact,
        secondaryContact,
        setOrganization,
        setPrimaryContact,
        setSecondaryContact,
        setDisableSave,
    } = props;
    const orgSrv = new OrganizationService()
    const { appUser } = useSelector(AuthStateSelector)
    const [timeZones, setZones] = useState<any>([])
    const handleBeforeUpload = async (file: any, fileList: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 0.25;
        if (!isLt2M) {
            message.error('Image must smaller than 250K!');
        }
        const isValid = (await checkImageWH(file, 250, 250))
        return isJpgOrPng && isLt2M && isValid ? false : Upload.LIST_IGNORE;
    };

    const checkImageWH = (file: any, width: number, height: number) => {
        return new Promise<boolean>(function (resolve, reject) {
            let filereader = new FileReader();
            filereader.onload = (e: any) => {
                let src = e.target.result;
                const image: any = new Image();
                image.onload = function () {
                    if (this.width && this.width > width || this.height && this.height > height) {
                        message.error(
                            'Please upload picture of size less than or equal to ' + width + " X " + height
                        )
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
    }
    const getBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };
    const handleUpload = async ({ fileList }: any) => {
        var form = new FormData();
        form.append("logo", fileList?.[0].originFileObj);
        if(form){
            orgSrv.uploadImage(form).then(data=>setOrganization({
              ...organization,
              imageURL:data,
            })).catch(e=> message.error("Failed to upload image."))
          }
    };
    const handleChange = (e: any) => {
        var { name, value } = e.target;
        setOrganization({ ...organization, [name]: value })
    }
    const handlePrimaryChange = (e: any) => {
        var { name, value } = e.target;
        setPrimaryContact({ ...primaryContact, [name]: value })
    }
    const handleSecondaryChange = (e: any) => {
        var { name, value } = e.target;
        setSecondaryContact({ ...secondaryContact, [name]: value })
    }
    const handleCountrySelect = (value: any) => {
        setOrganization({ ...organization, ["country"]: value, ["timezone"]: "" })
    }
    const handletimeZoneSelect = (value: any) => {
        setOrganization({ ...organization, ["timezone"]: value })
    }
    const onStatusChange = (value: any) => {
        setOrganization({...organization, ["isActive"]: value})
    } 
   
    const isDisabled =() =>{
        switch (appUser?.roleName) {
            case UserRoles.ORG_ADMIN: {
                return true
            }
            default: {
                return false
            }
        }
    }
    const detectChange=()=>{
        if(setDisableSave){
          setDisableSave(false)
        }
      }

      useEffect(()=>{
          var x:any = organization?.country? organization.country : "US"
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
  },[organization?.country])

    return (
        <CompWrapper observeOn="innerHeader" name="infoContainer">
            <div className="infoContainer"  key={organization?.timezone}>
                <Form id="organizationEdit" layout="vertical" onFinish={onSubmit} onValuesChange={detectChange}>
                    <Row gutter={30}>
                        <Col span={6} style={{ display: "flex", justifyContent: "center" }}>
                        <Form.Item name="imageUrl"
                        valuePropName={organization?.imageURL}
                        >
                            <Upload
                                maxCount={1}
                                openFileDialogOnClick={true}
                                onChange={handleUpload}
                                beforeUpload={handleBeforeUpload}
                                showUploadList={false}
                            >
                                {organization?.imageURL ?
                                  <div className="uploadContainer f-10">
                                    <ProfileIcon src={organization?.imageURL} size="100" />
                                    <span>
                                            Upload Logo JPG, PNG, Max Size 250K
                                            Max Resolution 250px X 250px,
                                        </span>
                                        <span><img src={circle} className="circleImg"></img>
                                            <img src={camera} className="cameraImg"></img>
                                        </span>
                                    </div>
                                    :
                                    <div className="uploadContainer f-10">
                                        <div className="orgInfoLogo"><PlusOutlined /><p>Logo</p></div>
                                        <span>
                                            Upload Logo JPG, PNG, Max Size 250K
                                            Max Resolution 250px X 250px,
                                        </span>
                                        <span><img src={circle} className="circleImg"></img>
                                            <img src={camera} className="cameraImg"></img>
                                        </span>
                                    </div>
                                }
                            </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={18}>
                            <Row gutter={[20, 20]}>
                                <Col span={18} md={16}>
                                    <InputBox
                                        labelSubName="Organization Name"
                                        name="orgName"
                                        initialValue={organization?.orgName}
                                        value={organization?.orgName}
                                        placeholder="Organization name"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the organization name",
                                            },
                                            {
                                                pattern: RegExpressions.OrgName,
                                                message: "Please enter a valid organization name"
                                            }
                                        ]}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col span={6} md={8}>
                                    <SelectInput
                                        labelSubName="Subscription Status"
                                        name="status"
                                        initialValue={organization?.isActive}
                                        value={organization?.isActive}
                                        placeholder="select"
                                        disabled ={isDisabled()}
                                        className="card-dropdown with-search"
                                        bordered={true}
                                        optionValue={statusOptions}
                                        onChange={onStatusChange}
                                    />
                                </Col>
                                <Col span={12}>
                                    <InputBox
                                        labelSubName="Address 1"
                                        name="address1"
                                        initialValue={organization?.address1}
                                        value={organization?.address1}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter an address.",
                                            },
                                        ]}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col span={12}>
                                    <InputBox
                                        labelSubName="Address 2"
                                        name="address2"
                                        initialValue={organization?.address2}
                                        value={organization?.address2}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col span={6} md={12} lg={6} xl={6}>
                                    <InputBox
                                        labelSubName="City"
                                        name="city"
                                        initialValue={organization?.city}
                                        value={organization?.city}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please select your city",
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
                                        initialValue={organization?.state}
                                        value={organization?.state}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please select your state",
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
                                        initialValue={organization?.country}
                                        value={organization?.country}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please select your Country",
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
                                <Col span={6} md={12} lg={6} xl={6}>
                                    <InputBox
                                        labelSubName="Zip/Postal Code"
                                        name="zipcode"
                                        placeholder="eg. 00000-0000"
                                        initialValue={organization?.zipcode}
                                        value={organization?.zipcode}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter your zip/postal code",
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
                    <Row gutter={[30, 30]} className="form-container">
                        <Col span={6} >
                            <SelectInput
                                labelSubName="TimeZone"
                                name="timeZone"
                                placeholder="Select timezone"
                                initialValue={organization?.timezone}
                                value={organization?.timezone}
                                className="card-dropdown with-search"
                                bordered={true}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a timezone.",
                                    },
                                ]}
                                onChange={handletimeZoneSelect}
                                optionValue={timeZones}
                            />
                        </Col>
                        <Col span={18}>
                            <TextArea
                                labelSubName="Notes"
                                name="notes"
                                initialValue={organization?.notes}
                                value={organization?.notes}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                    <Row gutter={[30, 10]} className="form-container">
                        <Col span={24} className="contact-col">
                            Primary Contact Details<span className="redAstericks">*</span>
                        </Col>
                        <Col md={6} lg={6} xl={4}>
                            <InputBox
                                id="primary"
                                labelSubName="First Name"
                                name="firstName"
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
                                initialValue={primaryContact?.firstName}
                                value={primaryContact?.firstName}
                                onChange={handlePrimaryChange}
                            />
                        </Col>
                        <Col span={2} md={4} xl={2}>
                            <InputBox
                                labelSubName="MI"
                                name="middleName"
                                initialValue={primaryContact?.middleName}
                                rules={[{
                                    pattern: RegExpressions.Middlename,
                                    message: "Invalid MI"
                                }]}
                                value={primaryContact?.middleName}
                                onChange={handlePrimaryChange}
                            />
                        </Col>
                        <Col md={6} lg={6} xl={4}>
                            <InputBox
                                labelSubName="Last Name"
                                name="lastName"
                                initialValue={primaryContact?.lastName}
                                value={primaryContact?.lastName}
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
                                onChange={handlePrimaryChange}
                            />
                        </Col>
                        <Col md={8} lg={6} xl={4}>
                            <PhoneInput
                                name="phoneNumber"
                                label="Contact Number"
                                value={primaryContact?.phoneNumber}
                                obj={primaryContact}
                                setObj={setPrimaryContact}
                                expanded="true"
                                detectChange={detectChange}
                            />
                        </Col>
                        <Col md={8} lg={6} xl={4}>
                            <PhoneInput
                            name="mobile"
                            value={primaryContact?.mobile}
                            label="Mobile Number"
                            rules={{
                            required: true,
                            message: "Please enter your mobile number",
                            }}
                            obj={primaryContact}
                            setObj={setPrimaryContact}
                            expanded="true"
                            detectChange={detectChange}
                        />
                        </Col>
                        <Col md={8} lg={6} xl={6}>
                            <InputBox
                                labelSubName="Email Address"
                                name="email"
                                initialValue={primaryContact?.email}
                                value={primaryContact?.email}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your email address",
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
                    <Row gutter={[30, 10]} className="form-container">
                        <Col span={24} className="contact-col">
                            Support Contact Details<span className="redAstericks">*</span>
                        </Col>
                        <Col md={6} lg={6} xl={4}>
                            <InputBox
                                id="secondary"
                                labelSubName="First Name"
                                name="firstName2"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your first name",
                                    },
                                    {
                                    pattern: RegExpressions.FirstName,
                                    message: "Please enter valid name"
                                  }]}
                                initialValue={secondaryContact?.firstName2}
                                value={secondaryContact?.firstName2}
                                onChange={handleSecondaryChange}
                            />
                        </Col>
                        <Col span={2} md={4} xl={2}>
                            <InputBox
                                labelSubName="MI"
                                name="middleName2"
                                value={secondaryContact?.middleName2}
                                initialValue={secondaryContact?.middleName2}
                                rules={[{
                                    pattern: RegExpressions.Middlename,
                                    message: "Invalid MI"
                                }]}
                                onChange={handleSecondaryChange}
                            />
                        </Col>
                        <Col md={6} lg={6} xl={4}>
                            <InputBox
                                labelSubName="Last Name"
                                name="lastName2"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your Last name",
                                    },
                                    {
                                    pattern: RegExpressions.LastName,
                                    message: "Please enter valid name"
                                  }]}
                                initialValue={secondaryContact?.lastName2}
                                value={secondaryContact?.lastName2}
                                onChange={handleSecondaryChange}
                            />
                        </Col>
                        <Col md={8} lg={6} xl={4}>
                            <PhoneInput
                                label="Contact Number"
                                name="phoneNumber2"
                                initialValue={secondaryContact?.phoneNumber2}
                                value={secondaryContact?.phoneNumber2}
                                obj={secondaryContact}
                                setObj={setSecondaryContact}
                                expanded="true"
                                detectChange={detectChange}
                            />
                        </Col>
                        <Col md={8} lg={6} xl={4}>
                            <PhoneInput
                                label="Mobile Number"
                                name="mobile2"
                                initialValue={secondaryContact?.mobile2}
                                rules={{
                                    required: true,
                                    message: "Please enter your Mobile number",
                                }}
                                value={secondaryContact?.mobile2}
                                obj={secondaryContact}
                                setObj={setSecondaryContact}
                                expanded="true"
                                detectChange={detectChange}
                            />
                        </Col>
                        <Col md={8} lg={6} xl={6}>
                            <InputBox
                                labelSubName="Email Address"
                                name="email2"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your email address",
                                    },
                                    {
                                        pattern: RegExpressions.Email,
                                        message: "Please enter valid email"
                                    }
                                ]}
                                initialValue={secondaryContact?.email2}
                                value={secondaryContact?.email2}
                                onChange={handleSecondaryChange}
                            />
                        </Col>
                    </Row>
                </Form>
            </div>
        </CompWrapper>
    )
}
