import React, {Component} from "react";
import {browserHistory} from "react-router";
import {Avatar, Box, Button, Divider, GridList, GridListTile, Paper, TextField, Typography, Link} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Version from "./children/Version";
import Cookies from "universal-cookie";
import {withStyles} from "@material-ui/core/styles";
import config from "../app.config";

const cookies = new Cookies();
const styles = theme => ({
	resetPW:{
		display:"block",
		textAlign:"right",
		margin: "0 auto 10px auto",
		fontFamily: theme.typography.body1.fontFamily
	},
	tos:{
		fontSize: "12px",
		fontFamily: theme.typography.body2.fontFamily,
		margin:"20px auto 10px auto"
	},
	signUp:{
		fontWeight: 500,
		fontSize:"15px",
		fontFamily: theme.typography.body1.fontFamily,
		display:"block",
		margin:"10px auto 5px auto"
	}
});



class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			passwordErrorText: "",
			loginErrorText: "",
			error: false,
			origin: props.location.query["origin"],
		};

		this.changeUsername = this.changeUsername.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.login = this.login.bind(this);
		this.handleKeyPressed = this.handleKeyPressed.bind(this);
	}

	handleKeyPressed(event: Object) {
		if (event.charCode === 13) {
			this.login();
		}
	}

	changeUsername(event: Object) {
		this.setState({
			username: event.target.value,
			loginErrorText: ""
		});
	}

	changePassword(event: Object) {
		let password = event.target.value;

		if (password.length <= 6) {
			this.setState({
				error: true,
				passwordErrorText: "Your password must be at least 6 characters long",
				loginErrorText: "",
			});
		} else {
			this.setState({
				error: false,
				passwordErrorText: "",
				loginErrorText: "",
			});
		}


		this.setState({password: password});
		if (event.charCode === 13) {
			this.login(event);
		}
	}

	async login() {
		await this.props.login(this.state.username, this.state.password);
		if (this.props.loginError) {
			this.setState({
				loginErrorText: "Username/Password is not correct. Try again"
			});
		}
		if (!this.props.loginError) {
			if ( this.state.origin === undefined ){
				browserHistory.push("/");
			}
			else{
				browserHistory.push(this.state.origin);
			}

		}

	}

	render() {

		const {classes} = this.props;

		// if already login, redirect to homepage
		let Authorization = cookies.get("Authorization");
		if (Authorization !== undefined && Authorization !== "" && Authorization !== null) {
			browserHistory.push("/");
			return null;
		}

		// else render login page
		else {
			return (
				<div>
					<div className="center"
						 style={{display: "block", margin: "auto", width: "500px", paddingTop: "10%"}}>
						{/*TODO: Add loading spinner here*/}
						<Paper style={{padding: 40}}>
							<Avatar style={{margin: "auto"}}>
								<LockOutlinedIcon/>
							</Avatar>
							<Typography component="h1" variant="h5">
								Sign in
							</Typography>
							<Divider/>
							<GridList cols={1} cellHeight="auto">
								<GridListTile>
									<p style={{color: "red"}}>{this.state.loginErrorText} </p>
								</GridListTile>
								<GridListTile>
									<TextField
										variant="outlined"
										margin="normal"
										required
										fullWidth
										autoFocus
										id="username"
										label="Username"
										name="username"
										value={this.state.username}
										onChange={this.changeUsername}
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
										error={this.state.error}
										helperText={this.state.passwordErrorText}
										value={this.state.password}
										onChange={this.changePassword}
										onKeyPress={this.handleKeyPressed}
									/>
									<Link href={config.resetPwURL} className={classes.resetPW} target="_blank">Forgot password?</Link>
									<Box className={classes.tos}>
										<Typography variant="body2" style={{"display":"inline"}}>By continuing, you agree to our </Typography>
										<Link href={config.privacyURL} style={{"display":"inline"}} target="_blank">Web Privacy Notice</Link>
									</Box>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										onClick={this.login}
									>Sign In</Button>
									<Link href={config.signUpURL} className={classes.signUp} target="_blank">Don't have an account? Sign up.</Link>
								</GridListTile>
							</GridList>
						</Paper>
						<Version/>
					</div>
				</div>
			);
		}
	}
}

export default withStyles(styles)(Login);
