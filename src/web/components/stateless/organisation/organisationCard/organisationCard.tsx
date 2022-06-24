import { Card, Col, Dropdown, Menu, message, Row } from "antd";
import { useState} from "react";
import "./organisationCard.less";
import { active, activeIcon, bin, elipse, inactive, messageIcon, phoneIcon } from "../../../../images";
import { AppRoutes } from "../../../../router/appRoutes";
import { useHistory } from "react-router-dom";
import ProfileIcon from "../../common/profileThumbnail";
import WarnModal from "../../common/warnModal";
import { ModalCallBackTypes, ModalPrimaryMessages, ModalSecondaryMessages, ModalType } from "../../../../constants/enums";
import { replaceAll } from "../../../../../utility/appUtil";
import Organization from "../../../../models/organization/organizaton";
import { useDispatch, useSelector } from "react-redux";
import { OrganizationStateSelector, setSelectedOrganization } from "../../../../../redux/reducers/organization/organizationReducer";
import CustomTooltip from "../../common/toolTip";
import { deleteOrganization, fetchOrganizations, updateOrganization } from "../../../../../redux/actions/organization/organizationActions";

interface PropType {
  organization : Organization,
  obj :any
}
const OrganisationCard = (props: PropType) => {
  const {organization, obj} = props
  const [isModalVisible, setIsModalVisible] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch()
  const onCardClick = () => {
    dispatch(setSelectedOrganization(organization))
    history.push(AppRoutes.ORGANIZATIONDETAILS);
  }
  const showModal = () => {
    setIsModalVisible(true);
};

const handleCancel = () => {
    setIsModalVisible(false);
};

const  deactivateClick = ()=>{
  const menuData = {...organization, "isActive":false}
  dispatch(updateOrganization(menuData))
}


const activateClick = ()=>{
  const menuData ={...organization,  "isActive": true,}
  console.log("42", menuData)

  dispatch(updateOrganization(menuData))
  
}

const handleDelete = () => {
  dispatch(deleteOrganization(organization))
  setIsModalVisible(false);
  dispatch(fetchOrganizations(
    {
    levelCode: obj.OrganizationTypeCodes.organization,
    isActive: obj.selectedFilter,
    search: obj.search,
    sortBy: obj.sortField
  }
  ))
};

  const menu = (
    <Menu>  
      {organization.isActive == true ?
                <Menu.Item key="0" onClick={deactivateClick}>
                    <img src={inactive} className="red" alt="status" /><span className="menuClass">Deactivate</span>
                </Menu.Item>
                :
                <Menu.Item key="0" onClick={activateClick}>
                    <img src={active} className="red" alt="status" /><span className="menuClass">Activate</span>
                </Menu.Item>
            }
      <Menu.Item key="1" onClick={showModal} >
      <img src={bin} className="red" alt="status" />Delete
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
  
          <Card className="orgCardMatrix h-1" >
              <div className="orgDropDown ddlOrgViewcard">
                  <Dropdown overlay={menu} overlayClassName="actionMenu">
                  <img src={elipse} />
                  </Dropdown>
                </div>
            <Row className="orgRow2" onClick={onCardClick}>
              <Col span={5}>
                <div className="orgIconSlicing ">
                  <ProfileIcon name={organization.orgName} src={organization?.imageURL} size="44" />
                </div>
              </Col>
              <Col span={13}>
              <CustomTooltip content="show" title={organization.orgName} color="#ffffff" placement="bottomLeft">
                <div className="orgNameSlicing  f-14" style={{width:"100%"}}><p className="orgDetailSliceCLass slice">{organization.orgName}</p></div></CustomTooltip>
                <CustomTooltip content="show" title={organization.city} color="#ffffff" placement="right">  <div className="orgStateSlicing f-12  customPara slice"  style={{marginBottom:'10px',maxWidth:'100%' ,display:'block'}}>{organization.city}, {organization.state}</div></CustomTooltip>

              
                <div className="orgStateSlicing f-12">{organization.primaryContact?.firstName} {organization.primaryContact?.lastName}</div>
                <div className="orgStateSlicing f-12">{organization.primaryContact? <img src={phoneIcon} className="cardPhoneIcon"/>:null}{organization.primaryContact?.mobile} </div>
                <CustomTooltip content="show" title={organization.primaryContact?.email} color="#ffffff" placement="bottomLeft">
                <div className="orgStateSlicing f-12" style={{width:"100%"}}>
                  <p className="orgDetailSliceCLass slice">
                  {organization.primaryContact?<img src={messageIcon} className="cardPhoneIcon"/>:null}{organization.primaryContact?.email}
                  </p>
                 </div>
                 </CustomTooltip>
              </Col>
              <Col span={6} className="orgColClass">
                 <div className="orgContactNameSlicing f-12 orgStatusMargin actGrn">
                  {organization.isActive ? <img src={activeIcon} className="activeAccount" alt="status" /> : <img src={inactive} className="activeAccount" alt="status" />}
                  {organization.isActive ? "Active" : "Inactive"}
                </div>
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
export default OrganisationCard;
