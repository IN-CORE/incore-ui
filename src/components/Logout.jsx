import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions";
import keycloak from "../utils/keycloak";
import { CircularProgress } from "@material-ui/core";
import config from "../app.config";

const styles = {
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh"
	}
};

const Logout = () => {
	const dispatch = useDispatch();
	React.useEffect(() => {
		// For local development, the hostname is set to localhost:3000
		const redirectUri =
			config.hostname !== undefined && config.hostname !== "" && config.hostname !== null
				? config.hostname
				: "http://localhost:3000/";
		const keycloakLogout = async () => {
			try {
				if (keycloak.authenticated === undefined) {

					await keycloak.init({
						onLoad: "check-sso"
					});

					await keycloak.loadUserInfo();
				}
				dispatch(logout());
				keycloak.logout({
					redirectUri: redirectUri
				});
			} catch (error) {
				console.log("Logout error", error);
			}
		};
		keycloakLogout();
	}, []);
	return (
		<div style={styles.container}>
			<CircularProgress />
		</div>
	);
};

export default Logout;
