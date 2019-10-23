import React, {Component} from "react";
import {
	AppBar,
	Avatar,
	Button,
	Collapse,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Menu,
	MenuItem,
	Toolbar,
	Typography
} from "@material-ui/core";
import {createMuiTheme, MuiThemeProvider, withStyles} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FragilityViewerIcon from "@material-ui/icons/ShowChart";
import DataViewerIcon from "@material-ui/icons/Folder";
import HazardViewerIcon from "@material-ui/icons/Warning";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CloseIcon from "@material-ui/icons/Close";
import {browserHistory} from "react-router";
import {readCredentials} from "../actions";
import config from "../app.config";


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

const drawerWidth = 350;
const styles = {
	appBar: {
		width: "100%",
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	toolBar: {
		minHeight: "48px"
	},
	menuButton: {
		marginRight: 36,
		padding: "6px"
	},
	smallButton: {
		padding: "6px"
	},
	hide: {
		display: "none",
	},
	drawerPaper: {
		backgroundColor: "#ffffff",
		width: drawerWidth,
		flexShrink: 0,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
	denseStyle: {
		minHeight: "10px",
		lineHeight: "30px",
		fontSize: "12px",
	},
};

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			authError: false,
			drawerOpen: false,
			collapseOpen: true,
			profileMenuOpen: false,
			anchorEl: null
		};
		this.logout = this.logout.bind(this);
		this.toggleDrawer = this.toggleDrawer.bind(this);
		this.handleCollapse = this.handleCollapse.bind(this);
		this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
		this.handleProfileMenuClose = this.handleProfileMenuClose.bind(this);
	}

	componentWillMount() {
		let {query} = this.props.location;
		if (Object.keys(query).length > 0) {
			readCredentials(query);
			this.props.router.push(window.location.pathname);
		}
	}

	logout() {
		this.props.logout();
		browserHistory.push(config.baseUrl);
		this.setState({
			profileMenuOpen:false,
		});
	}

	toggleDrawer(event) {
		this.setState(prevState => ({
			drawerOpen: !prevState.drawerOpen
		}));
	}

	handleCollapse() {
		this.setState(prevState => ({
			collapseOpen: !prevState.collapseOpen
		}));
	}

	handleProfileMenuOpen(event) {
		this.setState({
			profileMenuOpen: true,
			anchorEl: event.currentTarget
		});
	}

	handleProfileMenuClose() {
		this.setState({
			profileMenuOpen:false,
		});
	}


	render() {
		const {classes} = this.props;

		let contents = (<Button color="inherit" href={`${config.urlPrefix}/login`} className={classes.smallButton}>
			Login</Button>);

		if (this.props.Authorization !== "" && this.props.Authorization !== undefined) {
			contents = (<IconButton color="inherit" className={classes.smallButton} onClick={this.handleProfileMenuOpen}>
				<AccountCircle fontSize="small"/></IconButton>);
		}

		//TODO: My account is a placeholder for now
		let profileMenu = (
			<Menu
				anchorEl = {this.state.anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				keepMounted
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={this.state.profileMenuOpen}
				onClose={this.handleProfileMenuClose}
			>
				<MenuItem className={classes.denseStyle}>My account</MenuItem>
				<MenuItem className={classes.denseStyle} onClick={this.logout}>Log Out</MenuItem>
			</Menu>
		);

		let sideList = (
			<List subheader={
				<ListSubheader component="div" color="inherit">
					Navigation
				</ListSubheader>
			}>
				<ListItem button component="a" key="about" href={`${config.urlPrefix}/`}>
					<ListItemAvatar><Avatar src="/public/resilience-logo.png"/></ListItemAvatar>
					<ListItemText primary="About IN-CORE"/>
				</ListItem>
				<ListItem button component="a" key="pyIncore"
						  href="/doc/pyincore/index.html" target="_blank">
					<ListItemAvatar><Avatar src="/public/python-logo.png"/></ListItemAvatar>
					<ListItemText primary="pyIncore"/>
				</ListItem>
				<ListItem button component="a" key="services" href="/doc/api"
						  target="_blank">
					<ListItemAvatar><Avatar src="/public/swagger-logo.png"/></ListItemAvatar>
					<ListItemText primary="IN-CORE Web Service API"/>
				</ListItem>
				<ListItem button component="a" key="lab" href="https://incore-lab.ncsa.illinois.edu"
						  target="_blank">
					<ListItemAvatar><Avatar src="/public/jupyter-logo.png"/></ListItemAvatar>
					<ListItemText primary="IN-CORE lab"/>
				</ListItem>
				<ListItem button key="webapp" onClick={this.handleCollapse}>
					<ListItemAvatar><Avatar src="/public/webapp-logo.png"/></ListItemAvatar>
					<ListItemText primary="IN-CORE Web Tools"/>
					{this.state.collapseOpen ? <ExpandLess/> : <ExpandMore/>}
				</ListItem>
				<Collapse in={this.state.collapseOpen} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem button component="a" href={`${config.urlPrefix}/FragilityViewer`}
								  className={classes.nested}>
							<ListItemIcon><FragilityViewerIcon/></ListItemIcon>
							<ListItemText primary="Fragility Explorer"/>
						</ListItem>
						<ListItem button component="a" href={`${config.urlPrefix}/DataViewer`}
								  className={classes.nested}>
							<ListItemIcon><DataViewerIcon/></ListItemIcon>
							<ListItemText primary="Data Explorer"/>
						</ListItem>
						<ListItem button component="a" href={`${config.urlPrefix}/HazardViewer`}
								  className={classes.nested}>
							<ListItemIcon><HazardViewerIcon/></ListItemIcon>
							<ListItemText primary="Hazard Explorer"/>
						</ListItem>
					</List>
				</Collapse>
			</List>
		);

		return (
			<MuiThemeProvider theme={theme}>
				<AppBar position="static"
						className={this.state.drawerOpen ? classes.appBarShift : classes.appBar}>
					<Toolbar className={classes.toolBar}>
						<IconButton edge="start" color="inherit" aria-label="Open drawer"
									onClick={this.toggleDrawer} className={classes.menuButton}>
							{this.state.drawerOpen ? <CloseIcon fontSize="small"/> : <MenuIcon fontSize="small"/>}
						</IconButton>
						<Typography variant="body1" style={{flex: 1}}></Typography>
						{contents}
						{profileMenu}
					</Toolbar>
				</AppBar>
				<Drawer variant="persistent" open={this.state.drawerOpen} onClose={this.toggleDrawer}
						classes={{paper: classes.drawerPaper}}>
					{sideList}
				</Drawer>
				<div className={this.state.drawerOpen ? classes.appBarShift : classes.appBar}>
					{this.props.children}
				</div>
			</MuiThemeProvider>
		);
	}

}

export default withStyles(styles)(App);
