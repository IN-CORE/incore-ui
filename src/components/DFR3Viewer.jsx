import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { browserHistory } from "react-router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LoadingOverlay from "react-loading-overlay";

import "whatwg-fetch";
import {
	Button,
	Dialog,
	DialogContent,
	Divider,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { createTheme, makeStyles } from "@material-ui/core/styles/index";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import config from "../app.config";
import { exportJson, is3dCurve } from "../utils/common";
import { fetchPlot } from "../actions/plotting";
import chartConfig from "./config/ChartConfig";
import Pagination from "./children/Pagination";
import DataPerPage from "./children/DataPerPage";
import Space from "./children/Space";
import Version from "./children/Version";
import ErrorMessage from "./children/ErrorMessage";
import Confirmation from "./children/Confirmation";
import DFR3CurvesGroupList from "./children/DFR3CurvesGroupList";
import DFR3MappingsGroupList from "./children/DFR3MappingsGroupList";
import CustomHighChart from "./children/CustomHighChart";
import NestedInfoTable from "./children/NestedInfoTable";
import ThreeDimensionalPlot from "./children/ThreeDimensionalPlot";
import { trackPageview, trackEvent } from "./analytics";

import {
	fetchDFR3Curves,
	fetchDFR3Mappings,
	fetchSpaces,
	searchDFR3Curves,
	searchDFR3Mappings,
	deleteItemById,
	resetError
} from "../actions";

import Cookies from "universal-cookie";

const cookies = new Cookies();
const redundantProp = ["legacyId", "privileges", "creator", "is3dPlot", "spaces"];

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
		width: "20%"
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
	previewTable: {
		width: "80%",
		margin: "50px auto"
	},
	metadataCloseButton: {
		float: "right"
	}
}));

