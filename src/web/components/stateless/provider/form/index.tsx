import {
  Card,
  Checkbox,
  Col,
  Form,
  message,
  Row,
  Upload,
} from "antd";
import  { useState } from "react";
import { camera, circle } from "../../../../images";
import Button from "../../common/button";
import InputBox from "../../common/inputBox";
import ProfileIcon from "../../common/profileThumbnail";
import SelectInput from "../../common/selectInput";
import "./providerForm.less";
import { PlusOutlined } from "@ant-design/icons";
import { PhoneInput } from "../../common/phoneInput";
import { userStatusOptions, titleOptions } from "../../../../constants/constants";
import { getCountriesList } from "../../../../../utility/appUtil";
import { UserService } from "../../../../services/user/userServices";
import { RegExpressions } from "../../../../constants/regexp";

const ProviderForm = (props:any) => {
  const { obj, onSubmit, formID, setObj,specialities, providerTypes,roleOptions,disableUserName, providerDetails,disableStatus,disableSave , setDisableSave } = props;
  const [isChecked,setChecked] = useState(false)
  const userSrv = new UserService()
  const handleChange = (e: any) => {
    var { name, value } = e.target;
    setObj({...providerDetails, [name]: value });
  };

  const subscriptionStatus = (value: any) => {
    setObj({...providerDetails, ["status"]: value });
  };

  const roleStatus = (value: any) => {
    setObj({...providerDetails, ["roleId"]: value });
  };
 const providerTypeValue = (value:any)=>{
   setObj({...providerDetails,["providerType"]: value});
 }

 const titleType = (value:any)=>{
   setObj({...providerDetails,["title"]: value});
 }

 const specialityType = (value: any)=>{
   setObj({...providerDetails,["specialty"]: value})
 }
  function onChange(checkedValues: any[]) {
    setObj({...providerDetails,["preferredCommumnication"]: checkedValues.join(",")

    })
  }

  const enableCheckbox = () =>{
    if (!providerDetails?.email?.length){
      return true
    }else{
      return false
    }
  }
  
  const plainOptions = [
    {
      label: "SMS",
      value: "SMS"
  },
{
  label: "Email",
  value: "Email",
  disabled: enableCheckbox()
}]
const onUserNameCheck = (e: any) => {
  const {checked} = e.target
  setChecked(checked)
  if(checked){
    setObj({...providerDetails,["username"]: providerDetails["email"]})
  }else{
    setObj({...providerDetails,["username"]:""})
  }
}
  const handleUpload = async ({ fileList }: any) => {
    var form = new FormData();
    form.append("avatar", fileList?.[0].originFileObj);
    if(form){
        userSrv.uploadImage(form).then(data=>setObj({
          ...providerDetails, ["imageUrl"]:data,
        })).catch(e=> message.error("Failed to upload image."))
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
  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleCountrySelect = (value: any) => {
    setObj({
      ...providerDetails,
      ["country"]: value,
    });
  }
  const detectChange=()=>{
    if(setDisableSave){
      setDisableSave(false)
    }
  }
  return (
    <div className="formCardContainer" key={providerDetails?.specialty}>
      <Card className="formCard">
        <Form layout="vertical" id={formID} onFinish={() => onSubmit(providerDetails)} key={`${isChecked}`} onValuesChange={detectChange}>
          <Row>
            <Col span={6} className="uploadImage uploadContainer">
            <Form.Item name="imageUrl" 
            
            valuePropName={providerDetails?.imageUrl}

            >
              <Upload
                beforeUpload={handleBeforeUpload}
                maxCount={1}
                openFileDialogOnClick={providerDetails?.imgUrl ? false : true}
                onChange={handleUpload}
                showUploadList={false}
              >
                
                  {providerDetails?.imageUrl ? (
                   <div className="uploadContainer f-10">
                  <ProfileIcon src={providerDetails?.imageUrl} size="100" />
                  <span>
                      Upload Picture JPG, PNG, Max Size 250K Max Resolution 250px X
                      250px,
                    </span>
                    <div>
                      <img src={circle} className={providerDetails?.imgUrl ? "circleCamImg" : "circleImg "}></img>
                      <img src={camera} className={providerDetails?.imgUrl ? "cameraImg2" : "cameraImg"}></img>
                    </div>
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
                    <div >
                      <img src={circle} className={providerDetails?.imgUrl ? "circleCamImg" : "circleImg "}></img>
                      <img src={camera} className={providerDetails?.imgUrl ? "cameraImg2" : "cameraImg"}></img>
                    </div>
                    </div>
                    )}
                    
                 
              
              </Upload>
              </Form.Item>
            </Col>{console.log(providerDetails,">>>>>>>>>>>>>>>>>>")}
            <Col span={18}>
              <Row gutter={[30, 20]}>
                <Col md={8} lg={8} xl={3}>
                  <SelectInput
                    labelSubName="Title"
                    placeholder="select"
                    name="title"
                    className="title-dropdown"
                    bordered={true}
                    value={providerDetails?.title}
                    initialValue={providerDetails?.title}
                    optionValue={titleOptions}
                    onChange={titleType}
                  />
                 
                </Col>
                <Col md={8} lg={8}  xl={7}>
                  <InputBox
                    labelSubName="First Name"
                    name="firstName"
                    value={providerDetails?.firstName}
                    initialValue={providerDetails?.firstName}
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
                <Col md={8} lg={8} xl={2}>
                  <InputBox
                    labelSubName="MI"
                    name="middleName"
                    rules={[{
                      pattern: RegExpressions.Middlename,
                      message: "Invalid MI"
                  }]}
                    value={providerDetails?.middleName}
                    initialValue={providerDetails?.middleName}
                    onChange={handleChange}
                  />
                </Col>
                <Col  md={12} lg={7}  xl={7}>
                  <InputBox
                    labelSubName="Last Name"
                    name="lastName"
                    value={providerDetails?.lastName}
                    initialValue={providerDetails?.lastName}
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
                <Col span={5} md={12} xl={5}>
                  <InputBox
                    labelSubName="Designation"
                    name="designation"
                    value={providerDetails?.designation}
                    initialValue={providerDetails?.designation}
                    rules={[
                      {
                        required: false,
                        message: "Please enter the designation",
                      },
                      {
                        pattern: RegExpressions.Designation,
                        message: "Designation must have alphabets only"
                      }
                    ]}
                    onChange={handleChange}
                  />
                </Col>
                <Col span={24}>
                  <InputBox
                    labelSubName="Address 1"
                    name="address1"
                    value={providerDetails?.address1}
                    initialValue={providerDetails?.address1}

                    rules={[
                      {
                        required: true,
                        message: "Please enter address",
                      },
                    ]}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={6} className="specialityCol">
              <Row gutter={[10,25]} className="specialityContainer">
                <Col span={24}>
                <SelectInput
                    labelSubName="Specialty"
                    placeholder="select"
                    name="specialty"
                    className="title-dropdown"
                    bordered={true}
                    value={providerDetails?.specialty}
                    initialValue={providerDetails?.specialty}
                    optionValue={specialities}
                    onChange={specialityType}
                  />
                </Col>
                <Col span={24}>
                <SelectInput
                    labelSubName="Provider Type"
                    placeholder="select"
                    name="providerType"
                    className="title-dropdown"
                    bordered={true}
                    value={providerDetails?.providerType}
                    initialValue={providerDetails?.providerType}
                    rules={[
                      {
                        required: true,
                        message: "Please select the provider type",
                      },
                    ]}
                    optionValue={providerTypes}
                    onChange={providerTypeValue}
                  />
                </Col>
                <Col span={24}>
                <SelectInput
                key={providerDetails?.roleId}
                    labelSubName="Role"
                    placeholder="select"
                    name="role"
                    className="title-dropdown"
                    bordered={true}
                    value={providerDetails?.roleId}
                    initialValue={providerDetails?.roleId}
                    optionValue={roleOptions}
                    onChange={roleStatus}
                    disabled={true}
                  />
                </Col>
                <Col span={24}>
                <SelectInput
                  disabled= {disableStatus}
                    labelSubName="Status"
                    placeholder="select"  
                    name="status"
                    className="title-dropdown"
                    bordered={true}
                    value={providerDetails?.status}
                    initialValue={disableStatus? "Invited" : providerDetails?.status}

                    optionValue={userStatusOptions}
                    onChange={subscriptionStatus}
                  />
                </Col>
                <Col span={24}>
                  <p>Preferred Communication Method</p>
                  <Form.Item name="preferredCommunication" initialValue={providerDetails?.preferredCommumnication?.split(",")}>
                  <Checkbox.Group value={providerDetails?.preferredCommumnication?.split(",")} options={plainOptions} onChange={onChange} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={18}>
              <Row gutter={[30, 20]} className="addressContainer">
              <Col span={24}>
                  <InputBox
                    labelSubName="Address 2"
                    name="address2"
                    value={providerDetails?.address2}
                    initialValue={providerDetails?.address2}
                    rules={[
                      {
                        required: false,
                        message: "Please enter address",
                      },
                    ]}
                    onChange={handleChange}
                  />
                </Col>
                <Col span={6} md={12} lg={6} xl={6}>
                  <InputBox
                    labelSubName="City"
                    name="city"
                    value={providerDetails?.city}
                    initialValue={providerDetails?.city}

                    rules={[
                      {
                        required: true,
                        message: "Please enter city",
                      },
                      {
                        pattern: RegExpressions.City,
                        message: "Please enter valid city"
                    }
                    ]}
                    onChange={handleChange}
                  />
                </Col>
                <Col span={6} md={12} lg={6} xl={6}>
                  <InputBox
                    labelSubName="State/Province"
                    name="state"
                    value={providerDetails?.state}
                    initialValue={providerDetails?.state}

                    rules={[
                      {
                        required: true,
                        message: "Please enter state",
                      },
                      {
                        pattern: RegExpressions.State,
                        message: "Please enter valid state/province"
                    }
                    ]}
                    onChange={handleChange}
                  />
                </Col>
                <Col span={6} md={12} lg={6} xl={6}>
                  <InputBox
                    labelSubName="Zip/Postal code"
                    name="zipCode"
                    value={providerDetails?.zipCode}
                    placeholder="eg. 00000-0000"
                    initialValue={providerDetails?.zipCode}
                    rules={[
                      {
                        required: true,
                        message: "Please enter postal code",
                      },
                      {
                      pattern: RegExpressions.ZipCode, 
                      message: "Please enter valid Zip/Postal code",
                    }
                      
                    ]}
                    onChange={handleChange}
                  />
                </Col>
                <Col span={6} md={12} lg={6} xl={6}>
                <SelectInput
                labelSubName="Country"
                placeholder="Select country"
                name="country"
                initialValue={providerDetails?.country}
                rules={[
                  {
                    required: true,
                    message: "Please select Country",
                  },
                ]}
                className="card-dropdown with-search"
                bordered={true}
                value={providerDetails?.country}
                optionValue={getCountriesList()}
                onChange={handleCountrySelect}
                showSearch
              />
                </Col>
                <Col span={12}>
                  <InputBox
                    labelSubName="Email Address"
                    name="email"
                    value={providerDetails?.email}
                    initialValue={providerDetails?.email}

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
                    onChange={handleChange}
                  />
                </Col>
                <Col span={12} style={{marginTop:"-1.5rem"}}>
                <Checkbox onChange={onUserNameCheck} className="emailCheckbox" defaultChecked={providerDetails?.username && providerDetails?.email == providerDetails?.username} disabled={disableUserName || enableCheckbox()}>
                    Use email address
                  </Checkbox>
                  <InputBox
                    key={`${isChecked}`}
                    disabled={disableUserName}
                    labelSubName="User Name"
                    placeholder="minimum 6 characters"
                    name="username"
                    rules={
                      [
                        {
                          required: true,
                          message: "Please enter username"
                        },
                        {
                          pattern: RegExpressions.UserName,
                          message: "Username can not contain space"
                        }
                      ]
                    }
                    value={providerDetails?.username}
                    initialValue={providerDetails?.username}
                    onChange={handleChange}
                  />
                </Col>
                <Col span={12}>
                <PhoneInput
                   name="contactNumber"
                   value={providerDetails?.contactNumber}
                   label="Contact Number"
                   obj={providerDetails}
                   setObj={setObj}
                   detectChange={detectChange}
                   />
                </Col>
                <Col span={12}>
                  <PhoneInput
                   name="mobileNumber"
                   value={providerDetails?.mobileNumber}
                   label="Mobile Number"
                   rules={{
                         required: true,
                         message: "",
                       }}   
                   obj={providerDetails}
                   setObj={setObj}
                   detectChange={detectChange}
                   />
                </Col>
                <Col span={10} md={9} lg={10} xl={10}>
                  <InputBox
                    labelSubName="NPI"
                    name="npi"
                    value={providerDetails?.npi}
                    initialValue={providerDetails?.npi}
                    onChange={handleChange}
                  />
                </Col>
                <Col span={4} md={6} lg={4} xl={4} className="lookUpBtn">
                  <Button htmlType="button" type="primary" disabled>Look up</Button>
                </Col>
                <Col span={10} md={9} lg={10} xl={10}>
                  <InputBox
                    labelSubName="NPI Name"
                    name="npiName"
                    value={providerDetails?.npiName}
                    initialValue={providerDetails?.npiName}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};
export default ProviderForm;