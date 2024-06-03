import React from "react";
import { useDispatch } from "react-redux";
import { browserHistory } from "react-router";
import { CircularProgress } from "@material-ui/core";

import { login } from "../actions";
import keycloak from "../utils/keycloak";
import { trackPageview, trackEvent } from "./analytics";


const styles = {
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh"
	}
};

const Login = ({ location }) => {
	// Todo: Set up way to redirect to the original page after login
	const dispatch = useDispatch();

	// Redirect to home if already authenticated else redirect to keycloak
	React.useEffect(() => {
		const keycloakLogin = async () => {
			try {
				await keycloak.init({
					onLoad: "login-required"
				});

				await keycloak.loadUserInfo();
				// TODO: Double check if this is the right way to calculate token validity
				const tokenValidity = (keycloak.tokenParsed.exp - keycloak.tokenParsed.iat) * 1000;
				const authJSON = {
					token: keycloak.token,
					tokenValidity: tokenValidity
				};
				dispatch(login(authJSON));
				if (location.query["origin"] === undefined) {
					browserHistory.push("/");
				} else {
					browserHistory.push(location.query["origin"]);
				}
			} catch (error) {
				// Dispatches auth error
				dispatch(login());
				console.error("Login error", error);
			}

		// Track page view when the component mounts
		trackPageview(window.location.pathname);
	}
		keycloakLogin();
	}, []);

	return (
		<div style={styles.container}>
			<CircularProgress />
		</div>
	);
};

export default Login;