const DFR3Viewer = () => {
	const classes = useStyles();

	const [selectedDFR3Type, setSelectedDFR3Type] = React.useState("fragilities");
	const [selectedInventory, setSelectedInventory] = React.useState("All");
	const [selectedHazard, setSelectedHazard] = React.useState("All");
	const [selectedSpace, setSelectedSpace] = React.useState("All");
	const [selectedDFR3Curve, setSelectedDFR3Curve] = React.useState(null);
	const [selectedMapping, setSelectedMapping] = React.useState("");
	const [searchText, setSearchText] = React.useState("");
	const [registeredSearchText, setRegisteredSearchText] = React.useState("");
	const [searching, setSearching] = React.useState(false);
	const [chartConfigVar, setChartConfigVar] = React.useState(chartConfig);
	const [plotData3D, setPlotData3D] = React.useState({});
	const [preview, setPreview] = React.useState(false);
	const [offset, setOffset] = React.useState(0);
	const [pageNumber, setPageNumber] = React.useState(1);
	const [dataPerPage, setDataPerPage] = React.useState(50);
	const [offsetMappings, setOffsetMappings] = React.useState(0);
	const [pageNumberMappings, setPageNumberMappings] = React.useState(1);
	const [urlPrefix, setUrlPrefix] = React.useState(config.urlPrefix);
	const [tabIndex, setTabIndex] = React.useState(0);
	const [error, setError] = React.useState("");
	const [message, setMessage] = React.useState("");
	const [messageOpen, setMessageOpen] = React.useState(false);
	const [confirmOpen, setConfirmOpen] = React.useState(false);
	const [deleteType, setDeleteType] = React.useState("curve");
	const [metadataClosed, setMetadataClosed] = React.useState(true);
	const dispatch = useDispatch();
	const authError = useSelector((state) => state.user.loginError);
	const forbidden = useSelector((state) => state.user.forbidden);
	const deleteError = useSelector((state) => state.dfr3Curve.deleteError || state.dfr3Mapping.deleteError);
	const curvesLoading = useSelector((state) => state.dfr3Curve.loading);
	const mappingsLoading = useSelector((state) => state.dfr3Mapping.loading);
	const spaces = useSelector((state) => state.space.spaces);
	const dfr3Curves = useSelector((state) => state.dfr3Curve.dfr3Curves);
	const dfr3Mappings = useSelector((state) => state.dfr3Mapping.dfr3Mappings);

	React.useEffect(() => {
		// check if logged in
		let authorization = cookies.get("Authorization");
		if (
			config.hostname.includes("localhost") ||
			(authorization !== undefined && authorization !== "" && authorization !== null)
		) {
			fetchSpaces()(dispatch);
			fetchDFR3Curves(
				selectedDFR3Type,
				selectedSpace,
				selectedInventory,
				selectedHazard,
				dataPerPage,
				offset
			)(dispatch);
			fetchDFR3Mappings(
				selectedDFR3Type,
				selectedSpace,
				selectedInventory,
				selectedHazard,
				dataPerPage,
				offsetMappings
			)(dispatch);
		} else {
			dispatch({ type: "LOGIN_ERROR" });
		}
		dispatch(resetError);
		// Call trackPageview to track page view
		trackPageview(window.location.pathname);
	}, []);

	React.useEffect(() => {
		if (deleteError && !messageOpen) {
			setMessage("You do not have the privilege to delete this item.");
			setError("");
			setMessageOpen(true);
		} else if (!deleteError && messageOpen) {
			setMessageOpen(false);
		}
	}, [messageOpen]);

	React.useEffect(() => {
		if (!searching){
			fetchDFR3Curves(
				selectedDFR3Type,
				selectedSpace,
				selectedInventory,
				selectedHazard,
				dataPerPage,
				offset
			)(dispatch);
			fetchDFR3Mappings(
				selectedDFR3Type,
				selectedSpace,
				selectedInventory,
				selectedHazard,
				dataPerPage,
				offsetMappings
			)(dispatch);
		}
	}, [selectedDFR3Type, selectedInventory, selectedSpace, selectedHazard]);

	const resetCommonParameters = () => {
		setSearching(false);
		setSearchText("");
		setRegisteredSearchText("");
		setSelectedDFR3Curve(null);
		setPageNumber(1);
		setOffset(0);
		setPageNumberMappings(1);
		setOffsetMappings(0);
		setSelectedMapping("");
	};

	const handleDFR3TypeChange = (event) => {
		resetCommonParameters();
		setSelectedDFR3Type(event.target.value);
		setMetadataClosed(false);
	};

	const handleInventoryTypeChange = (event) => {
		resetCommonParameters();
		setSelectedInventory(event.target.value);
	};

	const handleHazardTypeChange = (event) => {
		resetCommonParameters();
		setSelectedHazard(event.target.value);
	};

	const handleSpaceChange = (event) => {
		resetCommonParameters();
		setSelectedSpace(event.target.value);
	};

	const handleTabChange = (event, value) => {
		setTabIndex(value);
	};

	const setSearchState = () => {
		setRegisteredSearchText(searchText);
		setSearching(true);
		setSelectedDFR3Curve(null);
		setPageNumber(1);
		setOffset(0);
		setPageNumberMappings(1);
		setOffsetMappings(0);
		setSelectedMapping("");
		setSelectedInventory("All");
		setSelectedSpace("All");
		setSelectedHazard("All");
	};

	const handleKeyPressed = (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();
			setSearchState();
		}
	};

	const clickSearch = () => {
		setSearchState();
	};

	React.useEffect(() => {
		if (registeredSearchText !== "") {
			searchDFR3Curves(selectedDFR3Type, registeredSearchText, dataPerPage, offset)(dispatch);
			searchDFR3Mappings(selectedDFR3Type, registeredSearchText, dataPerPage, offsetMappings)(dispatch);
		} else if (registeredSearchText === "" && searching) {
			fetchDFR3Curves(
				selectedDFR3Type,
				selectedSpace,
				selectedInventory,
				selectedHazard,
				dataPerPage,
				offset
			)(dispatch);
			fetchDFR3Mappings(
				selectedDFR3Type,
				selectedSpace,
				selectedInventory,
				selectedHazard,
				dataPerPage,
				offsetMappings
			)(dispatch);
		}
	}, [registeredSearchText]);

	const generate2dPlotData = async (DFR3Curve) => {
		let updatedChartConfig = Object.assign({}, chartConfig.DFR3Config);

		let error = "";

		let description = DFR3Curve.description !== null ? DFR3Curve.description : "";
		let authors = DFR3Curve.authors.join(", ");
		updatedChartConfig.title.text = `${description} [${authors}]`;

		updatedChartConfig.series = [];

		// fragility curve using plotting services
		if ("fragilityCurves" in DFR3Curve) {
			let demandTypes = DFR3Curve.demandTypes.length > 0 ? DFR3Curve.demandTypes.join(", ") : "";
			let demandUnits = DFR3Curve.demandUnits.length > 0 ? DFR3Curve.demandUnits.join(", ") : "";
			updatedChartConfig.xAxis.title.text = `${demandTypes} (${demandUnits})`;

			let [requestStatus, response] = await fetchPlot(DFR3Curve);
			if (requestStatus === 200) {
				Object.keys(response).map((key) => {
					let series = {
						marker: {
							enabled: false
						},
						name: key,
						data: response[key]
					};
					updatedChartConfig.series.push(series);
				});
			} else {
				error = response;
			}
		}

		return [updatedChartConfig, error];
	};

	const generate3dPlotData = async (DFR3Curve) => {
		let [requestStatus, response] = await fetchPlot(DFR3Curve);
		let error = "";

		if (requestStatus === 200) {
			let limitState = Object.keys(response)[0];
			let description = DFR3Curve.description !== null ? DFR3Curve.description : "";
			let authors = DFR3Curve.authors.join(", ");
			let title = `${description} [${authors}] - ${limitState}`;

			//TODO For now only plot the first limit state; but in the future may add tabs to plot all states
			return [{ data: response[limitState], title: title }, error];
		} else {
			error = response;
			return [{ data: null, title: null }, error];
		}
	};

	const onClickDFR3Curve = async (DFR3Curve) => {
		let plotData3d = {};
		let plotConfig2d = {};
		let message = "Something is wrong with this DFR3 Curve definition. We cannot display its preview.";
		let error = "";

		if (DFR3Curve.fragilityCurves && is3dCurve(DFR3Curve)) {
			[plotData3d, error] = await generate3dPlotData(DFR3Curve);
		} else if (DFR3Curve.fragilityCurves && !is3dCurve(DFR3Curve)) {
			[plotConfig2d, error] = await generate2dPlotData(DFR3Curve);
		}

		// Call trackEvent to track the dataset selection event
		trackEvent("DFR3 Curve Selection", "Select DFR3 Curve", `DFR3 Curve ${DFR3Curve.id} Selected`);

		setChartConfigVar(plotConfig2d);
		setPlotData3D(plotData3d);
		setSelectedDFR3Curve(DFR3Curve);
		setError(`DFR3 Curve ID:${DFR3Curve.id}%0D%0A%0D%0A${error}`);
		setMessage(message);
		setMessageOpen(error !== "");
		setMetadataClosed(false);
	};

	const onClickDFR3Mapping = (DFR3Mapping) => {
		// Call trackEvent to track the dataset selection event
		trackEvent("DFR3 Mapping Selection", "Select DFR3 Mapping", `DFR3 Mapping ${DFR3Mapping.id} Selected`);
		setSelectedMapping(DFR3Mapping);
		setMetadataClosed(false);
	};

	const onClickDelete = (deleteType) => {
		// Call trackEvent to track the delete event
		trackEvent("Button Click", "Delete", "Delete Button Clicked");
		setConfirmOpen(true);
		setDeleteType(deleteType);
	};

	const deleteMappingConfirmed = () => {
		deleteItemById("mappings", selectedMapping.id)(dispatch);
		setSelectedMapping("");
		setConfirmOpen(false);
	};

	const deleteCurveConfirmed = () => {
		deleteItemById(selectedDFR3Type, selectedDFR3Curve.id)(dispatch);
		setSelectedDFR3Curve("");
		setConfirmOpen(false);
	};

	const handleCanceled = () => {
		setConfirmOpen(false);
	};

	const closeErrorMessage = () => {
		dispatch(resetError);
		setMessage("");
		setError("");
		setMessageOpen(false);
	};

	const pageChange = (direction, for_mapping) => {
		if (direction === "previous") {
			setOffset((pageNumber - 2) * dataPerPage);
			setPageNumber(pageNumber - 1);
		} else if (direction === "next") {
			setOffset(pageNumber * dataPerPage);
			setPageNumber(pageNumber + 1);
		} else if (direction === "previousMapping") {
			setOffsetMappings((pageNumberMappings - 2) * dataPerPage);
			setPageNumberMappings(pageNumberMappings - 1);
		} else if (direction === "nextMapping") {
			setOffsetMappings(pageNumberMappings * dataPerPage);
			setPageNumberMappings(pageNumberMappings + 1);
		}

		if (for_mapping) {
			setSelectedMapping("");
		} else {
			setSelectedDFR3Curve("");
		}
	};

	React.useEffect(() => {
		if (registeredSearchText !== "" && searching) {
			searchDFR3Mappings(selectedDFR3Type, registeredSearchText, dataPerPage, offsetMappings)(dispatch);
		} else {
			fetchDFR3Mappings(
				selectedDFR3Type,
				selectedSpace,
				selectedInventory,
				selectedHazard,
				dataPerPage,
				offsetMappings
			)(dispatch);
		}
	}, [offsetMappings, pageNumberMappings, dataPerPage]);

	React.useEffect(() => {
		if (registeredSearchText !== "" && searching) {
			searchDFR3Curves(selectedDFR3Type, registeredSearchText, dataPerPage, offset)(dispatch);
		} else {
			fetchDFR3Curves(
				selectedDFR3Type,
				selectedSpace,
				selectedInventory,
				selectedHazard,
				dataPerPage,
				offset
			)(dispatch);
		}
	}, [offset, pageNumber, dataPerPage]);

	const changeDataPerPage = (event) => {
		setPageNumber(1);
		setOffset(0);
		setSearchText("");
		setRegisteredSearchText("");
		setSelectedDFR3Curve("");
		setDataPerPage(event.target.value);
		setPageNumberMappings(1);
		setOffsetMappings(0);
		setSelectedMapping("");
	};

	const exportMappingJson = () => {
		exportJson(selectedMapping);
	};

	const exportCurveJson = () => {
		let { is3dPlot, ...metadataJson } = selectedDFR3Curve;
		exportJson(metadataJson);
	};

	const handlePreviewOpen = () => {
		setPreview(true);
	};

	const handlePreviewClose = () => {
		setPreview(false);
	};

	const extractCurveInfoTable = (DFR3Curve) => {
		let curveInfo = {};
		if (DFR3Curve["fragilityCurves"] !== undefined) {
			DFR3Curve["fragilityCurves"].map((curve) => {
				curveInfo[curve["returnType"]["description"]] = curve["rules"];
			});
		}
		return curveInfo;
	};

	const extractParamTable = (DFR3Curve) => {
		let params = {};
		if (DFR3Curve["curveParameters"] !== undefined) {
			DFR3Curve["curveParameters"].map((curveParam) => {
				params[curveParam["name"]] = {};
				params[curveParam["name"]]["expression"] = curveParam["expression"];
				params[curveParam["name"]]["description"] = curveParam["description"];
			});
		}
		return params;
	};

	const handleCloseMetadata = () => {
		setMetadataClosed(true);
	};

	// curve list
	const curveList = [...dfr3Curves];
	let curvesWithInfo = [];
	if (curveList.length > 0) {
		curveList.map((DFR3Curve) => {
			curvesWithInfo.push(DFR3Curve);
		});
	}

	// selected Curves
	let selectedCurveDetail = {};
	if (selectedDFR3Curve) {
		for (let item in selectedDFR3Curve) {
			if (redundantProp.indexOf(item) === -1) {
				selectedCurveDetail[item] = selectedDFR3Curve[item];
			}
		}
	}

	let mappingsList = dfr3Mappings;
	let mappingsWithInfo = [];
	if (mappingsList.length > 0) {
		mappingsList.map((DFR3Mappings) => {
			mappingsWithInfo.push(DFR3Mappings);
		});
	}

	// selected Curves
	let selectedMappingDetails = {};
	if (selectedMapping) {
		for (let item in selectedMapping) {
			if (redundantProp.indexOf(item) === -1) {
				selectedMappingDetails[item] = selectedMapping[item];
			}
		}
	}

	if (authError) {
		browserHistory.push("/login?origin=DFR3Viewer");
		return null;
	}
	else if (forbidden){
		browserHistory.push("/forbidden");
		return null;
					}
	else {
		return (
			<div>
				{/*error message display inside viewer*/}
				<ErrorMessage
					error={error}
					message={message}
					messageOpen={messageOpen}
					closeErrorMessage={closeErrorMessage}
				/>
				{deleteType === "curve" ? (
					<Confirmation
						confirmOpen={confirmOpen}
						actionBtnName="Delete"
						actionText="Once deleted, you won't be able to revert this!"
						handleConfirmed={deleteCurveConfirmed}
						handleCanceled={handleCanceled}
					/>
				) : (
					<Confirmation
						confirmOpen={confirmOpen}
						actionBtnName="Delete"
						actionText="Once deleted, you won't be able to revert this!"
						handleConfirmed={deleteMappingConfirmed}
						handleCanceled={handleCanceled}
					/>
				)}

				<div className={classes.root}>
					<Grid container spacing={4}>
						{/*filters*/}
						<Grid item lg={8} sm={8} xl={8} xs={12}>
							<Paper variant="outlined" className={classes.filter}>
								<Typography variant="h6">Filters</Typography>
								{/* select dfr3 curve type */}
								<div className={classes.selectDiv}>
									<InputLabel>Curve Type</InputLabel>
									<Select
										value={selectedDFR3Type}
										onChange={handleDFR3TypeChange}
										className={classes.select}
									>
										<MenuItem value="fragilities" key="fragilities" className={classes.denseStyle}>
											Fragility
										</MenuItem>
										<MenuItem
											value="restorations"
											key="restorations"
											className={classes.denseStyle}
										>
											Restoration
										</MenuItem>
										<MenuItem value="repairs" key="repairs" className={classes.denseStyle}>
											Repair
										</MenuItem>
									</Select>
								</div>
								{/* Hazard Type */}
								<div className={classes.selectDiv}>
									<InputLabel>Hazard Type</InputLabel>
									<Select
										value={selectedHazard}
										onChange={handleHazardTypeChange}
										className={classes.select}
									>
										<MenuItem value="All" className={classes.denseStyle}>
											All
										</MenuItem>
										<MenuItem value="earthquake" className={classes.denseStyle}>
											Earthquake
										</MenuItem>
										<MenuItem value="tornado" className={classes.denseStyle}>
											Tornado
										</MenuItem>
										<MenuItem value="hurricane" className={classes.denseStyle}>
											Hurricane
										</MenuItem>
										<MenuItem value="hurricaneWindfield" className={classes.denseStyle}>
											Hurricane Windfield
										</MenuItem>
										<MenuItem value="earthquake%2btsunami" className={classes.denseStyle}>
											Earthquake + Tsunami
										</MenuItem>
										<MenuItem value="tsunami" className={classes.denseStyle}>
											Tsunami
										</MenuItem>
										<MenuItem value="flood" className={classes.denseStyle}>
											Flood
										</MenuItem>
									</Select>
								</div>
								{/* Inventory Type */}
								<div className={classes.selectDiv}>
									<InputLabel>Inventory Type</InputLabel>
									<Select
										value={selectedInventory}
										onChange={handleInventoryTypeChange}
										className={classes.select}
									>
										<MenuItem value="All" className={classes.denseStyle}>
											All
										</MenuItem>
										<MenuItem value="building" className={classes.denseStyle}>
											Building
										</MenuItem>
										<MenuItem value="bridge" className={classes.denseStyle}>
											Bridge
										</MenuItem>
										<Divider />
										<MenuItem value="roadway" className={classes.denseStyle}>
											Roadway
										</MenuItem>
										<Divider />
										<MenuItem value="electric_facility" className={classes.denseStyle}>
											Electric Power Facility
										</MenuItem>
										<MenuItem value="electric_power_line" className={classes.denseStyle}>
											Eletric Power Line
										</MenuItem>
										<MenuItem value="water_facility" className={classes.denseStyle}>
											Water Facility
										</MenuItem>
										<MenuItem value="buried_pipeline" className={classes.denseStyle}>
											Water Pipeline
										</MenuItem>
										<MenuItem value="gas_facility" className={classes.denseStyle}>
											Gas Facility
										</MenuItem>
									</Select>
								</div>
								{/*spaces*/}
								<div className={classes.selectDiv}>
									<Space
										selectedSpace={selectedSpace}
										spaces={spaces}
										handleSpaceSelection={handleSpaceChange}
									/>
								</div>
								{/*Data per page */}
								<div className={classes.selectDiv}>
									<DataPerPage dataPerPage={dataPerPage} changeDataPerPage={changeDataPerPage} />
								</div>
							</Paper>
						</Grid>
						<Grid item lg={4} sm={4} xl={4} xs={12}>
							<Paper variant="outlined" className={classes.filter}>
								<Typography variant="h6">Search all {selectedDFR3Type} & mappings</Typography>
								<TextField
									variant="outlined"
									label="Search"
									onKeyDown={handleKeyPressed}
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
										)
									}}
									margin="dense"
									className={classes.search}
								/>
							</Paper>
						</Grid>
					</Grid>

					<Tabs value={tabIndex} onChange={handleTabChange}>
						<Tab label="DFR3 Curves" />
						<Tab label="DFR3 Mappings" />
					</Tabs>

					{/*lists*/}
					{tabIndex === 0 ? (
						<Grid container spacing={4}>
							<Grid
								item
								lg={selectedDFR3Curve && !metadataClosed ? 4 : 12}
								md={selectedDFR3Curve && !metadataClosed ? 4 : 12}
								xl={selectedDFR3Curve && !metadataClosed ? 4 : 12}
								xs={12}
							>
								<LoadingOverlay active={curvesLoading} spinner text="Loading ...">
									<Paper variant="outlined" className={classes.main}>
										<div className={classes.paperHeader}>
											<Typography variant="subtitle1">DFR3 Curves</Typography>
										</div>
										<DFR3CurvesGroupList
											id="DFR3Curve-list"
											onClick={onClickDFR3Curve}
											data={curvesWithInfo}
											displayField="author"
											selectedDFR3Curve={selectedDFR3Curve}
										/>
										<div className={classes.paperFooter}>
											<Pagination
												pageNumber={pageNumber}
												data={curvesWithInfo}
												dataPerPage={dataPerPage}
												previous={() => pageChange("previous", false)}
												next={() => pageChange("next", false)}
											/>
										</div>
									</Paper>
								</LoadingOverlay>
							</Grid>
							{metadataClosed ? (
								<></>
							) : (
								<Grid item lg={8} md={8} xl={8} xs={12}>
									<Paper variant="outlined" className={classes.main}>
										<IconButton
											aria-label="Close"
											onClick={handleCloseMetadata}
											className={classes.metadataCloseButton}
										>
											<CloseIcon fontSize="small" />
										</IconButton>
										{Object.keys(selectedCurveDetail).length > 0 ? (
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
														onClick={exportCurveJson}
													>
														Download Metadata
													</Button>
													{
														// TODO: This should be updated with conditions for repair and restoration
														//  curves when they are refactored to new equation based format
														// 	cannot plot 3d refactored fragility curves yet

														(() => {
															if (selectedDFR3Curve.fragilityCurves) {
																if (
																	is3dCurve(selectedDFR3Curve) &&
																	plotData3D.data &&
																	plotData3D.data.length > 0
																) {
																	return (
																		<Button
																			color="primary"
																			variant="contained"
																			className={classes.inlineButtons}
																			size="small"
																			onClick={handlePreviewOpen}
																		>
																			Preview
																		</Button>
																	);
																} else if (
																	!is3dCurve(selectedDFR3Curve) &&
																	chartConfigVar.series.length > 0
																) {
																	return (
																		<Button
																			color="primary"
																			variant="contained"
																			className={classes.inlineButtons}
																			size="small"
																			onClick={handlePreviewOpen}
																		>
																			Preview
																		</Button>
																	);
																} else {
																	return (
																		<Button
																			color="primary"
																			variant="contained"
																			className={classes.inlineButtons}
																			size="small"
																			disabled
																		>
																			Preview N/A
																		</Button>
																	);
																}
															} else {
																return (
																	<Button
																		color="primary"
																		variant="contained"
																		className={classes.inlineButtons}
																		size="small"
																		disabled
																	>
																		Preview N/A
																	</Button>
																);
															}
														})()
													}
													<CopyToClipboard text={selectedDFR3Curve.id}>
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
														style={{ float: "right", color: "red", borderColor: "red" }}
														size="small"
														onClick={() => {
															onClickDelete("curve");
														}}
													>
														DELETE
													</Button>
												</div>
												<div className={classes.metadata}>
													<NestedInfoTable data={selectedCurveDetail} />
												</div>
											</div>
										) : (
											<div />
										)}
									</Paper>
								</Grid>
							)}
							{/* Preview */}
							{selectedDFR3Curve ? (
								<Dialog
									open={preview}
									onClose={handlePreviewClose}
									maxWidth="lg"
									fullWidth
									scroll="paper"
								>
									<DialogContent className={classes.preview}>
										<IconButton
											aria-label="Close"
											onClick={handlePreviewClose}
											className={classes.previewClose}
										>
											<CloseIcon fontSize="small" />
										</IconButton>
										{is3dCurve(selectedDFR3Curve) ? (
											<div>
												<Typography variant="h6">{plotData3D.title}</Typography>
												<ThreeDimensionalPlot
													plotId="3dplot"
													data={plotData3D.data}
													xLabel={selectedDFR3Curve.demandTypes.join(", ")}
													yLabel="Y"
													width="100%"
													height="350px"
													style="surface"
												/>
											</div>
										) : (
											<CustomHighChart
												chartId="chart"
												configuration={chartConfigVar}
												customClassName="linecharts-container"
											/>
										)}
										<div className={classes.previewTable}>
											<Typography variant="body1">Table 1. Curve Information</Typography>
											<NestedInfoTable data={extractCurveInfoTable(selectedDFR3Curve)} />
										</div>
										<div className={classes.previewTable}>
											<Typography variant="body1">Table 2. Default Curve Parameters</Typography>
											<NestedInfoTable data={extractParamTable(selectedDFR3Curve)} />
										</div>
									</DialogContent>
								</Dialog>
							) : (
								<div />
							)}
						</Grid>
					) : (
						<div />
					)}

					{tabIndex === 1 ? (
						<Grid container spacing={4}>
							<Grid
								item
								lg={selectedMapping && !metadataClosed ? 4 : 12}
								md={selectedMapping && !metadataClosed ? 4 : 12}
								xl={selectedMapping && !metadataClosed ? 4 : 12}
								xs={12}
							>
								<LoadingOverlay active={mappingsLoading} spinner text="Loading ...">
									<Paper variant="outlined" className={classes.main}>
										<div className={classes.paperHeader}>
											<Typography variant="subtitle1">DFR3 Mappings</Typography>
										</div>
										<DFR3MappingsGroupList
											id="DFR3Mappings-list"
											onClick={onClickDFR3Mapping}
											data={mappingsWithInfo}
											displayField="name"
											selectedMapping={selectedMapping}
										/>
										<div className={classes.paperFooter}>
											<Pagination
												pageNumber={pageNumberMappings}
												data={mappingsWithInfo}
												dataPerPage={dataPerPage}
												previous={() => pageChange("previousMapping", true)}
												next={() => pageChange("nextMapping", true)}
											/>
										</div>
									</Paper>
								</LoadingOverlay>
							</Grid>

							<Grid item lg={8} md={8} xl={8} xs={12} className={selectedMapping ? null : classes.hide}>
								<Paper variant="outlined" className={classes.main}>
									<IconButton
										aria-label="Close"
										onClick={handleCloseMetadata}
										className={classes.metadataCloseButton}
									>
										<CloseIcon fontSize="small" />
									</IconButton>
									{Object.keys(selectedMappingDetails).length > 0 ? (
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
													onClick={exportMappingJson}
												>
													Download Metadata
												</Button>
												<CopyToClipboard text={selectedMapping.id}>
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
													style={{ float: "right", color: "red", borderColor: "red" }}
													size="small"
													onClick={() => {
														onClickDelete("mapping");
													}}
												>
													DELETE
												</Button>
											</div>
											<div className={classes.metadata}>
												<NestedInfoTable data={selectedMappingDetails} />
											</div>
										</div>
									) : (
										<div />
									)}
								</Paper>
							</Grid>
						</Grid>
					) : (
						<div />
					)}

					<Version />
				</div>
			</div>
		);
	}
};

export default DFR3Viewer;
