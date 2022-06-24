import { Card, Col, message, Row, Spin, Upload, Form } from "antd";
import InputBox from "../../common/inputBox";
import ProfileIcon from "../../common/profileThumbnail";
import SelectInput from "../../common/selectInput";
import { PlusOutlined } from "@ant-design/icons";
import { getCountriesList } from "../../../../../utility/appUtil";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Checkbox } from "antd";
import "./userDetails.less";
import { camera, circle } from "../../../../images";
import { PhoneInput } from "../../common/phoneInput";
import { RoleStateSelector } from "../../../../../redux/reducers/role/roleReducer";
import { userStatusOptions } from "../../../../constants/constants";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";
import { UserService } from "../../../../services/user/userServices";
import { UserStateSelector } from "../../../../../redux/reducers/user/userReducer";
import { RegExpressions } from "../../../../constants/regexp";
const UserForm = (props: any) => {
  const userSrv = new UserService();
  const { appUser } = useSelector(AuthStateSelector);
  const {selectedUser }=useSelector(UserStateSelector)
  const { formState } = useSelector(RoleStateSelector);
  const {
    obj,
    onSubmit,
    disableEdit,
    formID,
    setObj,
    disableUserName,
    disableStatus,
    roleOptions,
    setDisableSave,
    relationOptions,
  } = props;
  const [userdetails, setUserDetails] = useState<any>({});
  const [timeZones, setZones] = useState<any>([]);
  const [isChecked, setIsChecked] = useState(false);
  var userDetailsForm;
  if (props && props.obj && props.obj.userDetailsForm) {
    userDetailsForm = props.obj.userDetailsForm;
  }
  const handleChange = (e: any) => {
    var { name, value } = e.target;
    props.obj.getUserData({ [name]: value });
  };
  const handleCountrySelect = (value: any) => {
    props.obj.getUserData({ ["country"]: value });
  };
  const subscriptionStatus = (value: any) => {
    props.obj.getUserData({ ["status"]: value });
  };
  const roleStatus = (value: any) => {
    props.obj.getUserData({ ["roleId"]: value });
  };
  const relationSelect = (value: any) => {
    props.obj.getUserData({ ["relationshipId"]: value });
  };
 const onUserNameCheck = (e: any) => {
    var { checked } = e.target;
    setIsChecked(checked);
    if (checked) {
      setObj({
        ...obj.userDetailsForm,
        ["username"]: obj.userDetailsForm["email"],
      });
    } else {
      setObj({ ...obj.userDetailsForm, ["username"]: "" });
    }
  };
  const handleUpload = async ({ fileList }: any) => {
    var form = new FormData();
    form.append("avatar", fileList?.[0].originFileObj);
    if (form) {
      userSrv
        .uploadImage(form)
        .then((data) =>
          props.obj.getUserData({
            ["imageUrl"]: data,
          })
        )
        .catch(() => message.error("Failed to upload image."));
    }
  };
const isEmailReq =()=>{
  if(selectedUser.roleName =="Family"){
    return false
  }else{
    return true
  }
}
  const handleBeforeUpload = async (file: any) => {
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
  const enableCheckbox = () => {
    if (!obj?.userDetailsForm?.email?.length) {
      return true;
    } else {
      return false;
    }
  };
  const detectChange = () => {
    if (setDisableSave) {
      setDisableSave(false);
    }
  };
  return (
    <div  key={obj.userDetailsForm?.relationshipId} className="addUserForm cardBmargin">
      <Spin spinning={formState.loading}>
        <Card>
          <Form
            key={`${isChecked}`}
            id={formID}
            layout="vertical"
            onFinish={() => onSubmit(obj.userDetailsForm)}
            onValuesChange={detectChange}
          >
            <Row>
              <Col span={6} style={{ textAlign: "center" }}>
                <Form.Item
                  name="imageUrl"
                  valuePropName={obj.userDetailsForm.imageUrl}
                >
                  <Upload
                    beforeUpload={handleBeforeUpload}
                    maxCount={1}
                    openFileDialogOnClick={true}
                    onChange={handleUpload}
                    showUploadList={false}
                  >
                    {obj.userDetailsForm?.imageUrl ? (
                      <div className="uploadContainer f-10">
                        <ProfileIcon
                          src={obj.userDetailsForm.imageUrl}
                          size="100"
                        />
                        <span>
                          Upload Picture JPG, PNG, Max Size 250K Max Resolution
                          250px X 250px,
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
                          Upload Picture JPG, PNG, Max Size 250K Max Resolution
                          250px X 250px,
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
                <Row gutter={[30, 20]}>
                  <Col span={8} md={12} lg={8} xl={8}>
                    <InputBox
                      labelSubName="First Name"
                      name="firstName"
                      initialValue={obj.userDetailsForm.firstName}
                      rules={[
                        {
                          required: true,
                          message: "Please enter first name",
                        },
                        {
                          pattern: RegExpressions.FirstName,
                          message: "Please enter valid name",
                        },
                      ]}
                      onChange={handleChange}
                      disabled={disableEdit}
                    />
                  </Col>
                  <Col span={2} md={12} lg={2} xl={2}>
                    <InputBox
                      labelSubName="MI"
                      name="middleName"
                      initialValue={obj.userDetailsForm.middleName}
                      rules={[
                        {
                          pattern: RegExpressions.Middlename,
                          message: "Invalid MI",
                        },
                      ]}
                      onChange={handleChange}
                      disabled={disableEdit}
                    />
                  </Col>
                  <Col span={8} md={12} lg={8} xl={8}>
                    <InputBox
                      labelSubName="Last Name"
                      name="lastName"
                      initialValue={obj.userDetailsForm.lastName}
                      rules={[
                        {
                          required: true,
                          message: "Please enter last name",
                        },
                        {
                          pattern: RegExpressions.LastName,
                          message: "Please enter valid name",
                        },
                      ]}
                      onChange={handleChange}
                      disabled={disableEdit}
                    />
                  </Col>
                  <Col span={6} md={12} lg={6} xl={6}>
                    <SelectInput
                      id={obj.userDetailsForm.roleName}
                      labelSubName="Role"
                      placeholder="select"
                      name="roleName"
                      rules={[
                        {
                          required: true,
                          message: "Please select the role",
                        },
                      ]}
                      className="card-dropdown with-search"
                      bordered={true}
                      disabled={true}
                      value={obj.userDetailsForm.roleId}
                      initialValue={
                        disableStatus
                          ? "Platform Admin"
                          : obj.userDetailsForm.roleName
                      }
                      optionValue={roleOptions}
                      onChange={roleStatus}
                    />
                </Col>
                  <Col span={12}>
                    <InputBox
                      labelSubName="Address 1"
                      name="address1"
                      initialValue={obj.userDetailsForm.address1}
                      rules={[
                        {
                          required: true,
                          message: "Please enter Address",
                        },
                      ]}
                      onChange={handleChange}
                      disabled={disableEdit}
                    />
                  </Col>
                  <Col span={12}>
                    <InputBox
                      labelSubName="Address 2"
                      name="address2"
                      initialValue={obj.userDetailsForm.address2}
                      rules={[
                        {
                          required: false,
                          message: "Please enter Address",
                        },
                      ]}
                      onChange={handleChange}
                      disabled={disableEdit}
                    />
                  </Col>
                  <Col span={6} md={12} lg={6} xl={6}>
                    <InputBox
                      labelSubName="City"
                      name="city"
                      initialValue={obj.userDetailsForm.city}
                      rules={[
                        {
                          required: true,
                          message: "Please enter city",
                        },
                        {
                          pattern: RegExpressions.City,
                          message: "Please enter valid city",
                        },
                      ]}
                      onChange={handleChange}
                      disabled={disableEdit}
                    />
                  </Col>
                  <Col span={6} md={12} lg={6} xl={6}>
                    <InputBox
                      labelSubName="State/Province"
                      name="state"
                      initialValue={obj.userDetailsForm.state}
                      rules={[
                        {
                          required: true,
                          message: "Please enter State/Provience",
                        },
                        {
                          pattern: RegExpressions.State,
                          message: "Please enter valid state/province",
                        },
                      ]}
                      onChange={handleChange}
                      disabled={disableEdit}
                    />
                  </Col>
                  <Col span={6} md={12} lg={6} xl={6}>
                    <SelectInput
                      labelSubName="Country"
                      placeholder="Select country"
                      name="country"
                      initialValue={obj.userDetailsForm.country}
                      rules={[
                        {
                          required: true,
                          message: "Please select Country",
                        },
                      ]}
                      className="card-dropdown with-search"
                      bordered={true}
                      optionValue={getCountriesList()}
                      onChange={handleCountrySelect}
                      showSearch
                      disabled={disableEdit}
                    />
                  </Col>
                  <Col span={6} md={12} lg={6} xl={6}>
                    <InputBox
                      labelSubName="Zip/Postal Code"
                      name="zipCode"
                      placeholder="eg. 00000-0000"
                      initialValue={obj.userDetailsForm.zipCode}
                      rules={[
                        {
                          required: true,
                          message: "Please enter zip/postalcode",
                        },
                        {
                          pattern: RegExpressions.ZipCode,
                          message: "Please enter valid Zip/Postal code",
                        },
                      ]}
                      onChange={handleChange}
                      disabled={disableEdit}
                    />
                  </Col>
                  <Col span={12}>
                    
                    <InputBox
                      labelSubName="Email ID"
                      name="email"
                      initialValue={obj.userDetailsForm.email}
                      rules={[
                        {
                          required: isEmailReq(),
                          message: "Please enter Email",
                        },
                        {
                          pattern: RegExpressions.Email,
                          message: "Please enter valid email",
                        },
                      ]}
                      onChange={handleChange}
                      disabled={disableEdit}
                    />
                  </Col>
                  <Col md={12} lg={8} xl={12} style={{ marginTop: "-1.5rem" }}>
                    <Checkbox
                      onChange={onUserNameCheck}
                      className="emailCheckbox"
                      disabled={
                        disableEdit || enableCheckbox() || disableUserName
                      }
                    >
                      Use email address
                    </Checkbox>
                    <InputBox
                      key={`${isChecked}`}
                      labelSubName="User Name"
                      name="username"
                      placeholder="minimum 6 characters"
                      initialValue={obj.userDetailsForm.username}
                      rules={[
                        {
                          required: true,
                          message: "Please enter username",
                        },
                        {
                          pattern: RegExpressions.UserName,
                          message: "Username can not contain space",
                        },
                      ]}
                      onChange={handleChange}
                      disabled={disableEdit || disableUserName}
                    />
                  </Col>
                  <Col span={12}>
                    <PhoneInput
                      name="contactNumber"
                      value={obj.userDetailsForm.contactNumber}
                      label="Contact Number"
                      obj={obj.userDetailsForm}
                      setObj={setObj}
                      disabled={disableEdit}
                      detectChange={detectChange}
                    />
                  </Col>
                  <Col span={12}>
                    <PhoneInput
                      name="mobileNumber"
                      value={obj.userDetailsForm.mobileNumber}
                      label="Mobile Number"
                      rules={{
                        required: true,
                        message: "",
                      }}
                      obj={obj.userDetailsForm}
                      setObj={setObj}
                      disabled={disableEdit}
                      detectChange={detectChange}
                    />
                  </Col>

                  <Col span={12}>
                    <SelectInput
                      disabled={disableEdit || disableStatus}
                      labelSubName="Subscription Status"
                      name="status"
                      className="card-dropdown with-search"
                      bordered={true}
                      initialValue={
                        disableStatus ? "Invited" : obj.userDetailsForm.status
                      }
                      optionValue={userStatusOptions}
                      onChange={subscriptionStatus}
                    />
                  </Col>
                  <Col span={12}>
                  {selectedUser.roleName == "Family"?
                    <SelectInput
                      labelSubName="Relation"
                      placeholder="select"
                      name="relation"
                      className="card-dropdown with-search"
                      bordered={true}
                      initialValue={obj?.userDetailsForm?.relationshipId}
                      value={obj?.userDetailsForm?.relationshipId}
                      optionValue={relationOptions}
                      onChange={relationSelect}
                    />: null}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Card>
      </Spin>
    </div>
  );
};
export default UserForm;