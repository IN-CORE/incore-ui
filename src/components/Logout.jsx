import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { browserHistory } from "react-router";
import {
	Avatar,
	Box,
	Button,
	Divider,
	ImageList,
	ImageListItem,
	Paper,
	TextField,
	Typography,
	Link
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Version from "./children/Version";
import Cookies from "universal-cookie";
import { makeStyles } from "@material-ui/core/styles";
import config from "../app.config";

import { authLoginSuccess, authLogout, login } from "../actions";
import keycloak from "../utils/keycloak";

const cookies = new Cookies();

const Logout = () => {
	const dispatch = useDispatch();
	// Redirct to keycloak logout
	React.useEffect(() => {
		const keycloakLogout = async () => {
			//Source: https://github.com/warteruzannan/keycloak-nodejs-react-exemplo/blob/ff08bd74254916e1b0ae4b9b9dd0e5ef9aec331d/web/src/app.js#L13
			try {
				if (keycloak.authenticated === undefined) {

					await keycloak.init({
						onLoad: "check-sso"
					});

					await keycloak.loadUserInfo();
				}
				console.log(keycloak);
				dispatch(authLogout());
				keycloak.logout({
					redirectUri: "http://localhost:3000"
				});
			} catch (error) {
				console.log("Logout error", error);
			}
		};
		keycloakLogout();
	}, []);
	// TODO: Add a loading spinner or better text during the redirect
	return <div> Logging out </div>;
};

export default Logout;
