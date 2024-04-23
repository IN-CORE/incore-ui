let DFR3Config = {
	credits: false,
	title: {
		text: "DFR3 Viewer",
		x: -20 //center
	},
	xAxis: {
		title: {
			text: "PGA (g)"
		}
	},
	yAxis: {
		title: {
			text: "Probability of Exceedance"
		},
		min: 0.0,
		max: 1.0,
		plotLines: [{
			value: 0,
			width: 1,
			color: "#808080"
		}]
	},
	tooltip: {
		formatter: function() {
			return `<b>x</b>: ${this.x}<br><b>y</b>: ${this.y}`;
		}
	},
	legend: {
		layout: "vertical",
		align: "right",
		verticalAlign: "middle",
		borderWidth: 0
	},
	series: [],
};

let pieChartConfig = {
	credits: false,
	chart: {
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		type: "pie",
		height:250,
		// width:250,
		// margin: [0, 40, 0, 40]
	},
	title: {
		text: "",
		verticalAlign: "bottom",
		y: -10,
		style: {
			fontFamily:"'Work Sans',sans-serif",
			fontSize: "14px",
			fontWeight:"normal",
		}
	},
	subtitle:{
		text:"",
		verticalAlign:"bottom",
		style:{
			fontFamily:"'Work Sans',sans-serif",
			fontSize: "12px",
			fontWeight:"normal",
		}
	},
	tooltip: {
		pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
	},
	accessibility: {
		point: {
			valueSuffix: "%"
		}
	},
	plotOptions: {
		pie: {
			// allowPointSelect: true,
			cursor: "pointer",
			dataLabels: {
				enabled: false,
				// format: "<b>{point.name}</b>: {point.percentage:.1f} %"
			},
			colors: [
				"#dadada",
				"#1B2D45"
			],
			states:{
				hover:{
					halo:null
				},
			}
		},
	},
	series: [{
		name: "",
		colorByPoint: true,
		data: [
			{
				name: "Available",
				y: 100
			},
			{
				name: "Used",
				y: 0
			}
		]
	}]
};


export default {DFR3Config, pieChartConfig};
