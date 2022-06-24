import { Col, Row, Tabs, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignHubToPatients,
  assignPayerToPatients,
  assignProviderToPatients,
  fetchPatientById,
  fetchPatientHub,
  fetchPatientFamily,
  fetchProviderOfPatient,
  fetchRelationships,
  updatePatient,
  fetchPatientDevice,
  fetchPatientPayers,
} from "../../../../../redux/actions/patient/patientAction";
import { setCollapsed } from "../../../../../redux/reducers/sideBarReducer";
import { AppRoutes } from "../../../../router/appRoutes";
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import {
  clearState as clearDelete,
  UserStateSelector,
} from "../../../../../redux/reducers/user/userReducer";
import { PatientDetailCard } from "../../../stateless/patient/detailsCard";
import { EventHistory } from "../../../stateless/patient/eventHistory";
import { FamilyCardDetail } from "../../../stateless/patient/family/familyDetailCard";
import { AddFamilyCard } from "../../../stateless/patient/family/familyDetailCard/addFamilyCard";
import { PatientForm } from "../../../stateless/patient/form";
import { ProviderCardDetail } from "../../../stateless/patient/providerDetailCard";
import { AddProviderCard } from "../../../stateless/patient/providerDetailCard/addProviderCard";
import {
  concatNames,
  replaceAll,
} from "../../../../../utility/appUtil";
import { createFamily } from "../../../../../redux/actions/patient/patientAction";
import {
  fetchProviderList,
  getProviderTypes,
} from "../../../../../redux/actions/providerActions/providerAction";
import "./patientDetail.less";
import {
  AuthStateSelector,
  clearPassword,
} from "../../../../../redux/reducers/authReducer/authReducer";
import {
  CommonIcons,
  ModalCallBackTypes,
  ModalPrimaryMessages,
  ModalSecondaryMessages,
  ModalType,
  ProviderGroups,
  UnsavedChangesWarnModal,
  UserRoles,
} from "../../../../constants/enums";
import FamilyListTable from "../../../stateless/patient/family";
import { FamilyForm } from "../../../stateless/patient/family/addFamily";
import {
  clearState,
  PatientStateSelector,
} from "../../../../../redux/reducers/patient/patientReducer";
import { PatientOrganization } from "../../../stateless/patient/patientOrg";
import { ProviderTableList } from "../../../stateless/patient/providerTable";
import { ProviderStateSelector } from "../../../../../redux/reducers/provider/providerReducer";
import { RoleStateSelector } from "../../../../../redux/reducers/role/roleReducer";
import DeviceDetails from "../../../stateless/patient/devices";
import Button from "../../../stateless/common/button";
import Payer from "../../../../models/payer/payer";
import { PayerForm } from "../../../stateless/payer/payerForm";
import PayerListing from "../../../stateless/patient/payer";
import {
  createPayer,
  fetchPayers,
} from "../../../../../redux/actions/payer/payerAction";
import { Demo } from "../../../stateless/demo";
import PatientDetailsCard from "../../../stateless/patient/patientDetailsCard";
import { PasswordModal } from "../../../stateless/common/passwordModal";
import { useHistory } from "react-router-dom";
import { getFullName, removeEmptyKeys } from "../../../../../utility/utils";
import Provider from "../../../../models/provider/provider";
import WarnModal from "../../../stateless/common/warnModal";
import WarnUnsavedChanges from "../../../stateless/common/warnUnSaveChanges";
import CustomTooltip from "../../../stateless/common/toolTip";
import User from "../../../../models/users/user";
import { deleteUser } from "../../../../../redux/actions/user/userAction";
import {
  changePassword,
  requestChangePassword,
} from "../../../../../redux/actions/auth/authAction";
import { ResetModal } from "../../../stateless/common/resetModal";

