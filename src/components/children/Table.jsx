import React, { Component } from "react";
import { HotTable } from "@handsontable/react";

class Table extends Component {

	constructor(props) {
		super(props);
		this.state = {
			settings: {
				licenseKey: "non-commercial-and-evaluation",
			}
		}
	}

	componentDidMount() {
		this.setState({
			settings:{
				licenseKey: "non-commercial-and-evaluation",
				data: this.props.data,
				rowHeaders: this.props.rowHeaders,
				colHeaders: this.props.colHeaders,
				observeChanges: true,
				height: this.props.height,
				overflow: "auto",
				stretchH: "all"
			}

		});
	}

	render() {
		return <HotTable settings={this.state.settings} licenseKey="non-commercial-and-evaluation" id={this.props.container} />;
	}
}

export default Table;
