import React from "react";
import DFR3CurvesGroupList from "./children/DFR3CurvesGroupList";
import DFR3MappingsGroupList from "./children/DFR3MappingsGroupList";
import CustomHighChart from "./children/CustomHighChart";
import NestedInfoTable from "./children/NestedInfoTable";
// import ThreeDimensionalPlot from "./children/ThreeDimensionalPlot";
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
import chartConfig from "./config/ChartConfig";
import config from "../app.config";
import { browserHistory } from "react-router";
import Pagination from "./children/Pagination";
import DataPerPage from "./children/DataPerPage";
import Space from "./children/Space";
import Version from "./children/Version";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { createMuiTheme, withStyles } from "@material-ui/core/styles/index";
import Cookies from "universal-cookie";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { exportJson, is3dCurve } from "../utils/common";
import ErrorMessage from "./children/ErrorMessage";
import Confirmation from "./children/Confirmation";
import LoadingOverlay from "react-loading-overlay";

import { fetchPlot } from "../actions/plotting";
import ThreeDimensionalPlot from "./children/ThreeDimensionalPlot";
import { trackPageview, trackEvent } from "./analytics";

const cookies = new Cookies();
const redundantProp = ["legacyId", "privileges", "creator", "is3dPlot", "spaces"];

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
	previewTable: {
		width: "80%",
		margin: "50px auto"
	},
	metadataCloseButton: {
		float: "right"
	}
};

