import { Row, Col, Tabs, message, Spin, Menu, Dropdown, DatePicker, Form } from "antd";
import { OrgansationInfo } from "../../../stateless/organisation/details";
import Button from "../.././../stateless/common/button";
import "./organizationDetails.less";
import OrgDetails from "./../../../stateless/organisation/summary";
import { useEffect, useRef, useState } from "react";
import {
  filter,
  funnel,
  up,
} from "../../../../images";
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs";
import { AppRoutes } from "../../../../router/appRoutes";
import AdminUserList from "../../../stateless/organisation/admin";
import { OrganizaionCentres } from "../../../stateless/organisation/centres";
import WarnModal from "../../../stateless/common/warnModal";
import {
  CommonIcons,
  ModalCallBackTypes,
  ModalPrimaryMessages,
  ModalSecondaryMessages,
  ModalType,
  OrganizationTypeCodes,
  UnsavedChangesWarnModal,
  UserRoles
} from "../../../../constants/enums";
import { replaceAll } from "../../../../../utility/appUtil";
import { AddAdminUser } from "../../../stateless/organisation/admin/addAdmin";
import { useDispatch, useSelector } from "react-redux";
import { clearState, OrganizationStateSelector } from "../../../../../redux/reducers/organization/organizationReducer";
import { createdOrganizationCentre, deleteOrganization, fetchOrganizationById, fetchOrganizationSummary, updateOrganization, updateOrganizationCentre } from "../../../../../redux/actions/organization/organizationActions";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import { createdUser, updateUser } from "../../../../../redux/actions/user/userAction";
import { clearUsers, UserStateSelector } from "../../../../../redux/reducers/user/userReducer";
import { SearchBar } from "../organisationListing/search";
import { RoleStateSelector } from "../../../../../redux/reducers/role/roleReducer";
import Role from "../../../../models/roles/role";
import User from "../../../../models/users/user";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";
import CustomTooltip from "../../../stateless/common/toolTip";
import { Demo } from "../../../stateless/demo";
import { fetchRoles } from "../../../../../redux/actions/role/roleAction";
import { useHistory } from "react-router-dom";
import { getExportCsvFile, removeEmptyKeys } from "../../../../../utility/utils";
import AuditLogs from "../../../stateless/organisation/auditLog";
import moment from "moment";
import WarnUnsavedChanges from "../../../stateless/common/warnUnSaveChanges";
import { Messages } from "../../../../constants/messages";

