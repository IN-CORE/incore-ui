import React from "react";
import {IndexRoute, Route} from "react-router";

import App from "./containers/App";
import HomePage from "./components/HomePage";
import Login from "./containers/Login";
import DataViewer from "./containers/DataViewer";
import FragilityViewer from "./containers/FragilityViewer";
import HazardViewer from "./containers/HazardViewer";


export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage}/>
		<Route path="Login" component={Login}/>
		<Route path="DataViewer" component={DataViewer}/>
		<Route path="FragilityViewer" component={FragilityViewer}/>
		<Route path="FragilityViewer/:id" component={FragilityViewer}/>
		<Route path="HazardViewer" component={HazardViewer}/>
	</Route>
);

