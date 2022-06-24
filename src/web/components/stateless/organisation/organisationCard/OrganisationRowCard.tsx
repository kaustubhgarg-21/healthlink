import { Card, Col, Dropdown, Row } from "antd";
import { useState } from "react";
import { Menu } from "antd";
import "./organisationRowCard.less";
import { activeIcon, inactive, active, bin, elipse } from "../../../../images";
import { AppRoutes } from "../../../../router/appRoutes";
import { useHistory } from "react-router-dom";
import ProfileIcon from "../../common/profileThumbnail";
import WarnModal from "../../common/warnModal";
import { ModalCallBackTypes, ModalPrimaryMessages, ModalSecondaryMessages, ModalType } from "../../../../constants/enums";
import { replaceAll } from "../../../../../utility/appUtil";
import Organization from "../../../../models/organization/organizaton";
import { setSelectedOrganization } from "../../../../../redux/reducers/organization/organizationReducer";
import { useDispatch } from "react-redux";
import CustomTooltip from "../../common/toolTip";
import { deleteOrganization, updateOrganization } from "../../../../../redux/actions/organization/organizationActions";

interface PropType {
  organization: Organization, 
  obj:any
}

const OrganisationRowCard = (props: PropType) => {
  const { organization, obj } = props
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory();
  const onRowClick = () => {
    dispatch(setSelectedOrganization(organization))
    history.push(AppRoutes.ORGANIZATIONDETAILS)
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onDeactivateClick = ()=>{
    const menuData ={...organization,  "isActive": false,}

    dispatch(updateOrganization(menuData))
 }


  const onActivateClick =()=>{
    const menuData = {...organization, "isActive" :true}
    dispatch(updateOrganization(menuData))
  }

  const handleDelete = () => {
    dispatch(deleteOrganization(organization))
    setIsModalVisible(false);
  };
console.log(organization,61);
  const menu = (
    <Menu>
      {organization.isActive == true ?
        <Menu.Item key="0" onClick={onDeactivateClick}>
          <img src={inactive} className="red" alt="status" /><span className="menuClass f-12">Deactivate</span>
        </Menu.Item>
        :
        <Menu.Item key="0" onClick ={onActivateClick}>
          <img src={active} className="red" alt="status" /><span className="menuClass f-12">Activate</span>
        </Menu.Item>
      }
      <Menu.Divider />
      <Menu.Item key="1" onClick={showModal}>
        <img src={bin} className="red" alt="status" /><span className="f-12">Delete</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Card className="organisationListCard" >
        <Row >
          <Col md={22} lg={23} xl={23} xxl={23}  onClick={onRowClick} className="orgColumn1">
            <Row className="orgCard">
              {console.log(organization)}
              <Col md={2} lg={2} xl={2} className="organisationLogoPic">
                <ProfileIcon name={organization?.orgName} src={organization?.imageURL} size="48" />
              </Col>
             <Col md={3} lg={3} xl={4} className="organisationName f-14 slice"> <CustomTooltip content="show" title={organization.orgName} color="#ffffff" placement="bottomLeft"> 
             <p className="orgDetailSliceCLass slice">{organization.orgName}</p></CustomTooltip>
              </Col>
              <Col md={3} lg={4} xl={3} className="organisationContactName f-12 slice marginClassOrg">
                <div className="orgContactNameSlicing">{organization.city}, {organization.state}</div>
              </Col>
              <Col md={3} lg={3} xl={4} className="organisationContactNo f-12 slice">
                <div className="orgContactNameSlicing">
                  <p className="orgDetailSliceCLass slice">
                    {organization.primaryContact?.firstName} {organization.primaryContact?.lastName}</p>
                </div>
              </Col>
              <Col md={3} lg={3} xl={3} className="organisationContactNoo f-12 slice">
                <div className="orgContactNameSlicing">
                  <p className="orgDetailSliceCLass slice">
                    {organization.primaryContact?.mobile}
                  </p>
                </div>
              </Col>
              <Col md={4} lg={4} xl={4} className="organisationEmail f-12">
                <div className="orgContactNameSlicing">
                  <p className="orgDetailSliceCLass slice">
                    {organization.primaryContact?.email}
                  </p></div>
              </Col>
              <Col md={2} lg={2} xl={3} className="organisationStatus">
                <div className="orgContactNameSlicing f-12 orgStatusMargin">
                  {organization.isActive ? <img src={activeIcon} className="activeAccount" alt="status" /> : <img src={inactive} className="activeAccount" alt="status" />}
                  {organization.isActive ? "Active" : "Inactive"}
                </div>  
              </Col>
            </Row>
          </Col>
          <Col md={2} xl={1} lg={1} xxl={1} className="orgColumn2 mbpadding" >
            <Dropdown overlayClassName="actionMenu" placement="bottomLeft" overlay={menu}>
              <img src={elipse} />
            </Dropdown>

          </Col>
        </Row>
      </Card>
      <WarnModal
        type={ModalType.WARN}
        isModalVisible={isModalVisible}
        primaryText={ModalPrimaryMessages.DELETE_ORGANIZATION}
        secondaryText={replaceAll(/\{0\}/gi, ModalSecondaryMessages.DELETE_ORGANIZATION, organization.orgName)}
        cancelButton={ModalCallBackTypes.CANCEL} confirmButton={ModalCallBackTypes.DELETE}
        cancelCallback={handleCancel}
        confirmCallback={handleDelete}
      />
    </div>
  );
};

export default OrganisationRowCard