export const OrganisationDetails = () => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch()
  const history = useHistory();
  const { formState, selectedOrganization, isUpdated, isDeleted } = useSelector(OrganizationStateSelector)
  const { users, selectedUser } = useSelector(UserStateSelector)
  const { roles } = useSelector(RoleStateSelector)
  const [selectedTab, setSelectedTab] = useState("1");
  const [addAdmin, setAddAdmin] = useState(false);
  const [disableSave , setDisableSave] = useState(true)
  const [showAdminDetails, setShowAdminDetails] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orgDetails, setOrgDetails] = useState(selectedOrganization)
  const [primaryContact, setPrimary] = useState(orgDetails?.primaryContact)
  const [detectFormChange, setDetectFormChange] = useState(false)
  
  const [secondary, setSecondary] = useState({
    id: orgDetails?.secondaryContact?.id,
    isPrimary: orgDetails?.secondaryContact?.isPrimary,
    firstName2: orgDetails?.secondaryContact?.firstName,
    lastName2: orgDetails?.secondaryContact?.lastName,
    middleName2: orgDetails?.secondaryContact?.middleName,
    phoneNumber2: orgDetails?.secondaryContact?.phoneNumber,
    mobile2: orgDetails?.secondaryContact?.mobile,
    email2: orgDetails?.secondaryContact?.email,
  })
  const [addAdminForm, setAddAdminForm] = useState<User | any>({
    firstName: "",
    lastName: "",
    middleName: "",
    imageUrl: "",
    email: "",
    roleId: orgRole,
    address1: selectedOrganization?.address1,
    address2: selectedOrganization?.address2,
    city: selectedOrganization?.city,
    state: selectedOrganization?.state,
    country: selectedOrganization?.country,
    zipCode: selectedOrganization?.zipcode,
    isActive: false,
    contactNumber: "",
    mobileNumber: "",
    status: "",
    organisations: {
      orgId: selectedOrganization?.id,
      // centers: []
    },
    username: "",
  })

  const [sendInvite, setSendInvite] = useState(false)
  var orgRole = roles?.filter((role) => { if (role.name == UserRoles.ORG_ADMIN) { return role.id } })[0]?.id
  const [adminDetailForm, setAdminDetailForm] = useState<User | any>({
    firstName: "",
    lastName: "",
    middleName: "",
    imageUrl: "",
    email: "",
    roleId: orgRole,
    address1: selectedOrganization?.address1,
    address2: selectedOrganization?.address2,
    city: selectedOrganization?.city,
    state: selectedOrganization?.state,
    country: selectedOrganization?.country,
    zipCode: selectedOrganization?.zipcode,
    isActive: false,
    contactNumber: "",
    mobileNumber: "",
    status: "",
    organisations: {
      orgId: selectedOrganization?.id,
      // centers: []
    },
    username: "",
  })
  const [search, setSearch] = useState("")
  const [saveInit, setSaveInit] = useState(false)

  const [params , setParams] = useState<any>({
    startDate: moment().subtract(1,"week"),
    endDate: moment(),

  })
  
  const { appUser } = useSelector(AuthStateSelector)
  const [selectedFilter, setselectedFilter] = useState<any>(null);
  const [centreTableData, setCentreTableData] = useState<any>([])
  useEffect(() => {
    dispatch(fetchOrganizationById(selectedOrganization?.id))
    dispatch(fetchOrganizationSummary(selectedOrganization))
    dispatch(fetchRoles({ organizationId: selectedOrganization?.id }))
  }, [])

  const onUserUpdate = () => {
    dispatch(updateUser(adminDetailForm))
  }
  useEffect(() => {
    if (isDeleted.isSuccess) {
      dispatch(clearState())
      if(selectedTab != "3"){
        history.push(AppRoutes.ORGANIZATIONLIST)
        message.success({content: "Deleted Successfully", key:"appNotification"})
      }else{
        dispatch(fetchOrganizationById(selectedOrganization?.id))
        dispatch(fetchOrganizationSummary(selectedOrganization))
        message.success({content: "Deleted Successfully", key:"appNotification"})
      }   }else if(isDeleted.isError){
      dispatch(clearState())
      message.error({content: isDeleted?.errorStack ? isDeleted?.errorStack : "Something went wrong" , key:"appNotification"})
    }
  }, [isDeleted.isSuccess, isDeleted.isError])

  useEffect(() => {
    if (selectedUser && selectedUser.id) {
      setAdminDetailForm(
        {
          id: selectedUser?.id,
          firstName: selectedUser?.firstName,
          lastName: selectedUser?.lastName,
          middleName: selectedUser?.middleName,
          imageUrl: selectedUser?.imageUrl,
          email: selectedUser?.email,
          roleId: selectedUser?.roleId,
          roleName: selectedUser?.roleName,
          address1: selectedUser?.address1,
          address2: selectedUser?.address2,
          city: selectedUser?.city,
          state: selectedUser?.state,
          country: selectedUser?.country,
          zipCode: selectedUser?.zipCode,
          status: selectedUser?.status,
          contactNumber: selectedUser?.contactNumber,
          mobileNumber: selectedUser?.mobileNumber,
          organisations: selectedUser?.organisations,
          username: selectedUser?.username,
        }
      )
    }
  }, [selectedUser])
  
  useEffect(() => {
    setOrgDetails({ ...orgDetails, contacts: [primaryContact] })
  }, [primaryContact])
  useEffect(() => {
    if (secondary?.firstName2) {
      setOrgDetails({
        ...orgDetails,
        contacts: [primaryContact,
          {
            id: secondary?.id ? secondary?.id : "",
            isPrimary: false,
            firstName: secondary?.firstName2 ? secondary?.firstName2 : "",
            lastName: secondary?.lastName2 ? secondary?.lastName2 : "",
            middleName: secondary?.middleName2 ? secondary?.middleName2 : "",
            email: secondary?.email2 ? secondary?.email2 : "",
            mobile: secondary?.mobile2 ? secondary?.mobile2 : "",
            phoneNumber: secondary?.phoneNumber2 ? secondary?.phoneNumber2 : ""
          }]
      })
    }
  }, [secondary])

  useEffect(() => {
    if (isUpdated.isSuccess) {
      dispatch(clearState())
      setChange(true)

      dispatch(fetchOrganizationById(selectedOrganization?.id))
      message.success({
        content: `${selectedOrganization?.orgName} updated successfully.`,
        duration: 5, key: "appNotification"
      })
      //  setDisableSave(true)
    } else if (isUpdated.isError) {
      message.error({content: isUpdated?.errorStack ? isUpdated?.errorStack : "Something went wrong" , key: "appNotification" })
      dispatch(clearState())
    }
  }, [isUpdated.isSuccess, isUpdated.isError])

  useEffect(() => {
    if (formState.isSuccess) {
      dispatch(clearState())
    }
  }, [formState.isSuccess])

  useEffect(()=>{
    return ()=>{
      dispatch(clearUsers())
    }
  },[])
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    dispatch(deleteOrganization(selectedOrganization))
  };

  useEffect(()=>{
    setCentreTableData(selectedOrganization?.orgCentres)  },[selectedOrganization])

  const breadCrumbs = [
    {
      text: "Dashboard",
      link: AppRoutes.LANDING,
    },
    {
      text: "Organization",
    },
  ];
  const onTabChange = (key: any) => {
    setSelectedTab(key);
    setAddAdmin(false)
    setShowAdminDetails(false)
    setCentreTableData(selectedOrganization?.orgCentres)
  };
  const onOrganisationUpdateSubmit = () => {
    dispatch(updateOrganization(orgDetails))
  };

  const handleClick = (e: any) => {
    setAddAdmin(true)
    setAdminDetailForm({
      firstName: "",
      lastName: "",
      middleName: "",
      imageUrl: "",
      email: "",
      roleId: orgRole,
      address1: selectedOrganization?.address1,
      address2: selectedOrganization?.address2,
      city: selectedOrganization?.city,
      state: selectedOrganization?.state,
      country: selectedOrganization?.country,
      zipCode: selectedOrganization?.zipcode,
      isActive: false,
      contactNumber: "",
      mobileNumber: "",
      status: "",
      organisations: {
        orgId: selectedOrganization?.id,
      },
      username: "",
    })
  }
  const onCentreCreate = (centreName: string) => {
    dispatch(createdOrganizationCentre({
      orgName: centreName,
      levelCode: OrganizationTypeCodes.centre,
      parentId: selectedOrganization?.id,
      isActive: true,
    }))
  }
  const onCentreUpdate = (centre: any) => {
    dispatch(updateOrganizationCentre({
      orgId: centre.id,
      orgName: centre.centreName,
      levelCode: OrganizationTypeCodes.centre,
      parentId: selectedOrganization?.id,
    }))
  }

  const setChange = (value:any)=>{
    setDisableSave(value)
    setDetectFormChange(!value)
  }

  const handleDateChange = (date:any, dateString: any)=>{
    if(!date.isAfter(params.endDate)){
      setParams({...params, startDate: date,})
    }
    else{
      message.error(Messages.START_DATE_ERROR)
    }
        }
    
    const handleDate = (date:any, dateString: any)=>{
      if(!date.isBefore(params.startDate)){ 
        setParams({...params, endDate:date })
      }
     else{
       message.error(Messages.END_DATE_ERROR)
     }
        }
    
  const onReset = () => {
    setParams({})
  }


  useEffect(()=>{
    var a=Object.keys(addAdminForm).filter((items)=>items!="address1" && 
    items!="address2" && items!="roleId" && items!="city" && items!="state" && items!="country"
    && items!= "zipCode" && items!= "organisations" && items!="isActive" ).reduce( (res:any, key: any) => (res[key] = addAdminForm[key], res), {} );

    let test =removeEmptyKeys(a)
    if( Object.keys(test).length > 0){
      setDetectFormChange(true)
  
    }else {

  setDetectFormChange(false)
    }
  }, [addAdminForm])


  const getRoles = () => {
    if (roles) {
      return roles?.map((role: Role) => {
        return {
          text: role.name,
          value: role.id
        }
      })
    } else {
      return []
    }
  }
  const onExportClick = (csvData?:any,columns?:any,titleDate?:any,csvFileName?:any) => {
    getExportCsvFile(csvData, columns, titleDate, "AuditData")
  }
  const onAddUserSubmit = () => {
    if (!sendInvite) {
      dispatch(createdUser(removeEmptyKeys({ ...addAdminForm, ["roleId"]: orgRole })))
    } else {
      var admin = { ...addAdminForm, sendInvite: true, ["roleId"]: orgRole }
      dispatch(createdUser(removeEmptyKeys(admin)))
    }
  }
  const userFilterMenu = (
    <Menu className="orgMenuItem">
      <Menu.Item onClick={() => setselectedFilter("active")}>
        Active
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={() => setselectedFilter("inactive")}>
        Inactive
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item onClick={()=>setselectedFilter("invited")}>
        Invited
      </Menu.Item>
    </Menu>
  )
   
  const cancelClick = () => {
   if(addAdmin){
    setAddAdmin(false)
   }else if(showAdminDetails){
     setShowAdminDetails(false)
   }
  }

  const saveRef = useRef<any>();
  const getHeaderContent = () => {
    switch (selectedTab) {
      case "1": {
        return (
          <>
            <Col span={8} md={24} lg={8} xl={6}>
              <Breadcrumbs breadcrumbs={breadCrumbs} />
              <CustomTooltip title={selectedOrganization?.orgName} color="#FFFFFF" content="show" placement="right"><p className="orgName f-20 customPara slice">{selectedOrganization?.orgName}</p></CustomTooltip>
            </Col>
          </>
        );
      }
      case "2": {
        return (
          <>
            <Col  md={12} lg={13} xl={15}>
              <Breadcrumbs breadcrumbs={breadCrumbs} />
              <CustomTooltip title={selectedOrganization?.orgName} color="#FFFFFF" content="show" placement="right"><p className="orgName OrgSliceName f-20 customPara slice">{selectedOrganization?.orgName}</p></CustomTooltip>
            </Col>
            <Col md={6} lg={6} xl={5}>
              {appUser?.orgId == selectedOrganization?.id ? null :
                <Button type="primary delOrg" onClick={showModal}>
                  <span className="material-icons-outlined deleteicon">
                    {CommonIcons.delete}{" "}
                  </span>
                  Delete Organization
                </Button>}
            </Col>
            <Col md={6} lg={5} xl={4} className="addAd">
              <Button type="primary" htmlType="submit" form="organizationEdit" disabled={disableSave}>
                Save Changes
              </Button>
            </Col>
          </>
        );
      }
      case "3": {
        return (
          <>
            <Col span={8} md={18} lg={20} xl={20}>
              <Breadcrumbs breadcrumbs={breadCrumbs} />
              <CustomTooltip title={selectedOrganization?.orgName} color="#FFFFFF" content="show" placement="right"><p className="orgName OrgSliceName f-20 customPara slice">{selectedOrganization?.orgName}</p></CustomTooltip>
            </Col>
            <Col ref={saveRef} span={5} md={6} lg={4} xl={4} className="addAd">
              <Button type="primary" htmlType="submit" form="centreForm" id="saveButton" disabled={disableSave}>
                Save Changes
              </Button>
            </Col>
          </>
        );
      }
      case "4": {
        return (addAdmin == false && showAdminDetails == false) ? (
          <>
            <Col span={8} md={20} lg={20} xl={8}>
              <Breadcrumbs breadcrumbs={breadCrumbs} />
              <CustomTooltip title={selectedOrganization?.orgName} color="#FFFFFF" content="show" placement="right"><p className="orgName OrgSliceName f-20 customPara slice">{selectedOrganization?.orgName}</p></CustomTooltip>
            </Col>
            <Col md={9} lg={11} xl={5}>
              <SearchBar setSearch={setSearch} search={search} />
            </Col>
            <Col md={4} lg={3} xl={3}>
              <Dropdown overlay={userFilterMenu} trigger={["click"]} overlayClassName="orgMenuItem">
                <Button
                            type="secondary"
                            className="activeBtn styleColor btnSize"
                        >
                            <img src={funnel} className="funnelImage" />
                            <span>{selectedFilter ? selectedFilter : "Status"}</span>
                            <div className="dropImg"> <img src={up} className="imgSize" /></div>
                        </Button>
              </Dropdown>
            </Col>
            <Col md={4} lg={4} xl={3}>
              <Button type="primary resetBtn" onClick={() => { setselectedFilter(null); setSearch(" ") }}>
                <span className="material-icons-outlined iconColor">{CommonIcons.reset}{" "}

                </span>
                Reset
              </Button>
            </Col>
            <Col md={7} lg={6} xl={5} className="addAd">
              <Button
                className="addUser f-14 "
                type="primary"
                onClick={handleClick}
              >
                <span className="material-icons-outlined">{CommonIcons.add}{" "}
                </span>                Add Admin User
              </Button>
            </Col>
          </>
        ) : showAdminDetails == false ? (
          <>
            <Col md={24} lg={12} xl={12}>
              <Breadcrumbs breadcrumbs={breadCrumbs} />
              <CustomTooltip title={selectedOrganization?.orgName} color="#FFFFFF" content="show" placement="right"><p className="orgName f-20 customPara OrgSliceName slice">{selectedOrganization?.orgName}</p></CustomTooltip>
            </Col>
            <Col md={9} lg={0} xl={0}></Col>
            <Col md={4} lg={4} xl={4}>
            <Button type="primary" onClick={cancelClick}>
              Cancel
            </Button>
          </Col>
            <Col md={6} lg={4} xl={4}>
              <Button type="primary" htmlType="submit" form="addAdminUser">
                {/* <img className="redoIcon" src={add} /> */}
                <span className="material-icons-outlined">{CommonIcons.add}{" "}
                </span>
                SAVE USER
              </Button>
            </Col>
            <Col md={4} lg={4} xl={4} className="addAd">
              <Button type="primary" htmlType="submit" form="addAdminUser" onClick={() => setSendInvite(true)} disabled={!addAdminForm?.email?.length}>
                SEND INVITE
              </Button>
            </Col>
          </>
        ) : (<><Col md={24} lg={16} xl={16}>
          <Breadcrumbs breadcrumbs={breadCrumbs} />
          <CustomTooltip title={selectedOrganization?.orgName} color="#FFFFFF" content="show" placement="right"><p className="orgName f-20 customPara OrgSliceName slice">{selectedOrganization?.orgName}</p></CustomTooltip>
          </Col>
          <Col md={15} lg={0} xl={0} xxl={0}>
          </Col>
          <Col md={4} lg={4} xl={4}>
            <Button type="primary" onClick={cancelClick}>
              Cancel
            </Button>
          </Col>
        <Col md={5} lg={4} xl={4} className="adminSave">
            <Button type="primary" htmlType="submit" form="updateUser"  disabled={disableSave}>
              Save Changes
            </Button>
            </Col>
           </>);
      }

      case "5": {
        return (
          <>         
            <Col  md={22} lg={22} xl={10} xxl={12} style={{marginBottom:'10px'}}>
              <Breadcrumbs breadcrumbs={breadCrumbs} />
              <CustomTooltip title={selectedOrganization?.orgName} color="#FFFFFF" content="show" placement="right"><p className="orgName f-20 OrgSliceName customPara slice">{selectedOrganization?.orgName}</p></CustomTooltip>
            </Col>
            <Col md={6} lg={3} xl={3} xxl={3}>
                        <DatePicker
                          className="dobPickerOrg organizationAudit auditDob"
                          format={"MM-DD-YYYY"}
                          allowClear = {false}
                          placeholder="start date"
                          onChange={handleDateChange}
                          value={params?.startDate? params?.startDate: undefined }
                          />
         </Col>
         <Col md={6} lg={3} xl={3} xxl={3}>
                        <DatePicker
                          className="dobPicker auditDob orgAudit"
                          allowClear = {false}
                          format={"MM-DD-YYYY"}
                          placeholder="end date"
                          onChange={handleDate}
                          value={params?.endDate? params?.endDate: undefined}
                          />
         </Col>
         <Col md={4} lg={3} xl={3} xxl={2}>
         <Button
            type="primary"
            className="resetBtn iconColor"
            onClick={onReset}
          >
            <span className="material-icons-outlined">{CommonIcons.reset}</span>
            RESET
          </Button>
         </Col>
         <Col md={8} lg={6} xl={5} xxl={4} className="exportBtn">
         <Button
            type="primary"
            className="upload "
            htmlType="submit"
            form="auditExport"
          >
            
            <span className="material-icons-outlined">{CommonIcons.upload}</span>
            EXPORT AS XLSX
          </Button>
         </Col>
          </>
        )
      }
      case "6": {
        return (
          <>
            <Col md={20} lg={20} xl={20}>
              <Breadcrumbs breadcrumbs={breadCrumbs} />
              <CustomTooltip title={selectedOrganization?.orgName} color="#FFFFFF" content="show" placement="right"><p className="orgName OrgSliceName f-20 customPara slice">{selectedOrganization?.orgName}</p></CustomTooltip>
            </Col>
          </>
        );
      }
      case "7": {
        return (
          <>
            <Col md={20} lg={20} xl={20}>
              <Breadcrumbs breadcrumbs={breadCrumbs} />
              <CustomTooltip title={selectedOrganization?.orgName} color="#FFFFFF" content="show" placement="right"><p className="orgName OrgSliceName f-20 customPara slice">{selectedOrganization?.orgName}</p></CustomTooltip>
            </Col>
          </>
        );
      }
    }
  };
  return (
    <Spin spinning={isUpdated.loading || formState.loading}>
      <Row gutter={20} className={(selectedTab == "4" || selectedTab == "5") ? " innerHeader expand" : "innerHeader"}>

        {getHeaderContent()}

      </Row>
      <Row className="containerRow">
        <Tabs
          className="organization-tabs f-14"
          activeKey={selectedTab}
          onChange={onTabChange}
        >
          <TabPane tab="Summary" key="1" style={{borderLeft:'0px'}}>
            <OrgDetails organization={selectedOrganization} onClick={setSelectedTab} />
          </TabPane>
          <TabPane tab="Org Detail" key="2">
            <OrgansationInfo
              organization={orgDetails}
              setOrganization={setOrgDetails}
              onSubmit={onOrganisationUpdateSubmit}
              primaryContact={primaryContact}
              secondaryContact={secondary}
              setPrimaryContact={setPrimary}
              setSecondaryContact={setSecondary}
              formState={isUpdated}
              disableSave={disableSave}
              // setDisableSave={setDisableSave}
              setDisableSave={setChange}
            />
          </TabPane>
          <TabPane tab="Centers" key="3">
            <OrganizaionCentres 
            disableSave={disableSave}
            setDisableSave={setChange}
            buttonRef={saveRef} 
            onCentreCreate={onCentreCreate} 
            onCentreUpdate={onCentreUpdate} 
            centres={centreTableData} 
            isUpdated={isUpdated}/>
          </TabPane>
          <TabPane tab="Admin Users" key="4">
            {(addAdmin == false && showAdminDetails == false) ? (
              <AdminUserList selectedFilter={selectedFilter} search={search} users={users} orgRole={orgRole} organization={selectedOrganization} showAdminDetails={setShowAdminDetails} roles={getRoles()} />

            ) : showAdminDetails == false ? (
              <CompWrapper observeOn="innerHeader" name="addPatient">

                <AddAdminUser
                  adminData={addAdminForm}
                  setAdminData={setAddAdminForm}
                  onSubmit={onAddUserSubmit}
                  formID="addAdminUser"
                  organization={selectedOrganization}
                  roles={getRoles()}
                  centres={selectedOrganization?.orgCentres}
                  timeZone={selectedOrganization?.timezone}
                  setAddAdmin={setAddAdmin}
                  sendInvite={sendInvite}
                  setInvite={setSendInvite}
                  setDisableSave ={setChange}
                  disableStatus={!showAdminDetails}
                />

              </CompWrapper>
            ) : <CompWrapper observeOn="innerHeader" name="addPatient">

              <AddAdminUser
                adminData={adminDetailForm}
                setAdminData={setAdminDetailForm}
                onSubmit={onUserUpdate}
                formID="updateUser"
                organization={selectedOrganization}
                roles={getRoles()}
                centres={selectedOrganization?.orgCentres}
                timeZone={selectedOrganization?.timezone}
                setAddAdmin={setAddAdmin}
                disableStatus={!showAdminDetails}
                disableSave={disableSave}
                setDisableSave={setChange}
              />
              

            </CompWrapper>}
          </TabPane>
          <TabPane tab="Audit Logs" key="5"><AuditLogs  params={params} exportClick={onExportClick}/></TabPane>
          <TabPane tab="Biometric Devices" key="6" disabled><Demo /></TabPane>
          <TabPane tab="HIE" key="7" disabled><Demo /></TabPane>
        </Tabs>
      </Row>
      <WarnModal
        type={ModalType.WARN}
        isModalVisible={isModalVisible}
        primaryText={ModalPrimaryMessages.DELETE_ORGANIZATION}
        secondaryText={replaceAll(/\{0\}/gi, ModalSecondaryMessages.DELETE_ORGANIZATION, selectedOrganization ? selectedOrganization?.orgName : "")}
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
        isDirty={detectFormChange}
      />
    </Spin>
  );
};
