import React, {Component} from "react";
import {browserHistory} from "react-router";
import AnalysisSelect from "../containers/AnalysisSelect";
import {TextField, RaisedButton} from "material-ui";

class ExecuteAnalysis extends Component {

	constructor(props) {
		super(props);
		this.state = {
			inputs: [],
			parameters: [],
			title: "",
			description: ""
		};
		this.executeAnalysis = this.executeAnalysis.bind(this);
		this.changeTitle = this.changeTitle.bind(this);
		this.changeDataset = this.changeDataset.bind(this);
	}

	componentWillMount() {
		this.props.loadAnalyses();
	}

	executeAnalysis(event) {
		//Post to Datawolf
		const workflowId = "b599dc4e-401f-4f7c-962b-8d7da93f930b";
		const creatorId = "849177e3-968d-45c7-841f-e6ac054c05c7"; // Chris Navarro
		const parameters = {
			"216be7b2-a382-4860-9e38-2513ec03a0fd": ":8080/hazard/api/earthquakes/123",
			"7ef36e91-d589-447f-96c9-9c05993460be": ":8080/api/fragilities/456",
			"363e1d34-2186-4b42-aa6f-48431a1a7dc3": ":8080/data/api/datasets/789"
		};
		let datasets = {};
		if(this.state.inputs.buildings){
			datasets.push("a3ac0688-1fa3-45e6-9586-a37425a550ce", this.state.inputs.buildings);
		}
		if(this.state.inputs.mean_damage){
			datasets.push("8366c798-7c14-4087-f59c-a83a39241ed4", this.state.inputs.mean_damage);
		}
		this.props.ExecuteAnalysis(workflowId, creatorId, this.state.title, this.state.description, parameters, datasets);
		browserHistory.push("/Results");
	}

	changeTitle(event){
		this.setState({title: event.target.value});
	}

	changeDataset(event) {
		const id_key = event.target.id;
		this.setState({inputs: {id_key: event.target.value}});
	}

	render() {
		let contents;
		if(this.props.analysis !== null) {
			const inputs = this.props.analysis.datasets.map( input =>
				<span key={input.name}> <TextField floatingLabelText={input.name} id={input.id} value={this.state.inputs.id} width="100%" onChange={this.changeDataset}/> <br/></span>
			);
			const parameters = this.props.analysis.parameters.map(param =>
				<span key={param.name} > <TextField floatingLabelText={param.name} id={param.id} value={this.state.parameters.id} /><br/></span>
			);

			contents = <div>
				<h1>{this.props.analysis.name}</h1>

				<h3> Parameter Details </h3>
				<Textfield floatngLabelText="Analysis Title" value={this.state.title} onChange={this.changeTitle}/>
				<h3>Inputs</h3>
				{inputs}
				<br/>
				<br/>
				<RaisedButton primary onClick={this.executeAnalysis} label="Execute Analysis"/>
			</div>;
		}


		return (
			<div className="main">
				<h2 className="center"> Execute Analysis</h2>
				Select an Analysis to execute <br/>
				<AnalysisSelect/>
				{contents}
			</div>
		);
	}

}

export default ExecuteAnalysis;
