import React, { Component } from "react";
import { getHeader } from "../actions";
import { browserHistory } from "react-router";
import {
	Button,
	Dialog,
	DialogContent,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import Map from "./children/Map";
import NestedInfoTable from "./children/NestedInfoTable";
import config from "../app.config";
import Pagination from "./children/Pagination";
import DataPerPage from "./children/DataPerPage";
import Space from "./children/Space";
import Version from "./children/Version";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { createMuiTheme, withStyles } from "@material-ui/core/styles/index";
import Cookies from "universal-cookie";
import ErrorMessage from "./children/ErrorMessage";
import SpaceChip from "./children/SpaceChip";
import Confirmation from "./children/Confirmation";
import LoadingOverlay from "react-loading-overlay";

const cookies = new Cookies();

const redundantProp = ["privileges", "times", "spaces"];

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
		width: "25%"
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
		margin: "auto 5px",
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

class HazardViewer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedHazardType: "earthquakes",
			selectedSpace: "All",
			selectedHazard: "",
			selectedHazardDatasetId: "",
			boundingBox: [],
			searchText: "",
			registeredSearchText: "",
			searching: false,
			authError: false,
			offset: 0,
			pageNumber: 1,
			dataPerPage: 50,
			preview: false,
			messageOpen: false,
			confirmOpen: false,
			loading: false,
			metadataClosed: true
		};
		this.changeHazardType = this.changeHazardType.bind(this);
		this.onClickHazard = this.onClickHazard.bind(this);
		this.onClickDelete = this.onClickDelete.bind(this);
		this.handleConfirmed = this.handleConfirmed.bind(this);
		this.handleCanceled = this.handleCanceled.bind(this);
		this.closeErrorMessage = this.closeErrorMessage.bind(this);
		this.setSearchState = this.setSearchState.bind(this);
		this.handleKeyPressed = this.handleKeyPressed.bind(this);
		this.clickSearch = this.clickSearch.bind(this);
		this.exportJson = this.exportJson.bind(this);
		this.handleSpaceSelection = this.handleSpaceSelection.bind(this);
		this.previous = this.previous.bind(this);
		this.next = this.next.bind(this);
		this.changeDataPerPage = this.changeDataPerPage.bind(this);
		this.preview = this.preview.bind(this);
		this.handlePreviewerClose = this.handlePreviewerClose.bind(this);
		this.closeMetadata = this.closeMetadata.bind(this);
	}

	componentWillMount() {
		// check if logged in
		let authorization = cookies.get("Authorization");

		// logged in
		if (
			config.hostname.includes("localhost") ||
			(authorization !== undefined && authorization !== "" && authorization !== null)
		) {
			this.setState(
				{
					authError: false
				},
				function () {
					this.props.getAllSpaces();
					this.props.getAllHazards(
						this.state.selectedHazardType,
						this.state.selectedSpace,
						this.state.dataPerPage,
						this.state.offset
					);
				}
			);
		}
		// not logged in
		else {
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
		this.setState({
			authError: nextProps.authError,
			loading: nextProps.loading
		});
	}

	// TODO set state inside component did up date is bad practice!!
	componentDidUpdate(prevProps, prevState) {
		if (this.props.deleteError && !prevState.messageOpen) {
			this.setState({ messageOpen: true });
		} else if (!this.props.deleteError && prevState.messageOpen) {
			this.setState({ messageOpen: false });
		}
	}

	changeHazardType(event) {
		this.setState(
			{
				pageNumber: 1,
				offset: 0,
				selectedHazardType: event.target.value,
				selectedHazard: "",
				selectedHazardDatasetId: "",
				searchText: "",
				registeredSearchText: "",
				searching: false
			},
			function () {
				this.props.getAllHazards(
					this.state.selectedHazardType,
					this.state.selectedSpace,
					this.state.dataPerPage,
					this.state.offset
				);
			}
		);
	}

	handleSpaceSelection(event) {
		this.setState(
			{
				pageNumber: 1,
				offset: 0,
				selectedHazard: "",
				selectedHazardDatasetId: "",
				searchText: "",
				registeredSearchText: "",
				searching: false,
				selectedSpace: event.target.value
			},
			function () {
				this.props.getAllHazards(
					this.state.selectedHazardType,
					this.state.selectedSpace,
					this.state.dataPerPage,
					this.state.offset
				);
			}
		);
	}

	onClickHazard(hazardId) {
		const hazard = this.props.hazards.find((hazard) => hazard.id === hazardId);
		this.setState({
			selectedHazard: hazard,
			selectedHazardDatasetId: "",
			metadataClosed: false
		});
	}

	onClickDelete() {
		this.setState({
			confirmOpen: true
		});
	}

	handleConfirmed() {
		this.props.deleteItemById(this.state.selectedHazardType, this.state.selectedHazard.id);
		this.setState({
			selectedHazard: "",
			selectedHazardDatasetId: "",
			confirmOpen: false
		});
	}

	handleCanceled() {
		this.setState({
			confirmOpen: false
		});
	}

	closeErrorMessage() {
		this.props.resetError();
		this.setState({
			messageOpen: false
		});
	}

	async setSearchState() {
		this.setState({
			registeredSearchText: this.state.searchText,
			searching: true,
			selectedSpace: "All",
			selectedHazard: "",
			selectedHazardDatasetId: "",
			boundingBox: [],
			pageNumber: 1,
			offset: 0
		});
	}

	async handleKeyPressed(event) {
		if (event.charCode === 13) {
			// enter
			event.preventDefault();
			await this.setSearchState();
			this.props.searchAllHazards(
				this.state.selectedHazardType,
				this.state.registeredSearchText,
				this.state.dataPerPage,
				this.state.offset
			);
		}
	}

	async clickSearch() {
		await this.setSearchState();
		this.props.searchAllHazards(
			this.state.selectedHazardType,
			this.state.registeredSearchText,
			this.state.dataPerPage,
			this.state.offset
		);
	}

	exportJson() {
		let selected_hazard = this.props.hazards.find((hazard) => hazard.id === this.state.selectedHazard.id);
		let hazardJson = JSON.stringify(selected_hazard, null, 4);
		let blob = new Blob([hazardJson], { type: "application/json" });
		const filename = `${this.state.selectedHazard.id}.json`;

		if (window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveBlob(blob, filename);
		} else {
			let anchor = window.document.createElement("a");
			anchor.href = window.URL.createObjectURL(blob);
			anchor.download = filename;
			document.body.appendChild(anchor);
			anchor.click();
			document.body.removeChild(anchor);
		}
	}

	previous() {
		this.setState(
			{
				offset: (this.state.pageNumber - 2) * this.state.dataPerPage,
				pageNumber: this.state.pageNumber - 1,
				selectedHazard: "",
				selectedHazardDatasetId: "",
				boundingBox: []
			},
			function () {
				if (this.state.registeredSearchText !== "" && this.state.searching) {
					this.props.searchAllHazards(
						this.state.selectedHazardType,
						this.state.registeredSearchText,
						this.state.dataPerPage,
						this.state.offset
					);
				} else {
					this.props.getAllHazards(
						this.state.selectedHazardType,
						this.state.selectedSpace,
						this.state.dataPerPage,
						this.state.offset
					);
				}
			}
		);
	}

	next() {
		this.setState(
			{
				offset: this.state.pageNumber * this.state.dataPerPage,
				pageNumber: this.state.pageNumber + 1,
				selectedHazard: "",
				selectedHazardDatasetId: "",
				boundingBox: []
			},
			function () {
				if (this.state.registeredSearchText !== "" && this.state.searching) {
					this.props.searchAllHazards(
						this.state.selectedHazardType,
						this.state.registeredSearchText,
						this.state.dataPerPage,
						this.state.offset
					);
				} else {
					this.props.getAllHazards(
						this.state.selectedHazardType,
						this.state.selectedSpace,
						this.state.dataPerPage,
						this.state.offset
					);
				}
			}
		);
	}

	changeDataPerPage(event) {
		this.setState(
			{
				pageNumber: 1,
				offset: 0,
				dataPerPage: event.target.value,
				selectedHazard: "",
				selectedHazardDatasetId: "",
				boundingBox: []
			},
			function () {
				if (this.state.registeredSearchText !== "" && this.state.searching) {
					this.props.searchAllHazards(
						this.state.selectedHazardType,
						this.state.registeredSearchText,
						this.state.dataPerPage,
						this.state.offset
					);
				} else {
					this.props.getAllHazards(
						this.state.selectedHazardType,
						this.state.selectedSpace,
						this.state.dataPerPage,
						this.state.offset
					);
				}
			}
		);
	}

	async preview(hazardDatasetId) {
		// query data services to:
		// 1. verify that dataset exists
		// 2. get the bounding box information
		const url = `${config.dataServiceBase}datasets/${hazardDatasetId}`;
		let response = await fetch(url, { method: "GET", mode: "cors", headers: getHeader() });
		if (response.ok) {
			let selectedHazardDataset = await response.json();
			this.setState({
				selectedHazardDatasetId: selectedHazardDataset.id,
				boundingBox: selectedHazardDataset.boundingBox,
				authError: false,
				preview: true
			});
		} else if (response.status === 401) {
			cookies.remove("Authorization");
			this.setState({
				selectedHazardDatasetId: "",
				boundingBox: [],
				authError: true,
				preview: false
			});
		} else {
			this.setState({
				selectedHazardDatasetId: "",
				boundingBox: [],
				authError: false,
				preview: false
			});
		}
	}

	handlePreviewerClose() {
		this.setState({
			preview: false
		});
	}

	closeMetadata() {
		this.setState({
			metadataClosed: true
		});
	}

	render() {
		const { classes } = this.props;

		// rendering filtered hazards list
		let hazards_list = this.props.hazards;
		let hazards_list_display = "";
		if (hazards_list.length > 0) {
			hazards_list_display = (
				<List component="nav" id="dataset-list" style={{ overflowY: "auto" }}>
					{hazards_list.map((hazard) => {
						return (
							<ListItem
								button
								onClick={() => this.onClickHazard(hazard.id)}
								key={hazard.id}
								selected={hazard.id === this.state.selectedHazard.id}
							>
								<ListItemText>{hazard.name ? `${hazard.name}` : `${hazard.id}`}</ListItemText>
								<SpaceChip item={hazard} selectedItem={this.state.selectedHazard} />
							</ListItem>
						);
					})}
				</List>
			);
		}

		// selected hazard
		let selected_hazard_detail = {};
		if (this.state.selectedHazard) {
			for (let item in this.state.selectedHazard) {
				if (redundantProp.indexOf(item) === -1) {
					selected_hazard_detail[item] = this.state.selectedHazard[item];
				}
			}
		}

		if (this.state.authError) {
			browserHistory.push("/login?origin=HazardViewer");
			return null;
		} else {
			return (
				<div>
					{/*error message display inside viewer*/}
					<ErrorMessage
						message="You do not have the privilege to delete this item."
						error=""
						messageOpen={this.state.messageOpen}
						closeErrorMessage={this.closeErrorMessage}
					/>
					<Confirmation
						confirmOpen={this.state.confirmOpen}
						actionBtnName="Delete"
						actionText="Once deleted, you won't be able to revert this!"
						handleConfirmed={this.handleConfirmed}
						handleCanceled={this.handleCanceled}
					/>
					<div className={classes.root}>
						<Grid container spacing={4}>
							{/*filters*/}
							<Grid item lg={8} sm={8} xl={8} xs={12}>
								<Paper variant="outlined" className={classes.filter}>
									<Typography variant="h6">Filters</Typography>
									{/* select hazard type */}
									<div className={classes.selectDiv}>
										<InputLabel>Hazard Type</InputLabel>
										<Select
											value={this.state.selectedHazardType}
											onChange={this.changeHazardType}
											className={classes.select}
										>
											<MenuItem
												value="earthquakes"
												key="earthquakes"
												className={classes.denseStyle}
											>
												Earthquake
											</MenuItem>
											<MenuItem value="tornadoes" key="tornadoes" className={classes.denseStyle}>
												Tornado
											</MenuItem>
											<MenuItem
												value="hurricanes"
												key="hurricanes"
												className={classes.denseStyle}
											>
												Hurricane
											</MenuItem>
											<MenuItem
												value="hurricaneWindfields"
												key="hurricaneWindfields"
												className={classes.denseStyle}
											>
												Hurricane Windfield
											</MenuItem>
											<MenuItem value="tsunamis" key="tsunamis" className={classes.denseStyle}>
												Tsunami
											</MenuItem>
											<MenuItem value="floods" key="floods" className={classes.denseStyle}>
												Flood
											</MenuItem>
										</Select>
									</div>
									{/*spaces*/}
									<div className={classes.selectDiv}>
										<Space
											selectedSpace={this.state.selectedSpace}
											spaces={this.props.spaces}
											handleSpaceSelection={this.handleSpaceSelection}
										/>
									</div>
									{/* set data per page to be shown */}
									<div className={classes.selectDiv}>
										<DataPerPage
											dataPerPage={this.state.dataPerPage}
											changeDataPerPage={this.changeDataPerPage}
										/>
									</div>
								</Paper>
							</Grid>
							<Grid item lg={4} sm={4} xl={4} xs={12}>
								<Paper variant="outlined" className={classes.filter}>
									<Typography variant="h6">Search all {this.state.selectedHazardType}</Typography>
									<TextField
										label="Search"
										variant="outlined"
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

							{/*lists*/}
							<Grid
								item
								lg={this.state.selectedHazard && !this.state.metadataClosed ? 4 : 12}
								md={this.state.selectedHazard && !this.state.metadataClosed ? 4 : 12}
								xl={this.state.selectedHazard && !this.state.metadataClosed ? 4 : 12}
								xs={12}
							>
								<LoadingOverlay active={this.state.loading} spinner text="Loading ...">
									<Paper variant="outlined" className={classes.main}>
										<div className={classes.paperHeader}>
											<Typography variant="subtitle1">Hazards</Typography>
										</div>
										{hazards_list_display}
										<div className={classes.paperFooter}>
											<Pagination
												pageNumber={this.state.pageNumber}
												data={hazards_list_display}
												dataPerPage={this.state.dataPerPage}
												previous={this.previous}
												next={this.next}
											/>
										</div>
									</Paper>
								</LoadingOverlay>
							</Grid>

							{/* Metadata */}
							{
								this.state.metadataClosed ?
									<></>
									:
									<Grid
										item
										lg={8}
										md={8}
										xl={8}
										xs={12}
									>
										<Paper variant="outlined" className={classes.main}>
											<IconButton
												aria-label="Close"
												onClick={this.closeMetadata}
												className={classes.metadataCloseButton}
											>
												<CloseIcon fontSize="small" />
											</IconButton>
											{Object.keys(selected_hazard_detail).length > 0 ? (
												<div>
													<div className={classes.paperHeader}>
														<Typography variant="subtitle1">Metadata</Typography>
													</div>
													<div className={classes.metadata}>
														<Button
															color="primary"
															variant="contained"
															className={classes.inlineButtons}
															size="small"
															onClick={this.exportJson}
														>
															Download Metadata
														</Button>
														<CopyToClipboard text={this.state.selectedHazard.id}>
															<Button
																color="primary"
																variant="outlined"
																className={classes.inlineButtons}
																size="small"
															>
																Copy ID
															</Button>
														</CopyToClipboard>
														<Button
															color="primary"
															variant="outlined"
															className={classes.inlineButtons}
															style={{float: "right", color: "red", borderColor: "red"}}
															size="small"
															onClick={this.onClickDelete}
														>
															DELETE
														</Button>
													</div>
													<div className={classes.metadata}>
														<NestedInfoTable
															data={selected_hazard_detail}
															selectedHazardDataset={this.state.selectedHazardDatasetId}
															onClick={this.preview}
														/>
													</div>
												</div>
											) : (
												<div />
											)}
										</Paper>
									</Grid>
							}
						</Grid>
						<Version />
					</div>

					{/* Preview */}
					{this.state.selectedHazard ? (
						<Dialog
							open={this.state.preview}
							onClose={this.handlePreviewerClose}
							maxWidth="lg"
							fullWidth
							scroll="paper"
						>
							<DialogContent className={classes.preview}>
								<IconButton
									aria-label="Close"
									onClick={this.handlePreviewerClose}
									className={classes.previewClose}
								>
									<CloseIcon fontSize="small" />
								</IconButton>
								<div>
									<Typography variant="h6">Map</Typography>
									<Map
										datasetId={this.state.selectedHazardDatasetId}
										boundingBox={this.state.boundingBox}
									/>
								</div>
							</DialogContent>
						</Dialog>
					) : (
						<div />
					)}
				</div>
			);
		}
	}
}

export default withStyles(styles)(HazardViewer);
