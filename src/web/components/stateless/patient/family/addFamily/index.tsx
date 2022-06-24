import { Card, Checkbox, Col, Form, message, Row, Upload } from "antd";
import { camera, circle } from "../../../../../images";
import InputBox from "../../../common/inputBox";
import ProfileIcon from "../../../common/profileThumbnail";
import { PlusOutlined } from "@ant-design/icons";
import "./addFamily.less"
import SelectInput from "../../../common/selectInput";
import { userStatusOptions, titleOptions } from "../../../../../constants/constants";
import { PhoneInput } from "../../../common/phoneInput";
import Button from "../../../common/button";
import { UserService } from "../../../../../services/user/userServices";
import { getCountriesList } from "../../../../../../utility/appUtil";
import { useState } from "react";
import { useSelector } from "react-redux";
import { UserStateSelector } from "../../../../../../redux/reducers/user/userReducer";
import { RegExpressions } from "../../../../../constants/regexp";



export const FamilyForm = (props: any) => {
    const userSrv = new UserService()
    const [isChecked, setChecked] = useState(false)
    const[chkdisabled,setDisable]=useState(true)
    const {formState, selectedUser, isCreated} = useSelector(UserStateSelector)
    const { data, setData, setSelectedTab, onSubmit, relationOptions, roleOptions, showFamilyForm, disableStatus,setDisableSave ,
        disableSave, familyFormNextDisabled , getRelationOptions} = props;

    const selectValue = [
        {
            text: "A",
            value: "a",
        },
        {
            text: "B",
            value: "b",
        },
    ];
    function handleChange(Event: any) {
        setData({
            ...data,
            [Event.target.name]: Event.target.value,
        });
        if(Event.target.name=="email")
        {
          setDisable(false)
        }
    }


const onFamilyFormClick=()=>{
onSubmit()
}



    const relationSelect = (value: any) => {
        setData({
            ...data,
            ["relationshipId"]: value,

        });
    };
    const roleStatus = (value: any) => {
        setData({
            ...data,
            ["roleId"]: value,
        });
    };
    const StatusChange = (value: any) => {
        setData({
            ...data,
            ["status"]: value,

        });
    };
    const onTitleSelect = (value: any) => {
        setData({
            ...data,
            ["title"]: value,

        });
    }
    const handleUpload = async ({ fileList }: any) => {
        var form = new FormData();
        form.append("avatar", fileList?.[0].originFileObj);
        if (form) {
            userSrv.uploadImage(form).then(data => setData({
                ...data, ["imageUrl"]: data,
            })).catch(e => message.error("Failed to upload image."))
        }
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

    function onChecked(e: any) {
        const { checked } = e.target;
          setChecked(checked)
        if (checked) {
          setData({ ...data, ["username"]: data["email"] });
        }else{
            setData({ ...data, ["username"]: "" });
        }
      
      }
    const handleCountrySelect = (value: any) => {
        setData({
          ...data,
          ["country"]: value,
        });
      }
    const detectChange=()=>{
        if(setDisableSave){
          setDisableSave(false)
        }
      }
      
    return (
            <Card className="addFamily">
                <Form key={`${isChecked}`} layout="vertical" id="addFamily" onFinish={onFamilyFormClick}>
                    <Row gutter={[50, 50]}>
                        <Col span={6}>
                            <Row gutter={[20, 25]}>
                                <Col className="imgPatient" span={24}>
                                <Form.Item name="imageUrl" initialValue={data?.imageUrl}>
                                    <Upload
                                        beforeUpload={handleBeforeUpload}
                                        maxCount={1}
                                        openFileDialogOnClick={true}
                                        onChange={handleUpload}
                                        showUploadList={false}
                                    >
                                        {data.imageUrl ? (
                                            <div className="uploadContainer f-10">
                                                <ProfileIcon src={data?.imageUrl} size="100" />
                                                <span>
                                                    <img src={circle} className="circleImg" style={{ bottom: "3rem", left: "3.563rem" }}></img>
                                                    <img src={camera} className="cameraImg" style={{ bottom: "3rem", left: "2rem" }}></img>
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
                                <Col className="familyRelation" span={24}>
                                    <SelectInput
                                        labelSubName="Relation"
                                        placeholder="select"
                                        name="relation"
                                        className="card-dropdown with-search"
                                        bordered={true}
                                        initialValue={data?.relationshipId}
                                        value={data?.relationshipId}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter timezone",
                                            },
                                        ]}
                                        optionValue={relationOptions}
                                        onChange={relationSelect}
                                    />
                                </Col>
                                <Col className="patientLeftDetails" span={24}>
                                    <SelectInput
                                        disabled={disableStatus}
                                        labelSubName="Status"
                                        placeholder="select"
                                        name="status"
                                        className="card-dropdown with-search"
                                        bordered={true}
                                        initialValue={disableStatus ? 'Invited' : data.status}
                                        optionValue={userStatusOptions}
                                        onChange={StatusChange}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={18}>
                            <Row gutter={[20, 25]}>
                                <Col className="patientLeftDetails" span={3}>
                                    <SelectInput
                                        labelSubName="Title"
                                        name="title"
                                        initialValue={data?.title}
                                        value={data?.title}
                                        rules={[
                                            {
                                                required: false,
                                                message: "Please enter",
                                            },
                                        ]}
                                        optionValue={titleOptions}
                                        onChange={onTitleSelect}
                                    />
                                </Col>
                                <Col className="patientLeftDetails" span={9}>
                                    <InputBox
                                        labelSubName="First Name"
                                        name="firstName"
                                        initialValue={data?.firstName}
                                        value={data?.firstName}
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
                                <Col className="patientLeftDetails" span={3}>
                                    <InputBox
                                        labelSubName="MI"
                                        name="middleName"
                                        initialValue={data?.middleName}
                                        value={data?.middleName}
                                        rules={[{
                                            pattern: RegExpressions.Middlename,
                                            message: "Invalid MI"
                                        }]}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col className="patientLeftDetails" span={9}>
                                    <InputBox
                                        labelSubName="Last Name"
                                        name="lastName"
                                        initialValue={data?.lastName}
                                        value={data?.lastName}
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
                                <Col className="patientLeftDetails" span={24}>
                                    <InputBox
                                        labelSubName="Address 1"
                                        name="address1"
                                        initialValue={data?.address1}
                                        value={data?.address1}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter address",
                                            },
                                        ]}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col className="patientLeftDetails" span={24}>
                                    <InputBox
                                        labelSubName="Address 2"
                                        name="address2"
                                        initialValue={data?.address2}
                                        value={data?.address2}
                                        rules={[
                                            {
                                                required: false,
                                                message: "Please enter ",
                                            },
                                        ]}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col className="patientLeftDetails" span={6} md={12} lg={6} xl={6}>
                                    <InputBox
                                        labelSubName="City"
                                        name="city"
                                        initialValue={data?.city}
                                        value={data?.city}
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
                                <Col className="patientLeftDetails" span={6} md={12} lg={6} xl={6}>
                                    <InputBox
                                        labelSubName="State/Province"
                                        name="state"
                                        initialValue={data?.state}
                                        value={data?.state}
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
                                <Col className="patientLeftDetails" md={12} lg={6} xl={6}>
                                    <InputBox
                                        labelSubName="Zip/Postal Code"
                                        name="zipCode"
                                        initialValue={data?.zipCode}
                                        value={data?.zipCode}
                                        placeholder="eg. 00000-0000"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter Zip/Postal code",
                                            },
                                            {
                                                pattern: RegExpressions.ZipCode,
                                                message: "Please enter valid Zip/Postal code",
                                            }
                                        ]}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col className="patientLeftDetails" span={6} md={12} lg={6}xl={6}>
                                    <SelectInput
                                        labelSubName="Country"
                                        placeholder="Select country"
                                        name="country"
                                        initialValue={data?.country}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please select Country",
                                            },
                                        ]}
                                        className="card-dropdown with-search"
                                        bordered={true}
                                        value={data?.country}
                                        optionValue={getCountriesList()}
                                        onChange={handleCountrySelect}
                                        showSearch
                                    />
                                </Col>
                                <Col className="patientLeftDetails" span={12}>
                                    <InputBox
                                        labelSubName="Email Address"
                                        name="email"
                                        initialValue={data?.email}
                                        value={data?.email}
                                        rules={[
                                            {
                                                required: false,
                                                message: "Please enter ",
                                            },
                                            {
                                                pattern: RegExpressions.Email,
                                                message: "Please enter valid email"
                                            }
                                        ]}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col md={12} lg={12} xl={12} className="patientUserName">
                                    <Checkbox onChange={onChecked} defaultChecked={data?.username && data?.email == data?.username} disabled={chkdisabled} className="checkboxEmail">
                                        Use email address
                                    </Checkbox>
                                    <InputBox
                                        key = {`${isChecked}`}
                                        labelSubName="User Name"
                                        name="username"
                                        placeholder="minimum 6 characters"
                                        initialValue={data?.username}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter username",
                                            },
                                            {
                                                pattern: RegExpressions.UserName,
                                                message: "Username can not contain space"
                                              }
                                        ]}
                                        value={data?.username}
                                        onChange={handleChange}
                                    />


                                </Col>
                                <Col span={12}>
                                    <PhoneInput
                                        name="contactNumber"
                                        label="Contact"
                                        initialValue={data?.contact}
                                        value={data?.contact}
                                        obj={data}
                                        setObj={setData}
                                        detectChange={detectChange}
                                    />
                                </Col>
                                <Col span={12}>
                                    <PhoneInput
                                        name="mobileNumber"
                                        label="Mobile Number"
                                        initialValue={data?.mobileNumber}
                                        value={data?.mobileNumber}
                                        rules={
                                            {
                                                required: true,
                                                message: "",
                                            }}
                                        obj={data}
                                        setObj={setData}
                                        detectChange={detectChange}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
                <Row className="btnpateintfooter" justify="end" gutter={20}>
                
                <Col span={3}>
                    <Button type="primary" onClick={() => showFamilyForm(false)}>Cancel</Button>
                </Col>
            </Row>
            </Card>
    )
}

