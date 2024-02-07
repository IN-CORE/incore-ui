import React from "react";
import { useDispatch } from "react-redux";
import { browserHistory } from "react-router";
import { CircularProgress } from "@material-ui/core";

import { login } from "../actions";
import keycloak from "../utils/keycloak";

const styles = {
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh" // Use full view height to center vertically in the viewport
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
				console.log(keycloak);
				const tokenValidity = keycloak.tokenParsed.exp * 1000 - Date.now();
				console.log(tokenValidity);
				const authJSON = {
					token: keycloak.token,
					tokenValidity: tokenValidity
				};
				dispatch(login(keycloak.token, keycloak.tokenParsed));
				if (location.query["origin"] === undefined) {
					browserHistory.push("/");
				} else {
					browserHistory.push(location.query["origin"]);
				}
			} catch (error) {
				console.log("Login error", error);
			}
		};
		keycloakLogin();
	}, []);

	return (
		<div style={styles.container}>
			<CircularProgress />
		</div>
	);
};

export default Login;
