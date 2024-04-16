// Set up your application entry point here...
///* eslint-disable import/default */

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

import routes from "./routes";
import configureStore from "./store/configureStore";

import "./styles/styles.scss";

// Import Google Analytics library
import ReactGA from "react-ga";

const store = configureStore();


// Initialize ReactGA with your tracking ID
ReactGA.initialize("G-VT38KCDFTM");
// Add a listener for every page view
const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);
history.listen(location => logPageView()); // Log page views on route changes

render(
	<Provider store={store}>
		<Router history={history} routes={routes} onUpdate={logPageView} />
	</Provider>,
	document.getElementById("app")
);
