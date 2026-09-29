import React from "react";
import { Route, Switch } from "react-router-dom";

import DataViewer from "./components/DataViewer";
import DFR3Viewer from "./components/DFR3Viewer";
import SemanticViewer from "./containers/SemanticViewer";
import HazardViewer from "./containers/HazardViewer";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Profile from "./containers/Profile";
import { Forbidden } from "./components/Forbidden";

// Rendered inside <App>, which supplies the shared app bar. Under react-router
// v3 these were nested children of a `path="/"` route and reached App as
// `props.children`; v5 has no nested-children mechanism, so App renders this
// <Switch> directly.
//
// Paths are absolute here because v3 resolved child paths relative to the
// parent route. Matching stays case-insensitive (v5's default), which the app
// relies on: it pushes "/profile" and "/forbidden" against these routes.
const Routes = () => (
	<Switch>
		<Route exact path="/" component={HomePage} />
		<Route path="/Login" component={Login} />
		<Route path="/Profile" component={Profile} />
		<Route path="/DataViewer" component={DataViewer} />
		<Route path="/DFR3Viewer/:id" component={DFR3Viewer} />
		<Route path="/DFR3Viewer" component={DFR3Viewer} />
		<Route path="/HazardViewer" component={HazardViewer} />
		<Route path="/SemanticViewer" component={SemanticViewer} />
		<Route path="/Forbidden" component={Forbidden} />
	</Switch>
);

export default Routes;
