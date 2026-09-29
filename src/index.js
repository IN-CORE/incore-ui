// Set up your application entry point here...
///* eslint-disable import/default */

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import App from "./containers/App";
import browserHistory from "./history";
import configureStore from "./store/configureStore";

import "./styles/styles.scss";

import { initializeGA } from "./components/analytics";

const startApp = async () => {
	await initializeGA();

	const store = configureStore();

	const root = createRoot(document.getElementById("app"));

	root.render(
		<Provider store={store}>
			<Router history={browserHistory}>
				<App />
			</Router>
		</Provider>
	);
};

startApp();
