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
	Paper, TableBody, TableCell, TableRow,
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
		width: "50%"
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
	semanticWindow: {
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
	semanticWindowCloseButton: {
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
			loading:false,
			selectedDataTyoe:"",
			pageNumber: 1,
			semanticWindowClosed: true,
			previewLoading:true,
			semanticJSON: {},
		};

		// this.onClickDataset = this.onClick.bind(this);
		this.handleSpaceSelection = this.handleSpaceSelection.bind(this);
		this.changeDataPerPage = this.changeDataPerPage.bind(this);
		this.generateSemanticTable = this.generateSemanticTable.bind(this);
		// this.handleKeyPressed = this.handleKeyPressed.bind(this);
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
					this.props.getAllSpaces();
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

	handleSpaceSelection(event) {
		this.setState(
			{
				selectedSpace: event.target.value
			},
			function () {
				this.props.getAllSemantics(
					this.state.selectedSpace
				);
			}
		);
	}
	changeDataPerPage(event) {
		this.setState(
			{
				dataPerPage: event.target.value
			},
			function () {
				// Code to limit amount of data spaces
			}
		);
	}


	onClickDataset = async (semantic) => {
		this.setState({
			selectedDataset: semantic,
			semanticWindowClosed: false,
			previewLoading: true
		});

		try {
			// Replace 'YOUR_JSON_URL' with the actual URL from which you want to fetch JSON data
			let endpoint = `${config.semanticService}/${semantic}`;
			const response = await fetch(endpoint, { mode: "cors", headers: getHeader(), contentType: "application/json" });
			const jsonData = await response.json();
			// Once the JSON data is fetched, you can use it as needed
			console.log("Fetched JSON data:", jsonData);
			this.setState({
				previewLoading: false,
				semanticJSON: jsonData[0]
			});
		} catch (error) {
			console.error("Error fetching JSON data:", error);
			this.setState({
				previewLoading: false
			});
		}
	};


	closeSemanticWindow() {
		this.setState({
			semanticWindowClosed: true,
			previewLoading:false,
			semanticJSON: {}
		});
	}

	generateSemanticTable(){
		if (this.state.previewLoading) {
			return null;
		}
		return this.state.semanticJSON["tableSchema"]["columns"].map((field) => {
			if (field["name"] === '') {
				return null;
			}
			return (
				<TableRow key={field["name"]}>
					<TableCell component="th" scope="row">
						{field["name"]}
					</TableCell>
					<TableCell align="right">{field["titles"]}</TableCell>
					<TableCell align="right">{field["datatype"]}</TableCell>
					<TableCell align="right">{field["qudt:unit"]}</TableCell>
					<TableCell align="right">
						{field["required"] === '' ? "False" : "True"}
					</TableCell>
				</TableRow>
			);
		});
	}

	render() {
		const { classes } = this.props;

		//list items
		let list_items = "";
		list_items = this.props.semantics.map((semantic,) => {
			return (
				<ListItem
					button
					onClick={() => {
						this.onClickDataset(semantic);
					}}
					// selected={semantic.id === this.state.semantic.id}
				>
					<ListItemText primary={`${semantic}`} />
					<SpaceChip item={semantic} selectedItem={this.state.selectedSemantic} />
				</ListItem>);
		});

		if (this.state.authError) {
			browserHistory.push("/login?origin=SemanticViewer");
			return null;
		} else {
			return (
				<div className={classes.root}>
					<Grid container spacing={4}>
						<Grid item lg={6} sm={6} xl={6} xs={12}>
							<Paper variant="outlined" className={classes.filter}>
								<div className={classes.selectDiv}>
									<Space
										selectedSpace={this.state.selectedSpace}
										spaces={this.props.spaces}
										handleSpaceSelection={this.handleSpaceSelection}
									/>
								</div>
								<div className={classes.selectDiv}>
									<DataPerPage
										dataPerPage={this.state.dataPerPage}
										changeDataPerPage={this.changeDataPerPage}
									/>
								</div>
							</Paper>
						</Grid>
						<Grid item lg={6} sm={6} xl={6} xs={12}>
							<Paper variant="outlined" className={classes.filter}>
								<Typography variant="h6">Search all</Typography>
								<TextField
									variant="outlined"
									label="Search"
									// onKeyPress={this.handleKeyPressed}
									value={this.state.searchText}
									onChange={(e) => {
										this.setState({ searchText: e.target.value });
									}}
									// InputProps={{
									// 	endAdornment: (
									// 		<InputAdornment position="end">
									// 			<IconButton onClick={this.clickSearch}>
									// 				<SearchIcon fontSize="small" />
									// 			</IconButton>
									// 		</InputAdornment>
									// 	),
									// 	style: { fontSize: "12px" }
									// }}
									className={classes.search}
									margin="dense"
								/>
							</Paper>
						</Grid>
						<Grid
							item
							lg={this.state.selectedDataset && !this.state.semanticWindowClosed ? 4 : 12}
							md={this.state.selectedDataset && !this.state.semanticWindowClosed ? 4 : 12}
							xl={this.state.selectedDataset && !this.state.semanticWindowClosed ? 4 : 12}
							xs={12}
						>
							<LoadingOverlay active={this.state.loading} spinner text="Loading ...">
								<Paper variant="outlined" className={classes.main}>
									<div className={classes.paperHeader}>
										<Typography variant="subtitle1">Dataset</Typography>
									</div>
									<List component="nav">{list_items}</List>
									<div className={classes.paperFooter}>
										<Pagination
											pageNumber={this.state.pageNumber}
											data={list_items}
											dataPerPage={this.state.dataPerPage}
											previous={this.previous}
											next={this.next}
										/>
									</div>
								</Paper>
							</LoadingOverlay>
						</Grid>
						<Grid item lg={8} md={8} xl={8} xs={12}
							  className={this.state.semanticWindowClosed ? classes.hide : null}>
							<Paper variant="outlined" className={classes.main}>
								<IconButton
									aria-label="Close"
									onClick={() => this.closeSemanticWindow()}
									className={classes.semanticWindowCloseButton}
								>
									<CloseIcon fontSize="small" />
								</IconButton>
								<div className={classes.paperHeader}>
									<Typography variant="subtitle1">Semantic</Typography>
								</div>
								<div className={classes.metadata}>
									<LoadingOverlay active={this.state.previewLoading} spinner text="Loading ...">

										<TableBody>
											{
												this.generateSemanticTable()
											}
										</TableBody>
									</LoadingOverlay>
								</div>
							</Paper>
						</Grid>
					</Grid>
				</div>
			);
		}
	}
}


export default withStyles(styles)(SemanticViewer);
