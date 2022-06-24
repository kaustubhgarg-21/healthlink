// Base Imports
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { AppRoutes } from "../../../router/appRoutes";

// Other Imports

export const PrivateRoute = (props: any) => {
  const { isAuthenticated } = props;
  if (isAuthenticated && isAuthenticated === true) {
    return (
      <Route {...props} component={props.component} render={undefined} />
    )
  };
return  (
      <Redirect to={AppRoutes.LOGIN}/>
    )
    ;
  };