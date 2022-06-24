import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "../components/routing/privateRoute";
import { PublicRoute } from "../components/routing/publicRoute";
import MainLayout from "../components/stateless/layouts/mainLayout";
import { AppRoutes, PrivateRoutes, PublicRoutes } from "./appRoutes";

export default (props: any) => {
  const pathName = window.location.pathname;
  const { isAuthenticated,appUser } = props;
  return (
    <Router>
      {/* Public Routes */}
      <Switch>
        {PublicRoutes.map((x) => (
          <PublicRoute key={x.path} path={x.path} exact component={x.component} isAuthenticated={isAuthenticated}/>
        ))}
      </Switch>
      {/* Private Routes */}
      {PrivateRoutes.map((x, index) => (
        <Route key={`${x.routePath.replaceAll("/", "")}-${index}`} path={x.routePath}>
          <MainLayout appUser={appUser}>
            <Switch>
              {x.routes.map((r, rIndex) => (
                <PrivateRoute key={`${r.path.replaceAll("/", "")}-${rIndex}`} exact path={r.path} component={r.component} isAuthenticated={isAuthenticated} />
              ))}
            </Switch>
          </MainLayout>
        </Route>
      ))}
      {
        pathName === "/" ? (
          <Redirect to={AppRoutes.LOGIN} />
        ) : (
          <></>
        )
      }
    </Router>
  );
};