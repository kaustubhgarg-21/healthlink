import {
  Card,
  Checkbox,
  Col,
  Form,
  message,
  Row,
  Spin,
  Upload,
} from "antd";
import { camera, circle } from "../../../../../images";
import InputBox from "../../../common/inputBox";
import ProfileIcon from "../../../common/profileThumbnail";
import { PlusOutlined } from "@ant-design/icons";
import "./addAdmin.less";
import SelectInput from "../../../common/selectInput";
import { MultiSelectInput } from "../../../common/multiSelectInput";
import { PhoneInput } from "../../../common/phoneInput";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../../../../../../redux/actions/role/roleAction";
import { userStatusOptions } from "../../../../../constants/constants";
import { clearState, setSelectedUser, UserStateSelector } from "../../../../../../redux/reducers/user/userReducer";
import WarnModal from "../../../common/warnModal";
import {
  ModalSecondaryMessages,
  ModalType,
  UserRoles,
} from "../../../../../constants/enums";
import { concatNames } from "../../../../../../utility/appUtil";
import { fetchUsers } from "../../../../../../redux/actions/user/userAction";
import { PasswordModal } from "../../../common/passwordModal";
import { UserService } from "../../../../../services/user/userServices";
import { getFullName } from "../../../../../../utility/utils";
import { RegExpressions } from "../../../../../constants/regexp";

