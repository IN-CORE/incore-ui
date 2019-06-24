import React from "react";
import GroupList from "./children/GroupList";
import LineChart from "./children/LineChart";
import AuthNotification from "./children/AuthNotification";
import ThreeDimensionalPlot from "./children/ThreeDimensionalPlot";
import "whatwg-fetch";
import {
	Card,
	Divider,
	GridList,
	GridTile,
	IconButton,
	MenuItem,
	RaisedButton,
	SelectField,
	TextField
} from "material-ui";
import ActionSearch from "material-ui/svg-icons/action/search";
import chartSampler from "../utils/chartSampler";
import chartConfig from "./config/ChartConfig";
import config from "../app.config";
import DistributionTable from "./children/DistributionTable";
import CustomExpressionTable from "./children/CustomExpressionTable";
import {browserHistory} from "react-router";
import Pagination from "./children/Pagination";
import DataPerPage from "./children/DataPerPage";
import Space from "./children/Space";

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

			offset: 0,
			pageNumber: 1,
			dataPerPage: 50
		};

		this.onClickFragility = this.onClickFragility.bind(this);
		this.handleInventorySelection = this.handleInventorySelection.bind(this);
		this.handleHazardSelection = this.handleHazardSelection.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleKeyPressed = this.handleKeyPressed.bind(this);

		this.exportJson = this.exportJson.bind(this);
		this.previous = this.previous.bind(this);
		this.next = this.next.bind(this);

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

	handleInventorySelection(event, index, value) {
		this.setState({
			searching: false,
			searchText: "",
			registeredSearchText: "",
			selectedFragility:"",
			selectedInventory: value,
			pageNumber: 1,
			offset: 0
		},function () {
			this.props.getAllFragilities(this.state.selectedSpace, this.state.selectedInventory,
				this.state.selectedHazard, this.state.dataPerPage, this.state.offset);
		});
	}

	handleSpaceSelection(event, index, value) {
		this.setState({
			selectedSpace: value,
			searching: false,
			searchText: "",
			registeredSearchText: "",
			selectedFragility:"",
			pageNumber: 1,
			offset: 0
		}, function () {
			this.props.getAllFragilities(this.state.selectedSpace, this.state.selectedInventory,
				this.state.selectedHazard, this.state.dataPerPage, this.state.offset);
		});
	}

	handleHazardSelection(event, index, value) {
		this.setState({
			searching: false,
			searchText: "",
			registeredSearchText: "",
			selectedFragility:"",
			selectedHazard: value,
			pageNumber: 1,
			offset: 0
		}, function () {
			this.props.getAllFragilities(this.state.selectedSpace, this.state.selectedInventory,
				this.state.selectedHazard, this.state.dataPerPage, this.state.offset);
		});
	}

	handleKeyPressed(event) {
		if (event.charCode === 13) { // enter
			event.preventDefault();
			this.handleSearch();
		}
	}

	handleSearch() {
		this.setState({
			registeredSearchText: this.refs.searchBox.getValue(),
			searching: true,
			pageNumber: 1,
			offset: 0,
			selectedInventory: "All",
			selectedHazard: "All",
			selectedSpace: "All",
			selectedFragility:"",
		}, function () {
			this.props.searchAllFragilities(this.state.registeredSearchText, this.state.dataPerPage, this.state.offset);
		});
	}

	onClickFragility(fragility) {
		let is3dPlot = this.is3dFragility(fragility);
		let plotData3d = [];
		let plotConfig2d = {};
		if (is3dPlot) {
			plotData3d = this.generate3dPlotData(fragility);
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

	changeDataPerPage(event, index, value) {
		this.setState({
			pageNumber: 1,
			offset: 0,
			dataPerPage: value,
			selectedFragility: ""
		}, function () {
			this.props.getAllFragilities(this.state.selectedSpace, this.state.selectedInventory,
				this.state.selectedHazard, this.state.dataPerPage, this.state.offset);
		});
	}


	render() {
		let fragility_list = this.props.fragilities;
		let fragilitiesWithInfo = [];
		if (fragility_list.length > 0){
			fragility_list.map((fragility) => {
				fragility["is3dPlot"] = this.is3dFragility(fragility);
				fragilitiesWithInfo.push(fragility);
			});
		}

		let space_types = "";
		if (this.props.spaces.length > 0){
			const space_menu_items = this.props.spaces.map((space, index) =>
				<MenuItem value={space.metadata.name} primaryText={space.metadata.name}/>
			);
			space_types = (<SelectField floatingLabelText="Spaces"
										hintText="Spaces"
										value={this.state.selectedSpace}
										onChange={this.handleSpaceSelection}
										style={{maxWidth:"200px"}}>
				<MenuItem value="All" primaryText="All"/>
				{space_menu_items}
			</SelectField>);
		}

		if (this.state.authError) {
			if (this.state.authLocationFrom !== undefined
				&& this.state.authLocationFrom !== null
				&& this.state.authLocationFrom.length > 0) {
				return (<AuthNotification/>);
			}
			else {
				browserHistory.push(`${config.baseUrl}`);
				return null;
			}
		}
		else {
			return (
				<div style={{padding: "20px", height: "100%"}}>
					<div style={{display: "flex"}}>
						<h2>Fragility Function Viewer</h2>
					</div>

					<GridList cellHeight="auto" cols={12}>
						{/* Hazard Type */}
						<GridTile cols={2}>
							<SelectField floatingLabelText="Hazard Type"
										 hintText="Hazard Type" value={this.state.selectedHazard}
										 onChange={this.handleHazardSelection} style={{maxWidth: "200px"}}>
								<MenuItem primaryText="All" value="All"/>
								<MenuItem primaryText="Earthquake" value="earthquake"/>
								<MenuItem primaryText="Tornado" value="tornado"/>
								<MenuItem primaryText="Tsunami" value="tsunami"/>
							</SelectField>
						</GridTile>

						{/* Inventory Type */}
						<GridTile cols={2}>
							<SelectField floatingLabelText="Inventory Type"
										 hintText="Inventory Type" value={this.state.selectedInventory}
										 onChange={this.handleInventorySelection} style={{maxWidth: "200px"}}>
								<MenuItem primaryText="All" value="All"/>
								<MenuItem primaryText="Building" value="building"/>
								<MenuItem primaryText="Bridge" value="bridge"/>
								<Divider/>
								<MenuItem primaryText="Roadway" value="roadway"/>
								<Divider/>
								<MenuItem primaryText="Electric Power Facility" value="electric_facility"/>
								<MenuItem primaryText="Eletric Power Line" value="electric_power_line"/>
								<MenuItem primaryText="Water Facility" value="water_facility"/>
								<MenuItem primaryText="Water Pipeline" value="buried_pipeline"/>
								<MenuItem primaryText="Gas Facility" value="gas_facility"/>
							</SelectField>
						</GridTile>

						{/*spaces*/}
						<GridTile cols={2}>
							<Space selectedSpace={this.state.selectedSpace}
												   spaces={this.props.spaces}
												   handleSpaceSelection={this.handleSpaceSelection}/>
						</GridTile>

						{/*Data per page */}
						<GridTile cols={2} style={{float: "left"}}>
							<DataPerPage dataPerPage={this.state.dataPerPage} changeDataPerPage={this.changeDataPerPage}/>
						</GridTile>

						{/* Search Box */}
						<GridTile cols={4} style={{float: "right"}}>
							<TextField ref="searchBox" hintText="Search All Fragilities"
									   onKeyPress={this.handleKeyPressed}
									   value={this.state.searchText}
									   onChange={e => {
										   this.setState({searchText: e.target.value});
									   }}/>
							<IconButton iconStyle={{position: "absolute", left: 0, bottom: 5, width: 30, height: 30}}
										onClick={this.handleSearch}>
								<ActionSearch/>
							</IconButton>
						</GridTile>

					</GridList>

					<GridList cols={12} cellHeight="auto" style={{paddingTop: "12px"}}>
						<GridTile cols={5}>
							<h2>Fragilities</h2>
							<div style={{overflow: "auto", height: "45vh", margin: "0 20px"}}>
								<GroupList id="fragility-list"
										   onClick={this.onClickFragility}
										   data={fragilitiesWithInfo} displayField="author"
										   selectedFragility={this.state.selectedFragility}/>
							</div>
							<Pagination pageNumber={this.state.pageNumber}
										data={fragilitiesWithInfo}
										dataPerPage={this.state.dataPerPage}
										previous={this.previous}
										next={this.next}/>
						</GridTile>

						{/* Charts */}
						{this.state.selectedFragility ?
							<GridTile cols={7}>
								<h2>Preview</h2>
								<div style={{overflow: "auto", height: "45vh", margin: "0 20px 20px"}}>
									<div style={{marginLeft: "auto", marginBottom: "20px"}}>
										<RaisedButton primary={true} style={{display: "inline-block"}}
													  label="Download Metadata"
													  onClick={this.exportJson}/>
									</div>
									<Card>
										{this.state.selectedFragility.is3dPlot ?
											<div>
												<h3 style={{textAlign: "center"}}>{this.state.plotData3d.title}</h3>
												<ThreeDimensionalPlot plotId="3dplot" data={this.state.plotData3d.data}
																	  xLabel={this.state.selectedFragility.demandType}
																	  yLabel="Y"
																	  zLabel={this.state.selectedFragility.fragilityCurves[0].description}
																	  width="100%" height="350px" style="surface"/>
											</div>
											:
											<LineChart chartId="chart" configuration={this.state.chartConfig}/>}
									</Card>

									{this.state.selectedFragility.fragilityCurves[0].className.includes("CustomExpressionFragilityCurve") ?
										<CustomExpressionTable fragility={this.state.selectedFragility}/>
										:
										<DistributionTable fragility={this.state.selectedFragility}/>}
								</div>
							</GridTile>
							:
							<div></div>
						}

					</GridList>
				</div>
			);
		}
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
}

FragilityViewer.propTypes = {};

export default FragilityViewer;
