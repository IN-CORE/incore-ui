import React from "react";
import { useDispatch } from "react-redux";
import browserHistory from "../history";
import { CircularProgress } from "@mui/material";

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
				// v5 does not parse the query string the way v3's location.query did.
				const origin = new URLSearchParams(location.search).get("origin");
				if (origin === null) {
					browserHistory.push("/");
				} else {
					browserHistory.push(origin);
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
