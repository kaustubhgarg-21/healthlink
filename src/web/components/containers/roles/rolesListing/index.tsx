import { Col, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import "./rolesListing.less";
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs";
import Button from "../../../stateless/common/button";
import RolesCard from "../../../stateless/roles/rolesCard";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import { AppRoutes } from "../../../../router/appRoutes";
import { useHistory } from "react-router-dom";
import { CommonIcons, UserRoles } from "../../../../constants/enums";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  RoleStateSelector,
} from "../../../../../redux/reducers/role/roleReducer";
import { fetchRoles } from "../../../../../redux/actions/role/roleAction";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";
const RolesListing = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const [showModal, setShowModal] =useState(false)
  const {formState, roles} = useSelector(RoleStateSelector)
  const {appUser} = useSelector(AuthStateSelector)
  const getOrgId = () => {
    switch( appUser?.roleName){
      case UserRoles.SUPER_ADMIN:{
          return null
      }
      case UserRoles.PLATFORM_ADMIN:{
          return null
      }
      default:{
          return appUser?.orgId
      }
  }
  }
  const nextPage = [
    {
      text: "Dashboard",
      link: AppRoutes.LANDING,
    },
    {
      text: "ROLES",
    },
  ];
  useEffect(()=>{
    if(formState.isSuccess == true){
      dispatch(clearState())
    }else if(formState.isError){
      dispatch(clearState())
    }
  },[formState.isSuccess, formState.isError])
  useEffect(()=>{
    dispatch(fetchRoles({organizationId: getOrgId()}))
  },[])
  const onAddRole = () => {
    history.push(AppRoutes.ADDROLES);
  };
  return (
    <div>
      <Row className="innerHeader">
        <Col md={16} lg={18} xl={19}>
          <Breadcrumbs breadcrumbs={nextPage} />
          <span className="addUserHeader f-20">ROLES</span>
        </Col>
        <Col md={8} lg={6} xl={5}>
          <Button type="primary" className="addOrgBtn" onClick={onAddRole}>
            <span className="material-icons-outlined add">{CommonIcons.add}</span>
            Add Custom Role
          </Button>
        </Col>
      </Row>
      <Spin spinning={formState.loading}>
        <CompWrapper observeOn="innerHeader">
          <div className="cardBmargin">
          {roles?.map((el, id) => (
            <RolesCard role={el} key={id} />
          ))}
           </div>
        </CompWrapper>
      </Spin>
    </div>
  );
};
export default RolesListing;