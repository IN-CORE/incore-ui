import React, { Component } from "react";
import FileContentTable from "./children/FileContentTable";
import NestedInfoTable from "./children/NestedInfoTable";
import Map from "./children/Map";
import SpaceChip from "./children/SpaceChip";
import {
	Button,
	Card,
	CardContent,
	Dialog,
	DialogContent,
	Grid,
	IconButton,
	InputAdornment,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
	TextField,
	Tooltip,
	Typography
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import TableIcon from "@material-ui/icons/TableChart";
import TextIcon from "@material-ui/icons/Description";
import MapIcon from "@material-ui/icons/Map";
import MappingIcon from "@material-ui/icons/CompareArrows";
import ChartIcon from "@material-ui/icons/ShowChart";
import NetworkIcon from "@material-ui/icons/DeviceHub";
import UnknownIcon from "@material-ui/icons/ContactSupport";
import CloseIcon from "@material-ui/icons/Close";
import config from "../app.config";
import { getHeader } from "../actions";
import { browserHistory } from "react-router";
import Pagination from "./children/Pagination";
import DataPerPage from "./children/DataPerPage";
import Space from "./children/Space";
import Version from "./children/Version";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { createMuiTheme, withStyles } from "@material-ui/core/styles/index";
import Cookies from "universal-cookie";
import Datatype from "./children/Datatype";
import ErrorMessage from "./children/ErrorMessage";
import Confirmation from "./children/Confirmation";
import LoadingOverlay from "react-loading-overlay";

const cookies = new Cookies();
const redundantProp = ["deleted", "privileges", "spaces"];
const theme = createMuiTheme();
const styles = {
	root: {
		padding: theme.spacing(4)
	},
	filter: {
		padding: theme.spacing(4),
		overflow: "auto",
		height: "100px"
	},
	main: {
		padding: theme.spacing(4),
		overflow: "auto",
		height: "60vh"
	},
	selectDiv: {
		margin: "auto",
		display: "inline-block",
		width: "33%"
	},
	select: {
		width: "80%",
		fontSize: "12px"
	},
	search: {
		width: "100%",
		fontSize: "12px"
	},
	denseStyle: {
		minHeight: "10px",
		lineHeight: "30px",
		fontSize: "12px"
	},
	metadata: {
		margin: theme.spacing(2),
		overflow: "auto"
	},
	inlineButtons: {
		display: "inline-block",
		margin: "auto 5px"
	},
	hide: {
		display: "none"
	},
	paperFooter: {
		padding: theme.spacing(2),
		borderTop: "1px solid #eeeeee",
		borderBottomLeftRadius: "2px",
		borderBottomRightRadius: "2px"
	},
	paperHeader: {
		padding: theme.spacing(2),
		borderBottom: "1px solid #eeeeee",
		borderTopLeftRadius: "2px",
		borderTopRightRadius: "2px"
	},
	preview: {
		padding: "50px"
	},
	previewClose: {
		display: "inline",
		float: "right"
	},
	metadataCloseButton: {
		float: "right"
	}
};

String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

class SemanticViewer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedSpace: "All",
			dataPerPage: 50,
			searching: false,
			searchText: "",
			authError: false,
			loading:false
		};
	}

	componentWillMount() {
		// check if logged in
		let authorization = cookies.get("Authorization");

		//logged in
		if (
			config.hostname.includes("localhost") ||
			(authorization !== undefined && authorization !== "" && authorization !== null)
		) {
			this.setState(
				{
					authError: false
				},
				function () {
					this.props.getAllSemantics(
						this.state.selectedSpace
					);
				}
			);
		} else {
			this.setState({
				authError: true
			});
		}
	}

	componentDidMount() {
		// reset delete error
		this.props.resetError();
	}

	componentWillReceiveProps(nextProps) {
		this.setState(
			{
				loading:nextProps.loading,
				authError: nextProps.authError
			}
		);
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.deleteError && !prevState.messageOpen) {
			this.setState({ messageOpen: true });
		} else if (!this.props.deleteError && prevState.messageOpen) {
			this.setState({ messageOpen: false });
		}
	}
	render() {
		const { classes } = this.props;

		//list items
		let list_items = "";
		if (this.props.semantics.length > 0)
		{
			return(this.props.semantics);
		}
		else
		{
			return(<h1>hello</h1>);
		}

	}
}


export default withStyles(styles)(SemanticViewer);
