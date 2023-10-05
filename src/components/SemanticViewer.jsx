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
	Paper, Table, TableBody, TableCell, TableHead, TableRow,
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
import semantics from "../reducers/semantics";

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
	},
	headerCell: {
		fontWeight: "bold",
		fontSize: "1.1em",
		backgroundColor: "#f5f5f5"
	},
	centredText: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
	},
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
			offset:0,
			searching: false,
			searchText: "",
			registeredSearchText: "",
			authError: false,
			loading:false,
			selectedSemanticType: null,
			pageNumber: 1,
			semanticWindowClosed: true,
		};

		this.onClickSemanticType = this.onClickSemanticType.bind(this);
		this.downloadTemplate = this.downloadTemplate.bind(this);
		this.handleSpaceSelection = this.handleSpaceSelection.bind(this);
		this.changeDataPerPage = this.changeDataPerPage.bind(this);
		this.generateSemanticTable = this.generateSemanticTable.bind(this);
		this.setSearchState = this.setSearchState.bind(this);
		this.clickSearch = this.clickSearch.bind(this);
		this.handleKeyPressed = this.handleKeyPressed.bind(this);
		this.previous = this.previous.bind(this);
		this.next = this.next.bind(this);
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
						this.state.selectedSpace,
						this.state.dataPerPage,
						this.state.offset
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
				loading: nextProps.loading,
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
				selectedSpace: event.target.value,
				semanticWindowClosed: true,
				pageNumber:1,
				offset:0,
				selectedSemanticType: null,
				searching: false,
				searchText: ""
			},
			function () {
				this.props.getAllSemantics(
					this.state.selectedSpace,
					this.state.dataPerPage,
					this.state.offset
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
				if (this.state.searching) {
					this.props.searchAllSemantics(
						this.state.registeredSearchText,
						this.state.dataPerPage,
						this.state.offset
					);
				} else {
					this.props.getAllSemantics(
						this.state.selectedSpace,
						this.state.dataPerPage,
						this.state.offset
					);
				}
			}
		);
	}


	onClickSemanticType = async (semanticType) => {
		this.setState({
			selectedSemanticType: semanticType,
			semanticWindowClosed: false,
		});
	};

	async downloadTemplate() {
		if (this.state.selectedSemanticType !== null || this.state.selectedSemanticType !== undefined) {
			let semanticName = this.state.selectedSemanticType['dc:title'];

			let url = `${config.semanticServiceType}/${semanticName}/template`;
			semanticName = semanticName.replace(":", "_")
			let response = await fetch(url, { mode: "cors", headers: await getHeader() });
	
			if (response.ok) {
				let blob = await response.blob();
				if (window.navigator.msSaveOrOpenBlob) {
					window.navigator.msSaveBlob(blob);
				} else {
					var file = window.URL.createObjectURL(blob);
					window.location.assign(file)
				}
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				this.setState({
					authError: true
				});
			} else {
				this.setState({
					authError: false
				});
			}
		}
	}


	closeSemanticWindow() {
		this.setState({
			semanticWindowClosed: true,
			selectedSemanticType: null
		});
	}

	async setSearchState() {
		this.setState({
			registeredSearchText: this.state.searchText,
			searching: true,
			selectedSemanticType: null,
			semanticWindowClosed: true,
			offset:0,
			pageNumber:1
		});
	}

	async clickSearch() {
		await this.setSearchState();
		this.props.searchAllSemantics(this.state.registeredSearchText, this.state.dataPerPage, this.state.offset);
	}

	async handleKeyPressed(event) {
		if (event.charCode === 13) {
			// enter
			event.preventDefault();
			await this.setSearchState();
			this.props.searchAllSemantics(this.state.registeredSearchText, this.state.dataPerPage, this.state.offset);
		}
	}

	next(){
		this.setState(
			{
				offset: this.state.pageNumber * this.state.dataPerPage,
				pageNumber: this.state.pageNumber + 1,
				semanticWindowClosed: true,
				selectedSemanticType: null
			},
			function () {
				if (this.state.searching) {
					this.props.searchAllSemantics(
						this.state.registeredSearchText,
						this.state.dataPerPage,
						this.state.offset
					);
				} else {
					this.props.getAllSemantics(
						this.state.selectedSpace,
						this.state.dataPerPage,
						this.state.offset
					);
				}
			}
		);
	}

	previous() {
		this.setState(
			{
				offset: (this.state.pageNumber - 2) * this.state.dataPerPage,
				pageNumber: this.state.pageNumber - 1,
				semanticWindowClosed: true,
				selectedSemanticType: null
			},
			function () {
				if (this.state.searching) {
					this.props.searchAllSemantics(
						this.state.registeredSearchText,
						this.state.dataPerPage,
						this.state.offset
					);
				} else {
					this.props.getAllSemantics(
						this.state.selectedSpace,
						this.state.dataPerPage,
						this.state.offset
					);
				}
			}
		);
	}
	generateSemanticTable(){
		if (this.state.selectedSemanticType === null){
			return;
		}
		const { classes } = this.props;
		let row_count = 0;
		let rows = this.state.selectedSemanticType["tableSchema"]["columns"].map((field) => {
			if (field["name"] === "") {
				return null;
			}
			row_count = row_count + 1;
			return (
				<TableRow key={field["name"]}>
					<TableCell component="th" scope="row">
						{field["name"]}
					</TableCell>
					<TableCell align="right">{field["titles"]}</TableCell>
					<TableCell align="right">{field["datatype"]}</TableCell>
					<TableCell align="right">{field["qudt:unit"]}</TableCell>
					<TableCell align="right">
						{field["required"] === "" ? "False" : "True"}
					</TableCell>
				</TableRow>
			);
		});

		if (row_count !== 0) {
			return (
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell className={classes.headerCell}>Name</TableCell>
							<TableCell className={classes.headerCell} align="right">Titles</TableCell>
							<TableCell className={classes.headerCell} align="right">Datatype</TableCell>
							<TableCell className={classes.headerCell} align="right">Unit</TableCell>
							<TableCell className={classes.headerCell} align="right">Required</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>{rows}</TableBody>
				</Table>
			);
		}
		else{
			return (
				<Typography variant="h6" className={classes.centredText}>
					No Semantic Schema available
				</Typography>
			);
		}
	}

	render() {
		const { classes } = this.props;

		//list items
		let list_items = "";
		list_items = this.props.semantics.map((semantic) => {
			return (
				<ListItem
					button
					onClick={() => {
						this.onClickSemanticType(semantic);
					}}
					selected={semantic['dc:title'] === (this.state.selectedSemanticType === null ? null : this.state.selectedSemanticType['dc:title'])}
				>
					<ListItemText primary={`${semantic['dc:title']}`} />
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
									onKeyPress={this.handleKeyPressed}
									value={this.state.searchText}
									onChange={(e) => {
										this.setState({ searchText: e.target.value });
									}}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton onClick={this.clickSearch}>
													<SearchIcon fontSize="small" />
												</IconButton>
											</InputAdornment>
										),
										style: { fontSize: "12px" }
									}}
									className={classes.search}
									margin="dense"
								/>
							</Paper>
						</Grid>
						<Grid
							item
							lg={this.state.selectedSemanticType && !this.state.semanticWindowClosed ? 4 : 12}
							md={this.state.selectedSemanticType && !this.state.semanticWindowClosed ? 4 : 12}
							xl={this.state.selectedSemanticType && !this.state.semanticWindowClosed ? 4 : 12}
							xs={12}
						>
							<LoadingOverlay active={this.state.loading} spinner text="Loading ...">
								<Paper variant="outlined" className={classes.main}>
									<div className={classes.paperHeader}>
										<Typography variant="subtitle1">Semantics</Typography>
									</div>
									<List component="nav">{list_items}</List>
									<div className={classes.paperFooter}>
										<Pagination
											pageNumber={this.state.pageNumber}
											data={list_items}
											dataPerPage={this.state.dataPerPage}
											previous={this.previous}
											next={this.next}
											disabled={this.state.loading}
										/>
									</div>
								</Paper>
							</LoadingOverlay>
						</Grid>
						{this.state.semanticWindowClosed ? null :
							<Grid item lg={8} md={8} xl={8} xs={12}>
								<Paper variant="outlined" className={classes.main}>
									<IconButton
										aria-label="Close"
										onClick={() => this.closeSemanticWindow()}
										className={classes.semanticWindowCloseButton}
									>
										<CloseIcon fontSize="small" />
									</IconButton>
									<div className={classes.paperHeader}>
										<Typography variant="subtitle1">Semantic Schema</Typography>
									</div>
									<br/>
									<Grid container spacing={2} lg={8} md={8} xl={8} xs={12}>
										<Grid item>
											<Button
												color="primary"
												variant="contained"
												className={classes.inlineButtons}
												size="small"
												onClick={this.downloadTemplate}
											>
												Download Template
											</Button>
										</Grid>
										<Grid item xs={12}>
											<Typography variant="subtitle2" sx={{mx: 2}}><strong>{this.state.selectedSemanticType['dc:title']}</strong></Typography>
										</Grid>
										{
											this.state.selectedSemanticType["dc:description"] === "" ? 
												null :
												<Grid item xs={12}>
													<Typography variant="body1">{this.state.selectedSemanticType["dc:description"]}</Typography>

												</Grid>
										}
									</Grid>
									<br/>
									<div className={classes.metadata}>
										{this.generateSemanticTable()}
									</div>
								</Paper>
							</Grid>}
					</Grid>
				</div>
			);
		}
	}
}


export default withStyles(styles)(SemanticViewer);
