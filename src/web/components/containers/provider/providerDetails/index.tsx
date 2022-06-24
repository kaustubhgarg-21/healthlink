import { Col, message, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import ProviderForm from "../../../stateless/provider/form";
import Button from "../../../stateless/common/button";
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs";
import { AppRoutes } from "../../../../router/appRoutes";
import "./providerDetails.less";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import { CommonIcons, ModalCallBackTypes, ModalPrimaryMessages, ModalSecondaryMessages, ModalType, UnsavedChangesWarnModal } from "../../../../constants/enums";
import { useDispatch, useSelector } from "react-redux";
import { clearState, ProviderStateSelector } from "../../../../../redux/reducers/provider/providerReducer";
import { fetchProviderByID, getProviderTypes, getSpecialityList, updateProvider } from "../../../../../redux/actions/providerActions/providerAction";
import { concatNames, replaceAll } from "../../../../../utility/appUtil";
import WarnModal from "../../../stateless/common/warnModal";
import { ResetModal } from "../../../stateless/common/resetModal";
import { RoleStateSelector } from "../../../../../redux/reducers/role/roleReducer";
import { fetchRoles } from "../../../../../redux/actions/role/roleAction";
import { AuthStateSelector, clearPassword } from "../../../../../redux/reducers/authReducer/authReducer";
import Provider from "../../../../models/provider/provider";
import { deleteUser } from "../../../../../redux/actions/user/userAction";
import { UserStateSelector } from "../../../../../redux/reducers/user/userReducer";
import { useHistory } from "react-router-dom";
import { PasswordModal } from "../../../stateless/common/passwordModal";
import { clearState as clearDelete } from "../../../../../redux/reducers/user/userReducer";
import { changePassword, requestChangePassword } from "../../../../../redux/actions/auth/authAction";
import User from "../../../../models/users/user";
import WarnUnsavedChanges from "../../../stateless/common/warnUnSaveChanges";
import CustomTooltip from "../../../stateless/common/toolTip";

const ProviderDetailsForm = () => {
  const { formState, isUpdated, selectedProvider, providerTypes, specialities } = useSelector(ProviderStateSelector)
  const dispatch = useDispatch()
  const { selectedUser, isDeleted } = useSelector(UserStateSelector)
  
  const history = useHistory()
  const [disableSave , setDisableSave] = useState(true)
  const [saveInit, setSaveInit] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const { appUser , newPasswordGenerated , passwordGenerated} = useSelector(AuthStateSelector)
  const [resetPass, setResetPass] = useState()
  const [reqPass, setReqPass] = useState({ email: selectedProvider?.email })
  const [providerDetailsForm, setProviderDetailsForm] = useState<Provider | any>({
    id: selectedProvider?.id,
    firstName: selectedProvider?.firstName,
    imageUrl: selectedProvider?.imageUrl,
    title: selectedProvider?.title,
    designation: selectedProvider?.designation,
    specialty: selectedProvider?.specialtyId,
    middleName: selectedProvider?.middleName,
    lastName: selectedProvider?.lastName,
    roleId: selectedProvider?.roleId,
    email: selectedProvider?.email,
    username: selectedProvider?.username,
    contactNumber: selectedProvider?.contactNumber,
    mobileNumber: selectedProvider?.mobileNumber,
    address1: selectedProvider?.address1,
    address2: selectedProvider?.address2,
    city: selectedProvider?.city,
    state: selectedProvider?.state,
    country: selectedProvider?.country,
    zipCode: selectedProvider?.zipCode,
    status: selectedProvider?.status,
    providerType: selectedProvider?.providerTypeId,
    npi: selectedProvider?.npi,
    npiName: selectedProvider?.npiName,
    preferredCommumnication: selectedProvider?.preferredCommunication
  });
  const { roles } = useSelector(RoleStateSelector)
  const breadCrumbs = [
    {
      text: "Dashboard",
      link: AppRoutes.LANDING,
    },
    {
      text: "Users",
      link: AppRoutes.PROVIDERLIST,
    },
    {
      text: "EDIT USER",
    },
  ];

  useEffect(() => {
    dispatch(fetchProviderByID(selectedProvider?.id))
    dispatch(getProviderTypes())
    dispatch(getSpecialityList())
    dispatch(fetchRoles({ organizationId: appUser?.orgId }))
  }, [])
  const onProviderEdit = () => {
    dispatch(updateProvider(providerDetailsForm))
  };

  useEffect(() => {
    if (formState.isSuccess) {
      dispatch(clearState());
    } else if (formState.isError) {
      dispatch(clearState());
    }
  }, [formState.isSuccess, formState.isError]);
  const handleDelete = () => {
    dispatch(deleteUser({id: selectedProvider?.id, orgId: appUser?.orgId} as User))
  };

  const resetPasswordModalLink = () => {
    dispatch(requestChangePassword({
      email: selectedProvider?.email,
    }))
  }

  useEffect (()=>{
    if(passwordGenerated.isSuccess){
      if(showReset){
        message.success(`Link to change Password sent succesfully.`)
        setShowReset(false)
      }else{
      setShowModal(true)
      }
      dispatch(clearPassword()) 
    }
      },[passwordGenerated.isSuccess])
  
  useEffect(()=>{
if(isDeleted.isSuccess){
  dispatch(clearDelete())
  setModalVisible(false);
  message.success({content: "Provider deleted successfully.", key:"appNotification"})
    history.push(AppRoutes.PROVIDERLIST)
}else if(isDeleted.isError){
  dispatch(clearDelete())
  message.error({content: isDeleted?.errorStack ? isDeleted?.errorStack : "Somthing went wrong", key:"appNotification"})
}
  },[isDeleted.isSuccess, isDeleted?.isError])


  const resetPasswordModal = () => {
    if (selectedProvider?.email == null || "") {
      dispatch(changePassword(resetPass))

    } else {
      setShowReset(true)
    }
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  const handleCancelCall = () => {
    setShowReset(false)
  }


  useEffect(() => {
    setProviderDetailsForm({
      id: selectedProvider?.id,
      firstName: selectedProvider?.firstName,
      imageUrl: selectedProvider?.imageUrl,
      title: selectedProvider?.title,
      designation: selectedProvider?.designation,
      specialty: selectedProvider?.specialtyId,
      middleName: selectedProvider?.middleName,
      lastName: selectedProvider?.lastName,
      roleId: selectedProvider?.roleId,
      email: selectedProvider?.email,
      username: selectedProvider?.username,
      contactNumber: selectedProvider?.contactNumber,
      mobileNumber: selectedProvider?.mobileNumber,
      address1: selectedProvider?.address1,
      address2: selectedProvider?.address2,
      city: selectedProvider?.city,
      state: selectedProvider?.state,
      country: selectedProvider?.country,
      zipCode: selectedProvider?.zipCode,
      status: selectedProvider?.status,
      providerType: selectedProvider?.providerTypeId,
      npi: selectedProvider?.npi,
      npiName: selectedProvider?.npiName,
      preferredCommumnication: selectedProvider?.preferredCommunication
    })
  }, [selectedProvider])
  useEffect(() => {
    if (isUpdated.isSuccess) {
      dispatch(fetchProviderByID(selectedProvider?.id))
      dispatch(clearState())
      message.success({
        content:
          `${concatNames(selectedProvider?.firstName, selectedProvider?.lastName, selectedProvider?.middleName)} updated successfully.`,
        duration: 5, key:"appNotification"
      })
      setDisableSave(true)
    }else if(isUpdated.isError){
      message.error({content: isUpdated?.errorStack ? isUpdated?.errorStack : "Something went wrong" , key:"appNotification"})
      dispatch(clearState())
    }
  }, [isUpdated.isSuccess, isUpdated.isError])

  const onModalClose = () => {
    setShowModal(false)
  }

  const handleBackButton = () => {
    history.push(AppRoutes.PROVIDERLIST)
  }
  const getSpecialityOptions = () => {
    return specialities?.map((speciality) => {
      return (
        {
          text: speciality.name,
          value: speciality.id
        }
      )
    })
  }
  const getTypeOptions = () => {
    if (providerTypes) {
      return providerTypes?.map((type) => {
        return (
          {
            text: type.name,
            value: type.id
          }
        )
      })
    } else return []
  }
  const getRoleOptions = () => {
    return roles?.map((role) => {
      return (
        {
          text: role.name,
          value: role.id
        }
      )
    })
  }
  return (
    <Spin spinning={formState.loading || isUpdated.loading || passwordGenerated.loading || isDeleted?.loading} >
      <Row className="innerHeader expand" justify="space-between">
        <Col md={24} lg={8} xl={8}>
          <Breadcrumbs breadcrumbs={breadCrumbs} />
          <CustomTooltip placement="bottom" title={concatNames(selectedProvider?.firstName, selectedProvider?.lastName, selectedProvider?.middleName)} color="#ffffff" > <p className="brdUserName f-20 slice">{concatNames(selectedProvider?.firstName, selectedProvider?.lastName, selectedProvider?.middleName)}</p></CustomTooltip>
        </Col>
        <Col md={24} lg={14} xl={13}>
          <Row gutter={16} className="" justify="end">
          <Col md={4} lg={4} xl={4}>
              <Button type="primary" onClick={handleBackButton}>
                Cancel
              </Button>
            </Col>
            <Col md={5} lg={5} xl={5}>
              <Button type="primary" onClick={() => setModalVisible(true)}>
                <span className="material-icons-outlined">
                  {CommonIcons.delete}
                </span>
                Delete
              </Button>
            </Col>
            <Col md={7} lg={8} xl={8}>
              <Button type="primary" onClick={resetPasswordModal}>
                <span className="material-icons-outlined" >
                  {CommonIcons.unlock}
                </span>                Reset Password
              </Button>
            </Col>
            <Col md={7} lg={7} xl={7} className="editProv">
              <Button type="primary" htmlType="submit" form="providerEdit" disabled={disableSave}>
                Save Changes
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <CompWrapper observeOn="innerHeader">
        <ProviderForm
          providerDetails={providerDetailsForm}
          setObj={setProviderDetailsForm}
          onSubmit={onProviderEdit}
          formID="providerEdit"
          specialities={getSpecialityOptions()}
          providerTypes={getTypeOptions()}
          roleOptions={getRoleOptions()}
          disableUserName={true}
          disableStatus={false}
          setDisableSave={setDisableSave}
                disableSave={disableSave}
        />
      </CompWrapper>
      <WarnModal
        type={ModalType.WARN}
        isModalVisible={isModalVisible}
        primaryText={ModalPrimaryMessages.DELETE_USER}
        secondaryText={replaceAll(/\{0\}/gi, ModalSecondaryMessages.DELETE_ORGANIZATION, concatNames(selectedProvider?.firstName, selectedProvider?.lastName, selectedProvider?.middleName))}
        cancelButton={ModalCallBackTypes.CANCEL} confirmButton={ModalCallBackTypes.DELETE}
        cancelCallback={handleCancel}
        confirmCallback={handleDelete}
      />

<WarnUnsavedChanges
        ignorePrompt={saveInit}
        navigateOnCancel={true}
        title={UnsavedChangesWarnModal.TITLE}   
        content={UnsavedChangesWarnModal.CONTENT}
        cancelBtnText={UnsavedChangesWarnModal.DISCARD_BTN_TEXT}
        confirmBtnText={UnsavedChangesWarnModal.CONFIRM_BTN_TEXT}
        isDirty = {disableSave? false:true }
      />
      <ResetModal isResetModalVisible={showReset}
        onReset={resetPasswordModalLink}
        cancelCallback={handleCancelCall}
        value={providerDetailsForm?.email} />
      <PasswordModal isPasswordModalVisible={showModal} onCancel={onModalClose} userName={newPasswordGenerated?.username} password={newPasswordGenerated?.password} modalText={ModalSecondaryMessages.PASSWORDCHANGE} nameText={"New Password Generated"} />

    </Spin>
  );
};
export default ProviderDetailsForm;
