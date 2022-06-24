import { Col, Row, Spin } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../../../../../redux/actions/user/userAction";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";
import { setSideBarItem } from "../../../../../redux/reducers/sideBarReducer";
import { clearDashboardData, clearState, UserStateSelector } from "../../../../../redux/reducers/user/userReducer";
import { UserRoles } from "../../../../constants/enums";
import { AppRoutes } from "../../../../router/appRoutes";
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs";
import OrgDashboard from "../../../stateless/dashboard/orgDashboard";
import PlatformAdminDashboard from "../../../stateless/dashboard/platformAdminDashboard";
import ProviderDashboard from "../../../stateless/dashboard/providerDashboard";
import "./dashboard.less";
export const Dashboard = () => {
  const { appUser } = useSelector(AuthStateSelector);
  const { formState, dashboardData } = useSelector(UserStateSelector);
  const dispatch = useDispatch();
  const dashboardPage = [
    {
      text: "Dashboard",
      link: AppRoutes.LANDING,
    },
  ];
  useEffect(() => {
    dispatch(setSideBarItem("Dashboard"));
  }, []);
  useEffect(()=>{
    if(formState.isSuccess){
      dispatch(clearState())
    }else if(formState.isError){
      dispatch(clearState())
    }
  },[formState.isSuccess,formState?.isError])

  useEffect(()=>{
    return(()=>{
      dispatch(clearDashboardData())
    })
  },[])
  useEffect(() => {
    if(appUser?.roleName === UserRoles.PROVIDER){
      dispatch(fetchDashboardData({providerId: appUser?.id}));
    }else if(appUser?.roleName === UserRoles.ORG_ADMIN) {
      dispatch(fetchDashboardData({organizationId: appUser?.orgId}));
    }else{
      dispatch(fetchDashboardData({roleNamePa: UserRoles.PLATFORM_ADMIN}))
    }  
  }, []);
  const dashboardGraphView = () => {
    switch (appUser?.roleName){
      case UserRoles.PLATFORM_ADMIN:
      case UserRoles.SUPER_ADMIN: {
        return (
          <>
            <PlatformAdminDashboard
              orgGrowth={dashboardData?.orgGrowth}
              dailyLoginrate={dashboardData?.dailyLoginrate}
              patientGrowth={dashboardData?.roleGrowth}
              biometricData={dashboardData?.biomaticDatareport}
              patientReview={dashboardData?.patientReviewreport}
            />
          </>
        );
      }
      case UserRoles.ORG_ADMIN: {
        return (
          <>
            <OrgDashboard
              dailyLoginrate={dashboardData?.dailyLoginrate}
              patientGrowth={dashboardData?.roleGrowth}
              biometricData={dashboardData?.biomaticDatareport}
              patientReview={dashboardData?.patientReviewreport}
            />
          </>
        );
      }
      case UserRoles.PROVIDER: {
        return (
          <>
            <ProviderDashboard
              biometricData={dashboardData?.biomaticDatareport}
              patientReview={dashboardData?.patientReviewreport}
              providerReport={dashboardData?.providerReport? dashboardData?.providerReport[0]: {}}
            />
          </>
        );
      }
    }
  };
  return (
    <Spin spinning={formState.loading}>
      <Row className="innerHeader">
        <Col>
          <Breadcrumbs breadcrumbs={dashboardPage} />
          <span className="dashBoardPage f-20">Dashboard</span>
        </Col>
      </Row>

      {dashboardGraphView()}
    </Spin>
  );
};