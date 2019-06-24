import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./containers/App";
import Login from "./containers/Login";
import DataViewer from "./containers/DataViewer";
import FragilityViewer from "./containers/FragilityViewer";
import HazardViewer from "./containers/HazardViewer";
import config from "./app.config";


export default (
	<Route path={`${config.baseUrl}`} component={App}>
		<IndexRoute component={Login} />
		<Route path="DataViewer" component={DataViewer} />
		<Route path="FragilityViewer" component={FragilityViewer} />
		<Route path="FragilityViewer/:id" component={FragilityViewer} />
		<Route path="HazardViewer" component={HazardViewer} />
	</Route>
);

