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
			selectedDataType: "All",
			selectedSpace: "All",
			selectedDataset: "",
			selectedDatasetFormat: "",
			fileData: "",
			fileExtension: "",
			searchText: "",
			registeredSearchText: "",
			searching: false,
			authError: false,
			preview: false,
			offset: 0,
			pageNumber: 1,
			dataPerPage: 50,
			messageOpen: false,
			confirmOpen: false,
			loading: false,
			metadataClosed: true
		};

		this.changeDatasetType = this.changeDatasetType.bind(this);
		this.onClickDataset = this.onClickDataset.bind(this);
		this.onClickDelete = this.onClickDelete.bind(this);
		this.handleConfirmed = this.handleConfirmed.bind(this);
		this.handleCanceled = this.handleCanceled.bind(this);
		this.closeErrorMessage = this.closeErrorMessage.bind(this);
		this.setSearchState = this.setSearchState.bind(this);
		this.handleKeyPressed = this.handleKeyPressed.bind(this);
		this.clickSearch = this.clickSearch.bind(this);
		this.onClickFileDescriptor = this.onClickFileDescriptor.bind(this);
		this.exportJson = this.exportJson.bind(this);
		this.downloadDataset = this.downloadDataset.bind(this);
		this.handleSpaceSelection = this.handleSpaceSelection.bind(this);
		this.previous = this.previous.bind(this);
		this.next = this.next.bind(this);
		this.changeDataPerPage = this.changeDataPerPage.bind(this);
		this.preview = this.preview.bind(this);
		this.handlePreviewerClose = this.handlePreviewerClose.bind(this);
		this.closeMetadata = this.closeMetadata.bind(this);
	}

	//TODO auto select the first item in the list

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
					this.props.getAllSemantics(
						this.state.selectedDataType,
						this.state.selectedSpace,
						this.state.dataPerPage,
						this.state.offset
					);
					this.props.getAllSpaces();
					this.props.getUniqueDatatypes();
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

	componentDidUpdate(prevProps, prevState) {
		if (this.props.deleteError && !prevState.messageOpen) {
			this.setState({ messageOpen: true });
		} else if (!this.props.deleteError && prevState.messageOpen) {
			this.setState({ messageOpen: false });
		}
	}

	changeDatasetType(event) {
		this.setState(
			{
				selectedDataType: event.target.value,
				pageNumber: 1,
				offset: 0,
				selectedDataset: "",
				selectedDatasetFormat: "",
				fileData: "",
				fileExtension: "",
				searchText: "",
				registeredSearchText: "",
				searching: false
			},
			function () {
				this.props.getAllSemantics(
					this.state.selectedDataType,
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
				selectedSpace: event.target.value,
				pageNumber: 1,
				offset: 0,
				selectedDataset: "",
				selectedDatasetFormat: "",
				fileData: "",
				fileExtension: "",
				searchText: "",
				registeredSearchText: "",
				searching: false
			},
			function () {
				this.props.getAllSemantics(
					this.state.selectedDataType,
					this.state.selectedSpace,
					this.state.dataPerPage,
					this.state.offset
				);
			}
		);
	}

	onClickDataset(datasetId) {
		const dataset = this.props.datasets.find((dataset) => dataset.id === datasetId);
		this.setState({
			selectedDataset: dataset,
			selectedDatasetFormat: dataset.format,
			fileData: "",
			fileExtension: "",
			metadataClosed: false
		});
	}

	onClickDelete() {
		this.setState({
			confirmOpen: true
		});
	}

	handleCanceled() {
		this.setState({
			confirmOpen: false
		});
	}

	handleConfirmed() {
		this.props.deleteItemById(this.state.selectedDataset.id);
		this.setState({
			selectedDataset: "",
			selectedDatasetFormat: "",
			fileData: "",
			fileExtension: "",
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
			selectedDataset: "",
			fileData: "",
			fileExtension: "",
			selectedDatasetFormat: "",
			pageNumber: 1,
			offset: 0,
			selectedDataType: "All",
			selectedSpace: "All"
		});
	}

	async handleKeyPressed(event) {
		if (event.charCode === 13) {
			// enter
			event.preventDefault();
			await this.setSearchState();
			this.props.searchAllDatasets(this.state.registeredSearchText, this.state.dataPerPage, this.state.offset);
		}
	}

	async clickSearch() {
		await this.setSearchState();
		this.props.searchAllDatasets(this.state.registeredSearchText, this.state.dataPerPage, this.state.offset);
	}

	async onClickFileDescriptor(selected_dataset_id, file_descriptor_id, file_name) {
		const url = `${config.dataServiceBase}files/${file_descriptor_id}/blob`;

		let response = await fetch(url, { method: "GET", mode: "cors", headers: getHeader() });

		if (response.ok) {
			let text = await response.text();
			this.setState({
				fileData: text.split("\n"),
				fileExtension: file_name.split(".").slice(-1).pop(),
				authError: false
			});
		} else if (response.status === 401) {
			cookies.remove("Authorization");
			this.setState({
				fileData: [],
				fileExtension: null,
				authError: true
			});
		} else {
			this.setState({
				fileData: [],
				fileExtension: null,
				authError: false
			});
		}
	}

	async downloadDataset() {
		let datasetId = this.state.selectedDataset.id;
		let filename = `${datasetId}.zip`;
		let url = `${config.dataService}/${datasetId}/blob`;

		let response = await fetch(url, { method: "GET", mode: "cors", headers: await getHeader() });

		if (response.ok) {
			let blob = await response.blob();
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

	async exportJson() {
		let datasetJSON = JSON.stringify(this.state.selectedDataset, null, 4);
		let blob = new Blob([datasetJSON], { type: "application/json" });

		const filename = `${this.state.selectedDataset.id}.json`;

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
				selectedDataset: "",
				selectedDatasetFormat: "",
				fileData: "",
				fileExtension: ""
			},
			function () {
				if (this.state.registeredSearchText !== "" && this.state.searching) {
					// change page on searchAllDatasets
					this.props.searchAllDatasets(
						this.state.registeredSearchText,
						this.state.dataPerPage,
						this.state.offset
					);
				} else {
					// change page on getAllSemantics
					this.props.getAllSemantics(
						this.state.selectedDataType,
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
				selectedDataset: "",
				selectedDatasetFormat: "",
				fileData: "",
				fileExtension: ""
			},
			function () {
				if (this.state.registeredSearchText !== "" && this.state.searching) {
					// change page on searchAllDatasets
					this.props.searchAllDatasets(
						this.state.registeredSearchText,
						this.state.dataPerPage,
						this.state.offset
					);
				} else {
					// change page on getAllSemantics
					this.props.getAllSemantics(
						this.state.selectedDataType,
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
				selectedDataset: "",
				selectedDatasetFormat: "",
				fileData: "",
				fileExtension: ""
			},
			function () {
				if (this.state.registeredSearchText !== "" && this.state.searching) {
					// change page on searchAllDatasets
					this.props.searchAllDatasets(
						this.state.registeredSearchText,
						this.state.dataPerPage,
						this.state.offset
					);
				} else {
					// change page on getAllSemantics
					this.props.getAllDatasets(
						this.state.selectedDataType,
						this.state.selectedSpace,
						this.state.dataPerPage,
						this.state.offset
					);
				}
			}
		);
	}

	preview() {
		this.setState({
			preview: true
		});
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

		// list items
		let list_items = "";
		if (this.props.datasets.length > 0) {
			list_items = this.props.datasets.map((dataset) => {
				if (dataset.format === "table") {
					return (
						<ListItem
							button
							onClick={() => this.onClickDataset(dataset.id)}
							selected={dataset.id === this.state.selectedDataset.id}
						>
							<Tooltip title="Table">
								<ListItemIcon>
									<TableIcon fontSize="small" />
								</ListItemIcon>
							</Tooltip>
							<ListItemText primary={`${dataset.title} - ${dataset.creator.capitalize()}`} />
							<SpaceChip item={dataset} selectedItem={this.state.selectedDataset} />
						</ListItem>
					);
				} else if (dataset.format === "textFiles") {
					return (
						<ListItem
							button
							onClick={() => this.onClickDataset(dataset.id)}
							selected={dataset.id === this.state.selectedDataset.id}
						>
							<Tooltip title="Text File">
								<ListItemIcon>
									<TextIcon fontSize="small" />
								</ListItemIcon>
							</Tooltip>
							<ListItemText primary={`${dataset.title} - ${dataset.creator.capitalize()}`} />
							<SpaceChip item={dataset} selectedItem={this.state.selectedDataset} />
						</ListItem>
					);
				} else if (
					dataset.format.toLowerCase() === "shapefile" ||
					dataset.format.toLowerCase() === "raster" ||
					dataset.format.toLowerCase().includes("geotif")
				) {
					return (
						<ListItem
							button
							onClick={() => this.onClickDataset(dataset.id)}
							selected={dataset.id === this.state.selectedDataset.id}
						>
							<Tooltip title="Shapefile">
								<ListItemIcon>
									<MapIcon fontSize="small" />
								</ListItemIcon>
							</Tooltip>
							<ListItemText primary={`${dataset.title} - ${dataset.creator.capitalize()}`} />
							<SpaceChip item={dataset} selectedItem={this.state.selectedDataset} />
						</ListItem>
					);
				} else if (dataset.format === "mapping") {
					return (
						<ListItem
							button
							onClick={() => this.onClickDataset(dataset.id)}
							selected={dataset.id === this.state.selectedDataset.id}
						>
							<Tooltip title="Mapping">
								<ListItemIcon>
									<MappingIcon fontSize="small" />
								</ListItemIcon>
							</Tooltip>
							<ListItemText primary={`${dataset.title} - ${dataset.creator.capitalize()}`} />
							<SpaceChip item={dataset} selectedItem={this.state.selectedDataset} />
						</ListItem>
					);
				} else if (dataset.format === "fragility") {
					return (
						<ListItem
							button
							onClick={() => this.onClickDataset(dataset.id)}
							selected={dataset.id === this.state.selectedDataset.id}
						>
							<Tooltip title="DFR3Curves">
								<ListItemIcon>
									<ChartIcon fontSize="small" />
								</ListItemIcon>
							</Tooltip>
							<ListItemText primary={`${dataset.title} - ${dataset.creator.capitalize()}`} />
							<SpaceChip item={dataset} selectedItem={this.state.selectedDataset} />
						</ListItem>
					);
				} else if (dataset.format === "Network") {
					return (
						<ListItem
							button
							onClick={() => this.onClickDataset(dataset.id)}
							selected={dataset.id === this.state.selectedDataset.id}
						>
							<Tooltip title="Network">
								<ListItemIcon>
									<NetworkIcon fontSize="small" />
								</ListItemIcon>
							</Tooltip>
							<ListItemText primary={`${dataset.title} - ${dataset.creator.capitalize()}`} />
							<SpaceChip item={dataset} selectedItem={this.state.selectedDataset} />
						</ListItem>
					);
				} else {
					return (
						<ListItem
							button
							onClick={() => this.onClickDataset(dataset.id)}
							selected={dataset.id === this.state.selectedDataset.id}
						>
							<Tooltip title="Unknown Type">
								<ListItemIcon>
									<UnknownIcon fontSize="small" />
								</ListItemIcon>
							</Tooltip>
							<ListItemText primary={`${dataset.title} - ${dataset.creator.capitalize()}`} />
							<SpaceChip item={dataset} selectedItem={this.state.selectedDataset} />
						</ListItem>
					);
				}
			});
		}

		// selected dataset
		let selected_dataset_detail = {};
		if (this.state.selectedDataset) {
			for (let item in this.state.selectedDataset) {
				if (redundantProp.indexOf(item) === -1) {
					selected_dataset_detail[item] = this.state.selectedDataset[item];
				}
			}
		}

		// after selected an item
		let file_list = "";
		let file_contents = "";
		let right_column = "";
		if (this.state.selectedDataset) {
			// file list
			file_list = this.state.selectedDataset.fileDescriptors.map((file_descriptor) => (
				<ListItem
					button
					onClick={() =>
						this.onClickFileDescriptor(
							this.state.selectedDataset.id,
							file_descriptor.id,
							file_descriptor.filename
						)
					}
					key={file_descriptor.id}
				>
					<ListItemText>{file_descriptor.filename}</ListItemText>
				</ListItem>
			));
			// file contents
			if (this.state.fileExtension && this.state.fileData && this.state.fileExtension === "csv") {
				let data = this.state.fileData.map((data) => data.split(","));
				file_contents = (
					<div>
						<Typography variant="h6">File Content Preview</Typography>
						<FileContentTable container="data_container" data={data.slice(2, 8)} colHeaders={data[0]} />
					</div>
				);
			} else if (this.state.fileExtension === "xml" || this.state.fileExtension === "txt") {
				file_contents = (
					<div>
						<Typography variant="h6">File Content Preview</Typography>
						<Card>
							<CardContent>
								<Typography variant="body2" noWrap>
									{this.state.fileData}
								</Typography>
							</CardContent>
						</Card>
					</div>
				);
			}
			// right column
			if (
				this.state.selectedDatasetFormat.toLowerCase() === "shapefile" ||
				this.state.selectedDatasetFormat.toLowerCase() === "raster" ||
				this.state.selectedDatasetFormat.toLowerCase().includes("geotif")
			) {
				right_column = (
					<div>
						<Typography variant="h6">Map</Typography>
						<Map
							datasetId={this.state.selectedDataset.id}
							boundingBox={this.state.selectedDataset.boundingBox}
						/>
					</div>
				);
			} else if (file_list.length > 0) {
				right_column = (
					<div>
						<Typography variant="h6">Files</Typography>
						<List component="nav">{file_list}</List>
					</div>
				);
			}
		}

		if (this.state.authError) {
			browserHistory.push("/login?origin=SemanticViewer");
			return null;
		} else {
			return (
				<div>
					{/*error message display inside viewer*/}
					<ErrorMessage
						error=""
						message="You do not have the privilege to delete this item."
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
									<div className={classes.selectDiv}>
										<Datatype
											selectedDataType={this.state.selectedDataType}
											datatypes={this.props.datatypes}
											handleDatatypeSelection={this.changeDatasetType}
										/>
									</div>
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
							<Grid item lg={4} sm={4} xl={4} xs={12}>
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

							{/*lists*/}

							<Grid
								item
								lg={this.state.selectedDataset && !this.state.metadataClosed ? 4 : 12}
								md={this.state.selectedDataset && !this.state.metadataClosed ? 4 : 12}
								xl={this.state.selectedDataset && !this.state.metadataClosed ? 4 : 12}
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

							{/*metadata*/}
							<Grid
								item
								lg={8}
								md={8}
								xl={8}
								xs={12}
								className={this.state.selectedDataset ? null : classes.hide}
							>
								<Paper variant="outlined" className={classes.main}>
									<IconButton
										aria-label="Close"
										onClick={this.closeMetadata}
										className={classes.metadataCloseButton}
									>
										<CloseIcon fontSize="small" />
									</IconButton>
									{Object.keys(selected_dataset_detail).length > 0 ? (
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
												<Button
													color="primary"
													variant="contained"
													className={classes.inlineButtons}
													size="small"
													onClick={this.downloadDataset}
												>
													Download Dataset
												</Button>
												<Button
													color="primary"
													variant="contained"
													className={classes.inlineButtons}
													size="small"
													onClick={this.preview}
												>
													Preview
												</Button>
												<CopyToClipboard text={this.state.selectedDataset.id}>
													<Button
														color="secondary"
														variant="contained"
														className={classes.inlineButtons}
														size="small"
													>
														Copy ID
													</Button>
												</CopyToClipboard>
												<Button
													color="secondary"
													variant="contained"
													className={classes.inlineButtons}
													size="small"
													onClick={this.onClickDelete}
												>
													DELETE
												</Button>
											</div>
											<div className={classes.metadata}>
												<NestedInfoTable data={selected_dataset_detail} />
											</div>
										</div>
									) : (
										<div />
									)}
								</Paper>
							</Grid>
						</Grid>
						{/*version*/}
						<Version />
					</div>

					{/* Preview */}
					{this.state.selectedDataset ? (
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
									{right_column}
									{file_contents}
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

export default withStyles(styles)(SemanticViewer);
