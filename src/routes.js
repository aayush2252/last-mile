import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundry";

const MapRoute = lazy(() => import("./pages/MapRoute"));
const StopList = lazy(() => import("./pages/StopList"));
const UploadList = lazy(() => import("./pages/UploadList"));
const CustomerTracking = lazy(() => import("./pages/CustomerTracking"));
const Insights = lazy(() => import("./pages/Insights"));
const SignaturePage = lazy(() => import("./pages/SignaturePage"));
const FleetOptimization = lazy(() => import("./pages/fleetOptimization"));
const MarketPlace = lazy(() => import("./pages/MarketPlace"));

export default (
  <ErrorBoundary>
    <Switch>
      <Route exact path="/" component={props => <UploadList {...props} />} />
      <Route exact path="/stoplist/:cust" component={props => <StopList {...props} />} />
      <Route exact path="/stoplist" component={props => <StopList {...props} />} />
      <Route exact path="/map" component={props => <MapRoute {...props} />} />
      <Route exact path="/track" component={props => <CustomerTracking {...props} />} />
      <Route exact path="/insight" component={props => <Insights {...props} />} />
      <Route exact path="/sign" component={props => <SignaturePage {...props} />} />
      <Route exact path="/optimization" component={props => <FleetOptimization {...props} />} />
      <Route exact path="/market" component={props => <MarketPlace {...props} />} />
    </Switch>
  </ErrorBoundary>
);
