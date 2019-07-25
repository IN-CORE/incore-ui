import React from "react";
import GroupList from "./children/GroupList";
import LineChart from "./children/LineChart";
import AuthNotification from "./children/AuthNotification";
import NestedInfoTable from "./children/NestedInfoTable";
import ThreeDimensionalPlot from "./children/ThreeDimensionalPlot";
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
import chartSampler from "../utils/chartSampler";
import chartConfig from "./config/ChartConfig";
import config from "../app.config";
import DistributionTable from "./children/DistributionTable";
import CustomExpressionTable from "./children/CustomExpressionTable";
import {browserHistory} from "react-router";
import Pagination from "./children/Pagination";
import DataPerPage from "./children/DataPerPage";
import Space from "./children/Space";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {createMuiTheme, withStyles} from "@material-ui/core/styles/index";


const redundant_prop = ["legacyId", "privileges", "creator", "is3dPlot"];

const theme = createMuiTheme();
const styles = {
	root: {
		padding: theme.spacing(4)
	},
	filter: {
		padding: theme.spacing(4),
		overflow: "auto",
		display:"flex"
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
	denseStyle: {
		minHeight: "10px",
		lineHeight: "30px",
		fontSize: "12px",
	},
	metadata: {
		margin: theme.spacing(2),
		overflow: "auto"
	},
	inlineButtons:{
		display: "inline-block",
		margin: "auto 5px"
	},
	hide: {
		display: "none",
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
	preview:{
		padding: "50px"
	},
	previewClose:{
		display: "inline",
		float: "right"
	}
};

class FragilityViewer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedInventory: "All",
			selectedHazard: "All",
			selectedSpace: "All",
			selectedFragility: "",
			searchText: "",
			registeredSearchText: "",
			searching: false,
			chartConfig: chartConfig.FragilityConfig,
			plotData3d: {},
			authError: false,
			authLocationFrom: sessionStorage.getItem("locationFrom"),
			spaces: [],
			preview: false,
			offset: 0,
			pageNumber: 1,
			dataPerPage: 50,
		};

		this.onClickFragility = this.onClickFragility.bind(this);
		this.handleInventorySelection = this.handleInventorySelection.bind(this);
		this.handleHazardSelection = this.handleHazardSelection.bind(this);
		this.setSearchState = this.setSearchState.bind(this);
		this.handleKeyPressed = this.handleKeyPressed.bind(this);
		this.clickSearch = this.clickSearch.bind(this);
		this.preview = this.preview.bind(this);
		this.exportJson = this.exportJson.bind(this);
		this.previous = this.previous.bind(this);
		this.next = this.next.bind(this);
		this.handlePreviewerClose = this.handlePreviewerClose.bind(this);
		this.changeDataPerPage = this.changeDataPerPage.bind(this);
		this.handleSpaceSelection = this.handleSpaceSelection.bind(this);
	}

	async componentWillMount() {
		// check if logged in
		let user = sessionStorage.getItem("user");
		let auth = sessionStorage.getItem("auth");
		let location = sessionStorage.getItem("locationFrom");

		// logged in
		if (user !== undefined && user !== "" && user !== null
			&& auth !== undefined && auth !== "" && auth !== null) {

			this.setState({
				authError: false
			}, function () {
				this.props.getAllSpaces();
				this.props.getAllFragilities(this.state.selectedSpace, this.state.selectedInventory,
					this.state.selectedHazard, this.state.dataPerPage, this.state.offset);
			});
		}
		// not logged in
		else {
			this.setState({
				authError: true,
				authLocationFrom: location
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			authError: nextProps.authError,
			authLocationFrom: nextProps.locationFrom
		});
	}

	handleInventorySelection(event) {
		this.setState({
			searching: false,
			searchText: "",
			registeredSearchText: "",
			selectedFragility: "",
			selectedInventory: event.target.value,
			pageNumber: 1,
			offset: 0
		}, function () {
			this.props.getAllFragilities(this.state.selectedSpace, this.state.selectedInventory,
				this.state.selectedHazard, this.state.dataPerPage, this.state.offset);
		});
	}

	handleSpaceSelection(event) {
		this.setState({
			selectedSpace: event.target.value,
			searching: false,
			searchText: "",
			registeredSearchText: "",
			selectedFragility: "",
			pageNumber: 1,
			offset: 0
		}, function () {
			this.props.getAllFragilities(this.state.selectedSpace, this.state.selectedInventory,
				this.state.selectedHazard, this.state.dataPerPage, this.state.offset);
		});
	}

	handleHazardSelection(event) {
		this.setState({
			searching: false,
			searchText: "",
			registeredSearchText: "",
			selectedFragility: "",
			selectedHazard: event.target.value,
			pageNumber: 1,
			offset: 0
		}, function () {
			this.props.getAllFragilities(this.state.selectedSpace, this.state.selectedInventory,
				this.state.selectedHazard, this.state.dataPerPage, this.state.offset);
		});
	}

	async setSearchState() {
		this.setState({
			registeredSearchText: this.state.searchText,
			searching: true,
			pageNumber: 1,
			offset: 0,
			selectedInventory: "All",
			selectedHazard: "All",
			selectedSpace: "All",
			selectedFragility: "",
		});
	}

	async handleKeyPressed(event) {
		if (event.charCode === 13) { // enter
			event.preventDefault();
			await this.setSearchState();
			this.props.searchAllFragilities(this.state.registeredSearchText, this.state.dataPerPage, this.state.offset);
		}
	}

	async clickSearch() {
		await this.setSearchState();
		this.props.searchAllFragilities(this.state.registeredSearchText, this.state.dataPerPage, this.state.offset);
	}

	async onClickFragility(fragility) {
		let is3dPlot = this.is3dFragility(fragility);
		let plotData3d = {};
		let plotConfig2d = {};
		if (is3dPlot) {
			plotData3d = await this.generate3dPlotData(fragility);
		} else {
			plotConfig2d = this.generate2dPlotData(fragility);
		}

		this.setState({
			chartConfig: plotConfig2d,
			plotData3d: plotData3d,
			selectedFragility: fragility
		});
	}

	previous() {
		this.setState({
			offset: (this.state.pageNumber - 2) * this.state.dataPerPage,
			pageNumber: this.state.pageNumber - 1,
			selectedFragility: ""
		}, function () {
			if (this.state.registeredSearchText !== "" && this.state.searching) {
				this.props.searchAllFragilities(this.state.registeredSearchText, this.state.dataPerPage, this.state.offset);
			}
			else {
				this.props.getAllFragilities(this.state.selectedSpace, this.state.selectedInventory,
					this.state.selectedHazard, this.state.dataPerPage, this.state.offset);
			}
		});
	}

	next() {
		this.setState({
			offset: (this.state.pageNumber) * this.state.dataPerPage,
			pageNumber: this.state.pageNumber + 1,
			selectedFragility: ""
		}, function () {
			if (this.state.registeredSearchText !== "" && this.state.searching) {
				this.props.searchAllFragilities(this.state.registeredSearchText, this.state.dataPerPage, this.state.offset);
			}
			else {
				this.props.getAllFragilities(this.state.selectedSpace, this.state.selectedInventory,
					this.state.selectedHazard, this.state.dataPerPage, this.state.offset);
			}
		});

	}

	changeDataPerPage(event) {
		this.setState({
			pageNumber: 1,
			offset: 0,
			dataPerPage: event.target.value,
			selectedFragility: ""
		}, function () {
			this.props.getAllFragilities(this.state.selectedSpace, this.state.selectedInventory,
				this.state.selectedHazard, this.state.dataPerPage, this.state.offset);
		});
	}

	generate2dPlotData(fragility) {
		let updatedChartConfig = Object.assign({}, chartConfig.FragilityConfig);

		let demandType = fragility.demandType !== null ? fragility.demandType : "";
		let demandUnit = fragility.demandUnits !== null ? fragility.demandUnits : "";
		let description = fragility.description !== null ? fragility.description : "";
		let authors = fragility.authors.join(", ");

		updatedChartConfig.xAxis.title.text = `${demandType} (${demandUnit})`;
		updatedChartConfig.title.text = `${description} [${authors}]`;

		updatedChartConfig.series = [];

		for (let i = 0; i < fragility.fragilityCurves.length; i++) {
			let curve = fragility.fragilityCurves[i];

			let plotData;

			if (curve.className.includes("CustomExpressionFragilityCurve")) {
				plotData = chartSampler.computeExpressionSamples(0, 1.0, 90, curve.expression);
			} else if (curve.className.includes("StandardFragilityCurve")) {
				if (curve.curveType === "Normal") { // Actually Log Normal
					plotData = chartSampler.sampleLogNormalCdf(0, 0.999, 1000, curve.median, curve.beta);
				}

				if (curve.curveType === "StandardNormal") {
					plotData = chartSampler.sampleNormalCdf(0, 0.999, 1000, curve.median, curve.beta);
				}

				if (curve.curveType === "LogNormal") { // Log Normal with Normal mean and Normal variance
					plotData = chartSampler.sampleLogNormalAlternate(0, 0.999, 1000, curve.median, curve.beta);
				}
			} else if (curve.className.includes("periodStandardFragilityCurve")) {
				console.log("not implemented");
			} else if (curve.className.includes("buildingPeriodStandardFragilityCurve")) {
				console.log("not implemented");
			} else {
				console.log("not implemented");
			}

			let series = {
				name: curve.description,
				data: plotData
			};

			updatedChartConfig.series.push(series);
		}

		return updatedChartConfig;
	}

	async generate3dPlotData(fragility) {
		let curve = fragility.fragilityCurves[0];
		let plotData = await chartSampler.computeExpressionSamples3d(0.001, 1.0, 50, 0.001, 1.0, 50, curve.expression);

		let description = fragility.description !== null ? fragility.description : "";
		let authors = fragility.authors.join(", ");
		let title = `${description} [${authors}]`;

		return {"data": plotData, "title": title};
	}

	is3dFragility(fragility) {
		let curves = fragility.fragilityCurves;

		for (let i = 0; i < curves.length; i++) {
			let curve = curves[i];

			if (curve.className.includes("CustomExpressionFragilityCurve") && curve.expression.includes("y")) {
				return true;
			}
		}

		return false;
	}

	exportJson() {
		let fragilityJSON = JSON.stringify(this.state.selectedFragility, null, 4);
		let blob = new Blob([fragilityJSON], {type: "application/json"});

		const filename = `${this.state.selectedFragility.id}.json`;

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

	render() {

		const {classes} = this.props;

		// Fragility list
		let fragility_list = this.props.fragilities;
		let fragilitiesWithInfo = [];
		if (fragility_list.length > 0) {
			fragility_list.map((fragility) => {
				fragility["is3dPlot"] = this.is3dFragility(fragility);
				fragilitiesWithInfo.push(fragility);
			});
		}

		// selected Fragilities
		let selected_fragility_detail = {};
		if (this.state.selectedFragility) {
			for (let item in this.state.selectedFragility) {
				if (redundant_prop.indexOf(item) === -1) {
					selected_fragility_detail[item] = this.state.selectedFragility[item];
				}
			}
		}

		if (this.state.authError) {
			if (this.state.authLocationFrom !== undefined
				&& this.state.authLocationFrom !== null
				&& this.state.authLocationFrom.length > 0) {
				return (<AuthNotification/>);
			}
			else {
				browserHistory.push(`${config.urlPrefix}/login`);
				return null;
			}
		}
		else {
			return (
				<div>
					<div className={classes.root}>
						<Grid container spacing={4}>
							{/*filters*/}
							<Grid item lg={12} sm={12} xl={12} xs={12}>
								<Paper variant="outlined" className={classes.filter}>
									{/* Hazard Type */}
									<div className={classes.selectDiv}>
										<InputLabel>Hazard Type</InputLabel>
										<Select value={this.state.selectedHazard} onChange={this.handleHazardSelection}
												className={classes.select}>
											<MenuItem value="All" className={classes.denseStyle}>All</MenuItem>
											<MenuItem value="earthquake"
													  className={classes.denseStyle}>Earthquake</MenuItem>
											<MenuItem value="tornado" className={classes.denseStyle}>Tornado</MenuItem>
											<MenuItem value="tsunami" className={classes.denseStyle}>Tsunami</MenuItem>
										</Select>
									</div>
									{/* Inventory Type */}
									<div className={classes.selectDiv}>
										<InputLabel>Inventory Type</InputLabel>
										<Select value={this.state.selectedInventory}
												onChange={this.handleInventorySelection}
												className={classes.select}>
											<MenuItem value="All" className={classes.denseStyle}>All</MenuItem>
											<MenuItem value="building"
													  className={classes.denseStyle}>Building</MenuItem>
											<MenuItem value="bridge" className={classes.denseStyle}>Bridge</MenuItem>
											<Divider/>
											<MenuItem value="roadway" className={classes.denseStyle}>Roadway</MenuItem>
											<Divider/>
											<MenuItem value="electric_facility" className={classes.denseStyle}>Electric
												Power Facility</MenuItem>
											<MenuItem value="electric_power_line" className={classes.denseStyle}>Eletric
												Power Line</MenuItem>
											<MenuItem value="water_facility" className={classes.denseStyle}>Water
												Facility</MenuItem>
											<MenuItem value="buried_pipeline" className={classes.denseStyle}>Water
												Pipeline</MenuItem>
											<MenuItem value="gas_facility" className={classes.denseStyle}>Gas
												Facility</MenuItem>
										</Select>
									</div>
									{/*spaces*/}
									<div className={classes.selectDiv}>
										<Space selectedSpace={this.state.selectedSpace}
											   spaces={this.props.spaces}
											   handleSpaceSelection={this.handleSpaceSelection}/>
									</div>
									{/*Data per page */}
									<div className={classes.selectDiv}>
										<DataPerPage dataPerPage={this.state.dataPerPage}
													 changeDataPerPage={this.changeDataPerPage}/>
									</div>
									<div className={classes.selectDiv}>
										<TextField variant="outlined" label="Search"
												   onKeyPress={this.handleKeyPressed}
												   value={this.state.searchText}
												   onChange={e => {
													   this.setState({searchText: e.target.value});
												   }}
												   InputProps={{
													   endAdornment: (<InputAdornment position="end">
														   <IconButton onClick={this.clickSearch}>
															   <SearchIcon fontSize="small"/></IconButton>
													   </InputAdornment>),

												   }}
												   margin="dense"
												   className={classes.select}
										/>
									</div>
								</Paper>
							</Grid>

							{/*lists*/}
							<Grid item lg={this.state.selectedFragility ? 4 : 12}
								  md={this.state.selectedFragility ? 4 : 12}
								  xl={this.state.selectedFragility ? 4 : 12} xs={12}>
								<Paper variant="outlined" className={classes.main}>
									<div className={classes.paperHeader}>
										<Typography variant="subtitle1">Fragility Curves</Typography>
									</div>
									<GroupList id="fragility-list"
											   onClick={this.onClickFragility}
											   data={fragilitiesWithInfo} displayField="author"
											   selectedFragility={this.state.selectedFragility}/>
									<div className={classes.paperFooter}>
										<Pagination pageNumber={this.state.pageNumber}
													data={fragilitiesWithInfo}
													dataPerPage={this.state.dataPerPage}
													previous={this.previous}
													next={this.next}/>
									</div>
								</Paper>
							</Grid>

							{/* Metadata */}
							<Grid item lg={8} md={8} xl={8} xs={12}
								  className={this.state.selectedFragility ? null : classes.hide}>
								<Paper variant="outlined" className={classes.main}>
									{Object.keys(selected_fragility_detail).length > 0 ?
										<div>
											<div className={classes.paperHeader}>
												<Typography variant="subtitle1">Metadata</Typography>
											</div>
											<div className={classes.metadata}>
												<Button color="primary"
														variant="contained"
														className={classes.inlineButtons}
														size="small"
														onClick={this.exportJson}>Download Metadata</Button>
												<Button color="primary"
														variant="contained"
														className={classes.inlineButtons}
														size="small"
														onClick={this.preview}>Preview</Button>
												<CopyToClipboard text={this.state.selectedFragility.id}>
													<Button color="secondary" variant="contained"
															className={classes.inlineButtons}
															size="small">Copy
														ID</Button>
												</CopyToClipboard>
											</div>
											<div className={classes.metadata}>
												<NestedInfoTable data={selected_fragility_detail}/>
											</div>
										</div>
										:
										<div></div>
									}
								</Paper>
							</Grid>
						</Grid>
					</div>

					{/* Preview */}
					{this.state.selectedFragility ?
						<Dialog open={this.state.preview} onClose={this.handlePreviewerClose} maxWidth="lg" fullWidth
								scroll="paper">
							<DialogContent className={classes.preview}>
								<IconButton aria-label="Close" onClick={this.handlePreviewerClose}
											className={classes.previewClose}>
									<CloseIcon fontSize="small"/>
								</IconButton>
								{this.state.selectedFragility.is3dPlot ?
									<div>
										<Typography variant="h6">{this.state.plotData3d.title}</Typography>
										<ThreeDimensionalPlot plotId="3dplot" data={this.state.plotData3d.data}
															  xLabel={this.state.selectedFragility.demandType}
															  yLabel="Y"
															  zLabel={this.state.selectedFragility.fragilityCurves[0].description}
															  width="100%" height="350px" style="surface"/>
									</div>
									:
									<LineChart chartId="chart" configuration={this.state.chartConfig}/>}
								{this.state.selectedFragility.fragilityCurves[0].className.includes("CustomExpressionFragilityCurve") ?
									<CustomExpressionTable fragility={this.state.selectedFragility}/>
									:
									<DistributionTable fragility={this.state.selectedFragility}/>}
							</DialogContent>
						</Dialog>
						:
						<div></div>
					}
				</div>
			);
		}
	}
}


export default withStyles(styles)(FragilityViewer);
