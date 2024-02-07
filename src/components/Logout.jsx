import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions";
import keycloak from "../utils/keycloak";
import {CircularProgress} from "@material-ui/core";

const styles = {
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh" // Use full view height to center vertically in the viewport
	}
};

const Logout = () => {
	const dispatch = useDispatch();
	React.useEffect(() => {
		const keycloakLogout = async () => {
			try {
				if (keycloak.authenticated === undefined) {

					await keycloak.init({
						onLoad: "check-sso"
					});

					await keycloak.loadUserInfo();
				}
				console.log(keycloak);
				dispatch(logout());
				keycloak.logout({
					redirectUri: "http://localhost:3000"
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
