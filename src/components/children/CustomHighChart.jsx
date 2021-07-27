import React from "react";
import HighCharts from "highcharts";

class CustomHighChart extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		HighCharts.chart(this.props.chartId, this.props.configuration);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.chartId !== this.props.chartId || prevProps.configuration !== this.props.configuration){
			HighCharts.chart(this.props.chartId, this.props.configuration);
		}
	}

	render() {
		return (<div id={this.props.chartId} className="highcharts-container" />);
	}
}

export default CustomHighChart;
