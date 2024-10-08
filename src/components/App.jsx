import React, { Component } from "react";
import {
	AppBar,
	Box,
	Button,
	Divider,
	IconButton,
	LinearProgress,
	Link,
	Menu,
	MenuItem,
	Toolbar,
	Typography
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { browserHistory } from "react-router";
import keycloak from "../utils/keycloak";
import config from "../app.config";
import ErrorMessage from "./children/ErrorMessage";
import { determineUserGroup, getCurrUserInfo } from "../utils/common";
import Gravatar from "react-gravatar";
import { initializeGA } from './analytics';

initializeGA();

global.__base = `${__dirname}/`;

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#1B2D45"
		},
		secondary: {
			main: "#8998AB"
		},
		third: {
			main: "#333333"
		},
		fourth: {
			main: "#eeeeee"
		}
	},
	typography: {
		h1: {
			fontFamily: "'Roboto Condensed',sans-serif"
		},
		h2: {
			fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
		},
		h3: {
			fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
		},
		h4: {
			fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
		},
		h5: {
			fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
		},
		h6: {
			fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
		},
		body1: {
			fontFamily: "'Work Sans',sans-serif",
			fontSize: "14px"
		},
		body2: {
			fontFamily: "'Work Sans',sans-serif",
			fontSize: "12px"
		}
	}
});

