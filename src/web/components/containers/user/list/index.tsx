import { Breadcrumbs } from "../../../stateless/common/breadCrumbs";
import { Row, Col, Menu, Dropdown, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import UserRow from "../../../stateless/user/userRow";
import Button from "../../../stateless/common/button";
import "./platformUser.less";
import { up,funnel } from "../../../../images";
import { useHistory } from "react-router-dom";
import { AppRoutes } from "../../../../router/appRoutes"; 
import { SearchBar } from "../../organisation/organisationListing/search";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import { CommonIcons, UserRoles } from "../../../../constants/enums";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../../../redux/actions/user/userAction";
import { clearState, UserStateSelector } from "../../../../../redux/reducers/user/userReducer";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";
import { fetchRoles } from "../../../../../redux/actions/role/roleAction";
import NODataFound from "../../../stateless/common/noDataFound";
const UserList = () => {
  const [search, setSearch] =useState("")
  const [selectedFilter, setselectedFilter] = useState<null | any>(null);
  const [status, setStatus] = useState<any>(null);
  const dispatch = useDispatch()
  const {formState, userCount, users, isUpdated, isDeleted} = useSelector(UserStateSelector) 
  const {appUser} = useSelector(AuthStateSelector)
  const history = useHistory();
  const handleClick = () => {
    history.push(AppRoutes.ADDUSER);
  };
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
  useEffect(()=>{
    dispatch(fetchUsers(
      {
        organization: appUser? appUser?.orgId: "",
        isActive: selectedFilter ? selectedFilter : null,
        search: search,
    }
    ))
    dispatch(fetchRoles({organizationId:getOrgId()}))
  },[status, search,selectedFilter])
  useEffect(()=>{
    if(isDeleted.isSuccess){
      dispatch(clearState())
      message.success({content:"User Deleted Successfully"})
      dispatch(fetchUsers(
        {
          organization: appUser? appUser?.orgId: "",
          isActive:status,
          search: search,
      }
      ))
    } else if(isDeleted.isError){
      message.error({content:isDeleted?.errorStack ? isDeleted?.errorStack : "Something went wrong", key:"appNotification"})
      dispatch(clearState())
    }
  },[isDeleted.isSuccess, isDeleted.isError])
  useEffect(()=>{
    if(isUpdated.isSuccess){
      dispatch(fetchUsers(
        {
          organization: appUser? appUser?.orgId: "",
          isActive:status,
          search: search,
        }
      ))
      dispatch(clearState())
    } else if(isUpdated.isError){
      message.error({content:isUpdated?.errorStack ? isUpdated?.errorStack : "Something went wrong", key:"appNotification"})
      dispatch(clearState())
    }
  },[isUpdated.isSuccess, isUpdated.isError])
  useEffect(()=>{
    if(formState.isSuccess){
      dispatch(clearState())
    }
  },[formState.isSuccess])
  const filterMenu = (
    <Menu className="orgMenuItem">
    <Menu.Item onClick={() => setselectedFilter("active")}>
        Active
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item onClick={() => setselectedFilter("inactive")}>
        Inactive
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item onClick={() => setselectedFilter("invited")}>
        Invited
    </Menu.Item>
</Menu>
  )
  const handleFilterReset = () => {
    setselectedFilter(null)
    setStatus(null)
    setSearch("")
}
  const nextTab = [
    {
      text: "Dashboard",
      link: AppRoutes.LANDING,
    },
    {
      text: "Healthlink Users"
    },
  ];  
  return (
    <Spin spinning={formState.loading|| isUpdated.loading}>
    <div className="listContainer">
      <Row style={{ alignItems: "center" }} gutter={16} className="innerHeader expand">
        <Col md={24} lg={8} xl={6}>
          <Breadcrumbs breadcrumbs={nextTab} />
          <span className="platformUsers f-20">Platform Users </span>
          <span className="dumDataLength f-18">
            (<span className="dumDataArr">{userCount}</span>)
          </span>
        </Col>
        <Col md={24}lg={16} xl={18}>
          <Row justify="end" gutter={[20, 10]}>
          <Col  md={9} lg={4} xl={11}>
              <SearchBar  setSearch={setSearch} search={search}/>
            </Col>
            <Col  md={4} lg={4} xl={4}>
            <Dropdown overlay={filterMenu} trigger={["click"]} overlayClassName="orgMenuItem">
            <Button
              type="primary"
              className="activeBtn platfilter btnSize"
            >
              <img src={funnel} className="funnelImage" />
              <span>{selectedFilter ? selectedFilter : "All"}</span>
              <div className="dropImg arroIcn">
              <img src={up} className="imgSize" />
              </div>
            </Button>
            </Dropdown>
            </Col>
            <Col  md={4} lg={4} xl={4}>
              <Button type="primary" onClick={handleFilterReset} className="resetBtn">
                <span className="material-icons-outlined iconColor orgReset">
                  {CommonIcons.reset}{" "}
                </span>
                Reset
              </Button>
            </Col>
            <Col md={7} lg={6} xl={5}>
              <Button
                className="addUser f-14 "
                type="primary"
                onClick={handleClick}
                htmlType="search"
              >
          <span className="material-icons-outlined">{CommonIcons.add}{" "}
          </span>                 Add User
              </Button>
            </Col>
          </Row>
        </Col>  
     </Row>
      {/*new work date(01/06/2022)*/}
         <Row className="listHeader" >
         <Col span={23} className="">
            <Row className="orgCard">
              <Col md={6} lg={5} xl={5} className="organisationLogoPic">
              <div className="orgListHead orgListHeadMgins f-12">
              USER NAME
            <img className="upIcon" src={up} />
              </div>
              </Col>              
              <Col md={2} lg={2} xl={3} className="nameClass classRole">
              <div className="orgListHead f-12 orgDetailSliceCLass slice" style={{marginLeft:'0'}}>SUBSCRIPTION STATUS</div>
              </Col>
              <Col md={2} lg={3} xl={3} className="nameClass classRole">
              <div className="orgListHead f-12"><p className="orgDetailSliceCLass slice">CITY , STATE</p></div>
              </Col>
              <Col md={3} lg={4} xl={4} className="nameClass classRole slice">
              <div className="orgListHead f-12"><p className="orgDetailSliceCLass slice">EMAIL ADDRESS</p></div>
              </Col>
              <Col md={3} lg={3} xl={3} className="nameClass classRole slice">
              <div className="orgListHead f-12"><p className="orgDetailSliceCLass slice" style={{textAlign:'center'}}>MOBILE NO.</p></div>
              </Col>
              <Col md={2} lg={4} xl={3} className="nameClass classRole"  style={{textAlign:'center'}}>
              <div className="orgListHead f-12">ROLE</div>
              </Col>
            </Row>
          </Col>
          <Col span={1} className="" >
          </Col>
           </Row>
      <CompWrapper observeOn="listHeader" id="ddlitem">
        <div className="cardBmargin">
        {users.length!=0 ? users?.map(( user ,index)=>{
          return <UserRow user={user} key={index} />
        }):<NODataFound/>}
        </div>
      </CompWrapper>
    </div>
   </Spin>
  );
};
export default UserList;