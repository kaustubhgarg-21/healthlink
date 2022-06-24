import { Col, Dropdown, Menu, message, Row, Spin } from "antd"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRoles } from "../../../../../redux/actions/role/roleAction";
import { fetchUsers } from "../../../../../redux/actions/user/userAction";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";
import { RoleStateSelector } from "../../../../../redux/reducers/role/roleReducer";
import { clearState, clearUsers, UserStateSelector } from "../../../../../redux/reducers/user/userReducer";
import { CommonIcons } from "../../../../constants/enums";
import { funnel, up } from "../../../../images";
import Role from "../../../../models/roles/role";
import { AppRoutes } from "../../../../router/appRoutes";
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs"
import Button from "../../../stateless/common/button";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import { ProviderDetail } from "../../../stateless/provider/list";
import { SearchBar } from "../../organisation/organisationListing/search";
import NODataFound from "../../../stateless/common/noDataFound";


import "./providerList.less"

export const ProviderList = (props: any) => {
    const [selectedFilter, setselectedFilter] = useState<null | any>(null);
    const [search, setSearch] = useState("")
    const [selectedRole, setSelectedRole] = useState<Role | null>(null)
    const { formState, users, isUpdated, isDeleted } = useSelector(UserStateSelector)
    const { roles } = useSelector(RoleStateSelector)
    const { appUser, passwordGenerated } = useSelector(AuthStateSelector)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(
        fetchUsers({
          organization: appUser?.orgId,
          role: selectedRole?.id,
          isActive: selectedFilter ? selectedFilter : null,
          search: search,
        })
      );
    }, [selectedRole, selectedFilter, search]);
    useEffect(() => {
        dispatch(fetchRoles({ organizationId: appUser?.orgId }))
    }, [])
    useEffect(() => {
        if (formState.isSuccess) {
            dispatch(clearState())
        } else if(formState.isError) {
            dispatch(clearState())
        }
    }, [formState.isSuccess, formState.isError])

    const handleFilterReset = () => {
        setSelectedRole(null)
        setselectedFilter(null)
        setSearch("")
    }
    useEffect(()=>{
        return ()=>{
          dispatch(clearUsers())
        }
      },[])
    useEffect(() => {
        if (isDeleted.isSuccess) {
            dispatch(clearState())
            message.success({content:"User Deleted Successfully", key:"appNotification"})
            dispatch(fetchUsers(
                {
                    organization: appUser?.orgId, role: selectedRole?.id, isActive: selectedFilter ? selectedFilter : null, search: search

                }
            ))
        } else if (isDeleted.isError) {
            message.error({content:isDeleted?.errorStack ? isDeleted?.errorStack : "Something went wrong", key:"appNotification"})
        }
    }, [isDeleted.isSuccess, isDeleted.isError])

    useEffect(() => {
        if (isUpdated.isSuccess) {
            dispatch(fetchUsers(
                { organization: appUser?.orgId, role: selectedRole?.id, isActive: selectedFilter ? selectedFilter : null, search: search }
            ))
        } else if (isUpdated.isError) {
            message.error({content:isUpdated?.errorStack ? isUpdated?.errorStack : "Something went wrong", key:"appNotification"})
        }
    }, [isUpdated.isSuccess, isUpdated.isError])

    const rolesMenu = (
        <Menu className="actionMenu">
            {roles?.map((role) => {
                return (
                    <>
                    <Menu.Item key={role.id} onClick={() => setSelectedRole(role)}>
                        <div className="slice"> {role.name}</div>
                    </Menu.Item>
                   <Menu.Divider />
                   </>
                    )  
            })}  
        </Menu>
    )
    const filterMenu = (
        <Menu className="actionMenu">
            <Menu.Item key="0" onClick={() => setselectedFilter("active")}>
                Active
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1" onClick={() => setselectedFilter("inactive")}>
                Inactive
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key ="2"onClick={() => setselectedFilter("invited")}>
                Invited
            </Menu.Item>
        </Menu>
    )
    const providerListbreadCrumbs = [
        {
            text: "Dashboard",
            link: AppRoutes.LANDING,
        },
        {
            text: "Users"
        },
    ];
    const addUserMenu = (
        <Menu className="actionMenu">
            <Link to={AppRoutes.ADDPROVIDER}>
                <Menu.Item key="0">
                    Add Provider
                </Menu.Item>
            </Link>
            <Menu.Divider />
            <Link to={AppRoutes.ADDPATIENT}>
                <Menu.Item key="1">
                    Add Patient
                </Menu.Item>
            </Link>
            <Menu.Divider />
            <Link to={AppRoutes.SEARCHPROVIDER}>
                <Menu.Item key="2">
                    Assign Provider
                </Menu.Item>
            </Link>
        </Menu>
    )
    return (
        <div>
            <Row gutter={21} className="innerHeader expand">
                <Col md={15} lg={4} xl={6} className="userBrd">
                    <Breadcrumbs  breadcrumbs={providerListbreadCrumbs}/>
                  <p className="brdOrg OrgSliceName f-20 customPara slice">USERS   <span className='dummyDataLength'>(<span className='dumDataArr'>{users?.length}</span>)</span></p>
                </Col>
                <Col md={10} lg={6} xl={4} className="orderReplace4">
                    <SearchBar setSearch={setSearch} search={search} />
                </Col>
                <Col md={8} lg={4} xl={4} className="orderReplace5">
                    <Dropdown overlay={rolesMenu} overlayClassName="orgMenuItem" trigger={["click"]}>
                        <Button
                            type="secondary"
                            className="activeBtn styleColor">
                            <div className="orgRoleBtn">

                                <img src={funnel} />
                            
                                <p className="customPara slice">   {selectedRole !== null ? selectedRole?.name : "Role"} </p>
                            
                                <div className="dropImg">
                                    <img className="imgSize" src={up} /></div></div>
                        </Button>
                    </Dropdown>
                </Col>
                <Col md={6} lg={3} xl={3} className="orderReplace5">
                    <Dropdown overlay={filterMenu} trigger={["click"]} overlayClassName="orgMenuItem">
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
                <Col md={4} lg={3} xl={4}>
                    <Button
                        type="primary"
                        className="addOrgBtn"
                        onClick={handleFilterReset}
                    >
                        <span className="material-icons-outlined">{CommonIcons.reset}</span> Reset
                    </Button>
                </Col>
                <Col md={5} lg={4} xl={3}>
                    <Dropdown overlay={addUserMenu} overlayClassName="actionMenu" trigger={["click"]}>
                        <Button type="primary btnW" className="addOrgBtn">
                            <span className="material-icons-outlined">{CommonIcons.add}{" "}</span>
                            ADD USER
                        </Button>
                    </Dropdown>
                </Col>
            </Row>
            <Row className="listHeader">
                <Col span={23} className="">
                    <Row className="orgCard">
                        <Col md={6} lg={5} xl={5} className="organisationLogoPic">
                            <div className="orgListHead orgListHeadMgins f-12">
                                USER NAME
                                <img src={up} className="upImage"></img>
                            </div>
                        </Col>

                        <Col md={2} lg={2} xl={3} className="nameClass classRole">
                            <div className="orgListHead f-12">ROLE</div>
                        </Col>
                        <Col md={2} lg={3} xl={3} className="nameClass classRole">
                            <div className="orgListHead f-12"><p className="orgDetailSliceCLass slice">PROVIDER TYPE</p></div>
                        </Col>
                        <Col md={3} lg={3} xl={4} className="nameClass classRole slice">
                            <div className="orgListHead f-12"><p className="orgDetailSliceCLass slice">CONTACT NO</p></div>
                        </Col>
                        <Col md={4} lg={4} xl={4} className="nameClass classRole slice">
                            <div className="orgListHead f-12"><p className="orgDetailSliceCLass slice">EMAIL ADDRESS</p></div>
                        </Col>
                        <Col md={2} lg={2} xl={2} className="nameClass classRole">
                            <div className="orgListHead f-12">STATUS</div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Spin spinning={formState.loading || passwordGenerated.loading}>
                <CompWrapper observeOn="listHeader">
                    {
                        users.length!=0 ?
                        users?.map((user, index) => {
                            return (
                                <ProviderDetail user={user} key={user.id} />
                            )

                        })
                        :!formState?.loading && <NODataFound/>
                    }
                </CompWrapper>
            </Spin>
        </div>
    )
}