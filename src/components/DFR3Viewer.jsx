import React from "react";
import GroupList from "./children/GroupList";
import LineChart from "./children/LineChart";
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
import Version from "./children/Version";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {createMuiTheme, withStyles} from "@material-ui/core/styles/index";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const redundant_prop = ["legacyId", "privileges", "creator", "is3dPlot"];

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
		fontSize: "12px",
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
	inlineButtons: {
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
	preview: {
		padding: "50px"
	},
	previewClose: {
		display: "inline",
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
			selectedDFR3Curve: "",
			searchText: "",
			registeredSearchText: "",
			searching: false,
			chartConfig: chartConfig.FragilityConfig,
			plotData3d: {},
			authError: false,
			spaces: [],
			preview: false,
			offset: 0,
			pageNumber: 1,
			dataPerPage: 50,
			urlPrefix: config.urlPrefix
		};

		this.changeDFR3Type = this.changeDFR3Type.bind(this);
		this.onClickDFR3Curve = this.onClickDFR3Curve.bind(this);
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
		let authorization = cookies.get("Authorization");

		// logged in
		if (authorization !== undefined && authorization !== "" && authorization !== null) {
			this.setState({
				authError: false
			}, function () {
				this.props.getAllSpaces();
				this.props.getAllDFR3Curves(this.state.selectedDFR3Type, this.state.selectedSpace, this.state.selectedInventory,
					this.state.selectedHazard, this.state.dataPerPage, this.state.offset);
			});
		}
		// not logged in
		else {
			this.setState({
				authError: true,
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			authError: nextProps.authError,
		});
	}

	changeDFR3Type(event) {
		this.setState({
			searching: false,
			searchText: "",
			registeredSearchText: "",
			selectedDFR3Curve: "",
			selectedDFR3Type: event.target.value,
			pageNumber: 1,
			offset: 0
		}, function () {
			this.props.getAllDFR3Curves(this.state.selectedDFR3Type, this.state.selectedSpace, this.state.selectedInventory,
				this.state.selectedHazard, this.state.dataPerPage, this.state.offset);
		});
	}

	handleInventorySelection(event) {
		this.setState({
			searching: false,
			searchText: "",
			registeredSearchText: "",
			selectedDFR3Curve: "",
			selectedInventory: event.target.value,
			pageNumber: 1,
			offset: 0
		}, function () {
			this.props.getAllDFR3Curves(this.state.selectedDFR3Type, this.state.selectedSpace, this.state.selectedInventory,
				this.state.selectedHazard, this.state.dataPerPage, this.state.offset);
		});
	}

	handleSpaceSelection(event) {
		this.setState({
			selectedSpace: event.target.value,
			searching: false,
			searchText: "",
			registeredSearchText: "",
			selectedDFR3Curve: "",
			pageNumber: 1,
			offset: 0
		}, function () {
			this.props.getAllDFR3Curves(this.state.selectedDFR3Type, this.state.selectedSpace, this.state.selectedInventory,
				this.state.selectedHazard, this.state.dataPerPage, this.state.offset);
		});
	}

	handleHazardSelection(event) {
		this.setState({
			searching: false,
			searchText: "",
			registeredSearchText: "",
			selectedDFR3Curve: "",
			selectedHazard: event.target.value,
			pageNumber: 1,
			offset: 0
		}, function () {
			this.props.getAllDFR3Curves(this.state.selectedDFR3Type, this.state.selectedSpace, this.state.selectedInventory,
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
			selectedDFR3Curve: "",
		});
	}

	async handleKeyPressed(event) {
		if (event.charCode === 13) { // enter
			event.preventDefault();
			await this.setSearchState();
			this.props.searchAllDFR3Curves(this.state.selectedDFR3Type, this.state.registeredSearchText, this.state.dataPerPage, this.state.offset);
		}
	}

	async clickSearch() {
		await this.setSearchState();
		this.props.searchAllDFR3Curves(this.state.selectedDFR3Type, this.state.registeredSearchText, this.state.dataPerPage, this.state.offset);
	}

	async onClickDFR3Curve(DFR3Curve) {
		let is3dPlot = this.is3dCurve(DFR3Curve);
		let plotData3d = {};
		let plotConfig2d = {};
		if (is3dPlot) {
			plotData3d = await this.generate3dPlotData(DFR3Curve);
		} else {
			plotConfig2d = this.generate2dPlotData(DFR3Curve);
		}

		this.setState({
			chartConfig: plotConfig2d,
			plotData3d: plotData3d,
			selectedDFR3Curve: DFR3Curve
		});
	}

	previous() {
		this.setState({
			offset: (this.state.pageNumber - 2) * this.state.dataPerPage,
			pageNumber: this.state.pageNumber - 1,
			selectedDFR3Curve: ""
		}, function () {
			if (this.state.registeredSearchText !== "" && this.state.searching) {
				this.props.searchAllDFR3Curves(this.state.selectedDFR3Type, this.state.registeredSearchText, this.state.dataPerPage, this.state.offset);
			}
			else {
				this.props.getAllDFR3Curves(this.state.selectedDFR3Type, this.state.selectedSpace, this.state.selectedInventory,
					this.state.selectedHazard, this.state.dataPerPage, this.state.offset);
			}
		});
	}

	next() {
		this.setState({
			offset: (this.state.pageNumber) * this.state.dataPerPage,
			pageNumber: this.state.pageNumber + 1,
			selectedDFR3Curve: ""
		}, function () {
			if (this.state.registeredSearchText !== "" && this.state.searching) {
				this.props.searchAllDFR3Curves(this.state.selectedDFR3Type, this.state.registeredSearchText, this.state.dataPerPage, this.state.offset);
			}
			else {
				this.props.getAllDFR3Curves(this.state.selectedDFR3Type, this.state.selectedSpace, this.state.selectedInventory,
					this.state.selectedHazard, this.state.dataPerPage, this.state.offset);
			}
		});

	}

	changeDataPerPage(event) {
		this.setState({
			pageNumber: 1,
			offset: 0,
			dataPerPage: event.target.value,
			selectedDFR3Curve: ""
		}, function () {
			this.props.getAllDFR3Curves(this.state.selectedDFR3Type, this.state.selectedSpace, this.state.selectedInventory,
				this.state.selectedHazard, this.state.dataPerPage, this.state.offset);
		});
	}

	generate2dPlotData(DFR3Curve) {
		let updatedChartConfig = Object.assign({}, chartConfig.FragilityConfig);

		let demandType = DFR3Curve.demandType !== null ? DFR3Curve.demandType : "";
		let demandUnit = DFR3Curve.demandUnits !== null ? DFR3Curve.demandUnits : "";
		let description = DFR3Curve.description !== null ? DFR3Curve.description : "";
		let authors = DFR3Curve.authors.join(", ");

		updatedChartConfig.xAxis.title.text = `${demandType} (${demandUnit})`;
		updatedChartConfig.title.text = `${description} [${authors}]`;

		updatedChartConfig.series = [];

		let curves;
		if ("fragilityCurves" in DFR3Curve) {
			curves = DFR3Curve.fragilityCurves;
		}
		else if ("repairCurves" in DFR3Curve) {
			curves = DFR3Curve.repairCurves;
		}
		else if ("restorationCurves" in DFR3Curve) {
			curves = DFR3Curve.restorationCurves;
		}
		else{
			curves = [];
		}

		for (let i = 0; i < curves.length; i++) {
			let curve = curves[i];

			let plotData;

			if (curve.className.includes("CustomExpression")) {
				plotData = chartSampler.computeExpressionSamples(0, 1.0, 90, curve.expression);
			} else if (curve.className.includes("Standard")) {
				plotData = chartSampler.sample(0, 0.999, 1000, curve.alphaType, curve.alpha, curve.beta)
			}

			let series = {
				name: curve.description,
				data: plotData
			};

			updatedChartConfig.series.push(series);
		}

		return updatedChartConfig;
	}

	async generate3dPlotData(DFR3Curve) {
		let curves;
		if ("fragilityCurves" in DFR3Curve) {
			curves = DFR3Curve.fragilityCurves;
		}
		else if ("repairCurves" in DFR3Curve) {
			curves = DFR3Curve.repairCurves;
		}
		else if ("restorationCurves" in DFR3Curve) {
			curves = DFR3Curve.restorationCurves;
		}
		else{
			curves = [];
		}
		let curve = curves[0];
		let plotData = await chartSampler.computeExpressionSamples3d(0.001, 1.0, 50, 0.001, 1.0, 50, curve.expression);

		let description = DFR3Curve.description !== null ? DFR3Curve.description : "";
		let authors = DFR3Curve.authors.join(", ");
		let title = `${description} [${authors}]`;

		return {"data": plotData, "title": title};
	}

	is3dCurve(DFR3Curve) {
		let curves;
		if ("fragilityCurves" in DFR3Curve) {
			curves = DFR3Curve.fragilityCurves;
		}
		else if ("repairCurves" in DFR3Curve) {
			curves = DFR3Curve.repairCurves;
		}
		else if ("restorationCurves" in DFR3Curve) {
			curves = DFR3Curve.restorationCurves;
		}
		else{
			curves = [];
		}

		for (let i = 0; i < curves.length; i++) {
			let curve = curves[i];

			if (curve.className.includes("CustomExpression") && curve.expression.includes("y")) {
				return true;
			}
		}

		return false;
	}

	exportJson() {
		let curveJSON = JSON.stringify(this.state.selectedDFR3Curve, null, 4);
		let blob = new Blob([curveJSON], {type: "application/json"});

		const filename = `${this.state.selectedDFR3Curve.id}.json`;

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

		// Curve list
		let curve_list = this.props.DFR3Curves;
		let curvesWithInfo = [];
		if (curve_list.length > 0) {
			curve_list.map((DFR3Curve) => {
				DFR3Curve["is3dPlot"] = this.is3dCurve(DFR3Curve);
				curvesWithInfo.push(DFR3Curve);
			});
		}

		// selected Curves
		let selected_curve_detail = {};
		if (this.state.selectedDFR3Curve) {
			for (let item in this.state.selectedDFR3Curve) {
				if (redundant_prop.indexOf(item) === -1) {
					selected_curve_detail[item] = this.state.selectedDFR3Curve[item];
				}
			}
		}

		if (this.state.authError) {
			browserHistory.push("/login?origin=DFR3Viewer");
			return null;
		}
		else {
			return (
				<div>
					<div className={classes.root}>
						<Grid container spacing={4}>
							{/*filters*/}
							<Grid item lg={8} sm={8} xl={8} xs={12}>
								<Paper variant="outlined" className={classes.filter}>
									<Typography variant="h6">Filters</Typography>
									{/* select dfr3 curve type */}
									<div className={classes.selectDiv}>
										<InputLabel>DFR3 Curve Type</InputLabel>
										<Select value={this.state.selectedDFR3Type} onChange={this.changeDFR3Type}
												className={classes.select}>
											<MenuItem value="fragilities" key="fragilities"
													  className={classes.denseStyle}>Fragility</MenuItem>
											<MenuItem value="restorations" key="restorations"
													  className={classes.denseStyle}>Restoration</MenuItem>
											<MenuItem value="repairs"
													  key="repairs"
													  className={classes.denseStyle}>Recovery</MenuItem>
										</Select>
									</div>
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
								</Paper>
							</Grid>
							<Grid item lg={4} sm={4} xl={4} xs={12}>
								<Paper variant="outlined" className={classes.filter}>
									<Typography variant="h6">Search all</Typography>
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
											   className={classes.search}
									/>
								</Paper>
							</Grid>

							{/*lists*/}
							<Grid item lg={this.state.selectedDFR3Curve ? 4 : 12}
								  md={this.state.selectedDFR3Curve ? 4 : 12}
								  xl={this.state.selectedDFR3Curve ? 4 : 12} xs={12}>
								<Paper variant="outlined" className={classes.main}>
									<div className={classes.paperHeader}>
										<Typography variant="subtitle1">Fragility Curves</Typography>
									</div>
									<GroupList id="DFR3Curve-list"
											   onClick={this.onClickDFR3Curve}
											   data={curvesWithInfo} displayField="author"
											   selectedDFR3Curve={this.state.selectedDFR3Curve}/>
									<div className={classes.paperFooter}>
										<Pagination pageNumber={this.state.pageNumber}
													data={curvesWithInfo}
													dataPerPage={this.state.dataPerPage}
													previous={this.previous}
													next={this.next}/>
									</div>
								</Paper>
							</Grid>

							{/* Metadata */}
							<Grid item lg={8} md={8} xl={8} xs={12}
								  className={this.state.selectedDFR3Curve ? null : classes.hide}>
								<Paper variant="outlined" className={classes.main}>
									{Object.keys(selected_curve_detail).length > 0 ?
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
												<CopyToClipboard text={this.state.selectedDFR3Curve.id}>
													<Button color="secondary" variant="contained"
															className={classes.inlineButtons}
															size="small">Copy
														ID</Button>
												</CopyToClipboard>
											</div>
											<div className={classes.metadata}>
												<NestedInfoTable data={selected_curve_detail}/>
											</div>
										</div>
										:
										<div></div>
									}
								</Paper>
							</Grid>
						</Grid>

						<Version/>
					</div>

					{/* Preview */}
					{this.state.selectedDFR3Curve ?
						<Dialog open={this.state.preview} onClose={this.handlePreviewerClose} maxWidth="lg" fullWidth
								scroll="paper">
							<DialogContent className={classes.preview}>
								<IconButton aria-label="Close" onClick={this.handlePreviewerClose}
											className={classes.previewClose}>
									<CloseIcon fontSize="small"/>
								</IconButton>
								{this.state.selectedDFR3Curve.is3dPlot ?
									<div>
										<Typography variant="h6">{this.state.plotData3d.title}</Typography>
										<ThreeDimensionalPlot plotId="3dplot" data={this.state.plotData3d.data}
															  xLabel={this.state.selectedDFR3Curve.demandType}
															  yLabel="Y"
															  zLabel={this.state.selectedDFR3Curve.fragilityCurves[0].description}
															  width="100%" height="350px" style="surface"/>
									</div>
									:
									<LineChart chartId="chart" configuration={this.state.chartConfig}/>}
								{this.state.selectedDFR3Curve.fragilityCurves[0].className.includes("CustomExpression") ?
									<CustomExpressionTable DFR3Curve={this.state.selectedDFR3Curve}/>
									:
									<DistributionTable DFR3Curve={this.state.selectedDFR3Curve}/>}
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


export default withStyles(styles)(DFR3Viewer);
