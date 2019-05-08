import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./containers/App";
import HomePage from "./containers/HomePage";
import ExecuteAnalysis from "./containers/ExecuteAnalysis";
import ResultsPage from "./containers/ResultsPage";
import DataViewer from "./containers/DataViewer";
import FragilityExplorerPage from "./components/FragilityExplorerPage";
import HazardViewer from "./containers/HazardViewer";
import config from "./app.config";


export default (
	<Route path={`${config.baseUrl}`} component={App}>
		<IndexRoute component={HomePage} />
		<Route path="Execute" component={ExecuteAnalysis} />
		<Route path="Results/:id" component={ResultsPage} />
		<Route path="DataViewer" component={DataViewer} />
		<Route path="FragilityViewer" component={FragilityExplorerPage} />
		<Route path="FragilityViewer/:id" component={FragilityExplorerPage} />
		<Route path="HazardViewer" component={HazardViewer} />
	</Route>
);