class DFR3Viewer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedDFR3Type: "fragilities",
			selectedInventory: "All",
			selectedHazard: "All",
			selectedSpace: "All",
			selectedDFR3Curve: null,
			selectedMapping: "",
			searchText: "",
			registeredSearchText: "",
			searching: false,
			chartConfig: chartConfig.DFR3Config,
			plotData3d: {},
			authError: false,
			spaces: [],
			preview: false,
			offset: 0,
			pageNumber: 1,
			dataPerPage: 50,
			offsetMappings: 0,
			pageNumberMappings: 1,
			urlPrefix: config.urlPrefix,
			tabIndex: 0,
			error: "",
			message: "",
			messageOpen: false,
			confirmOpen: false,
			deleteType: "curve", // or mapping
			curvesLoading: false,
			mappingsLoading: false,
			metadataClosed: true
		};

		this.changeDFR3Type = this.changeDFR3Type.bind(this);
		this.onClickDFR3Curve = this.onClickDFR3Curve.bind(this);
		this.onClickDFR3Mapping = this.onClickDFR3Mapping.bind(this);
		this.onClickDelete = this.onClickDelete.bind(this);
		this.deleteCurveConfirmed = this.deleteCurveConfirmed.bind(this);
		this.deleteMappingConfirmed = this.deleteMappingConfirmed.bind(this);
		this.handleCanceled = this.handleCanceled.bind(this);
		this.closeErrorMessage = this.closeErrorMessage.bind(this);
		this.handleInventorySelection = this.handleInventorySelection.bind(this);
		this.handleHazardSelection = this.handleHazardSelection.bind(this);
		this.setSearchState = this.setSearchState.bind(this);
		this.handleKeyPressed = this.handleKeyPressed.bind(this);
		this.clickSearch = this.clickSearch.bind(this);
		this.preview = this.preview.bind(this);
		this.exportCurveJson = this.exportCurveJson.bind(this);
		this.exportMappingJson = this.exportMappingJson.bind(this);
		this.previous = this.previous.bind(this);
		this.next = this.next.bind(this);
		this.previousMappings = this.previousMappings.bind(this);
		this.nextMappings = this.nextMappings.bind(this);
		this.handlePreviewerClose = this.handlePreviewerClose.bind(this);
		this.changeDataPerPage = this.changeDataPerPage.bind(this);
		this.handleSpaceSelection = this.handleSpaceSelection.bind(this);
		this.closeMetadata = this.closeMetadata.bind(this);
	}

	async componentWillMount() {
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
					this.props.getAllDFR3Curves(
						this.state.selectedDFR3Type,
						this.state.selectedSpace,
						this.state.selectedInventory,
						this.state.selectedHazard,
						this.state.dataPerPage,
						this.state.offset
					);
					this.props.getAllDFR3Mappings(
						this.state.selectedDFR3Type,
						this.state.selectedSpace,
						this.state.selectedInventory,
						this.state.selectedHazard,
						this.state.dataPerPage,
						this.state.offsetMappings
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
		// Call trackPageview to track page view
		trackPageview(window.location.pathname);

		// reset delete error
		this.props.resetError();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			authError: nextProps.authError,
			curvesLoading: nextProps.curvesLoading,
			mappingsLoading: nextProps.mappingsLoading
		});
	}

	// TODO set state inside componentDidUpdate is bad practice!!
	// DELETE error
	componentDidUpdate(prevProps, prevState) {
		if (this.props.deleteError && !prevState.messageOpen) {
			this.setState({
				message: "You do not have the privilege to delete this item.",
				error: "",
				messageOpen: true
			});
		} else if (!this.props.deleteError && prevState.messageOpen) {
			this.setState({ messageOpen: false });
		}
	}

	changeDFR3Type(event) {
		this.setState(
			{
				searching: false,
				searchText: "",
				registeredSearchText: "",
				selectedDFR3Curve: null,
				selectedDFR3Type: event.target.value,
				pageNumber: 1,
				offset: 0,
				pageNumberMappings: 1,
				offsetMappings: 0,
				selectedMapping: "",
				metadataClosed: false
			},
			function () {
				this.props.getAllDFR3Curves(
					this.state.selectedDFR3Type,
					this.state.selectedSpace,
					this.state.selectedInventory,
					this.state.selectedHazard,
					this.state.dataPerPage,
					this.state.offset
				);
				this.props.getAllDFR3Mappings(
					this.state.selectedDFR3Type,
					this.state.selectedSpace,
					this.state.selectedInventory,
					this.state.selectedHazard,
					this.state.dataPerPage,
					this.state.offsetMappings
				);
			}
		);
	}

	handleTabChange = (event, value) => {
		this.setState({ tabIndex: value });
	};

	handleInventorySelection(event) {
		this.setState(
			{
				searching: false,
				searchText: "",
				registeredSearchText: "",
				selectedDFR3Curve: null,
				selectedInventory: event.target.value,
				pageNumber: 1,
				offset: 0,
				pageNumberMappings: 1,
				offsetMappings: 0,
				selectedMapping: ""
			},
			function () {
				this.props.getAllDFR3Curves(
					this.state.selectedDFR3Type,
					this.state.selectedSpace,
					this.state.selectedInventory,
					this.state.selectedHazard,
					this.state.dataPerPage,
					this.state.offset
				);
				this.props.getAllDFR3Mappings(
					this.state.selectedDFR3Type,
					this.state.selectedSpace,
					this.state.selectedInventory,
					this.state.selectedHazard,
					this.state.dataPerPage,
					this.state.offsetMappings
				);
			}
		);
	}

	handleSpaceSelection(event) {
		this.setState(
			{
				selectedSpace: event.target.value,
				searching: false,
				searchText: "",
				registeredSearchText: "",
				selectedDFR3Curve: null,
				pageNumber: 1,
				offset: 0,
				pageNumberMappings: 1,
				offsetMappings: 0,
				selectedMapping: ""
			},
			function () {
				this.props.getAllDFR3Curves(
					this.state.selectedDFR3Type,
					this.state.selectedSpace,
					this.state.selectedInventory,
					this.state.selectedHazard,
					this.state.dataPerPage,
					this.state.offset
				);
				this.props.getAllDFR3Mappings(
					this.state.selectedDFR3Type,
					this.state.selectedSpace,
					this.state.selectedInventory,
					this.state.selectedHazard,
					this.state.dataPerPage,
					this.state.offsetMappings
				);
			}
		);
	}

	handleHazardSelection(event) {
		this.setState(
			{
				searching: false,
				searchText: "",
				registeredSearchText: "",
				selectedDFR3Curve: null,
				selectedHazard: event.target.value,
				pageNumber: 1,
				offset: 0,
				pageNumberMappings: 1,
				offsetMappings: 0,
				selectedMapping: ""
			},
			function () {
				this.props.getAllDFR3Curves(
					this.state.selectedDFR3Type,
					this.state.selectedSpace,
					this.state.selectedInventory,
					this.state.selectedHazard,
					this.state.dataPerPage,
					this.state.offset
				);
				this.props.getAllDFR3Mappings(
					this.state.selectedDFR3Type,
					this.state.selectedSpace,
					this.state.selectedInventory,
					this.state.selectedHazard,
					this.state.dataPerPage,
					this.state.offsetMappings
				);
			}
		);
	}

	async setSearchState() {
		this.setState({
			registeredSearchText: this.state.searchText,
			searching: true,
			pageNumber: 1,
			offset: 0,
			pageNumberMappings: 1,
			offsetMappings: 0,
			selectedMapping: "",
			selectedInventory: "All",
			selectedHazard: "All",
			selectedSpace: "All",
			selectedDFR3Curve: null
		});
	}

	async handleKeyPressed(event) {
		if (event.charCode === 13) {
			// enter
			event.preventDefault();
			await this.setSearchState();
			this.props.searchAllDFR3Curves(
				this.state.selectedDFR3Type,
				this.state.registeredSearchText,
				this.state.dataPerPage,
				this.state.offset
			);
			this.props.searchAllDFR3Mappings(
				this.state.selectedDFR3Type,
				this.state.registeredSearchText,
				this.state.dataPerPage,
				this.state.offsetMappings
			);
		}
	}

	async clickSearch() {
		await this.setSearchState();
		this.props.searchAllDFR3Curves(
			this.state.selectedDFR3Type,
			this.state.registeredSearchText,
			this.state.dataPerPage,
			this.state.offset
		);
		this.props.searchAllDFR3Mappings(
			this.state.selectedDFR3Type,
			this.state.registeredSearchText,
			this.state.dataPerPage,
			this.state.offsetMappings
		);
	}

	async onClickDFR3Curve(DFR3Curve) {
		let plotData3d = {};
		let plotConfig2d = {};
		let message = "Something is wrong with this DFR3 Curve definition. We cannot display its preview.";
		let error = "";

		if (DFR3Curve.fragilityCurves && DFR3Curve.is3dPlot) {
			[plotData3d, error] = await this.generate3dPlotData(DFR3Curve);
		} else if (DFR3Curve.fragilityCurves && !DFR3Curve.is3dPlot) {
			[plotConfig2d, error] = await this.generate2dPlotData(DFR3Curve);
		}

		// Call trackEvent to track the dataset selection event
		trackEvent("DFR3 Curve Selection", "Select DFR3 Curve", `DFR3 Curve ${DFR3Curve.id} Selected`);

		this.setState({
			chartConfig: plotConfig2d,
			plotData3d: plotData3d,
			selectedDFR3Curve: DFR3Curve,
			error: `DFR3 Curve ID:${DFR3Curve.id}%0D%0A%0D%0A${error}`, // line break %0D%0A
			message: message,
			messageOpen: error !== "",
			metadataClosed: false
		});
	}

	onClickDFR3Mapping(DFR3Mapping) {
		// Call trackEvent to track the dataset selection event
		trackEvent("DFR3 Mapping Selection", "Select DFR3 Mapping", `DFR3 Mapping ${DFR3Mapping.id} Selected`);

		this.setState({
			selectedMapping: DFR3Mapping,
			metadataClosed: false
		});
	}

	onClickDelete(deleteType) {
		// Call trackEvent to track the delete event
		trackEvent("Button Click", "Delete", "Delete Button Clicked");

		this.setState({
			confirmOpen: true,
			deleteType: deleteType
		});
	}

	deleteMappingConfirmed() {
		this.props.deleteMappingItemById(this.state.selectedMapping.id);
		this.setState({
			selectedMapping: "",
			confirmOpen: false
		});
	}

	deleteCurveConfirmed() {
		this.props.deleteCurveItemById(this.state.selectedDFR3Type, this.state.selectedDFR3Curve.id);
		this.setState({
			selectedDFR3Curve: "",
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
			message: "",
			error: "",
			messageOpen: false
		});
	}

	previous() {
		this.setState(
			{
				offset: (this.state.pageNumber - 2) * this.state.dataPerPage,
				pageNumber: this.state.pageNumber - 1,
				selectedDFR3Curve: ""
			},
			function () {
				if (this.state.registeredSearchText !== "" && this.state.searching) {
					this.props.searchAllDFR3Curves(
						this.state.selectedDFR3Type,
						this.state.registeredSearchText,
						this.state.dataPerPage,
						this.state.offset
					);
				} else {
					this.props.getAllDFR3Curves(
						this.state.selectedDFR3Type,
						this.state.selectedSpace,
						this.state.selectedInventory,
						this.state.selectedHazard,
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
				selectedDFR3Curve: ""
			},
			function () {
				if (this.state.registeredSearchText !== "" && this.state.searching) {
					this.props.searchAllDFR3Curves(
						this.state.selectedDFR3Type,
						this.state.registeredSearchText,
						this.state.dataPerPage,
						this.state.offset
					);
				} else {
					this.props.getAllDFR3Curves(
						this.state.selectedDFR3Type,
						this.state.selectedSpace,
						this.state.selectedInventory,
						this.state.selectedHazard,
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
				selectedDFR3Curve: "",
				searchText: "",
				registeredSearchText: "",
				pageNumberMappings: 1,
				offsetMappings: 0,
				selectedMapping: ""
			},
			function () {
				this.props.getAllDFR3Curves(
					this.state.selectedDFR3Type,
					this.state.selectedSpace,
					this.state.selectedInventory,
					this.state.selectedHazard,
					this.state.dataPerPage,
					this.state.offset
				);
				this.props.getAllDFR3Mappings(
					this.state.selectedDFR3Type,
					this.state.selectedSpace,
					this.state.selectedInventory,
					this.state.selectedHazard,
					this.state.dataPerPage,
					this.state.offsetMappings
				);
			}
		);
	}

	previousMappings() {
		this.setState(
			{
				offsetMappings: (this.state.pageNumberMappings - 2) * this.state.dataPerPage,
				pageNumberMappings: this.state.pageNumberMappings - 1,
				selectedMapping: ""
			},
			function () {
				if (this.state.registeredSearchText !== "" && this.state.searching) {
					this.props.searchAllDFR3Mappings(
						this.state.selectedDFR3Type,
						this.state.registeredSearchText,
						this.state.dataPerPage,
						this.state.offsetMappings
					);
				} else {
					this.props.getAllDFR3Mappings(
						this.state.selectedDFR3Type,
						this.state.selectedSpace,
						this.state.selectedInventory,
						this.state.selectedHazard,
						this.state.dataPerPage,
						this.state.offsetMappings
					);
				}
			}
		);
	}

	nextMappings() {
		this.setState(
			{
				offsetMappings: this.state.pageNumberMappings * this.state.dataPerPage,
				pageNumberMappings: this.state.pageNumberMappings + 1,
				selectedMapping: ""
			},
			function () {
				if (this.state.registeredSearchText !== "" && this.state.searching) {
					this.props.searchAllDFR3Mappings(
						this.state.selectedDFR3Type,
						this.state.registeredSearchText,
						this.state.dataPerPage,
						this.state.offsetMappings
					);
				} else {
					this.props.getAllDFR3Mappings(
						this.state.selectedDFR3Type,
						this.state.selectedSpace,
						this.state.selectedInventory,
						this.state.selectedHazard,
						this.state.dataPerPage,
						this.state.offsetMappings
					);
				}
			}
		);
	}

	async generate2dPlotData(DFR3Curve) {
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
	}

	async generate3dPlotData(DFR3Curve) {
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
	}

	exportMappingJson() {
		exportJson(this.state.selectedMapping);
	}

	exportCurveJson() {
		// do not include added field is3dPlot
		let { is3dPlot, ...metadataJson } = this.state.selectedDFR3Curve;

		exportJson(metadataJson);
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

	extractCurveInfoTable(DFR3Curve) {
		let curveInfo = {};
		if (DFR3Curve["fragilityCurves"] !== undefined) {
			DFR3Curve["fragilityCurves"].map((curve) => {
				curveInfo[curve["returnType"]["description"]] = curve["rules"];
			});
		}
		return curveInfo;
	}

	extractParamTable(DFR3Curve) {
		let params = {};
		if (DFR3Curve["curveParameters"] !== undefined) {
			DFR3Curve["curveParameters"].map((curveParam) => {
				params[curveParam["name"]] = {};
				params[curveParam["name"]]["expression"] = curveParam["expression"];
				params[curveParam["name"]]["description"] = curveParam["description"];
			});
		}
		return params;
	}

	closeMetadata() {
		this.setState({
			metadataClosed: true
		});
	}

	render() {
		const { classes } = this.props;
		let tabIndex = this.state.tabIndex;

		// Curve list
		let curveList = this.props.dfr3Curves;
		let curvesWithInfo = [];
		if (curveList.length > 0) {
			curveList.map((DFR3Curve) => {
				DFR3Curve["is3dPlot"] = is3dCurve(DFR3Curve);
				curvesWithInfo.push(DFR3Curve);
			});
		}

		// selected Curves
		let selectedCurveDetail = {};
		if (this.state.selectedDFR3Curve) {
			for (let item in this.state.selectedDFR3Curve) {
				if (redundantProp.indexOf(item) === -1) {
					selectedCurveDetail[item] = this.state.selectedDFR3Curve[item];
				}
			}
		}

		let mappingsList = this.props.dfr3Mappings;
		let mappingsWithInfo = [];
		if (mappingsList.length > 0) {
			mappingsList.map((DFR3Mappings) => {
				mappingsWithInfo.push(DFR3Mappings);
			});
		}

		// selected Curves
		let selectedMappingDetails = {};
		if (this.state.selectedMapping) {
			for (let item in this.state.selectedMapping) {
				if (redundantProp.indexOf(item) === -1) {
					selectedMappingDetails[item] = this.state.selectedMapping[item];
				}
			}
		}

		if (this.state.authError) {
			browserHistory.push("/login?origin=DFR3Viewer");
			return null;
		} else {
			return (
				<div>
					{/*error message display inside viewer*/}
					<ErrorMessage
						error={this.state.error}
						message={this.state.message}
						messageOpen={this.state.messageOpen}
						closeErrorMessage={this.closeErrorMessage}
					/>
					{this.state.deleteType === "curve" ? (
						<Confirmation
							confirmOpen={this.state.confirmOpen}
							actionBtnName="Delete"
							actionText="Once deleted, you won't be able to revert this!"
							handleConfirmed={this.deleteCurveConfirmed}
							handleCanceled={this.handleCanceled}
						/>
					) : (
						<Confirmation
							confirmOpen={this.state.confirmOpen}
							actionBtnName="Delete"
							actionText="Once deleted, you won't be able to revert this!"
							handleConfirmed={this.deleteMappingConfirmed}
							handleCanceled={this.handleCanceled}
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
											value={this.state.selectedDFR3Type}
											onChange={this.changeDFR3Type}
											className={classes.select}
										>
											<MenuItem
												value="fragilities"
												key="fragilities"
												className={classes.denseStyle}
											>
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
											value={this.state.selectedHazard}
											onChange={this.handleHazardSelection}
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
											value={this.state.selectedInventory}
											onChange={this.handleInventorySelection}
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
											selectedSpace={this.state.selectedSpace}
											spaces={this.props.spaces}
											handleSpaceSelection={this.handleSpaceSelection}
										/>
									</div>
									{/*Data per page */}
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
									<Typography variant="h6">
										Search all {this.state.selectedDFR3Type} & mappings
									</Typography>
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
											)
										}}
										margin="dense"
										className={classes.search}
									/>
								</Paper>
							</Grid>
						</Grid>

						<Tabs value={tabIndex} onChange={this.handleTabChange}>
							<Tab label="DFR3 Curves" />
							<Tab label="DFR3 Mappings" />
						</Tabs>

						{/*lists*/}
						{tabIndex === 0 ? (
							<Grid container spacing={4}>
								<Grid
									item
									lg={this.state.selectedDFR3Curve && !this.state.metadataClosed ? 4 : 12}
									md={this.state.selectedDFR3Curve && !this.state.metadataClosed ? 4 : 12}
									xl={this.state.selectedDFR3Curve && !this.state.metadataClosed ? 4 : 12}
									xs={12}
								>
									<LoadingOverlay active={this.state.curvesLoading} spinner text="Loading ...">
										<Paper variant="outlined" className={classes.main}>
											<div className={classes.paperHeader}>
												<Typography variant="subtitle1">DFR3 Curves</Typography>
											</div>
											<DFR3CurvesGroupList
												id="DFR3Curve-list"
												onClick={this.onClickDFR3Curve}
												data={curvesWithInfo}
												displayField="author"
												selectedDFR3Curve={this.state.selectedDFR3Curve}
											/>
											<div className={classes.paperFooter}>
												<Pagination
													pageNumber={this.state.pageNumber}
													data={curvesWithInfo}
													dataPerPage={this.state.dataPerPage}
													previous={this.previous}
													next={this.next}
												/>
											</div>
										</Paper>
									</LoadingOverlay>
								</Grid>
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
																onClick={this.exportCurveJson}
															>
																Download Metadata
															</Button>
															{
																// TODO: This should be updated with conditions for repair and restoration
																//  curves when they are refactored to new equation based format
																// 	cannot plot 3d refactored fragility curves yet

																(() => {
																	if (this.state.selectedDFR3Curve.fragilityCurves) {
																		if (
																			this.state.selectedDFR3Curve.is3dPlot &&
																			this.state.plotData3d.data.length > 0
																		) {
																			return (
																				<Button
																					color="primary"
																					variant="contained"
																					className={classes.inlineButtons}
																					size="small"
																					onClick={this.preview}
																				>
																					Preview
																				</Button>
																			);
																		} else if (
																			!this.state.selectedDFR3Curve.is3dPlot &&
																			this.state.chartConfig.series.length > 0
																		) {
																			return (
																				<Button
																					color="primary"
																					variant="contained"
																					className={classes.inlineButtons}
																					size="small"
																					onClick={this.preview}
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
															<CopyToClipboard text={this.state.selectedDFR3Curve.id}>
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
																onClick={() => {
																	this.onClickDelete("curve");
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
								}

								{/* Preview */}
								{this.state.selectedDFR3Curve ? (
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
											{this.state.selectedDFR3Curve.is3dPlot ? (
												<div>
													<Typography variant="h6">{this.state.plotData3d.title}</Typography>
													<ThreeDimensionalPlot
														plotId="3dplot"
														data={this.state.plotData3d.data}
														xLabel={this.state.selectedDFR3Curve.demandTypes.join(", ")}
														yLabel="Y"
														width="100%"
														height="350px"
														style="surface"
													/>
												</div>
											) : (
												<CustomHighChart
													chartId="chart"
													configuration={this.state.chartConfig}
													customClassName="linecharts-container"
												/>
											)}
											<div className={classes.previewTable}>
												<Typography variant="body1">Table 1. Curve Information</Typography>
												<NestedInfoTable
													data={this.extractCurveInfoTable(this.state.selectedDFR3Curve)}
												/>
											</div>
											<div className={classes.previewTable}>
												<Typography variant="body1">
													Table 2. Default Curve Parameters
												</Typography>
												<NestedInfoTable
													data={this.extractParamTable(this.state.selectedDFR3Curve)}
												/>
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
									lg={this.state.selectedMapping && !this.state.metadataClosed ? 4 : 12}
									md={this.state.selectedMapping && !this.state.metadataClosed ? 4 : 12}
									xl={this.state.selectedMapping && !this.state.metadataClosed ? 4 : 12}
									xs={12}
								>
									<LoadingOverlay active={this.state.mappingsLoading} spinner text="Loading ...">
										<Paper variant="outlined" className={classes.main}>
											<div className={classes.paperHeader}>
												<Typography variant="subtitle1">DFR3 Mappings</Typography>
											</div>
											<DFR3MappingsGroupList
												id="DFR3Mappings-list"
												onClick={this.onClickDFR3Mapping}
												data={mappingsWithInfo}
												displayField="name"
												selectedMapping={this.state.selectedMapping}
											/>
											<div className={classes.paperFooter}>
												<Pagination
													pageNumber={this.state.pageNumberMappings}
													data={mappingsWithInfo}
													dataPerPage={this.state.dataPerPage}
													previous={this.previousMappings}
													next={this.nextMappings}
												/>
											</div>
										</Paper>
									</LoadingOverlay>
								</Grid>

								<Grid
									item
									lg={8}
									md={8}
									xl={8}
									xs={12}
									className={this.state.selectedMapping ? null : classes.hide}
								>
									<Paper variant="outlined" className={classes.main}>
										<IconButton
											aria-label="Close"
											onClick={this.closeMetadata}
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
														onClick={this.exportMappingJson}
													>
														Download Metadata
													</Button>
													<CopyToClipboard text={this.state.selectedMapping.id}>
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
														onClick={() => {
															this.onClickDelete("mapping");
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
	}
}

export default withStyles(styles)(DFR3Viewer);