export const PatientDetails = (props: any) => {
  const { appUser, newPasswordGenerated, passwordGenerated } =
    useSelector(AuthStateSelector);
  const { TabPane } = Tabs;
  const [showReset, setShowReset] = useState(false);
  const history = useHistory();
  const [deviceModal, setDeviceModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [saveInit, setSaveInit] = useState(false);
  const [detectPatientFormChange, setDetectPatientFormChange] = useState(true);
  const [selectedTab, setSelectedTab] = useState("1");
  const {
    formState,
    relationShips,
    isUpdated,
    selectedPatient,
    isAssigned,
    patientProvider,
    patientFamily,
    createdFamilyMember,
    unAssigned,
    patientHub,
  } = useSelector(PatientStateSelector);
  const { providerTypes, specialities } = useSelector(ProviderStateSelector);
  const [test, setTest] = useState<any>();
  const [providerGroup, setproviderGroup] = useState<Provider[]>([]);
  const [careGroup, setCareGroup] = useState<Provider[]>([]);
  const [payerGroup, setPayerGroup] = useState<Provider[]>([]);
  const [disableSave, setDisableSave] = useState(true);
  const [patientForm, setPatientForm] = useState(selectedPatient);
  const [familyForm, setFamilyForm] = useState(false);
  const [assignView, setAssignView] = useState(false);
  const { roles } = useSelector(RoleStateSelector);
  const [resetPass, setResetPass] = useState({
    username: selectedPatient?.username,
  });
  const getRoleOptions = () => {
    return roles?.map((role) => {
      return {
        text: role.name,
        value: role.id,
      };
    });
  };
  var familyRole = getRoleOptions().filter((role) => {
    return role.text == UserRoles.FAMILY;
  })[0]?.value;
  const [sendInvite, setSendInvite] = useState(false);
  const [showModalView, setShowModalView] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isWarnModalVisible, setIsWarnModalVisible] = useState(false);
  const [detectFamilyFormChange, setDetectFamilyFormChange] = useState(true);
  const [detectPayerFormChange, setDetectPayerFormChange] = useState(true);
  const [detectFormChange, setDetectFormChange] = useState(true);
  const [testing, setTesting] = useState(true);
  const { isDeleted } = useSelector(UserStateSelector);
  const [familyDetailForm, setFamilyDetailForm] = useState<any>({
    username: "",
    title: "",
    relationshipId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    imageUrl: "",
    contactNumber: "",
    email: "",
    roleId: familyRole,
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });
  const [payerDetails, setPayerDetails] = useState<Payer | any>({
    companyName: "",
    contactName: "",
    contactNumber: "",
    mobileNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });
  const [payerForm, setpayerForm] = useState(false);
  const [showFamilyCreation, setFamilyCreation] = useState(false);
  const [payerList, setPayerList] = useState<any>();
  const [hubList, setHubList] = useState<any>({
    biometricName: "",
  });
  const onModalClose = () => {
    setShowModal(false);
    setShowModalView(false);
    setFamilyForm(false);
    setFamilyCreation(false);
    setIsModalVisible(false);
  };
  useEffect(() => {
    if (passwordGenerated.isSuccess) {
      if (showReset) {
        message.success(`Link to change Password sent succesfully.`);
        setShowReset(false);
      } else if (isWarnModalVisible) {
        setIsWarnModalVisible(false);
        setShowModal(true);
      }
      dispatch(clearPassword());
    }
  }, [passwordGenerated.isSuccess]);
  const setChange = (value: any) => {
    setDisableSave(value);
    setDetectFormChange(!value);
  };
  const [hubInfo, setHubInfo] = useState<any>({
    id: "",
    patientId: selectedPatient?.id,
    companyName: "STEL",
    isActive: true,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setPatientForm(selectedPatient);
  }, [selectedPatient]);

  const getRelationOptions = () => {
    if (relationShips) {
      return relationShips?.map((type) => {
        return {
          text: type.name,
          value: type.id,
        };
      });
    } else return [];
  };
  useEffect(() => {
    if (patientProvider?.length) {
      setproviderGroup(
        patientProvider?.filter((dum) => {
          return dum?.group == ProviderGroups.provider;
        })
      );
      setCareGroup(
        patientProvider?.filter((dum) => {
          return dum?.group == ProviderGroups.careTeam;
        })
      );
      setPayerGroup(
        patientProvider?.filter((dum) => {
          return dum?.group == ProviderGroups.payer;
        })
      );
    }
  }, [patientProvider]);
  useEffect(() => {
    if (appUser?.roleName == UserRoles.ORG_ADMIN) {
      dispatch(setCollapsed(false));
    } else {
      dispatch(setCollapsed(true));
    }
  }, []);
  useEffect(() => {
    dispatch(fetchProviderOfPatient(selectedPatient));
    dispatch(fetchPatientFamily(selectedPatient));
    dispatch(getProviderTypes());
    dispatch(fetchRelationships());
  }, []);
  const onProviderSearch = (searchParam: any) => {
    dispatch(
      fetchProviderList({ ...searchParam, organization: appUser?.orgId })
    );
  };

  useEffect(() => {
    dispatch(fetchPatientById(selectedPatient?.id));
  }, []);

  useEffect(() => {
    if (isUpdated.isSuccess) {
      dispatch(clearState());
      setChange(true);
      dispatch(fetchPatientById(selectedPatient.id));
      message.success({
        content: `${selectedPatient.firstName} ${selectedPatient?.lastName} updated successfully.`,
        duration: 5,
        key: "appNotification",
      });
    } else if (isUpdated.isError) {
      dispatch(clearState());
      message.error({
        content: isUpdated?.errorStack
          ? isUpdated?.errorStack
          : "Something went wrong",
        key: "appNotification",
      });
    }
  }, [isUpdated.isSuccess, isUpdated.isError]);

  useEffect(() => {
    if (isAssigned.isSuccess) {
      dispatch(clearState());
      if (selectedTab == "3") {
        dispatch(fetchProviderOfPatient(selectedPatient));
        message.success({
          content: `Assigned provider to ${selectedPatient.firstName} ${selectedPatient?.lastName} successfully.`,
          key:"appNotification"
        })
        if(assignView){
          setAssignView(false)
        }
      }else if(selectedTab == "2"){
        message.success({
          content: `Assigned Hub to ${selectedPatient.firstName} ${selectedPatient?.lastName} successfully.`,
          key: "appNotification",
        });

        dispatch(fetchPatientHub(selectedPatient));
        dispatch(fetchPatientDevice(selectedPatient));
        setDeviceModal(false)
      } else if (selectedTab == "6") {
        message.success({
          content: `Assigned payer to ${selectedPatient.firstName} ${selectedPatient?.lastName} successfully.`,
          key: "appNotification",
        });
        dispatch(fetchPatientPayers(selectedPatient));
      }
    } else if (isAssigned.isError) {
      message.error({
        content: isAssigned?.errorStack
          ? isAssigned?.errorStack
          : "Something went wrong",
        key: "appNotification",
      });
      dispatch(clearState());
    }
  }, [isAssigned.isSuccess, isAssigned.isError]);

  useEffect(() => {
    if (unAssigned.isSuccess) {
      if (selectedTab == "3") {
        dispatch(fetchProviderOfPatient(selectedPatient));
        message.success({
          content: `Provider unassigned successfully.`,
          key: "appNotification",
          duration: 5,
        });
      } else if (selectedTab == "6") {
        dispatch(fetchPatientPayers(selectedPatient));
        message.success({
          content: `Payor unassigned successfully.`,
          key: "appNotification",
          duration: 5,
        });
        setDetectPatientFormChange(false);
      } else if (selectedTab == "4") {
        dispatch(fetchPatientFamily(selectedPatient));
        message.success({
          content: `Family member unassigned successfully.`,
          duration: 5,
          key: "appNotification",
        });
      }
      dispatch(clearState());
    } else if (unAssigned.isError) {
      message.error({
        content: unAssigned?.errorStack
          ? unAssigned?.errorStack
          : "Something went wrong",
        key: "appNotification",
      });
      dispatch(clearState());
    }
  }, [unAssigned.isSuccess, unAssigned.isError]);

  useEffect(() => {
    var a = Object.keys(familyDetailForm)
      .filter(
        (items) =>
          items != "status" && items != "roleId" && items != "sendInvite"
      )
      .reduce(
        (res: any, key: any) => ((res[key] = familyDetailForm[key]), res),
        {}
      );

    let test = removeEmptyKeys(a);
    if (Object.keys(test).length > 0) {
      setDetectFormChange(true);
    } else {
      setDetectFormChange(false);
    }
  }, [familyDetailForm]);

  useEffect(() => {
    var a = Object.keys(payerDetails)
      .filter(
        (items) =>
          items != "status" && items != "roleId" && items != "sendInvite"
      )
      .reduce(
        (res: any, key: any) => ((res[key] = payerDetails[key]), res),
        {}
      );
    let test = removeEmptyKeys(a);

    if (Object.keys(test).length > 0) {
      setDetectFormChange(true);
    } else {

      setDetectFormChange(false);
    }
  }, [payerDetails]);

  useEffect(() => {
    if (payerForm) {
      if (formState.isSuccess) {
        dispatch(clearState());
        message.success({
          content: `${selectedPatient.firstName} ${selectedPatient?.lastName} updated successfully.`,
          duration: 5,
          key: "appNotification",
        });
        setpayerForm(false);
        setChange(true)
      } else if (formState.isError) {
        message.error({
          content: formState?.errorStack
            ? formState?.errorStack
            : "Something went wrong",
          key: "appNotification",
        });
        dispatch(clearState());
      }
    }
    if (familyForm) {
      if (formState.isSuccess) {
        if (sendInvite != true) {
          setFamilyCreation(true);
        } else {
          setShowModalView(true);
        }
        dispatch(clearState());
        setDetectFormChange(false);
      } else if (formState.isError) {
        message.error({
          content: formState?.errorStack
            ? formState?.errorStack
            : "Something went wrong",
          key: "appNotification",
        });
        dispatch(clearState());
      }
    }
  }, [formState.isSuccess, formState.isError]);
  const onUpdateSubmit = () => {
    dispatch(updatePatient(patientForm));
  };

  const addingPayer = () => {
    setPayerDetails({
      companyName: "",
      contactName: "",
      contactNumber: "",
      mobileNumber: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    });
    setpayerForm(true);
  };

  const addFamilyBtn = () => {
    setFamilyDetailForm({
      username: "",
      title: "",
      relationshipId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      imageUrl: "",
      contactNumber: "",
      email: "",
      roleId: familyRole,
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    });
    setFamilyForm(true);
  };
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
      text: "Edit User",
    },
  ];

  const getTypeOptions = () => {
    if (providerTypes) {
      return providerTypes?.map((type) => {
        return {
          text: type.name,
          value: type.id,
        };
      });
    } else return [];
  };

  const onPayerSearch = (searchParam: any) => {
    dispatch(fetchPayers({ ...searchParam, organization: appUser?.orgId }));
  };

  const handleBackButton = () => {
    history.push(AppRoutes.PROVIDERLIST);
  };
  const onFamilyCreate = () => {
    if (sendInvite == true) {
      dispatch(
        createFamily(
          removeEmptyKeys({
            ...familyDetailForm,
            sendInvite: true,
            patientId: selectedPatient?.id,
            organisations: { orgId: appUser?.orgId },
          })
        )
      );
    } else {
      dispatch(
        createFamily(
          removeEmptyKeys({
            ...familyDetailForm,
            patientId: selectedPatient?.id,
            organisations: { orgId: appUser?.orgId },
          })
        )
      );
    }
  };
  const onPayerCreate = () => {
    dispatch(
      createPayer(
        removeEmptyKeys({
          ...payerDetails,
          ["patientId"]: selectedPatient?.id,
          organizationId: appUser?.orgId,
        })
      )
    );
  };
  const onTabChange = (key: any) => {
    setSelectedTab(key);
    setAssignView(false);
    setFamilyForm(false);
  };
  const resetPasswordModalLink = () => {
    dispatch(requestChangePassword({ email: selectedPatient?.email }));
  };
  const handleCancelCall = () => {
    setShowReset(false);
  };

  const onAssignProviders = () => {
    if (!test?.some((t: any) => t.isPcp == true)) {
      message.error({
        content: "Please Select one provider as PCP",
        key: "appNotification",
      });
    } else {
      dispatch(
        assignProviderToPatients({
          patientId: selectedPatient?.id,
          providers: test,
        })
      );
    }
  };
  useEffect(() => {
    if (isDeleted.isSuccess) {
      dispatch(clearDelete());
      setIsModalVisible(false);
      message.success({
        content: "Patient deleted successfully.",
        key: "appNotification",
      });
      history.push(AppRoutes.PROVIDERLIST);
    } else if (isDeleted.isError) {
      dispatch(clearDelete());
      message.error({
        content: isDeleted?.errorStack
          ? isDeleted?.errorStack
          : "Somthing went wrong",
        key: "appNotification",
      });
    }
  }, [isDeleted.isSuccess, isDeleted?.isError]);

  const handleCancel = () => {
    setIsWarnModalVisible(false);
  };

  const handleDeviceCancel = () => {
    setDeviceModal(false);
  };
  const handleDelete = () => {
    dispatch(deleteUser({ id: selectedPatient?.id } as User));
  };
  const sureChangePassword = () => {
    dispatch(changePassword(resetPass));
  };

  const sureAssignDevice = () => {
    dispatch(
      assignHubToPatients({
        ...hubInfo,
        patientId: selectedPatient?.id,
        device: hubList,
      })
    );
  };
  const resetPasswordModal = () => {
    if (selectedPatient?.email == null || "") {
      setIsWarnModalVisible(true);
    } else {
      setShowReset(true);
    }
  };
  const onAssignPayers = () => {
    if (!payerList?.some((t: any) => t.isPrimary == true)) {
      message.error({
        content: "Please Select one payer as primary payor",
        key: "appNotification",
      });
    } else {
      dispatch(
        assignPayerToPatients({
          patientId: selectedPatient?.id,
          payers: payerList,
        })
      );
    }
  };
  const onAssignHubs = () => {
    if (patientHub.length == 0) {
      dispatch(
        assignHubToPatients({
          ...hubInfo,
          patientId: selectedPatient?.id,
          device: hubList,
        })
      );
    } else if (patientHub.length > 0) {
      setDeviceModal(true);
    }
  };
  const getHeaderRightContent = () => {
    switch (selectedTab) {
      case "1": {
        return (
          <>
            <Col md={4} lg={4} xl={4}>
              <Button type="primary" onClick={() => history.goBack()}>
                Cancel
              </Button>
            </Col>
            <Col md={5} lg={5} xl={5}>
              <Button type="primary" onClick={() => setIsModalVisible(true)}>
                <span className="material-icons-outlined">
                  {CommonIcons.delete}
                </span>
                Delete
              </Button>
            </Col>
            <Col md={7} lg={8} xl={8}>
              <Button type="primary" onClick={resetPasswordModal}>
                <span className="material-icons-outlined">
                  {CommonIcons.unlock}
                </span>{" "}
                Reset Password
              </Button>
            </Col>
            <Col md={7} lg={7} xl={7}>
              <Button
                type="primary"
                htmlType="submit"
                form="updatePatient"
                disabled={disableSave}
              >
                Save Changes
              </Button>
            </Col>
          </>
        );
      }
      case "4": {
        if (familyForm) {
          return (
            <>
              <Col md={6} lg={5} xl={5}>
                <Button type="primary" htmlType="submit" form="addFamily">
                  Save
                </Button>
              </Col>
              <Col md={12} lg={5} xl={5}>
                <Button
                  type="primary"
                  htmlType="submit"
                  form="addFamily"
                  onClick={() => setSendInvite(true)}
                  disabled={!familyDetailForm?.email?.length}
                >
                  Send Invite
                </Button>
              </Col>
            </>
          );
        } else {
          return null;
        }
      }
      case "3": {
        return (
          <>
            <Col md={5} lg={5} xl={5}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleBackButton}
              >
                Cancel
              </Button>
            </Col>
            <Col md={5} lg={5} xl={5}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={onAssignProviders}
              >
                Save
              </Button>
            </Col>
          </>
        );
      }
      case "6": {
        return (
          <Col md={5} lg={5} xl={5}>
            {payerForm ? (
              <Button
                type="primary"
                htmlType="submit"
                form="patientPayer"
                disabled={disableSave}
              >
                Save
              </Button>
            ) : (
              <Button type="primary" htmlType="submit" onClick={onAssignPayers}>
                Save
              </Button>
            )}
          </Col>
        );
      }
    }
  };

  const columnCard = () => {
    return (
      <CompWrapper observeOn="mainCard" name="providerCard-container">
        <Row gutter={[20, 20]} className="providerCard-container">
          {patientProvider?.length > 0 ? (
            <>
              {providerGroup?.length > 0 ? (
                <>
                  <Col span={24} className="providerListCard-title f-16">
                    Providers{" "}
                  </Col>
                  {providerGroup?.map((dum, id) =>
                    dum?.group == ProviderGroups.provider ? (
                      <Col sm={16} md={12} lg={10} xl={8} key={id}>
                        <ProviderCardDetail provider={dum} />
                      </Col>
                    ) : null
                  )}
                </>
              ) : null}
              {careGroup?.length > 0 ? (
                <>
                  <Col span={24} className="providerListCard-title f-16">
                    Care Team{" "}
                  </Col>

                  {patientProvider?.map((dum, id) =>
                    dum?.group == ProviderGroups.careTeam ? (
                      <Col sm={16} md={12} lg={10} xl={8} key={id}>
                        <ProviderCardDetail provider={dum} />
                      </Col>
                    ) : null
                  )}
                </>
              ) : null}
              {payerGroup?.length > 0 ? (
                <>
                  <Col span={24} className="providerListCard-title f-16">
                    Payers {"&"} Others
                  </Col>

                  {patientProvider?.map((dum, id) =>
                    dum?.group == ProviderGroups.payer ? (
                      <Col sm={16} md={12} lg={10} xl={8} key={id}>
                        <ProviderCardDetail provider={dum} />
                      </Col>
                    ) : null
                  )}
                </>
              ) : null}
              {!(
                appUser?.roleName == UserRoles.PATIENT ||
                appUser?.roleName == UserRoles.FAMILY
              ) && (
                <Col sm={16} md={12} lg={10} xl={8}>
                  <AddProviderCard setView={setAssignView} />
                </Col>
              )}
            </>
          ) : (
            !(
              appUser?.roleName == UserRoles.PATIENT ||
              appUser?.roleName == UserRoles.FAMILY
            ) && (
              <Col sm={16} md={12} lg={10} xl={8}>
                <AddProviderCard setView={setAssignView} />
              </Col>
            )
          )}
        </Row>
      </CompWrapper>
    );
  };
  const familyCardColumn = () => {
    return (
      <CompWrapper observeOn="mainCard" name="providerCard-container">
        <Row gutter={[25, 20]} className="providerCard-container">
          {patientFamily?.map((dum, id) => (
            <Col sm={16} md={12} lg={10} xl={8} key={id}>
              <FamilyCardDetail familyMember={dum} />
            </Col>
          ))}
          {!(
            appUser?.roleName == UserRoles.PATIENT ||
            appUser?.roleName == UserRoles.FAMILY
          ) && (
            <Col sm={16} md={12} lg={10} xl={8}>
              <AddFamilyCard />
            </Col>
          )}
        </Row>
      </CompWrapper>
    );
  };
  const getHeaderContent = () => {
    switch (appUser?.roleName) {
      case UserRoles.PLATFORM_ADMIN: {
        return (
          <Row
            className="innerHeader"
            style={{ alignItems: "center" }}
            justify="space-between"
          >
            <Col md={24} lg={8} xl={8}>
              <Breadcrumbs breadcrumbs={breadCrumbs} />
              <CustomTooltip
                placement="bottom"
                title={concatNames(
                  selectedPatient?.firstName,
                  selectedPatient?.lastName,
                  selectedPatient?.middleName
                )}
                color="#ffffff"
              >
                <p className="orgName f-20 slice">
                  {concatNames(
                    selectedPatient?.firstName,
                    selectedPatient?.lastName,
                    selectedPatient?.middleName
                  )}
                </p>
              </CustomTooltip>
            </Col>
            <Col md={24} lg={14} xl={13}>
              <Row justify="end" gutter={16}>
                {getHeaderRightContent()}
              </Row>
            </Col>
          </Row>
        );
      }
      case UserRoles.ORG_ADMIN: {
        return (
          <Row className="innerHeader" style={{ alignItems: "center" }}>
            <Col md={12} lg={10} xl={10}>
              <Breadcrumbs breadcrumbs={breadCrumbs} />
              <p className="orgName f-20">
                {concatNames(
                  selectedPatient?.firstName,
                  selectedPatient?.lastName,
                  selectedPatient?.middleName
                )}
              </p>
            </Col>
            <Col md={12} lg={14} xl={14}>
              <Row justify="end" gutter={[20, 10]}>
                {getHeaderRightContent()}
              </Row>
            </Col>
          </Row>
        );
      }
      case UserRoles.PROVIDER: {
        return (
          <Row className="mainCard">
            <Col span={24}>
              <PatientDetailCard patient={selectedPatient} />
            </Col>
          </Row>
        );
      }
      case UserRoles.PATIENT: {
        return (
          <Row className="mainCard">
            <Col span={24}>
              <PatientDetailCard patient={selectedPatient} />
            </Col>
          </Row>
        );
      }
      case UserRoles.FAMILY: {
        return (
          <Row className="mainCard">
            <Col span={24}>
              <PatientDetailCard patient={selectedPatient} />
            </Col>
          </Row>
        );
      }
      default: {
        return (
          <Row className="mainCard">
            <Col span={24}>
              <PatientDetailCard patient={selectedPatient} />
            </Col>
          </Row>
        );
      }
    }
  };

  const providerView = () => {
    switch (appUser?.roleName) {
      case UserRoles.PLATFORM_ADMIN: {
        return (
          <CompWrapper observeOn="innerHeader" name="provider">
            <ProviderTableList
              onSearch={onProviderSearch}
              typeOptions={getTypeOptions()}
              setTest={setTest}
            />
          </CompWrapper>
        );
      }
      case UserRoles.ORG_ADMIN: {
        return (
          <CompWrapper observeOn="innerHeader" name="provider">
            <ProviderTableList
              onSearch={onProviderSearch}
              typeOptions={getTypeOptions()}
              setTest={setTest}
            />
          </CompWrapper>
        );
      }
      case UserRoles.PROVIDER: {
        if (assignView) {
          return (
            <CompWrapper observeOn="innerHeader" name="provider">
              <ProviderTableList
                onAssignSave={onAssignProviders}
                assignView={assignView}
                setView={setAssignView}
                onSearch={onProviderSearch}
                typeOptions={getTypeOptions()}
                setTest={setTest}
              />
            </CompWrapper>
          );
        } else return columnCard();
      }
      case UserRoles.PATIENT: {
        return columnCard();
      }
      case UserRoles.FAMILY: {
        return columnCard();
      }
      default: {
        return familyCardColumn();
      }
    }
  };

  const familyView = () => {
    switch (appUser?.roleName) {
      case UserRoles.PLATFORM_ADMIN: {
        return familyForm == false ? (
          <FamilyListTable
            showFamilyForm={setFamilyForm}
            addFamilyBtn={addFamilyBtn}
            familyRole={familyRole}
          />
        ) : (
          <CompWrapper observeOn="innerHeader" name="addFamily">
            <FamilyForm
              data={familyDetailForm}
              setData={setFamilyDetailForm}
              showFamilyForm={setFamilyForm}
              onSubmit={onFamilyCreate}
              relationOptions={getRelationOptions()}
            />
          </CompWrapper>
        );
      }
      case UserRoles.ORG_ADMIN: {
        return familyForm == false ? (
          <FamilyListTable
            showFamilyForm={setFamilyForm}
            addFamilyBtn={addFamilyBtn}
          />
        ) : (
          <CompWrapper observeOn="innerHeader" name="addFamily">
            <FamilyForm
              disableStatus={true}
              setDisableSave={setChange}
              disableSave={disableSave}
              data={familyDetailForm}
              setData={setFamilyDetailForm}
              showFamilyForm={setFamilyForm}
              onSubmit={onFamilyCreate}
              relationOptions={getRelationOptions()}
            />
          </CompWrapper>
        );
      }
      case UserRoles.PROVIDER: {
        return familyCardColumn();
      }
      case UserRoles.PATIENT: {
        return familyCardColumn();
      }
      case UserRoles.FAMILY: {
        return familyCardColumn();
      }
      default: {
        return familyCardColumn();
      }
    }
  };

  const getPatientDetails = () => {
    switch (appUser?.roleName) {
      case UserRoles.PLATFORM_ADMIN: {
        return (
          <PatientForm
            patientForm={patientForm}
            setPatientForm={setPatientForm}
            roleOptions={getRoleOptions()}
            onSubmit={onUpdateSubmit}
            formID={"updatePatient"}
            disableUserName={true}
            disableStatus={false}
            setDisableSave={setChange}
            disableSave={disableSave}
          />
        );
      }
      case UserRoles.ORG_ADMIN: {
        return (
          <PatientForm
            patientForm={patientForm}
            setPatientForm={setPatientForm}
            roleOptions={getRoleOptions()}
            onSubmit={onUpdateSubmit}
            formID={"updatePatient"}
            disableUserName={true}
            disableStatus={false}
            setDisableSave={setChange}
            disableSave={disableSave}
          />
        );
      }
      case UserRoles.PROVIDER: {
        return <PatientDetailsCard patient={selectedPatient} />;
      }
      case UserRoles.PATIENT: {
        return <PatientDetailsCard patient={selectedPatient} />;
      }
      case UserRoles.FAMILY: {
        return <PatientDetailsCard patient={selectedPatient} />;
      }
      default: {
        return <PatientDetailsCard patient={selectedPatient} />;
      }
    }
  };
  return (
    <Spin
      spinning={isUpdated.loading || formState.loading || isAssigned.loading}
    >
      {getHeaderContent()}

      <Row className="mainRow">
        <Tabs
          className="patient-Tabs f-14"
          activeKey={selectedTab}
          onChange={onTabChange}
        >
          <TabPane tab="Patient Details" key="1">
            <CompWrapper observeOn="mainRow">{getPatientDetails()}</CompWrapper>
          </TabPane>
          <TabPane tab="Biometric Device" key="2">
            <DeviceDetails
              setList={setHubList}
              onAssign={onAssignHubs}
              setHubInfo={setHubInfo}
              hubInfo={hubInfo}
              setDisableSave={setChange}
            />
          </TabPane>
          <TabPane tab="Provider" key="3">
            {providerView()}
          </TabPane>
          <TabPane tab="Family" key="4">
            {familyView()}{" "}
          </TabPane>
          <TabPane tab="HSO/HO" key="5">
            <PatientOrganization />
          </TabPane>
          <TabPane tab="Payor" key="6">
            {payerForm ? (
              <CompWrapper observeOn="mainRow" name="addPayer">
                <PayerForm
                  formId={"patientPayer"}
                  payerDetails={payerDetails}
                  setDetails={setPayerDetails}
                  handleSave={onPayerCreate}
                  setpayerForm={setpayerForm}
                  setSelectedTab={setSelectedTab}
                  setDisableSave={setChange}
                />
              </CompWrapper>
            ) : (
              <CompWrapper observeOn="mainRow" name="payerTable">
                <PayerListing
                  appUser={appUser}
                  addingPayer={addingPayer}
                  setDisableSave={setChange}
                  showForm={setpayerForm}
                  onSearch={onPayerSearch}
                  setTest={setPayerList}
                  patient={selectedPatient}
                />
              </CompWrapper>
            )}
          </TabPane>
          <TabPane tab="HIE" key="7" disabled>
            <Demo />
          </TabPane>
          <TabPane tab="Review History" key="8">
            <EventHistory />
          </TabPane>
        </Tabs>
      </Row>
      <PasswordModal
        isPasswordModalVisible={showModal}
        onCancel={onModalClose}
        userName={createdFamilyMember?.username}
        password={createdFamilyMember?.password}
        modalText={ModalSecondaryMessages.ENTITY_ADDED}
        nameText={getFullName(
          createdFamilyMember?.title,
          createdFamilyMember?.firstName,
          createdFamilyMember?.middleName,
          createdFamilyMember?.lastName
        )}
      />
      {/* FAMILY WAR MODAL */}
      <WarnModal
        cancelButton={null}
        confirmButton={null}
        isModalVisible={showModalView}
        type={ModalType.SUCCESS}
        cancelCallback={onModalClose}
        primaryText={getFullName(
          createdFamilyMember?.title,
          createdFamilyMember?.firstName,
          createdFamilyMember?.middleName,
          createdFamilyMember?.lastName
        )}
        secondaryText={ModalSecondaryMessages.ENTITY_INVITED}
      />
      {/* DELETE MODAL OF PATIENT */}
      <WarnModal
        type={ModalType.WARN}
        isModalVisible={isModalVisible}
        primaryText={ModalPrimaryMessages.DELETE_USER}
        secondaryText={replaceAll(
          /\{0\}/gi,
          ModalSecondaryMessages.DELETE_ORGANIZATION,
          getFullName(
            selectedPatient?.title,
            selectedPatient.firstName,
            selectedPatient?.middleName,
            selectedPatient.lastName
          )
        )}
        cancelButton={ModalCallBackTypes.CANCEL}
        confirmButton={ModalCallBackTypes.DELETE}
        cancelCallback={onModalClose}
        confirmCallback={handleDelete}
      />
      {/* PASSWARD RESET WARNING */}
      <WarnModal
        type={ModalType.WARN}
        isModalVisible={isWarnModalVisible}
        primaryText={ModalPrimaryMessages.RESET_PASSWORD}
        secondaryText={replaceAll(
          /\{0\}/gi,
          ModalSecondaryMessages.RESET_THE_PASSWORD,
          selectedPatient?.firstName + "  " + selectedPatient?.lastName
        )}
        cancelButton={ModalCallBackTypes.CANCEL}
        confirmButton={ModalCallBackTypes.Confirm}
        cancelCallback={handleCancel}
        confirmCallback={sureChangePassword}
      />
      <WarnModal
        type={ModalType.WARN}
        isModalVisible={deviceModal}
        primaryText={ModalPrimaryMessages.ASSIGN_HUB}
        secondaryText={replaceAll(
          /\{0\}/gi,
          ModalSecondaryMessages.NEW_ASSIGN_HUB,
          selectedPatient?.firstName + "  " + selectedPatient?.lastName
        )}
        cancelButton={ModalCallBackTypes.CANCEL}
        confirmButton={ModalCallBackTypes.Confirm}
        cancelCallback={handleDeviceCancel}
        confirmCallback={sureAssignDevice}
      />
      <WarnUnsavedChanges
        ignorePrompt={saveInit}
        navigateOnCancel={true}
        title={UnsavedChangesWarnModal.TITLE}
        content={UnsavedChangesWarnModal.CONTENT}
        cancelBtnText={UnsavedChangesWarnModal.DISCARD_BTN_TEXT}
        confirmBtnText={UnsavedChangesWarnModal.CONFIRM_BTN_TEXT}
        isDirty={detectFormChange}
      />
      <ResetModal
        isResetModalVisible={showReset}
        onReset={resetPasswordModalLink}
        cancelCallback={handleCancelCall}
        value={patientForm?.email}
      />
      <PasswordModal
        isPasswordModalVisible={showModal}
        onCancel={onModalClose}
        userName={newPasswordGenerated?.username}
        password={newPasswordGenerated?.password}
        modalText={ModalSecondaryMessages.PASSWORDCHANGE}
        nameText={"New Password Generated"}
      />
      {/* ForFamilyCreation */}
      <PasswordModal
        isPasswordModalVisible={showFamilyCreation}
        onCancel={onModalClose}
        userName={createdFamilyMember?.username}
        password={createdFamilyMember?.password}
        modalText={ModalSecondaryMessages.ENTITY_ADDED}
        nameText={getFullName(
          createdFamilyMember?.title,
          createdFamilyMember?.firstName,
          createdFamilyMember?.lastName,
          createdFamilyMember?.middleName
        )}
      />
    </Spin>
  );
};
