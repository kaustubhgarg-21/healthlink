import { Col, Row, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProviderStateSelector } from "../../../../../redux/reducers/provider/providerReducer";
import {
  AuthStateSelector,
  clearPassword,
  logout,
  clearState,
} from "../../../../../redux/reducers/authReducer/authReducer";
import {
  fetchProviderByID,
  getProviderTypes,
  getSpecialityList,
} from "../../../../../redux/actions/providerActions/providerAction";
import { fetchUserById } from "../../../../../redux/actions/user/userAction";
import {
  CommonIcons,
  ModalSecondaryMessages,
  UnsavedChangesWarnModal,
  UserRoles,
} from "../../../../constants/enums";
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs";
import Button from "../../../stateless/common/button";
import { Settings } from "../../../stateless/user/accountSettings";
import { RoleStateSelector } from "../../../../../redux/reducers/role/roleReducer";
import {
  UserStateSelector,
  clearState as userClearState,
} from "../../../../../redux/reducers/user/userReducer";
import { fetchRoles } from "../../../../../redux/actions/role/roleAction";
import Provider from "../../../../models/provider/provider";
import User from "../../../../models/users/user";
import {
  changePassword,
  requestChangePassword,
  updateUserAccountSetting,
} from "../../../../../redux/actions/auth/authAction";
import { ResetModal } from "../../../stateless/common/resetModal";
import { PasswordModal } from "../../../stateless/common/passwordModal";
import { useHistory } from "react-router-dom";
import { AppRoutes } from "../../../../router/appRoutes";
import { OrgAdminSettings } from "../../../stateless/user/accountSettings/orgAdminSettings";
import WarnUnsavedChanges from "../../../stateless/common/warnUnSaveChanges";
export const AccountSetting = () => {
  const { roles } = useSelector(RoleStateSelector);
  const { specialities, selectedProvider, isUpdated, formState, isAssigned } =
    useSelector(ProviderStateSelector);
  const [showReset, setShowReset] = useState(false);
  const [saveInit, setSaveInit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [settings, setSettings] = useState<Provider | any>({} as Provider);
  const [userData, setUserData] = useState<User | any>({} as User);
  const {
    isAuthenticated,
    appUser,
    newPasswordGenerated,
    passwordGenerated,
    accountSettingUpdate,
  } = useSelector(AuthStateSelector);
  const userState = useSelector(UserStateSelector);

  const getSpecialityOptions = () => {
    return specialities?.map((item) => {
      return {
        text: item.name,
        value: item.id,
      };
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      switch (appUser?.roleName) {
        case UserRoles.PROVIDER: {
          dispatch(fetchProviderByID(appUser?.id));
          dispatch(getProviderTypes());
          dispatch(getSpecialityList());
          dispatch(fetchRoles({ organizationId: appUser?.orgId }));
          break;
        }
        case UserRoles.PLATFORM_ADMIN:
        case UserRoles.SUPER_ADMIN: {
          dispatch(fetchUserById(appUser?.id));
          dispatch(fetchRoles({}));
          break;
        }
        case UserRoles.ORG_ADMIN:
        case UserRoles.PATIENT:
        case UserRoles.FAMILY: {
          dispatch(fetchUserById(appUser?.id));
          dispatch(fetchRoles({ organizationId: appUser?.orgId }));
          break;
        }
      }
    }
  }, []);
  useEffect(() => {
    if (userState?.selectedUser) {
      setUserData({
        id: userState?.selectedUser?.id,
        title: userState?.selectedUser?.title,
        firstName: userState?.selectedUser?.firstName,
        lastName: userState?.selectedUser?.lastName,
        middleName: userState?.selectedUser?.middleName,
        imageUrl: userState?.selectedUser?.imageUrl,
        email: userState?.selectedUser?.email,
        roleId: appUser?.roleId,
        roleName: appUser?.roleName,
        address1: userState?.selectedUser?.address1,
        address2: userState?.selectedUser?.address2,
        city: userState?.selectedUser?.city,
        state: userState?.selectedUser?.state,
        country: userState?.selectedUser?.country,
        zipCode: userState?.selectedUser?.zipCode,
        status: userState?.selectedUser?.status,
        contactNumber: userState?.selectedUser?.contactNumber,
        username: userState?.selectedUser?.username,
        mobileNumber: userState?.selectedUser?.mobileNumber,
        organisations: userState?.selectedUser?.organisations,
        preferredCommumnication:
          userState?.selectedUser?.preferredCommumnication,
      });
    }
  }, [userState?.selectedUser]);

  useEffect(() => {
    const obj = {
      id: selectedProvider?.id,
      firstName: selectedProvider?.firstName,
      imageUrl: selectedProvider?.imageUrl,
      title: selectedProvider?.title,
      designation: selectedProvider?.designation,
      specialty: selectedProvider?.specialtyId,
      middleName: selectedProvider?.middleName,
      lastName: selectedProvider?.lastName,
      roleId: selectedProvider?.roleId,
      roleName: appUser?.roleName,
      email: selectedProvider?.email,
      contactNumber: selectedProvider?.contactNumber,
      mobileNumber: selectedProvider?.mobileNumber,
      address1: selectedProvider?.address1,
      address2: selectedProvider?.address2,
      city: selectedProvider?.city,
      state: selectedProvider?.state,
      country: selectedProvider?.country,
      organization: appUser?.orgName,
      username: selectedProvider?.username,
      zipCode: selectedProvider?.zipCode,
      status: selectedProvider?.status,
      providerType: selectedProvider?.providerTypeId,
      npi: selectedProvider?.npi,
      npiName: selectedProvider?.npiName,
      preferredCommumnication: selectedProvider?.preferredCommunication,
    };
    setSettings(obj);
  }, [selectedProvider]);
  const onSubmit = () => {
    dispatch(updateUserAccountSetting(settings));
  };
  const updateOrgAdminSetting = () => {
    dispatch(updateUserAccountSetting(userData));
  };
  const handleCancelCall = () => {
    setShowReset(false);
  };
  const onModalClose = () => {
    setShowModal(false);
  };
  const history = useHistory();
  const handleCancel = () => {
    appUser?.roleName === UserRoles?.FAMILY ||
    appUser?.roleName === UserRoles?.PATIENT
      ? history.push(AppRoutes.PATIENTREPORTS)
      : history.push(AppRoutes.LANDING);
  };

  useEffect(() => {
    if (passwordGenerated.isSuccess) {
      if (showReset) {
        message
          .success(`Link to change Password sent succesfully.`)
          .then(() => dispatch(logout()));
        setShowReset(false);
      } else {
        setShowModal(true);
      }
      dispatch(clearPassword());
    }
  }, [passwordGenerated.isSuccess]);

  const resetPasswordModalLink = () => {
    switch (appUser?.roleName) {
      case UserRoles.PROVIDER: {
        return dispatch(requestChangePassword({ email: settings?.email }));
      }
      default: {
        return dispatch(requestChangePassword({ email: userData?.email }));
      }
    }
  };

  const changeAccountPassword = () => {
    switch (appUser?.roleName) {
      case UserRoles.PROVIDER: {
        if (settings?.email == null || "") {
          return dispatch(changePassword({ username: settings?.username }));
        } else {
          return setShowReset(true);
        }
      }
      default: {
        if (userData?.email == null || "") {
          return dispatch(changePassword({ username: userData?.username }));
        } else {
          return setShowReset(true);
        }
      }
    }
  };

  useEffect(() => {
    if (accountSettingUpdate?.isSuccess) {
      dispatch(userClearState());
      dispatch(clearState());
      dispatch(fetchUserById(appUser?.id));
      message.success({
        content: `Your account is updated successfully.`,
        duration: 5,
        key: "appNotification",
      });
      setDisableSave(true);
    }
  }, [accountSettingUpdate.isSuccess]);
  const getRoleOptions = () => {
    return roles?.map((role) => {
      return {
        text: role.name,
        value: role.id,
      };
    });
  };

  const nextPage = [
    {
      text: "Account Settings",
    },
  ];

  const resetPassValue = () => {
    switch (appUser?.roleName) {
      case UserRoles.PROVIDER: {
        return settings.email;
      }
      default: {
        return userData.email;
      }
    }
  };

  const manageAccountSettingForm = () => {
    switch (appUser?.roleName) {
      case UserRoles.PROVIDER: {
        return (
          <Settings
            settings={settings}
            setSettings={setSettings}
            roleOptions={getRoleOptions()}
            specialities={getSpecialityOptions()}
            onSubmit={onSubmit}
            formID="addSettings"
            disableSave={disableSave}
            setDisableSave={setDisableSave}
          />
        );
      }
      case UserRoles.SUPER_ADMIN:
      case UserRoles.PLATFORM_ADMIN:
      case UserRoles.PATIENT:
      case UserRoles.FAMILY: {
        return (
          <Settings
            settings={userData}
            setSettings={setUserData}
            roleOptions={getRoleOptions()}
            onSubmit={updateOrgAdminSetting}
            formID="addSettings"
            disableSave={disableSave}
            setDisableSave={setDisableSave}
          />
        );
      }

      case UserRoles.ORG_ADMIN: {
        return (
          <OrgAdminSettings
            settings={userData}
            setSettings={setUserData}
            roleOptions={getRoleOptions()}
            onSubmit={updateOrgAdminSetting}
            formID="addSettings"
            disableSave={disableSave}
            setDisableSave={setDisableSave}
          />
        );
      }
    }
  };

  return (
    <>
      <Spin
        spinning={
          isUpdated.loading ||
          formState.loading ||
          isAssigned.loading ||
          userState.isUpdated.loading ||
          userState.formState.loading ||
          passwordGenerated.loading ||
          accountSettingUpdate.loading
        }
      >
        <Row gutter={20} className="innerHeader expand">
          <Col md={24} lg={10} xl={11}>
            <Breadcrumbs breadcrumbs={nextPage} />
            <span className="addUserHeader f-20">Account Settings</span>
          </Col>
          <Col md={8} lg={0} xl={0} xxl={0}></Col>
          <Col md={8} lg={6} xl={5}>
            <Button
              type="primary"
              htmlType="submit"
              className="saveButton"
              form="addUserDetails"
              onClick={changeAccountPassword}
            >
              <span className="material-icons-outlined">
                {CommonIcons.unlock}{" "}
              </span>
              CHANGE PASSWORD
            </Button>
          </Col>
          <Col md={3} lg={3} xl={3}>
            <Button
              type="primary"
              htmlType="submit"
              className="saveButton"
              form="addUserDetails"
              onClick={handleCancel}
            >
              CANCEL
            </Button>
          </Col>
          <Col md={5} lg={5} xl={5} className="saveacc">
            <Button
              type="primary"
              className="saveButton"
              htmlType="submit"
              disabled={disableSave}
              form="addSettings"
            >
              SAVE CHANGES
            </Button>
          </Col>
        </Row>
        <div>{manageAccountSettingForm()}</div>
        <ResetModal
          isResetModalVisible={showReset}
          onReset={resetPasswordModalLink}
          cancelCallback={handleCancelCall}
          value={resetPassValue()}
        />
        <PasswordModal
          isPasswordModalVisible={showModal}
          onCancel={onModalClose}
          userName={newPasswordGenerated?.username}
          password={newPasswordGenerated?.password}
          modalText={ModalSecondaryMessages.PASSWORDCHANGE}
          nameText={"New Password Generated"}
        />
        <WarnUnsavedChanges
          ignorePrompt={saveInit}
          navigateOnCancel={true}
          title={UnsavedChangesWarnModal.TITLE}
          content={UnsavedChangesWarnModal.CONTENT}
          cancelBtnText={UnsavedChangesWarnModal.DISCARD_BTN_TEXT}
          confirmBtnText={UnsavedChangesWarnModal.CONFIRM_BTN_TEXT}
          isDirty={disableSave ? false : true}
        />
      </Spin>
    </>
  );
};