export const AddAdminUser = (props: any) => {
  const { adminData, setAdminData, formID, onSubmit, organization, roles, centres, timeZone, setAddAdmin, disableStatus, sendInvite, setInvite, setDisableSave,
    disableSave } = props;
  const { isUpdated, isCreated } = useSelector(UserStateSelector)
  const [showModalView, setShowModalView] = useState(false)
  const [isChecked, setChecked] = useState(false)
  const { selectedUser } = useSelector(UserStateSelector)
  const userSrv = new UserService()
  const [showModal, setShowModal] = useState(false)
  const [chkdisabled, setDisable] = useState(true)
  const [optionCenter, setOptionCenter] = useState<any[]>([])
  const [OptionDpt, setOptionDpt] = useState<any[]>([])
  const [selectedCenters, setSelectedCenters] = useState<any[]>([]);
  const [selectedDpt, setSelectedDpt] = useState<any[]>([]);


  const dispatch = useDispatch()
  const handleChange = (Event: any) => {
    setAdminData({
      ...adminData,
      [Event.target.name]: Event.target.value,
    })
    if (Event.target.name == "email") {
      setDisable(false)
    }
  }
  const onModalViewClose = () => {
    fetchUsers({
      organization: organization?.id,
      role: roles?.filter((role: any) => { if (role.text == UserRoles.ORG_ADMIN) { return role?.value } })[0]?.value
    })
    setAddAdmin(false)
  }

  useEffect(()=>{
    centersData()
  },[adminData])

  useEffect(() => {
    getCentres()
  }, [centres]);

  useEffect(() => {
    return (
      () => {
        dispatch(setSelectedUser({}))
        dispatch(fetchUsers({
          organization: organization?.id,
          role: roles?.filter((role: any) => { if (role.text == UserRoles.ORG_ADMIN) { return role?.value } })[0]?.value
        }))
      }
    )
  }, [])

  useEffect(() => {
    if (isUpdated.isSuccess) {
      dispatch(clearState())
      message.success({
        content: `${concatNames(selectedUser?.firstName, selectedUser?.middleName, selectedUser?.lastName)} updated successfully.`,
        duration: 5 , key:"appNotification"
      })
    } else if (isUpdated.isError) {
      message.error({content: isUpdated?.errorStack ? isUpdated?.errorStack : "Something went wrong" , key: "appNotification" })

    }
  }, [isUpdated.isSuccess, isUpdated.isError])


  useEffect(() => {
    dispatch(fetchRoles({ organizationId: organization?.id }))
  }, [])

  useEffect(() => {
    if (isCreated.isSuccess == true && sendInvite != true) {
      setShowModalView(true)
      dispatch(clearState())
      setDisableSave(true)
      setAdminData({...adminData,
        firstName: "",
        lastName: "",
        middleName: "",
        imageUrl: "",
        email: "", 
        contactNumber: "",
        mobileNumber: "",
        status: "",
        username: "",
      }
    )
  }
    if (isCreated.isSuccess == true && sendInvite == true) {
      setShowModal(true)
      setInvite(false)
      setDisableSave(true)
      setAdminData({...adminData,
        firstName: "",
        lastName: "",
        middleName: "",
        imageUrl: "",
        email: "", 
        contactNumber: "",
        mobileNumber: "",
        status: "",
        username: "",
      }
    )
  
      dispatch(clearState())
    }
    else if (isCreated.isError) {
      message.error({content: isCreated?.errorStack ? isCreated?.errorStack : "Something went wrong" , key: "appNotification" })
      dispatch(clearState())
    }
  }, [isCreated.isSuccess, isCreated.isError])

  const StatusChange = (value: any) => {
    setAdminData({
      ...adminData,
      ["status"]: value,
    });
  };
  const onRoleSelect = (value: any) => {
    setAdminData({ ...adminData, roleId: value });
  };

  const handleCentreSelect = async(value: any) => {
    const updatedSeletcedCenters = await getSelectedCenters(value);
  };


  const getSelectedCenters = async (value: any) => {
    let selectedCentersCopy = []
    for await (const centerId of value) {
        selectedCentersCopy.push(centerId)
    };
    setSelectedCenters(selectedCentersCopy)
    const updatedCenters = await updateAdminCenters(selectedCentersCopy);
    setAdminData({
      ...adminData,
      organisations: {
        ...adminData.organisations,
        ["centers"]: updatedCenters
      },
    });

  }

  // update selected centers in admin data
  const updateAdminCenters = async(selCenters:any[]) => {
    let dptOptList:any[] = []
    let updatedCenters:any[] = []
    await Promise.all(
      selCenters.map(async(selectedCenter: string) => {
      await addDepartmentToOptions(selectedCenter,dptOptList)
      const alreadyExistCenter = adminData?.organisations?.centers.length > 0 && adminData?.organisations?.centers?.filter((center:any)=>center?.centerId === selectedCenter)
      if(alreadyExistCenter?.length > 0) {
        updatedCenters = updatedCenters.concat(alreadyExistCenter)
        return Promise.resolve(updatedCenters)
      } else{
        return Promise.resolve(
          updatedCenters.push({
          centerId: selectedCenter
        })
        )
      }
    })
    )
    return updatedCenters
  }

  // add options to departments drop down
  const addDepartmentToOptions = async(selCenter:any, dptOptList:any[], dptListforAdmindata?:any[]) =>{
    // add department of selected center to department option list
    let index = centres?.findIndex((element: any) => element.id === selCenter)
    if(index >= 0) {
      const temp = centres[index]
      if(temp?.children?.length > 0) {
        const departments = temp?.children?.map((dpt: any) => {
          dptOptList.push({
            id: dpt?.id,
            orgName: dpt?.orgName
          })
          dptListforAdmindata && dptListforAdmindata.push({departmentId:dpt?.id})
         })
      }
    }
    return dptOptList;
}

const updateAdminCentersForDpt = async(selectedDptCopy:any[]) =>{
  let DptIdPId:any[] = [];
  //get departments for centers
  selectedDptCopy.forEach((dpt: any) => {
    const pId = getparentId(dpt)
        const index = DptIdPId.findIndex((dptdata:any)=>dptdata?.centerId === pId)
      if(index>=0) {
        if (DptIdPId[index]?.centerId === pId) {
          const data = {'centerId':pId, 'departments':DptIdPId[index]?.departments.concat({'departmentId':dpt})}//{ ...dptdata, ['departments']: dptdata?.departments.concat({'departmentId':dpt}) }
          DptIdPId.splice(index,1)
          DptIdPId.push(data)
        } else {
          DptIdPId.push({
            centerId: pId,
            departments: [{'departmentId':dpt}]
          })
        }
    } else {
      return DptIdPId.push({
        centerId: pId,
        departments: [{'departmentId':dpt}]
      })
    }
  });
  return DptIdPId;
}

const diffCentersWithOrignal= async(updatedCenters:any[]) =>{
  var result:any[]  = [...updatedCenters]
    if(adminData?.organisations?.centers?.length > 0) {
    const notFound =  adminData?.organisations?.centers.filter((object1:any) => {
      return !updatedCenters.some((object2:any) => {
        return object1?.centerId === object2?.centerId;
      });
    });
    result = [...result, ...notFound]
  }

   return result;
}

const getSelectedDpt = async(value: any) => {
  let selectedDptCopy = []
  for await (const dptId of value) {
    selectedDptCopy.push(dptId)
  };

  setSelectedDpt(selectedDptCopy);
  const updatedCenters = await updateAdminCentersForDpt(selectedDptCopy);
  const finalCenters = await diffCentersWithOrignal(updatedCenters)
  setAdminData({
    ...adminData,
    organisations: {
      ...adminData.organisations,
      ["centers"]: finalCenters
    },
  });

}
  const handleDepartmentSelect = async(value: any) => {
    await getSelectedDpt(value)
  };

  const getparentId = (selectedDepartment:string) => {
    let parentId = '';
    if (centres) {
      var x = centres?.map((centre: any) => {
        if(centre?.children?.length) {
          const result = centre?.children.filter((obj:any) => {
            return obj.id === selectedDepartment
          })
          if(result.length > 0) {
            parentId = result[0]?.parentId
          }

        }
      });
    }
    return parentId
  }
  
  const handleUpload = async ({ fileList }: any) => {
    var form = new FormData();
    form.append("avatar", fileList?.[0].originFileObj);
    if (form) {
      userSrv
        .uploadImage(form)
        .then((data) =>
          setAdminData({
            ...adminData,
            ["imageUrl"]: data,
          })
        )
        .catch((e) => message.error("Failed to upload image."));
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

  function onChecked(e: any) {
    const { checked } = e.target;
    setChecked(checked)
    if (checked) {
      setAdminData({ ...adminData, ["username"]: adminData["email"] });
    } else {
      setAdminData({ ...adminData, ["username"]: "" });
    }

  }
  const getCentres = () => {
    let centerOptions:any[] = []
    if (centres) {
      centerOptions = centres?.map((centre: any) => {
        return {
          text: centre.orgName,
          value: centre.id,
        };
      });
    } 
    setOptionCenter(centerOptions)
  };

  //selected centers of first time load and on change of admin data
  const centersData = () => {
    let result:any[] = []
    let dptOptList:any[] = []
    let dptSelList:any[] = []
    if(adminData?.organisations?.centers?.length > 0) {
      Promise.all(adminData?.organisations?.centers?.map(async(center:any)=>{
        const res:any = center?.departments?.filter((dpt:any)=>dpt?.departmentId).map((dpt:any)=>dpt?.departmentId)
        if(res && res[0] != undefined) dptSelList = dptSelList.concat(res)
        result.push(center?.centerId)
        addDepartmentToOptions(center?.centerId, dptOptList)
      }))
    }
    setSelectedCenters([...result]);
    const dptOptions = dptOptList?.map((dpt: any) => {
      return {
        text: dpt.orgName,
        value: dpt.id,
      };
    });
    if (formID == "updateUser" ){
    setSelectedDpt([...dptSelList]) 
  // setInitialDpt(dptSelList)
}

    setOptionDpt([...dptOptions]);
    return Promise.resolve(result)
  }


  const detectChange = () => {
    if (setDisableSave) {
      setDisableSave(false)
    }
  }
useEffect(()=>{
  if (isUpdated.isSuccess) {
    dispatch(clearState())
    setDisableSave(true)
    message.success({
      content: `${getFullName(selectedUser?.title, selectedUser?.firstName, selectedUser?.middleName, selectedUser?.lastName)} updated successfully.`,
      duration: 5, key: "appNotification"
    })
  } else if (isUpdated.isError) {
    message.error({content: isUpdated?.errorStack ? isUpdated?.errorStack : "Something went wrong" , key: "appNotification" })
    dispatch(clearState())
  }
},[isUpdated.isError, isUpdated.isSuccess])
  return (
     <Spin spinning={isCreated.loading || isUpdated.loading}>
    <>
      <Card className="addPatient" key={adminData?.id} >
        <Form key={`${isChecked}`} layout="vertical" id={formID} onFinish={() => onSubmit(adminData)} onValuesChange={detectChange}>
          <Row gutter={[0, 50]}>
            <Col span={6}>
              <Row gutter={[0, 25]}>
                <Col className="imgPatient" style={{ textAlign: "center" }} span={24}>
                <Form.Item name="imageUrl"
                valuePropName={adminData?.imageUrl}

                 >
                  <Upload
                    beforeUpload={handleBeforeUpload}
                    maxCount={1}
                    openFileDialogOnClick={true}
                    onChange={handleUpload}
                    showUploadList={false}
                  >
                    {adminData?.imageUrl ? (
                      <div className="uploadContainer f-10">
                        <ProfileIcon src={adminData?.imageUrl} size="100" />
                        <span>
                          <img src={circle} className="circleImg" style={{ bottom: "3rem", left: "3.563rem" }}></img>
                          <img src={camera} className="cameraImg" style={{ bottom: "3rem", left: "2rem" }}></img>
                        </span>
                      </div>
                    ) : (
                      <div className="uploadContainer f-10">
                        <div className="orgInfoLogo">
                          <PlusOutlined />
                          <p>Image</p>
                        </div>
                        <span>
                          Upload Image JPG, PNG, Max Size 250K Max Resolution 250px X
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
              </Row>
            </Col>
            <Col span={18}>
              <Row gutter={[20, 25]}>
                <Col className="patientLeftDetails" span={9} md={12} lg={9}>
                  <InputBox
                    labelSubName="First Name"
                    name="firstName"
                    initialValue={adminData?.firstName}
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
                    value={adminData?.firstName}
                  />
                </Col>
                <Col className="patientLeftDetails" span={2} md={12} lg={2}>
                  <InputBox
                    labelSubName="MI"
                    name="middleName"
                    initialValue={adminData?.middleName}
                    rules={[{
                      pattern: RegExpressions.Middlename,
                      message: "Invalid MI"
                    }]}
                    onChange={handleChange}
                    value={adminData?.middleName}
                  />
                </Col>
                <Col className="patientLeftDetails" span={9} md={12} lg={9}>
                  <InputBox
                    labelSubName="Last Name"
                    name="lastName"
                    initialValue={adminData?.lastName}
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
                    value={adminData?.lastName}
                    onChange={handleChange}
                  />
                </Col>
                <Col className="patientLeftDetails" span={4} md={12} lg={4}>
                  <SelectInput
                    disabled={true}
                    labelSubName="Role"
                    placeholder="Select Role"
                    name="role"
                    className="card-dropdown with-search"
                    bordered={true}
                    initialValue={disableStatus ? "Organization Admin" : adminData?.roleName}
                    rules={[
                      {
                        required: true,
                        message: "Please select the role.",
                      },
                    ]}
                    optionValue={roles}
                    value={adminData?.roleId}
                    onChange={onRoleSelect}
                  />
                </Col>
                <Col className="patientLeftDetails" span={12}>
                  <InputBox
                    labelSubName="Email Address"
                    name="email"
                    initialValue={adminData?.email}
                    rules={[
                      {
                        required: true,
                        message: "Please enter email ",
                      },
                      {
                        pattern: RegExpressions.Email,
                        message: "Please enter valid email"
                      }
                    ]}
                    value={adminData?.email}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={12} lg={9} xl={12} className="patientUserName">
                  <Checkbox onChange={onChecked} className="checkboxEmail" defaultChecked={adminData?.username && adminData?.email == adminData?.username} disabled={chkdisabled}>
                    Use email address
                  </Checkbox>
                  <InputBox
                    key={`${isChecked}`}
                    disabled={!disableStatus}
                    labelSubName="User Name"
                    placeholder="minimum 6 characters"
                    name="username"
                    initialValue={adminData?.username}
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
                    value={adminData?.username}
                    onChange={handleChange}

                  />
                </Col>
                <Col className="patientLeftDetails" span={12}>
                  <PhoneInput
                    name="contactNumber"
                    label="Contact Number"
                    obj={adminData}
                    setObj={setAdminData}
                    detectChange={detectChange}
                  />
                </Col>
                <Col className="patientLeftDetails" span={12}>
                  <PhoneInput
                    name="mobileNumber"
                    label="Mobile Number"
                    rules={{
                      required: true,
                      message: "",
                    }}
                    obj={adminData}
                    setObj={setAdminData}
                    detectChange={detectChange}
                  />
                </Col>
                <Col className="patientLeftDetails" span={12}>
                  <SelectInput
                    disabled={disableStatus}
                    labelSubName="Subscription Status"
                    placeholder="status"
                    name="isActive"
                    className="card-dropdown with-search"
                    bordered={true}
                    initialValue={disableStatus ? "Invited" : adminData?.status}
                    rules={[
                      {
                        required: false,
                        message: "Please select subscription status",
                      },
                    ]}
                    value={adminData?.status}
                    optionValue={userStatusOptions}
                    onChange={StatusChange}
                  />
                </Col>
                <Col className="patientLeftDetails" span={12}>
                  <Form.Item name="centerMultiselect">
                  <MultiSelectInput
                    key={selectedCenters.toString()}
                    labelSubName="Center"
                    mode="multiple"
                    value={selectedCenters}
                    name="center"
                    initialValue={selectedCenters}
                    
                    className="card-dropdown with-search"
                    bordered={true}
                    optionValue={optionCenter}
                    onChange={handleCentreSelect}
                    checkType="centres"
                  />
                  </Form.Item>
                </Col>
                <Col className="patientLeftDetails" span={12}>
                <Form.Item name="dptMultiselect">
                  <MultiSelectInput
                    key={selectedDpt.toString()}
                    labelSubName="Department"
                    mode="multiple"
                    value={selectedDpt}
                    name="department"
                    initialValue={selectedDpt}
                    className="card-dropdown with-search"
                    bordered={true}
                    sel={selectedDpt}
                    optionValue={OptionDpt}
                    onChange={handleDepartmentSelect}
                    checkType="department"
                  />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Card>
      <WarnModal cancelButton={null} confirmButton={null} isModalVisible={showModal} type={ModalType.SUCCESS} cancelCallback={onModalViewClose} primaryText={concatNames(adminData.firstName, adminData.lastName, adminData.middleName)} secondaryText={ModalSecondaryMessages.ENTITY_ADDED} />
      <PasswordModal isPasswordModalVisible={showModalView} onCancel={onModalViewClose} userName={selectedUser?.username} password={selectedUser?.password} modalText={ModalSecondaryMessages.ENTITY_ADDED} nameText={concatNames(selectedUser?.firstName, selectedUser?.lastName, selectedUser?.middleName)} />
    </>
    </Spin>
  )
}