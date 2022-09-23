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

import { login } from "../actions";

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

const Login = () => {
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [passwordErrorText, setPasswordErrorText] = React.useState("");
	const [loginErrorText, setLoginErrorText] = React.useState("");
	const [error, setError] = React.useState(false);

	const dispatch = useDispatch();
	const loginError = useSelector((state) => state.user.loginError);
	const loginSuccess = useSelector((state) => state.user.loginSuccess);

	React.useEffect(() => {
		if (loginError) {
			setLoginErrorText("Username/Password is not correct. Try again");
		}
		if (loginSuccess) {
			browserHistory.push("/");
		}
	}, [loginError, loginSuccess]);

	const classes = useStyles();

	const changeUsername = (event) => {
		setUsername(event.target.value);
		setLoginErrorText("");
	};

	const changePassword = (event) => {
		let pass = event.target.value;
		if (pass.length <= 6) {
			setError(true);
			setPasswordErrorText("Your password must be at least 6 characters long");
			setLoginErrorText("");
		} else {
			setError(false);
			setPasswordErrorText("");
			setLoginErrorText("");
		}

		setPassword(pass);

		if (event.charCode === 13) {
			loginWrapper(event);
		}
	};

	const loginWrapper = async () => {
		await login(username, password)(dispatch);
	};

	const handleKeyPressed = (event) => {
		if (event.charCode === 13) {
			loginWrapper();
		}
	};

	// if already login, redirect to homepage
	let Authorization = cookies.get("Authorization");
	if (Authorization !== undefined && Authorization !== "" && Authorization !== null) {
		browserHistory.push("/");
		return null;
	}
	// else render login page
	return (
		<div>
			<div className="center" style={{ display: "block", margin: "auto", width: "500px", paddingTop: "10%" }}>
				{/*TODO: Add loading spinner here*/}
				<Paper style={{ padding: 40 }}>
					<Avatar style={{ margin: "auto" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Divider />
					<ImageList cols={1} cellHeight="auto">
						<ImageListItem>
							<p style={{ color: "red" }}>{loginErrorText} </p>
						</ImageListItem>
						<ImageListItem>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								autoFocus
								id="username"
								label="Username"
								name="username"
								value={username}
								onChange={changeUsername}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="password"
								label="Password"
								name="password"
								type="password"
								error={error}
								helperText={passwordErrorText}
								value={password}
								onChange={changePassword}
								onKeyPress={handleKeyPressed}
							/>
							<Link href={config.resetPwURL} className={classes.resetPW} target="_blank">
								Forgot password?
							</Link>
							<Box className={classes.tos}>
								<Typography variant="body2" style={{ display: "inline" }}>
									By continuing, you agree to our{" "}
								</Typography>
								<Link href={config.tosURL} style={{ display: "inline" }} target="_blank">
									Terms of Services
								</Link>
								<Typography variant="body2" style={{ display: "inline" }}>
									&nbsp;and&nbsp;
								</Typography>
								<Link href={config.privacyURL} style={{ display: "inline" }} target="_blank">
									Web Privacy Notice
								</Link>
							</Box>
							<Button type="submit" fullWidth variant="contained" color="primary" onClick={loginWrapper}>
								Sign In
							</Button>
							<Link href={config.signUpURL} className={classes.signUp} target="_blank">
								Don't have an account? Sign up.
							</Link>
						</ImageListItem>
					</ImageList>
				</Paper>
				<Version />
			</div>
		</div>
	);
};

export default Login;
