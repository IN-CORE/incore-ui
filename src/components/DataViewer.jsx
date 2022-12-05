import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import { browserHistory } from "react-router";

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
import { createTheme, makeStyles } from "@material-ui/core/styles";
import Cookies from "universal-cookie";
import { CopyToClipboard } from "react-copy-to-clipboard";

import config from "../app.config";
import FileContentTable from "./children/FileContentTable";
import NestedInfoTable from "./children/NestedInfoTable";
import Map from "./children/Map";
import SpaceChip from "./children/SpaceChip";
import Pagination from "./children/Pagination";
import DataPerPage from "./children/DataPerPage";
import Space from "./children/Space";
import Version from "./children/Version";
import Datatype from "./children/Datatype";
import ErrorMessage from "./children/ErrorMessage";
import Confirmation from "./children/Confirmation";
import {
	getHeader,
	fetchDatasets,
	fetchSpaces,
	fetchUniqueDatatypes,
	searchDatasets,
	deleteItemById,
	resetError
} from "../actions";

const cookies = new Cookies();
const redundantProp = ["deleted", "privileges", "spaces"];
const theme = createTheme();

const useStyles = makeStyles(() => ({
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
}));

String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

const DataViewer = () => {
	const classes = useStyles();

	const [selectedDataType, setSelectedDataType] = React.useState("All");
	const [selectedSpace, setSelectedSpace] = React.useState("All");
	const [selectedDataset, setSelectedDataset] = React.useState("");
	const [selectedDatasetFormat, setSelectedDatasetFormat] = React.useState("");
	const [fileData, setFileData] = React.useState("");
	const [fileExtension, setFileExtension] = React.useState("");
	const [searchText, setSearchText] = React.useState("");
	const [registeredSearchText, setRegisteredSearchText] = React.useState("");
	const [searching, setSearching] = React.useState(false);
	const [preview, setPreview] = React.useState(false);
	const [offset, setOffset] = React.useState(0);
	const [pageNumber, setPageNumber] = React.useState(1);
	const [dataPerPage, setDataPerPage] = React.useState(50);
	const [messageOpen, setMessageOpen] = React.useState(false);
	const [confirmOpen, setConfirmOpen] = React.useState(false);
	const [metadataClosed, setMetadataClosed] = React.useState(true);

	const dispatch = useDispatch();
	const authError = useSelector((state) => state.user.loginError);
	const loading = useSelector((state) => state.data.loading);
	const datasets = useSelector((state) => state.data.datasets);
	const deleteError = useSelector((state) => state.data.deleteError);
	const spaces = useSelector((state) => state.space.spaces);
	const datatypes = useSelector((state) => state.datatype.datatypes);

	React.useEffect(() => {
		// check if logged in
		let authorization = cookies.get("Authorization");
		if (
			config.hostname.includes("localhost") ||
			(authorization !== undefined && authorization !== "" && authorization !== null)
		) {
			fetchDatasets(selectedDataType, selectedSpace, dataPerPage, offset)(dispatch);
			fetchSpaces()(dispatch);
			fetchUniqueDatatypes()(dispatch);
		} else {
			dispatch({ type: "LOGIN_ERROR" });
		}
		dispatch(resetError);
	}, []);

	React.useEffect(() => {
		if (deleteError && !messageOpen) {
			setMessageOpen(true);
		} else if (!deleteError && messageOpen) {
			setMessageOpen(false);
		}
	}, [messageOpen]);

	const setSelectionParameters = () => {
		setPageNumber(1);
		setOffset(0);
		setSelectedDataset("");
		setSelectedDatasetFormat("");
		setFileData("");
		setFileExtension("");
		setSearchText("");
		setRegisteredSearchText("");
		setSearching(false);
	};

	const changeDatasetType = (event) => {
		setSelectedDataType(event.target.value);
		setSelectionParameters();
	};

	const changeSpaceSelection = (event) => {
		setSelectedSpace(event.target.value);
		setSelectionParameters();
	};

	React.useEffect(() => {
		console.log("Fired 1");
		fetchDatasets(selectedDataType, selectedSpace, dataPerPage, offset)(dispatch);
	}, [selectedDataType, selectedSpace]);

	const onClickDataset = (datasetId) => {
		const dataset = datasets.find((dataset) => dataset.id === datasetId);
		setSelectedDataset(dataset);
		setSelectedDatasetFormat(dataset.format);
		setFileData("");
		setFileExtension("");
		setMetadataClosed(false);
	};

	const onClickDelete = () => {
		setConfirmOpen(true);
	};

	const handleCanceled = () => {
		setConfirmOpen(false);
	};

	const handleConfirmed = () => {
		deleteItemById("datasets", id)(dispatch);
		setSelectedDataset("");
		setSelectedDatasetFormat("");
		setFileData("");
		setFileExtension("");
		setConfirmOpen(false);
	};

	const closeErrorMessage = () => {
		dispatch(resetError);
		setMessageOpen(false);
	};

	const setSearchState = () => {
		setRegisteredSearchText(searchText);
		setSearching(true);
		setSelectedDataset("");
		setFileData("");
		setFileExtension("");
		setSelectedDatasetFormat("");
		setPageNumber(1);
		setOffset(0);
		setSelectedDataType("All");
		setSelectedSpace("All");
	};

	const handleKeyPressed = (event) => {
		if (event.charCode === 13) {
			event.preventDefault();
			setSearchState();
		}
	};

	const clickSearch = () => {
		setSearchState();
	};

	React.useEffect(() => {
		console.log("Fired 2");
		if (registeredSearchText !== "") {
			searchDatasets(registeredSearchText, dataPerPage, offset)(dispatch);
		}
	}, [registeredSearchText]);

	const onClickFileDescriptor = async (selected_dataset_id, file_descriptor_id, file_name) => {
		const url = `${config.dataServiceBase}files/${file_descriptor_id}/blob`;

		let response = await fetch(url, { method: "GET", mode: "cors", headers: getHeader() });

		let fdata = [];
		let fextension = null;

		if (response.ok) {
			let text = await response.text();
			fdata = text.split("\n");
			fextension = file_name.split(".").slice(-1).pop();
		} else if (response.status === 401) {
			cookies.remove("Authorization");
			dispatch({ type: "LOGIN_ERROR" });
		}

		setFileData(fdata);
		setFileExtension(fextension);
	};

	const downloadDataset = async () => {
		let datasetId = selectedDataset.id;
		let filename = `${datasetId}.zip`;
		let url = `${config.dataService}/${datasetId}/blob`;

		let response = await fetch(url, { method: "GET", mode: "cors", headers: getHeader() });

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
			dispatch({ type: "LOGIN_ERROR" });
		}
	};

	const exportJson = async () => {
		let datasetJSON = JSON.stringify(selectedDataset, null, 4);
		let blob = new Blob([datasetJSON], { type: "application/json" });

		const filename = `${selectedDataset.id}.json`;

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
	};

	const pageParametersStateChange = () => {
		setSelectedDataset("");
		setSelectedDatasetFormat("");
		setFileData("");
		setFileExtension("");
	};

	const pageChange = (direction) => {
		if (direction === "previous") {
			setOffset((pageNumber - 2) * dataPerPage);
			setPageNumber(pageNumber - 1);
		} else if (direction === "next") {
			setOffset(pageNumber * dataPerPage);
			setPageNumber(pageNumber + 1);
		}
		pageParametersStateChange();
	};

	const changeDataPerPage = (event) => {
		setPageNumber(1);
		setOffset(0);
		setDataPerPage(event.target.value);
		pageParametersStateChange();
	};

	React.useEffect(() => {
		if (registeredSearchText !== "" && searching) {
			searchDatasets(registeredSearchText, dataPerPage, offset)(dispatch);
		} else {
			fetchDatasets(selectedDataType, selectedSpace, dataPerPage, offset)(dispatch);
		}
	}, [offset, pageNumber, dataPerPage]);

	const handlePreviewOpen = () => {
		setPreview(true);
	};

	const handlePreviewClose = () => {
		setPreview(false);
	};

	const handleCloseMetadata = () => {
		setMetadataClosed(true);
	};

	// list items
	let list_items = "";
	if (datasets.length > 0) {
		list_items = datasets.map((dataset) => {
			if (dataset.format === "table") {
				return (
					<ListItem
						button
						onClick={() => onClickDataset(dataset.id)}
						selected={dataset.id === selectedDataset.id}
						key={dataset.id}
					>
						<Tooltip title="Table">
							<ListItemIcon>
								<TableIcon fontSize="small" />
							</ListItemIcon>
						</Tooltip>
						<ListItemText primary={`${dataset.title} - ${dataset.creator.capitalize()}`} />
						<SpaceChip item={dataset} selectedItem={selectedDataset} />
					</ListItem>
				);
			} else if (dataset.format === "textFiles") {
				return (
					<ListItem
						button
						onClick={() => onClickDataset(dataset.id)}
						selected={dataset.id === selectedDataset.id}
						key={dataset.id}
					>
						<Tooltip title="Text File">
							<ListItemIcon>
								<TextIcon fontSize="small" />
							</ListItemIcon>
						</Tooltip>
						<ListItemText primary={`${dataset.title} - ${dataset.creator.capitalize()}`} />
						<SpaceChip item={dataset} selectedItem={selectedDataset} />
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
						onClick={() => onClickDataset(dataset.id)}
						selected={dataset.id === selectedDataset.id}
						key={dataset.id}
					>
						<Tooltip title="Shapefile">
							<ListItemIcon>
								<MapIcon fontSize="small" />
							</ListItemIcon>
						</Tooltip>
						<ListItemText primary={`${dataset.title} - ${dataset.creator.capitalize()}`} />
						<SpaceChip item={dataset} selectedItem={selectedDataset} />
					</ListItem>
				);
			} else if (dataset.format === "mapping") {
				return (
					<ListItem
						button
						onClick={() => onClickDataset(dataset.id)}
						selected={dataset.id === selectedDataset.id}
						key={dataset.id}
					>
						<Tooltip title="Mapping">
							<ListItemIcon>
								<MappingIcon fontSize="small" />
							</ListItemIcon>
						</Tooltip>
						<ListItemText primary={`${dataset.title} - ${dataset.creator.capitalize()}`} />
						<SpaceChip item={dataset} selectedItem={selectedDataset} />
					</ListItem>
				);
			} else if (dataset.format === "fragility") {
				return (
					<ListItem
						button
						onClick={() => onClickDataset(dataset.id)}
						selected={dataset.id === selectedDataset.id}
						key={dataset.id}
					>
						<Tooltip title="DFR3Curves">
							<ListItemIcon>
								<ChartIcon fontSize="small" />
							</ListItemIcon>
						</Tooltip>
						<ListItemText primary={`${dataset.title} - ${dataset.creator.capitalize()}`} />
						<SpaceChip item={dataset} selectedItem={selectedDataset} />
					</ListItem>
				);
			} else if (dataset.format === "Network") {
				return (
					<ListItem
						button
						onClick={() => onClickDataset(dataset.id)}
						selected={dataset.id === selectedDataset.id}
						key={dataset.id}
					>
						<Tooltip title="Network">
							<ListItemIcon>
								<NetworkIcon fontSize="small" />
							</ListItemIcon>
						</Tooltip>
						<ListItemText primary={`${dataset.title} - ${dataset.creator.capitalize()}`} />
						<SpaceChip item={dataset} selectedItem={selectedDataset} />
					</ListItem>
				);
			} else {
				return (
					<ListItem
						button
						onClick={() => onClickDataset(dataset.id)}
						selected={dataset.id === selectedDataset.id}
						key={dataset.id}
					>
						<Tooltip title="Unknown Type">
							<ListItemIcon>
								<UnknownIcon fontSize="small" />
							</ListItemIcon>
						</Tooltip>
						<ListItemText primary={`${dataset.title} - ${dataset.creator.capitalize()}`} />
						<SpaceChip item={dataset} selectedItem={selectedDataset} />
					</ListItem>
				);
			}
		});
	}

	// selected dataset
	let selected_dataset_detail = {};
	if (selectedDataset) {
		for (let item in selectedDataset) {
			if (redundantProp.indexOf(item) === -1) {
				selected_dataset_detail[item] = selectedDataset[item];
			}
		}
	}

	// after selected an item
	let file_list = "";
	let file_contents = "";
	let right_column = "";
	if (selectedDataset) {
		// file list
		file_list = selectedDataset.fileDescriptors.map((file_descriptor) => (
			<ListItem
				button
				onClick={() => onClickFileDescriptor(selectedDataset.id, file_descriptor.id, file_descriptor.filename)}
				key={file_descriptor.id}
			>
				<ListItemText>{file_descriptor.filename}</ListItemText>
			</ListItem>
		));
		// file contents
		if (fileExtension && fileData && fileExtension === "csv") {
			let data = fileData.map((data) => data.split(","));
			file_contents = (
				<div>
					<Typography variant="h6">File Content Preview</Typography>
					<FileContentTable container="data_container" data={data.slice(2, 8)} colHeaders={data[0]} />
				</div>
			);
		} else if (fileExtension === "xml" || fileExtension === "txt") {
			file_contents = (
				<div>
					<Typography variant="h6">File Content Preview</Typography>
					<Card>
						<CardContent>
							<Typography variant="body2" noWrap>
								{fileData}
							</Typography>
						</CardContent>
					</Card>
				</div>
			);
		}
		// right column
		if (
			selectedDatasetFormat.toLowerCase() === "shapefile" ||
			selectedDatasetFormat.toLowerCase() === "raster" ||
			selectedDatasetFormat.toLowerCase().includes("geotif")
		) {
			right_column = (
				<div>
					<Typography variant="h6">Map</Typography>
					<Map datasetId={selectedDataset.id} boundingBox={selectedDataset.boundingBox} />
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

	if (authError) {
		browserHistory.push("/login?origin=DataViewer");
		return null;
	} else {
		return (
			<div>
				{/*error message display inside viewer*/}
				<ErrorMessage
					error=""
					message="You do not have the privilege to delete this item."
					messageOpen={messageOpen}
					closeErrorMessage={closeErrorMessage}
				/>
				<Confirmation
					confirmOpen={confirmOpen}
					actionBtnName="Delete"
					actionText="Once deleted, you won't be able to revert this!"
					handleConfirmed={handleConfirmed}
					handleCanceled={handleCanceled}
				/>
				<div className={classes.root}>
					<Grid container spacing={4}>
						{/*filters*/}
						<Grid item lg={8} sm={8} xl={8} xs={12}>
							<Paper variant="outlined" className={classes.filter}>
								<div className={classes.selectDiv}>
									<Datatype
										selectedDataType={selectedDataType}
										datatypes={datatypes}
										handleDatatypeSelection={changeDatasetType}
									/>
								</div>
								<div className={classes.selectDiv}>
									<Space
										selectedSpace={selectedSpace}
										spaces={spaces}
										handleSpaceSelection={changeSpaceSelection}
									/>
								</div>
								<div className={classes.selectDiv}>
									<DataPerPage dataPerPage={dataPerPage} changeDataPerPage={changeDataPerPage} />
								</div>
							</Paper>
						</Grid>
						<Grid item lg={4} sm={4} xl={4} xs={12}>
							<Paper variant="outlined" className={classes.filter}>
								<Typography variant="h6">Search all</Typography>
								<TextField
									variant="outlined"
									label="Search"
									onKeyPress={handleKeyPressed}
									value={searchText}
									onChange={(e) => {
										setSearchText(e.target.value);
									}}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton onClick={clickSearch}>
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
							lg={selectedDataset && !metadataClosed ? 4 : 12}
							md={selectedDataset && !metadataClosed ? 4 : 12}
							xl={selectedDataset && !metadataClosed ? 4 : 12}
							xs={12}
						>
							<LoadingOverlay active={loading} spinner text="Loading ...">
								<Paper variant="outlined" className={classes.main}>
									<div className={classes.paperHeader}>
										<Typography variant="subtitle1">Dataset</Typography>
									</div>
									<List component="nav">{list_items}</List>
									<div className={classes.paperFooter}>
										<Pagination
											pageNumber={pageNumber}
											data={list_items}
											dataPerPage={dataPerPage}
											previous={() => pageChange("previous")}
											next={() => pageChange("next")}
										/>
									</div>
								</Paper>
							</LoadingOverlay>
						</Grid>

						{/*metadata*/}
						<Grid item lg={8} md={8} xl={8} xs={12} className={selectedDataset ? null : classes.hide}>
							<Paper variant="outlined" className={classes.main}>
								<IconButton
									aria-label="Close"
									onClick={handleCloseMetadata}
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
												onClick={exportJson}
											>
												Download Metadata
											</Button>
											<Button
												color="primary"
												variant="contained"
												className={classes.inlineButtons}
												size="small"
												onClick={downloadDataset}
											>
												Download Dataset
											</Button>
											<Button
												color="primary"
												variant="contained"
												className={classes.inlineButtons}
												size="small"
												onClick={handlePreviewOpen}
											>
												Preview
											</Button>
											<CopyToClipboard text={selectedDataset.id}>
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
												onClick={onClickDelete}
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
				{selectedDataset ? (
					<Dialog open={preview} onClose={handlePreviewClose} maxWidth="lg" fullWidth scroll="paper">
						<DialogContent className={classes.preview}>
							<IconButton
								aria-label="Close"
								onClick={handlePreviewClose}
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
};

export default DataViewer;
