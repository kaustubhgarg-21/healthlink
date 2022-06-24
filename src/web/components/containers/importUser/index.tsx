import { Card, Col, Form, message, Modal, Row, Spin, Upload } from "antd";
import { useEffect, useState } from "react";
import "./importUser.less";
import { AppRoutes } from "../../../router/appRoutes";
import { Breadcrumbs } from "../../stateless/common/breadCrumbs";
import Button from "../../stateless/common/button";
import SelectInput from "../../stateless/common/selectInput";
import { useDispatch, useSelector } from "react-redux";
import { AuthStateSelector } from "../../../../redux/reducers/authReducer/authReducer";
import { CompWrapper } from "../../stateless/common/contentWrapper";
import { clearState, UserStateSelector } from "../../../../redux/reducers/user/userReducer";
import { importUsers } from "../../../../redux/actions/user/userAction";
import { useHistory } from "react-router-dom";
import { UserModal } from "../../stateless/common/userModal";
import WarnModal from "../../stateless/common/warnModal";
import { ModalPrimaryMessages,  ModalSecondaryMessages, ModalType } from "../../../constants/enums";

const ImportUser = () => {
  const [isInstructionModalVisible, setisInstructionModalVisible] =
    useState(false);
  const [urlUpload, setUrlUpload] = useState<any>();
  const [showUserModal , setShowUserModal] = useState(false)
  const [uploadReqBody, setuploadReqBody] = useState({
    userType: "",
    body: {},
  });
  const { appUser } = useSelector(AuthStateSelector);
  const {isUploaded, uploadedUsers} = useSelector(UserStateSelector)
  const [showModal ,setShowModal] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  var form = new FormData();
  const nextTab = [
    {
      text: "Dashboard",
      link: AppRoutes.LANDING,
    },
    {
      text: "Import Users",
    },
  ];
  const optionsUserType = [
    {
      text: "Patient",
      value: "patient",
    },
    {
      text: "Provider",
      value: "provider",
    },
  ];
  const handleInstructionModal = () => {
    setisInstructionModalVisible(true);
  };
  const cancelInstructionModal = () => {
    setisInstructionModalVisible(false);
  };
  const onModalClose = () => {
    setShowModal(false)
  }
  const handleBeforeUpload = async (file: any, fileList: any) => {
    const isXlsx =
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel";
    if (!isXlsx) {
      message.error(
        "You can only upload .xlxs file!, please read the instructions."
      );
    }
    return isXlsx ? false : Upload.LIST_IGNORE;
  };
  const getOrgId = () =>{
    if(appUser&& appUser?.orgId){
      return appUser?.orgId
    } else return ""
  }
  const getBase64 = (file: any) => {
    return new Promise<string| any>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleUpload = ({ fileList }: any) => {
    form.append("uploadfile", fileList?.[0].originFileObj,)
    form.append("organisation", getOrgId(),)
    setuploadReqBody({
      ...uploadReqBody,
      body: form,
    });
    setUrlUpload(fileList?.[0].originFileObj);
  };

  const handleUserTypeSelect = (value: any) => {
    setuploadReqBody({
      ...uploadReqBody,
      userType: value,
    });
  };
  const onSubmit = () => {
    dispatch(importUsers(uploadReqBody))
  };

const onUserModalClose = () => {
  setShowUserModal(false)
}
  useEffect(() => {
    if (isUploaded.isSuccess) {
      setShowUserModal(true);   
      dispatch(clearState());
    } else if (isUploaded.isError) {
      setShowModal(true);
      dispatch(clearState());
    }
  }, [isUploaded.isSuccess, isUploaded.isError]);
  return (
    <Spin spinning={isUploaded.loading}>
      <Row justify="space-between" className="innerHeader">
        <Col md={14} lg={12} xl={10}>
          <Breadcrumbs breadcrumbs={nextTab} />
          <span className="platformUsers f-20">Import Users</span>
        </Col>
        <Col md={6} lg={6} xl={4}>
          <Button type="primary" className="btnIntruction" onClick={handleInstructionModal}>
            Instructions
          </Button>
        </Col>
      </Row>
      <CompWrapper observeOn="innerHeader">
        <Card className="importScreenCard">
          <Form id="importUsers" onFinish={onSubmit}>
            <Row gutter={[30, 10]}>
              <Col md={12} lg={6} xl={8}>
                <SelectInput
                  labelSubName="User Type"
                  placeholder="select"
                  name="status"
                  className="card-dropdown with-search impUser"
                  bordered={true}
                  rules={[
                    {
                      required: true,
                      message: "Please select user type",
                    },
                  ]}
                  optionValue={optionsUserType}
                  onChange={handleUserTypeSelect}
                />
              </Col>
              <Col md={12} lg={7} xl={6}>
                  <Form.Item name="uploadFile"
                  rules={[
                    {
                      required: true,
                      message: "Please Select a File.",
                    },
                  ]}>
                  <div className="browseBtn slice">
                  {urlUpload?.name ?<span>{urlUpload?.name}</span>:<span style={{color:'#ddd'}}>You can only upload .xlxs file!</span>}
                    </div>
                    </Form.Item>
                    </Col>
                    <Col md={14} lg={0} xl={0} ></Col>
                    <Col  md={5} xl={3} lg={3} xxl={3} style={{textAlign:'center'}}>
                    <Form.Item name="uploadFile"
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}>

                    <Upload
                      name="uploadFile"
                      className="importUpload"
                      beforeUpload={handleBeforeUpload}
                      maxCount={1}
                      openFileDialogOnClick={true}
                      onChange={handleUpload}
                      showUploadList={false}
                    >
                      <div className="primary browser">Browse</div>
                    </Upload>
                </Form.Item>
                    </Col>
                    <Col md={5} lg={6} xl={3}>
                      <Button type="primary" htmlType="submit" form="importUsers">
                        submit
                      </Button>
                    </Col>
            </Row>
          </Form>
        </Card>
      </CompWrapper>
      <Modal
        wrapClassName="instructionModal"
        centered
        footer={null}
        onCancel={cancelInstructionModal}
        visible={isInstructionModalVisible}
      >
        <Row className="instHead">
          <span>Instructions</span>
        </Row>
        <Row>
          <ul>
            <li className="liTxt">File should be of format <b>".xlsx"</b></li>
            <li className="liTxt">
             You can import maximum <b>100 users</b> at a time.
            </li>
            <li className="liTxt">
             While importing <b>Provider</b>, columns <b>"First Name"</b>, <b>"Last Name"</b>, <b>"Mobile Number"</b>, <b>"Email"</b>, <b>"Address 1"</b>, <b>"City"</b>, <b>"Country"</b>, <b>"State"</b>, <b>"Zip Code"</b>, <b>"Provider Type"</b> must be present in the selected file.
            </li>
            <li className="liTxt">
             While importing <b>Patient</b>, columns <b>"First Name"</b>, <b>"Last Name"</b>, <b>"Mobile Number"</b>, <b>"Address 1"</b>, <b>"City"</b>, <b>"Country"</b>, <b>"State"</b>, <b>"Zip Code"</b>, <b>"Gender"</b>, <b>"DOB"</b>, <b>"P-MRN"</b> must be present in the selected file.
            </li>
            <li className="liTxt">
             Patient will not be imported if there is no Family details, having columns <b>"First Name"</b>, <b>"Last Name"</b>, <b>"Mobile Number"</b>, <b>"Address 1"</b>, <b>"City"</b>, <b>"Country"</b>, <b>"State"</b>, <b>"Zip Code"</b>, <b>"Relationship"</b>.
            </li>
          </ul>
        </Row>
      </Modal>
      <UserModal uploadedUsers={uploadedUsers} cancelButton={null} confirmButton={null} isModalVisible={showUserModal} cancelCallback={onUserModalClose} />
      <WarnModal cancelButton={null} confirmButton={null} isModalVisible={showModal} type={ModalType.WARN} cancelCallback={onModalClose} primaryText={ModalPrimaryMessages.UPDATE} secondaryText={ModalSecondaryMessages.UPDATE_ERROR}/>

    </Spin>
  );
};
export default ImportUser;