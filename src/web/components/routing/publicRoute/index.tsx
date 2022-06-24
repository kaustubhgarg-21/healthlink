// Base Imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { fetchPatientById } from "../../../../redux/actions/patient/patientAction";
import { AuthStateSelector } from "../../../../redux/reducers/authReducer/authReducer";
import { setSideBarItem } from "../../../../redux/reducers/sideBarReducer";
import { UserRoles } from "../../../constants/enums";
import { AppRoutes } from "../../../router/appRoutes";

export const PublicRoute = (props: any) => {
  const { isAuthenticated } = props;
  const {appUser} = useSelector(AuthStateSelector)
  const dispatch = useDispatch()
  
  const getLandingPage = () => {
    if(appUser?.roleName == UserRoles.PATIENT){
      dispatch(fetchPatientById(appUser?.id))
      dispatch(setSideBarItem("Home"))
    return AppRoutes.PATIENTREPORTS
    }else if(appUser?.roleName == UserRoles.FAMILY){
      dispatch(fetchPatientById(appUser?.patientId))
      dispatch(setSideBarItem("Home"))
      return AppRoutes.PATIENTREPORTS
    }else if(appUser?.roleName == UserRoles.PROVIDER){
      dispatch(setSideBarItem("Patients"))
      return AppRoutes.PATIENTLIST
    }
     else {
      return AppRoutes.LANDING
    }
  }

  if(isAuthenticated && isAuthenticated === true){
  return (
    <Redirect to={getLandingPage()} />
  )
}
  return (
    <Route {...props} component={props.component} render={undefined} />
  );

};