const styles = {
	menuCustomWidth: {
		"& li": {
			width: "200px"
		}
	},
	appBar: {
		width: "100%",
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	avatarImg: {
		width: "32px",
		height: "32px",
		borderRadius: "50%"
		// border:"solid 2px #FFFFFF"
	},
	toolBar: {
		minHeight: "48px",
		display: "flex",
		justifyContent: "flex-start"
	},
	smallButton: {
		padding: "6px"
	},
	denseStyle: {
		minHeight: "10px",
		lineHeight: "30px",
		fontSize: "12px"
	},
	status: {
		padding: "6px 16px"
	},
	fontLight: {
		fontSize: "12px",
		color: "#333333",
		fontWeight: 100,
		fontFamily: theme.typography.body1.fontFamily
	},
	fontBold: {
		fontSize: "12px",
		color: "#000000",
		fontWeight: 600,
		fontFamily: theme.typography.body1.fontFamily
	},
	toolBarItem: {
		margin: "auto 20px",
		cursor: "pointer"
	},
	customProgressBar: {
		borderRadius: 5,
		height: 5
	}
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authError: false,
			profileMenuOpen: false,
			viewerMenuOpen: false,
			helpMenuOpen: false,
			anchorEl: null,
			message: "",
			error: "",
			messageOpen: true
		};
		this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
		this.handleViewerMenuOpen = this.handleViewerMenuOpen.bind(this);
		this.handleHelpMenuOpen = this.handleHelpMenuOpen.bind(this);
		this.handleProfileMenuClose = this.handleProfileMenuClose.bind(this);
		this.closeErrorMessage = this.closeErrorMessage.bind(this);
		this.handleViewerMenuClose = this.handleViewerMenuClose.bind(this);
		this.handleHelpMenuClose = this.handleHelpMenuClose.bind(this);
		this.handleKeycloakLogout = this.handleKeycloakLogout.bind(this);
	}

	componentWillMount() {
		// set error message
		this.setState({
			message: this.props.location.query.error
		});
	}

	componentDidMount() {
		// if localhost, immediately get usage
		if (
			config.hostname.includes("localhost") ||
			(this.props.Authorization !== "" && this.props.Authorization !== undefined)
		) {
			this.props.getAllocations();
			this.props.getUsage();
		}
	}

	componentDidUpdate(prevProps) {
		// after immediate login, need to update the usage
		if (
			!config.hostname.includes("localhost") &&
			this.props.Authorization !== prevProps.Authorization &&
			this.props.Authorization !== "" &&
			this.props.Authorization !== undefined
		) {
			this.props.getAllocations();
			this.props.getUsage();
		}
	}

	handleKeycloakLogout() {
		const redirectUri = `${location.origin}/`
		try {
			this.props.logout();
			keycloak.logout({
				redirectUri: redirectUri
			});
		} catch (error) {
			console.error("Logout error", error);
		}
	}

	handleProfileMenuOpen(event) {
		this.setState({
			profileMenuOpen: true,
			anchorEl: event.currentTarget
		});
	}

	handleViewerMenuOpen(event) {
		this.setState({
			viewerMenuOpen: true,
			anchorEl: event.currentTarget
		});
	}

	handleHelpMenuOpen(event) {
		this.setState({
			helpMenuOpen: true,
			anchorEl: event.currentTarget
		});
	}

	handleProfileMenuClose() {
		this.setState({
			profileMenuOpen: false
		});
	}

	closeErrorMessage() {
		this.setState({
			messageOpen: false
		});
	}

	handleViewerMenuClose(event) {
		this.setState({
			viewerMenuOpen: false
		});
	}

	handleHelpMenuClose(event) {
		this.setState({
			helpMenuOpen: false
		});
	}

	render() {
		const { classes } = this.props;
		let username;
		let group;

		let contents = (
			<Button color="inherit" onClick={() => browserHistory.push("/Login")} className={classes.smallButton}>
				Login
			</Button>
		);
		let profileMenu = <></>;
		if (
			config.hostname.includes("localhost") ||
			(this.props.Authorization !== "" && this.props.Authorization !== undefined) ||
			this.props.forbidden // forbidden should stay login
		) {
			const userInfo = getCurrUserInfo();
			group = determineUserGroup(userInfo);

			if (userInfo["preferred_username"] !== undefined) {
				username = userInfo["preferred_username"];
			} else {
				username = config.testUserInfo;
			}

			contents = (
				<IconButton color="inherit" className={classes.smallButton} onClick={this.handleProfileMenuOpen}>
					{userInfo["email"] !== undefined ? (
						<Gravatar className={classes.avatarImg} email={userInfo["email"]} rating="g" />
					) : (
						<AccountCircle fontSize="small" />
					)}
				</IconButton>
			);

			//TODO: My account is a placeholder for now
			profileMenu = (
				<Menu
					anchorEl={this.state.anchorEl}
					anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
					keepMounted
					transformOrigin={{ vertical: "top", horizontal: "center" }}
					open={this.state.profileMenuOpen}
					onClose={this.handleProfileMenuClose}
					getContentAnchorEl={null}
					className={classes.menuCustomWidth}
				>
					<Box className={classes.status}>
						<Typography className={classes.fontLight}>Signed in as</Typography>
						<Typography className={classes.fontBold}>{username}</Typography>
					</Box>
					<Box className={classes.status}>
						<LinearProgress
							variant="determinate"
							className={classes.customProgressBar}
							value={
								((this.props.usage["total_file_size_of_datasets_byte"] ?? 0) /
									this.props.allocations["total_file_size_of_datasets_byte"]) *
								100
							}
						/>
						<Typography className={classes.fontLight} style={{ fontSize: "10px" }}>
							Data {this.props.usage["total_file_size_of_datasets"] ?? 0} of{" "}
							{this.props.allocations["total_file_size_of_datasets"]} used
						</Typography>
					</Box>
					<Box className={classes.status}>
						<LinearProgress
							variant="determinate"
							className={classes.customProgressBar}
							value={
								((this.props.usage["total_file_size_of_hazard_datasets_byte"] ?? 0) /
									this.props.allocations["total_file_size_of_hazard_datasets_byte"]) *
								100
							}
						/>
						<Typography className={classes.fontLight} style={{ fontSize: "10px" }}>
							Hazard {this.props.usage["total_file_size_of_hazard_datasets"] ?? 0} of{" "}
							{this.props.allocations["total_file_size_of_hazard_datasets"]} used
						</Typography>
					</Box>
					<Box className={classes.status}>
						<LinearProgress
							variant="determinate"
							className={classes.customProgressBar}
							value={
								((this.props.usage["total_number_of_dfr3"] ?? 0) /
									this.props.allocations["total_number_of_dfr3"]) *
								100
							}
						/>
						<Typography className={classes.fontLight} style={{ fontSize: "10px" }}>
							DFR3 {this.props.usage["total_number_of_dfr3"] ?? 0} of{" "}
							{this.props.allocations["total_number_of_dfr3"]} used
						</Typography>
					</Box>
					<Divider orientation="horizontal" />
					<MenuItem
						className={classes.denseStyle}
						onClick={() => {
							this.handleProfileMenuClose();
							browserHistory.push("/profile");
						}}
					>
						Profile
					</MenuItem>
					<MenuItem
						className={classes.denseStyle}
						onClick={() => {
							this.handleProfileMenuClose();
						}}
					>
						<Link href={`mailto:${config.mailingList}`} target="_blank" style={{ textDecoration: "none" }}>
							Contact Us
						</Link>
					</MenuItem>
					<MenuItem
						className={classes.denseStyle}
						onClick={() => {
							this.handleProfileMenuClose();
						}}
					>
						<Link href={config.slackInvitationLink} target="_blank" style={{ textDecoration: "none" }}>
							Join Slack
						</Link>
					</MenuItem>
					<MenuItem
						className={classes.denseStyle}
						onClick={() => {
							this.handleProfileMenuClose();
						}}
					>
						<Link href={config.tosURL} target="_blank" style={{ textDecoration: "none" }}>
							Terms of Service
						</Link>
					</MenuItem>
					<MenuItem
						className={classes.denseStyle}
						onClick={() => {
							this.handleProfileMenuClose();
						}}
					>
						<Link href={config.privacyURL} target="_blank" style={{ textDecoration: "none" }}>
							Web Privacy Notice
						</Link>
					</MenuItem>
					<Divider orientation="horizontal" />
					<MenuItem
						className={classes.denseStyle}
						onClick={() => {
							this.handleProfileMenuClose();
							this.handleKeycloakLogout();
						}}
					>
						Log Out
					</MenuItem>
				</Menu>
			);
		}

		let viewerMenu = (
			<Menu
				anchorEl={this.state.anchorEl}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				keepMounted
				transformOrigin={{ vertical: "top", horizontal: "center" }}
				open={this.state.viewerMenuOpen}
				onClose={this.handleViewerMenuClose}
				getContentAnchorEl={null}
			>
				<MenuItem
					className={classes.denseStyle}
					onClick={() => {
						this.handleViewerMenuClose();
						browserHistory.push("/DFR3Viewer");
						fetch("/DFR3Viewer");
					}}
				>
					DFR3 Viewer
				</MenuItem>
				<MenuItem
					className={classes.denseStyle}
					onClick={() => {
						this.handleViewerMenuClose();
						browserHistory.push("/DataViewer");
						fetch("/DataViewer");
					}}
				>
					Data Viewer
				</MenuItem>
				<MenuItem
					className={classes.denseStyle}
					onClick={() => {
						this.handleViewerMenuClose();
						browserHistory.push("/HazardViewer");
						fetch("/HazardViewer");
					}}
				>
					Hazard Viewer
				</MenuItem>
				<MenuItem
					className={classes.denseStyle}
					onClick={() => {
						this.handleViewerMenuClose();
						browserHistory.push("/SemanticViewer");
						fetch("/SemanticViewer");
					}}
				>
					Dataset Type Viewer
				</MenuItem>
			</Menu>
		);

		let helpMenu = (
			<Menu
				anchorEl={this.state.anchorEl}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				keepMounted
				transformOrigin={{ vertical: "top", horizontal: "center" }}
				open={this.state.helpMenuOpen}
				onClose={this.handleHelpMenuClose}
				getContentAnchorEl={null}
			>
				<MenuItem className={classes.denseStyle} onClick={this.handleHelpMenuClose}>
					<Link href="/doc/incore/index.html" target="_blank" style={{ textDecoration: "none" }}>
						IN-CORE Manual
					</Link>
				</MenuItem>
				<MenuItem className={classes.denseStyle} onClick={this.handleHelpMenuClose}>
					<Link href={config.pyIncoreDocUrl} target="_blank" style={{ textDecoration: "none" }}>
						pyIncore Reference
					</Link>
				</MenuItem>
				<MenuItem className={classes.denseStyle} onClick={this.handleHelpMenuClose}>
					<Link href={config.pyIncoreDataDocUrl} target="_blank" style={{ textDecoration: "none" }}>
						pyIncore-data Reference
					</Link>
				</MenuItem>
				<MenuItem className={classes.denseStyle} onClick={this.handleHelpMenuClose}>
					<Link href={config.pyIncoreVizDocUrl} target="_blank" style={{ textDecoration: "none" }}>
						pyIncore-viz Reference
					</Link>
				</MenuItem>
				<MenuItem className={classes.denseStyle} onClick={this.handleHelpMenuClose}>
					<Link href={config.swaggerUrl} target="_blank" style={{ textDecoration: "none" }}>
						Web Service API
					</Link>
				</MenuItem>
			</Menu>
		);

		return (
			<MuiThemeProvider theme={theme}>
				{/*TODO add auto collapse to hamburger once screen is small*/}
				<AppBar position="static" className={classes.appBar}>
					<Toolbar className={classes.toolBar}>
						<Typography className={classes.toolBarItem}>
							<Link href="/" style={{ color: "#ffffff", textDecoration: "none" }}>
								HOME
							</Link>
						</Typography>
						<Typography
							onClick={this.handleHelpMenuOpen}
							className={classes.toolBarItem}
							style={{ verticalAlign: "middle", display: "inline-flex" }}
						>
							User Guides
							<ExpandMoreIcon fontSize="small" />
						</Typography>
						{helpMenu}
						<Typography className={classes.toolBarItem}>
							<Link
								target="_blank"
								style={{ color: "#ffffff", textDecoration: "none" }}
								onClick={() => {
									window.open(config.incoreLab);
									fetch("/jupyterhub");
								}}
							>
								IN-CORE lab
							</Link>
						</Typography>
						<Typography
							onClick={this.handleViewerMenuOpen}
							className={classes.toolBarItem}
							style={{ verticalAlign: "middle", display: "inline-flex" }}
						>
							Web Tools
							<ExpandMoreIcon fontSize="small" />
						</Typography>
						<Typography className={classes.toolBarItem}>
							<Link href="/playbook" style={{ color: "#ffffff", textDecoration: "none" }}>
								Community Resilience Planning
							</Link>
						</Typography>
						{viewerMenu}
						<Typography variant="body1" style={{ flex: 1 }} />
						{this.props.location.pathname === "/playbook" ? null : contents}
						{this.props.location.pathname === "/playbook" ? null : profileMenu}
					</Toolbar>
				</AppBar>
				{/*error message */}
				{this.state.message ? (
					<ErrorMessage
						message={this.state.message}
						error={this.state.error}
						messageOpen={this.state.messageOpen}
						closeErrorMessage={this.closeErrorMessage}
					/>
				) : null}
				<div className={classes.appBar}>{this.props.children}</div>
			</MuiThemeProvider>
		);
	}
}

export default withStyles(styles)(App);
