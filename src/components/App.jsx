import React, {Component} from "react";
import {AppBar, Button, IconButton, Link, Menu, MenuItem, Toolbar, Typography,} from "@material-ui/core";
import {createMuiTheme, MuiThemeProvider, withStyles} from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {browserHistory} from "react-router";
import config from "../app.config";
import ErrorMessage from "./children/ErrorMessage";


global.__base = `${__dirname  }/`;

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
	appBar: {
		width: "100%",
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	toolBar: {
		minHeight: "48px",
		display:"flex",
		justifyContent:"flex-start",
	},
	smallButton: {
		padding: "6px"
	},
	denseStyle: {
		minHeight: "10px",
		lineHeight: "30px",
		fontSize: "12px",
	},
	toolBarItem:{
		margin:"auto 20px",
		cursor:"pointer"
	}
};

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			authError: false,
			profileMenuOpen: false,
			viewerMenuOpen:false,
			helpMenuOpen:false,
			anchorEl: null,
			errorMessage:""
		};
		this.logout = this.logout.bind(this);
		this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
		this.handleViewerMenuOpen = this.handleViewerMenuOpen.bind(this);
		this.handleHelpMenuOpen = this.handleHelpMenuOpen.bind(this);
		this.handleProfileMenuClose = this.handleProfileMenuClose.bind(this);
		this.handleViewerMenuClose = this.handleViewerMenuClose.bind(this);
		this.handleHelpMenuClose = this.handleHelpMenuClose.bind(this);
	}

	componentWillMount() {
		// set error message
		this.setState({
			errorMessage: this.props.location.query.error
		});
	}

	logout() {
		this.props.logout();
		browserHistory.push("/");
		this.setState({
			profileMenuOpen:false,
		});
	}

	handleProfileMenuOpen(event) {
		this.setState({
			profileMenuOpen: true,
			anchorEl: event.currentTarget
		});
	}

	handleViewerMenuOpen(event){
		this.setState({
			viewerMenuOpen: true,
			anchorEl:event.currentTarget
		});
	}

	handleHelpMenuOpen(event){
		this.setState({
			helpMenuOpen:true,
			anchorEl: event.currentTarget
		});
	}

	handleProfileMenuClose() {
		this.setState({
			profileMenuOpen:false,
		});
	}

	handleViewerMenuClose(event){
		this.setState({
			viewerMenuOpen: false,
		});
	}

	handleHelpMenuClose(event){
		this.setState({
			helpMenuOpen:false,
		});
	}

	render() {
		const {classes} = this.props;

		let contents = <Button color="inherit" href={"login"} className={classes.smallButton}>Login</Button>;
		if (process.env.DEPLOY_ENV === "local" || (this.props.Authorization !== "" && this.props.Authorization !== undefined)) {
			contents = (<IconButton color="inherit" className={classes.smallButton} onClick={this.handleProfileMenuOpen}>
				<AccountCircle fontSize="small"/></IconButton>);
		}

		//TODO: My account is a placeholder for now
		let profileMenu = (
			<Menu
				anchorEl = {this.state.anchorEl}
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
				keepMounted
				transformOrigin={{ vertical: "top", horizontal: "center" }}
				open={this.state.profileMenuOpen}
				onClose={this.handleProfileMenuClose}
				getContentAnchorEl={null}
			>
				{/*<MenuItem className={classes.denseStyle}>My account</MenuItem>*/}
				<MenuItem className={classes.denseStyle} onClick={this.logout}>Log Out</MenuItem>
			</Menu>
		);

		let viewerMenu = (
			<Menu
				anchorEl = {this.state.anchorEl}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				keepMounted
				transformOrigin={{ vertical: "top", horizontal: "center" }}
				open={this.state.viewerMenuOpen}
				onClose={this.handleViewerMenuClose}
				getContentAnchorEl={null}
			>
				<MenuItem className={classes.denseStyle}
						  onClick={()=>{browserHistory.push("/DFR3Viewer");}}>DFR3 Viewer</MenuItem>
				<MenuItem className={classes.denseStyle}
						  onClick={()=>{browserHistory.push("/DataViewer");}}>Data Viewer</MenuItem>
				<MenuItem className={classes.denseStyle}
						  onClick={()=>{browserHistory.push("/HazardViewer");}}>Hazard Viewer</MenuItem>
			</Menu>
		);

		let helpMenu = (
			<Menu
				anchorEl = {this.state.anchorEl}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				keepMounted
				transformOrigin={{ vertical: "top", horizontal: "center" }}
				open={this.state.helpMenuOpen}
				onClose={this.handleHelpMenuClose}
				getContentAnchorEl={null}
			>
				<MenuItem className={classes.denseStyle}>
					<Link href="/doc/incore/index.html" target="_blank" style={{textDecoration:"none"}}>
						IN-CORE Manual
					</Link>
				</MenuItem>
				<MenuItem className={classes.denseStyle}>
					<Link href={config.pyIncoreDocUrl} target="_blank" style={{textDecoration:"none"}}>
						pyIncore Reference
					</Link>
				</MenuItem>
				<MenuItem className={classes.denseStyle}>
					<Link href={config.pyIncoreVizDocUrl} target="_blank" style={{textDecoration:"none"}}>
						pyIncore-viz Reference
					</Link>
				</MenuItem>
				<MenuItem className={classes.denseStyle}>
					<Link href={config.swaggerUrl} target="_blank" style={{textDecoration:"none"}}>
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
							<Link href="/" style={{color:"#ffffff", textDecoration:"none"}}>HOME</Link></Typography>
						<Typography onClick={this.handleHelpMenuOpen} className={classes.toolBarItem}
							style={{verticalAlign: "middle", display:"inline-flex"}}>
							User Guides<ExpandMoreIcon fontSize="small"/></Typography>
						{helpMenu}
						<Typography className={classes.toolBarItem}>
							<Link href={config.incoreLab} target="_blank" style={{color:"#ffffff", textDecoration:"none"}}>
								IN-CORE lab</Link></Typography>
						<Typography onClick={this.handleViewerMenuOpen} className={classes.toolBarItem}
							style={{verticalAlign: "middle", display:"inline-flex"}}>
							Web Tools<ExpandMoreIcon fontSize="small"/></Typography>
						{viewerMenu}

						<Typography variant="body1" style={{flex: 1}} />
						{contents}
						{profileMenu}
					</Toolbar>
				</AppBar>
				{/*error message */}
				{
					this.state.errorMessage ?
						<ErrorMessage error={this.state.errorMessage}/> : null
				}
				<div className={classes.appBar}>
					{this.props.children}
				</div>
			</MuiThemeProvider>
		);
	}

}

export default withStyles(styles)(App);
