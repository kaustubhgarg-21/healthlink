import { Col, Row, Menu, Dropdown, Skeleton, message } from "antd";
import { useEffect, useState } from "react";
import { funnel, navbarIcon, up, vector } from "../../../../images";
import OrganisationRowCard from "../../../stateless/organisation/organisationCard/OrganisationRowCard";
import "./organisationList.less";
import { SearchBar } from "./search";
import Button from "../../../stateless/common/button";
import OrganisationCard from "../../../stateless/organisation/organisationCard/organisationCard";
import { AppRoutes } from "../../../../router/appRoutes";
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs";
import { useHistory } from "react-router-dom";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganizations } from "../../../../../redux/actions/organization/organizationActions";
import { OrganizationTypeCodes } from "../../../../constants/enums";
import { clearState, OrganizationStateSelector } from "../../../../../redux/reducers/organization/organizationReducer";
import { CommonIcons } from "../../../../constants/enums";
import NODataFound from "../../../stateless/common/noDataFound";

const OrganisationList = () => {
  const [selectedFilter, setselectedFilter] = useState<null | boolean>(null);
  const { organizations, formState, organizatonsCount, isUpdated, isDeleted } = useSelector(OrganizationStateSelector)
  const [listView, setListView] = useState(true);
  const [search, setSearch] = useState("")
  const [sortField, setSortField] = useState("")
  const dispatch = useDispatch()
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchOrganizations(
      {
        levelCode: OrganizationTypeCodes.organization,
        isActive: selectedFilter,
        search: search,
        sortBy: sortField
      }
    ))
  },[selectedFilter, search, sortField])
  
  let obj={
    OrganizationTypeCodes,
    selectedFilter,
    search,
    sortField
  }

  useEffect(() => { 
    if (formState.isSuccess) {
      dispatch(clearState())
    }
  }, [formState.isSuccess])
  const addingOrganisation = () => {
    history.push(AppRoutes.ADDORGANIZATION)
  }
  useEffect(()=>{
    if(isDeleted.isSuccess){
      dispatch(clearState())
      dispatch(fetchOrganizations( {
        levelCode: OrganizationTypeCodes.organization,
        isActive: selectedFilter,
        search: search,
        sortBy: sortField
      }))
    } else if(isDeleted.isError){
      message.error({content:isDeleted?.errorStack ? isDeleted?.errorStack : "Something went srong" , key:"appNotification"})
    }
  },[isDeleted.isSuccess, isDeleted.isError])


  useEffect(()=>{
    if(isUpdated.isSuccess){
      dispatch(clearState())
      dispatch(fetchOrganizations( {
        levelCode: OrganizationTypeCodes.organization,
        isActive: selectedFilter,
        search: search,
        sortBy: sortField
      }))
    } else if(isUpdated.isError){
      message.error({content:isUpdated?.errorStack ? isUpdated?.errorStack : "Something went srong" , key:"appNotification"})
    }
  },[isUpdated.isSuccess, isUpdated.isError])

  const breadCrumbs = [
    {
      text: "Dashboard",
      link: AppRoutes.LANDING,
    },
    {
      text: "Organization"
    },
  ];
  const handleSortSelect = (selectedField: string) => {
    if (selectedField) {
      if (sortField == selectedField) {
        setSortField("")
      } else {
        setSortField(selectedField)
      }
    }
  }
  const columnCard = () => {
    return (
      <Skeleton active={true} loading={formState.loading} className="orgSkeleton">
      <div className="container">
        <Row gutter={[19,8]} className="orgCardRow">
          {organizations?.map((el, id) => (
            <Col sm={16} md={12} lg={12} xl={8} className="orgCardColumn" key={id}>
              <OrganisationCard organization={el} obj={obj} />
            </Col>
          ))}
        </Row>
      </div>
      </Skeleton>
    )
  }
  const rowCard = () => {
    return (
      <Skeleton active={true} loading={formState.loading} className="orgSkeleton">
      <div className="container orgMap cardBmargin">
        {organizations.length !=0 ? organizations?.map((el, id) => (
          <OrganisationRowCard obj={obj} organization={el} key={id} />
        )) : <NODataFound/>}
      </div>
      </Skeleton>
    );
  };
 
  const filterMenu = (
    <Menu className="orgMenuItem">
      <Menu.Item onClick={() => setselectedFilter(true)}>
        Active
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={() => setselectedFilter(false)}>
        Inactive
      </Menu.Item>
    </Menu>
  )

  return (
    <div >
      <Row className="innerHeader expand" gutter={20}>
        <Col md={24} lg={8} xl={6}>
          <Breadcrumbs breadcrumbs={breadCrumbs} />
          <div className="main-heading"> 
          <span className="brdOrg f-20">ORGANIZATIONS</span>
          <span className='dummyDataLength'>(<span className='dumDataArr'>{organizatonsCount}</span>)</span>
          </div>
        </Col>
        <Col md={8} lg={4} xl={7}>
          <SearchBar setSearch={setSearch} search={search} />
        </Col>
        <Col md={4} lg={3} xl={3}>
          <div className="btn-filter">
          <Dropdown overlay={filterMenu} trigger={["click"]} overlayClassName="orgMenuItem">
            <Button
              type="primary"
              className="activeBtn btnSize"
            >
              <img src={funnel} className="funnelImage" />
              <span className="txtSize">{selectedFilter ==null ? "All" : selectedFilter? "Active" : "Inactive"}</span>
              <div className="dropImg arroIcn">
              <img src={up} className="imgSize" />
              </div>
            </Button>
          </Dropdown>
          </div>
        </Col>
        <Col md={4} lg={3} xl={3}>
          <div className="btn-reset"> 
          <Button
            type="primary"
            onClick={() =>{setselectedFilter(null);setSearch("")}}
            className="resetBtn f-14"
          >
            <span className="material-icons-outlined iconColor">{CommonIcons.reset}</span> Reset
            
          </Button>
          </div>
        </Col>
        <Col md={8} lg={6} xl={5}>
          <div className="btn-addOrg"> 
          <Button type="primary" className="addOrgBtn" onClick={addingOrganisation}>
            <span className="material-icons-outlined">{CommonIcons.add}{" "}</span>
            add organization
          </Button>
          </div>
        </Col>
      </Row>
      
        {listView ? (
          
          <Row className="listHeader">
            <Col md={22} lg={23} xl={23} xxl={23}>
            <Row className="orgCard platformloginOrg" gutter={[20,30]}>
              <Col md={5} lg={5} xl={6} className="organisationLogoPic">
              <div className="orgListHead orgListHeadMginleft slice f-12" onClick={()=>handleSortSelect("orgName")}>
                ORGANIZATION NAME 
                <img src={up} className="upImage"></img>
              </div>
              </Col>
        
              <Col md={3} lg={4} xl={3} className="f-12 slice orgListHeadMginleft">
              <div className="orgListHead slice f-12">CITY, STATE</div>
              </Col>
              <Col md={3} lg={3} xl={4} className=" f-12 slice">
              <div className="orgListHead slice f-12">CONTACT NAME</div>
              </Col>
              <Col md={3} lg={3} xl={3} className=" f-12 slice">
                <div className="orgContactNameSlicing">
               
                  <div className="orgListHead slice f-12 marginContact ">CONTACT NO</div>
             
                </div>
              </Col>
              <Col md={4} lg={4} xl={4} className="organisationEmail f-12">
              <div className="orgListHead slice f-12 marginContact emailMarg">EMAIL ADDRESS</div>
              </Col>
              <Col md={2} lg={2} xl={3} className="organisationStatus">
                <div className="orgContactNameSlicing orgListHead f-12 marginContact">
                SUBSCRIPTON STATUS
                </div>  
              </Col>
            </Row>
            </Col>

            <Col md={2} xl={1} xxl={1} lg={1}>
              <img
                src={listView ? vector : navbarIcon}
                onClick={() =>
                  listView ? setListView(false) : setListView(true)
                }
                className="vectorClass"
                alt="status"
              />
            </Col>
          </Row>
        ) : (
          <Row className="listHeader">
            <Col md={23} lg={23} xl={24} className="listing">
              <img
                src={listView ? vector : navbarIcon}
                onClick={() =>
                  listView ? setListView(false) : setListView(true)
                }
                className="vectorClass"
                alt="status"
              />
            </Col>
          </Row>
        )}
      <CompWrapper observeOn="innerHeader">
        {listView ? rowCard() : columnCard()}
      </CompWrapper>
    </div>
  );
};

export default OrganisationList;
