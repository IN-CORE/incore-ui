import React from "react";
import { IndexRoute, Route } from "react-router";

import App from "./containers/App";
import Playbook from "./components/Playbook";
import DataViewer from "./containers/DataViewer";
import DFR3Viewer from "./containers/DFR3Viewer";
import SemanticViewer from "./containers/SemanticViewer";
import HazardViewer from "./containers/HazardViewer";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Profile from "./containers/Profile";
import {Forbidden} from "./components/Forbidden";
export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage} />
		<Route path="Login" component={Login} />
		<Route path="playbook" component={Playbook} />
		<Route path="Profile" component={Profile} />
		<Route path="DataViewer" component={DataViewer} />
		<Route path="DFR3Viewer" component={DFR3Viewer} />
		<Route path="DFR3Viewer/:id" component={DFR3Viewer} />
		<Route path="HazardViewer" component={HazardViewer} />
		<Route path="SemanticViewer" component={SemanticViewer} />
		<Route path="Forbidden" component={Forbidden} />
	</Route>
);
