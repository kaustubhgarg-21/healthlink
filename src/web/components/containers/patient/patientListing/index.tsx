import { Checkbox, Col, Dropdown, Menu, Row, Spin } from "antd";
import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CommonIcons,
} from "../../../../constants/enums";
import {
  downIcon,
  organizationIcon,
  
} from "../../../../images";
import { AppRoutes } from "../../../../router/appRoutes";
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs";
import Button from "../../../stateless/common/button";
import {
  fetchProviderPatients,
} from "../../../../../redux/actions/patient/patientAction";
import { funnel } from "../../../../images";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import PatientCard from "../../../stateless/patient/patientRowCard/patientCard";
import PatientRowCard from "../../../stateless/patient/patientRowCard/patientRowCard";
import { SearchBar } from "../../organisation/organisationListing/search";
import "./patientListing.less";
import { setCollapsed } from "../../../../../redux/reducers/sideBarReducer";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";
import { PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer";
import CustomTooltip from "../../../stateless/common/toolTip";
import moment from "moment";

const PatientListing = () => {
  const { appUser } = useSelector(AuthStateSelector);
  const { patients, formState } = useSelector(PatientStateSelector);
  const [search, setSearch] = useState("");

  const [listView, setListView] = useState(true);
  const [imgView, setImgView] = useState(false);
  const [orgNameBtn, setOrgNameBtn] = useState();
  const [selectedOrg, setSelectedOrg] = useState("");
  const [filters, setFilters] = useState<any>({});
  const [checkedAll, setCheckedAll] = useState(false);
  const [visibleMenuSettings, setVisible] = useState(false);
  const [orgNameData , setOrgNameData] = useState<any>()
  const [visibleOrgMenu , setVisibleOrgMenu] = useState(false)
  const [currentDate , setCurrentDate] = useState({
   date:  moment().format("YYYY-MM-DD")
  })
  let [check, setCheck] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [allParams, setAllParams] = useState<any>({
    all: false,
    criticalAlert: false,
    primaryPatient: false,
    nonCompliant: false,
  });
  const breadCrumbs = [
    {
      text: "Dashboard",
      link: AppRoutes.LANDING,
    },
    {
      text: "Patients",
    },
  ];

  useEffect(() => {
    dispatch(setCollapsed(true));
  }, []);

  useEffect(() => {
    dispatch(
      fetchProviderPatients({
        id: appUser?.id,
        search: search,
        isCritical: filters?.isCritical,
        isPrimary: filters?.isPrimary,
        isCompliant: filters?.isCompliant,
        organisation: selectedOrg,
        currentDate
      })
    );
  }, [search, filters, selectedOrg]);

  const handleAllChecked = (e: any) => {
    const { name, checked } = e.target;
    if (checked == true) {
      setAllParams({
        all: true,
        criticalAlert: true,
        primaryPatient: true,
        nonCompliant: true,
      });
    } else {
      setAllParams({
        all: false,
        criticalAlert: false,
        primaryPatient: false,
        nonCompliant: false,
      });
    }
  };

  const handleChecked = (e: any) => {
    const { name, checked } = e.target;
    var index = check.indexOf(name);
    if ((name != "All" && checked == false) || checkedAll == true) {
      setAllParams({ ...allParams, all: false, [name]: checked });
      setCheckedAll(false);
      check.splice(index, 1);
    }
    if (checkedAll == false && checked == true) {
      setAllParams({ ...allParams, [name]: checked });
      check.push(name);
    }
  };
  const onReset = () => {
    setSelectedOrg("");
    setAllParams({});
    setFilters({});
    setSearch("");
    setCheck([]);
  };
  const handleVisibleChange = (flag: any) => {
    setVisible(flag);
  };

  const applyFilters = () => {
    setFilters({
      ...filters,
      isPrimary: allParams?.primaryPatient,
      isCritical: allParams?.criticalAlert,
      isCompliant: allParams?.nonCompliant,
    });
    setVisible(false);
  };
  const clearFilter = () => {
    setAllParams({
      all: false,
      criticalAlert: false,
      primaryPatient: false,
      nonCompliant: false,
    });
    setFilters({});
    setVisible(false);
    setCheck([]);
  };
  const getFirstFilter = () => {
    switch (check[0]) {
      case "criticalAlert":{
        return "Critical-Alerts Patients"
      }
      case "primaryPatient":{
        return "Primary Patients"
      }
      case "nonCompliant":{
        return "Non-Compliant Patients"
      }
    }
  }
  const getAppliedFilter = () => {
    if (check.length == 0 || allParams?.all) {
      return "Patient Type";
    } else {
      if (check.length <= 1) {
        return getFirstFilter()
      } else {
        return `${getFirstFilter()} & ${check.length - 1} more`;
      }
    }
  };
  const getOrgName = () => {
    if (selectedOrg) {
      return orgNameBtn;
    } else {
      return "Organization Name";
    }
  };
  const orgNameBtnClick = (org: any) => {
    setOrgNameBtn(org?.orgName);
    setSelectedOrg(org?.orgId);
    setVisibleOrgMenu(false);
  };
  const orgNameMenu = (
    <Menu className="criticalityFilter">
      {appUser?.userRoles?.map((data: any) => {
        return (
          <><Menu.Item key={data?.orgId} onClick={() => orgNameBtnClick(data)}>
            {data?.orgName}
          </Menu.Item><Menu.Divider /></>
        );
      })}
    </Menu>
  );
  const menu = (
    <Menu className="criticalityFilter">
      <Menu.Item key="All">
        {" "}
        <Checkbox
          className="listingCheckbox"
          onChange={handleAllChecked}
          name="all"
          checked={allParams.all}
        >
          All
        </Checkbox>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="Critical-Alerts Patients">
        <Checkbox
          className="listingCheckbox"
          onChange={handleChecked}
          name="criticalAlert"
          checked={allParams.criticalAlert}
        >
          Critical-Alerts Patients
        </Checkbox>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="Primary Patients">
        <Checkbox
          className="listingCheckbox"
          onChange={handleChecked}
          name="primaryPatient"
          checked={allParams.primaryPatient}
        >
          Primary Patients
        </Checkbox>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="Non-Commpilant Patients">
        <Checkbox
          className="listingCheckbox"
          onChange={handleChecked}
          name="nonCompliant"
          checked={allParams.nonCompliant}
        >
          {" "}
          Non-Compliant Patients
        </Checkbox>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="buttons">
        <Row gutter={[20, 22]}>
        <Col span={24}>
            <Row>
              <Col span={24}>
              <Row  gutter={[20, 22]} justify="end">
              <Col span={10}>
              <Button type="primary" className="okBtn" onClick={applyFilters}>
              <b>OK</b>
               </Button>
              </Col>
              <Col span={12}>
              <Button type="primary" className="okBtn" onClick={clearFilter}>
              <b>CANCEL</b>
             </Button>
              </Col>
              </Row>
              </Col>
           
         
            </Row>
         
          </Col>
        </Row>
      </Menu.Item>
    </Menu>
  );
  return (
    <Spin spinning={formState.loading}>
      <Row gutter={[16, 8]} className="innerHeader expand">
        <Col md={24} lg={4} xl={6}>
          <Breadcrumbs breadcrumbs={breadCrumbs} />
          <div className="main-heading"> 
          <span className="brdOrganisations f-20">Patients</span>
          <span className="dummyDataLength">
            (<span className="dumDataArr">{patients?.length}</span>)
          </span>
          </div>
        </Col>
        <Col md={8} lg={7} xl={8}>
          <SearchBar setSearch={setSearch} search={search} />
        </Col>
        <Col md={6} lg={5} xl={4}>
          <Dropdown
            overlayClassName="criticalityFilter"
            overlay={menu}
            trigger={["click"]}
            onVisibleChange={handleVisibleChange}
            visible={visibleMenuSettings}
          >
            <button className="saveOrgBtn " form="organisationAdd">
              <div className="ddlfilter">
              <img src={funnel} className="funnelImage" />

              <div className="criticalBtn slice">{getAppliedFilter()}</div>
              {!imgView ? (
                <span className="saveOrgBtnTxt f-14">
                  <img src={downIcon} className="downIconFilter"></img>
                </span>
              ) : (
                <div className="saveOrgBtnTxt f-14"></div>
              )}
               </div>
            </button>
          </Dropdown>
        </Col>
        <Col md={6} lg={5} xl={4}>
          <Dropdown
            overlay={orgNameMenu}
            trigger={["click"]}
            visible={visibleOrgMenu}
            onVisibleChange={setVisibleOrgMenu}
          >
            <button className="saveOrgBtn" form="organisationAdd">
              <div className="saveOrgBtnTxt saveOrgBtntxtEllips">
                <img src={organizationIcon} className="orgNameIcon" />
                <CustomTooltip
                  title={orgNameBtn}
                  color="#FFFFFF"
                  content="show"
                  placement="top"
                >
                  <div>{getOrgName()} </div>
                </CustomTooltip>
                <img src={downIcon}></img>
              </div>
            </button>
          </Dropdown>
          
          
        </Col>
        

        <Col md={4} lg={3} xl={2} style={{paddingRight:'0px'}}>
          <Button
            type="primary"
            className="resetBtn iconColor"
            onClick={onReset}
          >
            <span className="material-icons-outlined">{CommonIcons.reset}</span>
            RESET
          </Button>
        </Col>
      </Row>
      <div></div>
      <CompWrapper observeOn="innerHeader">
        {listView ? (
          <div>
            {patients?.map((el, id) => (
              <PatientRowCard el={el} key={id} appUser={appUser} />
            ))}
          </div>
        ) : (
          <Row gutter={[16, 8]} className="patientCardContainer">
            {patients?.map((el, id) => (
              <Col sm={16} md={12} lg={10} xl={8} key={id}>
                <PatientCard el={el} />
              </Col>
            ))}
          </Row>
        )}
      </CompWrapper>
    </Spin>
  );
};
export default PatientListing;
