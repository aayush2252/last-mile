import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundry";

const MapRoute = lazy(() => import("./pages/MapRoute"));
const StopList = lazy(() => import("./pages/StopList"));
const UploadList = lazy(() => import("./pages/UploadList"));
const CustomerTracking = lazy(() => import("./pages/CustomerTracking"));
const Insights = lazy(() => import("./pages/Insights"));

export default (
  <ErrorBoundary>
    <Switch>
      <Route exact path="/" component={props => <MapRoute {...props} />} />
      <Route exact path="/stoplist" component={props => <StopList {...props} />} />
      <Route exact path="/form" component={props => <UploadList {...props} />} />
      <Route exact path="/track" component={props => <CustomerTracking {...props} />} />
      <Route exact path="/insight" component={props => <Insights {...props} />} />
    </Switch>
  </ErrorBoundary>
);
