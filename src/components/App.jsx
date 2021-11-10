import React, {Component} from "react";
import {
	AppBar,
	Button,
	Divider,
	IconButton,
	LinearProgress,
	Link,
	Menu,
	MenuItem,
	Box,
	Toolbar,
	Typography,
} from "@material-ui/core";
import {createMuiTheme, MuiThemeProvider, withStyles} from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {browserHistory} from "react-router";
import config from "../app.config";
import ErrorMessage from "./children/ErrorMessage";
import {getCurrUserInfo, determineUserGroup} from "../utils/common";
import Gravatar from "react-gravatar";
import EditIcon from "@material-ui/icons/Edit";


global.__base = `${__dirname}/`;

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#18381b"
		},
		secondary: {
			main: "#e8a114"
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
	},
});

const styles = {
	menuCustomWidth:{
		"& li":{
			width:"200px"
		}
	},
	appBar: {
		width: "100%",
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	avatarImg:{
		width: "32px",
		height: "32px",
		borderRadius: "50%",
		// border:"solid 2px #FFFFFF"
	},
	toolBar: {
		minHeight: "48px",
		display: "flex",
		justifyContent: "flex-start",
	},
	smallButton: {
		padding: "6px"
	},
	denseStyle: {
		minHeight: "10px",
		lineHeight: "30px",
		fontSize: "12px",
	},
	status:{
		padding:"6px 16px"
	},
	fontLight:{
		fontSize: "12px",
		color:"#333333",
		fontWeight:100,
		fontFamily: theme.typography.body1.fontFamily,
	},
	fontBold:{
		fontSize: "12px",
		color:"#000000",
		fontWeight:600,
		fontFamily: theme.typography.body1.fontFamily,
	},
	toolBarItem: {
		margin: "auto 20px",
		cursor: "pointer"
	},
	customProgressBar:{
		borderRadius:5,
		height:5,
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
			errorMessage:"",
			messageOpen: true,
		};
		this.logout = this.logout.bind(this);
		this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
		this.handleViewerMenuOpen = this.handleViewerMenuOpen.bind(this);
		this.handleHelpMenuOpen = this.handleHelpMenuOpen.bind(this);
		this.handleProfileMenuClose = this.handleProfileMenuClose.bind(this);
		this.closeErrorMessage = this.closeErrorMessage.bind(this);
		this.handleViewerMenuClose = this.handleViewerMenuClose.bind(this);
		this.handleHelpMenuClose = this.handleHelpMenuClose.bind(this);
	}

	componentWillMount() {
		// set error message
		this.setState({
			errorMessage: this.props.location.query.error
		});
	}
	componentDidMount(){
		// if localhost, immediately get usage
		if (config.hostname.includes("localhost") ||
			( this.props.Authorization !== "" && this.props.Authorization !== undefined)) {
			this.props.getDatasetUsage();
			this.props.getHazardUsage();
		}
	}

	componentDidUpdate(prevProps) {
		// after immediate login, need to update the usage
		if (!config.hostname.includes("localhost") && (
			this.props.Authorization !== prevProps.Authorization
			&& this.props.Authorization !== ""
			&& this.props.Authorization !== undefined)) {
			this.props.getDatasetUsage();
			this.props.getHazardUsage();
		}
	}

	logout() {
		this.props.logout();
		browserHistory.push("/");
		this.setState({
			profileMenuOpen: false,
		});
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
			profileMenuOpen: false,
		});
	}

	closeErrorMessage() {
		this.setState({
			messageOpen: false
		});
	}

	handleViewerMenuClose(event) {
		this.setState({
			viewerMenuOpen: false,
		});
	}

	handleHelpMenuClose(event) {
		this.setState({
			helpMenuOpen: false,
		});
	}

	render() {
		const {classes} = this.props;
		let username;
		let group;

		let contents = <Button color="inherit" href={"login"} className={classes.smallButton}>Login</Button>;
		let profileMenu = <></>;
		if (config.hostname.includes("localhost") || (this.props.Authorization !== "" && this.props.Authorization !== undefined)) {
			const userInfo = getCurrUserInfo();
			group = determineUserGroup(userInfo);

			if (userInfo["preferred_username"] !== undefined) {
				username = userInfo["preferred_username"];
			} else {
				username = config.testUserInfo;
			}

			contents = (
				<IconButton color="inherit" className={classes.smallButton} onClick={this.handleProfileMenuOpen}>
					{
						userInfo["email"] !== undefined ?
							<Gravatar className={classes.avatarImg} email={userInfo["email"]}
								  rating="g"/>
							:
							<AccountCircle fontSize="small"/>
					}
				</IconButton>);

			//TODO: My account is a placeholder for now
			profileMenu = (
				<Menu
					anchorEl={this.state.anchorEl}
					anchorOrigin={{vertical: "bottom", horizontal: "left"}}
					keepMounted
					transformOrigin={{vertical: "top", horizontal: "center"}}
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
						<LinearProgress variant="determinate" className={classes.customProgressBar}
							value={this.props.datasetUsage["total_file_size_byte"] / config.maxUsage[group]["datasetUsage"]["fileSizeByte"] * 100}/>
						<Typography className={classes.fontLight} style={{fontSize: "10px"}}>
							Data {this.props.datasetUsage["total_file_size"]} of {config.maxUsage[group]["datasetUsage"]["fileSize"]} used
						</Typography>
					</Box>
					<Box className={classes.status}>
						<LinearProgress variant="determinate" className={classes.customProgressBar}
							value={this.props.hazardUsage["total_file_size_byte"] / config.maxUsage[group]["hazardUsage"]["fileSizeByte"] * 100}/>
						<Typography className={classes.fontLight} style={{fontSize: "10px"}}>
							Hazard {this.props.hazardUsage["total_file_size"]} of {config.maxUsage[group]["hazardUsage"]["fileSize"]} used
						</Typography>
					</Box>
					<Divider orientation="horizontal"/>
					<MenuItem className={classes.denseStyle}
							  onClick={() => {
								  this.handleProfileMenuClose();
								  browserHistory.push("/profile");
							  }}>
						Profile</MenuItem>
					<MenuItem className={classes.denseStyle} onClick={() => {this.handleProfileMenuClose();}}>
						<Link href={`mailto:${config.mailingList}`} target="_blank"
							  style={{textDecoration: "none"}}>
							Contact Us
						</Link>
					</MenuItem>
					<MenuItem className={classes.denseStyle} onClick={() => {this.handleProfileMenuClose();}}>
						<Link href={config.tosURL} target="_blank" style={{textDecoration:"none"}}>
							Terms of Service
						</Link>
					</MenuItem>
					<Divider orientation="horizontal"/>
					<MenuItem className={classes.denseStyle} onClick={() => {
						this.handleProfileMenuClose();
						this.logout();
					}}>Log Out</MenuItem>
					{/*<Divider orientation="horizontal"/>*/}
					{/*<Box className={classes.status}*/}
					{/*	 style={{display: "flex", justifyContent: "space-between", marginTop: "5px"}}>*/}
					{/*	<Link href={config.privacyURL} className={classes.fontLight} target="_blank">*/}
					{/*		Privacy Policy*/}
					{/*	</Link>*/}
					{/*	<Link href={config.tosURL} className={classes.fontLight} target="_blank">*/}
					{/*		Terms of Service*/}
					{/*	</Link>*/}
					{/*</Box>*/}
				</Menu>
			);
		}

		let viewerMenu = (
			<Menu
				anchorEl={this.state.anchorEl}
				anchorOrigin={{vertical: "bottom", horizontal: "center"}}
				keepMounted
				transformOrigin={{vertical: "top", horizontal: "center"}}
				open={this.state.viewerMenuOpen}
				onClose={this.handleViewerMenuClose}
				getContentAnchorEl={null}
			>
				<MenuItem className={classes.denseStyle}
						  onClick={() => {
							  this.handleViewerMenuClose();
							  browserHistory.push("/DFR3Viewer");
						  }}>DFR3 Viewer</MenuItem>
				<MenuItem className={classes.denseStyle}
						  onClick={() => {
							  this.handleViewerMenuClose();
							  browserHistory.push("/DataViewer");
						  }}>Data Viewer</MenuItem>
				<MenuItem className={classes.denseStyle}
						  onClick={() => {
							  this.handleViewerMenuClose();
							  browserHistory.push("/HazardViewer");
						  }}>Hazard Viewer</MenuItem>
			</Menu>
		);

		let helpMenu = (
			<Menu
				anchorEl={this.state.anchorEl}
				anchorOrigin={{vertical: "bottom", horizontal: "center"}}
				keepMounted
				transformOrigin={{vertical: "top", horizontal: "center"}}
				open={this.state.helpMenuOpen}
				onClose={this.handleHelpMenuClose}
				getContentAnchorEl={null}
			>
				<MenuItem className={classes.denseStyle} onClick={this.handleHelpMenuClose}>
					<Link href="/doc/incore/index.html" target="_blank" style={{textDecoration: "none"}}>
						IN-CORE Manual
					</Link>
				</MenuItem>
				<MenuItem className={classes.denseStyle} onClick={this.handleHelpMenuClose}>
					<Link href={config.pyIncoreDocUrl} target="_blank" style={{textDecoration: "none"}}>
						pyIncore Reference
					</Link>
				</MenuItem>
				<MenuItem className={classes.denseStyle} onClick={this.handleHelpMenuClose}>
					<Link href={config.pyIncoreDataDocUrl} target="_blank" style={{textDecoration: "none"}}>
						pyIncore-data Reference
					</Link>
				</MenuItem>
				<MenuItem className={classes.denseStyle} onClick={this.handleHelpMenuClose}>
					<Link href={config.pyIncoreVizDocUrl} target="_blank" style={{textDecoration: "none"}}>
						pyIncore-viz Reference
					</Link>
				</MenuItem>
				<MenuItem className={classes.denseStyle} onClick={this.handleHelpMenuClose}>
					<Link href={config.swaggerUrl} target="_blank" style={{textDecoration: "none"}}>
						Web Service API
					</Link>
				</MenuItem>
			</Menu>
		);

		return (
			<MuiThemeProvider theme={theme}>
				{/*TODO add auto collapse to hamburger once screen is small*/}
				<AppBar position="static"
					className={classes.appBar}>
					<Toolbar className={classes.toolBar}>
						<Typography className={classes.toolBarItem}>
							<Link href="/" style={{color: "#ffffff", textDecoration: "none"}}>HOME</Link></Typography>
						<Typography onClick={this.handleHelpMenuOpen} className={classes.toolBarItem}
							style={{verticalAlign: "middle", display: "inline-flex"}}>
							User Guides<ExpandMoreIcon fontSize="small"/></Typography>
						{helpMenu}
						<Typography className={classes.toolBarItem}>
							<Link href={config.incoreLab} target="_blank"
								  style={{color: "#ffffff", textDecoration: "none"}}>
								IN-CORE lab</Link></Typography>
						<Typography onClick={this.handleViewerMenuOpen} className={classes.toolBarItem}
							style={{verticalAlign: "middle", display: "inline-flex"}}>
							Web Tools<ExpandMoreIcon fontSize="small"/></Typography>
						{viewerMenu}
						<Typography variant="body1" style={{flex: 1}}/>
						{contents}
						{profileMenu}
					</Toolbar>
				</AppBar>
				{/*error message */}
				{
					this.state.errorMessage ?
						<ErrorMessage error={this.state.errorMessage} messageOpen={this.state.messageOpen} closeErrorMessage={this.closeErrorMessage}/> : null
				}
				<div className={classes.appBar}>
					{this.props.children}
				</div>
			</MuiThemeProvider>
		);
	}

}

export default withStyles(styles)(App);
