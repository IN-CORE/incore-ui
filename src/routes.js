import React from "react";
import {IndexRoute, Route} from "react-router";

import App from "./containers/App";
import HomePage from "./components/HomePage";
import Login from "./containers/Login";
import DataViewer from "./containers/DataViewer";
import DFR3Viewer from "./containers/DFR3Viewer";
import HazardViewer from "./containers/HazardViewer";
import config from "./app.config";


export default (
	<Route path={`${config.baseUrl}`} component={App}>
		<IndexRoute component={HomePage}/>
		<Route path="Login" component={Login}/>
		<Route path="DataViewer" component={DataViewer}/>
		<Route path="DFR3Viewer" component={DFR3Viewer}/>
		<Route path="DFR3Viewer/:id" component={DFR3Viewer}/>
		<Route path="HazardViewer" component={HazardViewer}/>
	</Route>
);

