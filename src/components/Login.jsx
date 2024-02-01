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

import { authLoginSuccess, login } from "../actions";
import keycloak from "../utils/keycloak";

const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
	resetPW: {
		display: "block",
		textAlign: "right",
		margin: "0 auto 10px auto",
		fontFamily: theme.typography.body1.fontFamily
	},
	tos: {
		fontSize: "12px",
		fontFamily: theme.typography.body2.fontFamily,
		margin: "20px auto 10px auto"
	},
	signUp: {
		fontWeight: 500,
		fontSize: "15px",
		fontFamily: theme.typography.body1.fontFamily,
		display: "block",
		margin: "10px auto 5px auto"
	}
}));

const Login = ({ location }) => {
	// Todo: Set up way to redirect to the original page after login
	const dispatch = useDispatch();

	// Redirect to home if already authenticated else redirect to keycloak
	React.useEffect(() => {
		const keycloakLogin = async () => {
			//Source: https://github.com/warteruzannan/keycloak-nodejs-react-exemplo/blob/ff08bd74254916e1b0ae4b9b9dd0e5ef9aec331d/web/src/app.js#L13
			try {
				await keycloak.init({
					onLoad: "login-required"
				});

				await keycloak.loadUserInfo();
				dispatch(authLoginSuccess(keycloak.token, keycloak.tokenParsed));
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

	// TODO: Add a loading spinner or better text during the redirect
	return <div> Rerouting to keycloak </div>;
};

export default Login;
