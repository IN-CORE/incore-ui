import * as React from "react";
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles/index";
import config from "../../app.config";


const styles = {
	denseStyle: {
		minHeight: "10px",
		lineHeight: "30px",
		fontSize: "12px",
	},
	select: {
		width: "80%",
		fontSize: "12px"
	}
};

class Datatype extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {classes} = this.props;

		let sortedDatatypes = [];
		this.props.datatypes.map((datatype) =>{
			sortedDatatypes.push(datatype.dataType);
		});
		sortedDatatypes = sortedDatatypes.sort();

		if (this.props.datatypes.length > 0) {
			return (
				<div>
					<InputLabel>Dataset Type</InputLabel>
					<Select value={this.props.selectedDataType} onChange={this.props.handleDatatypeSelection}
						className={classes.select}>
						<MenuItem key="All" value="All" className={classes.denseStyle}>All</MenuItem>
						{sortedDatatypes.map((datatype, index) =>
							(<MenuItem label={datatype} value={datatype} name={datatype}
									  key={datatype} className={classes.denseStyle}>
								{datatype}</MenuItem>))}
					</Select>
				</div>);
		}
		else {
			return null;
		}

	}
}

export default withStyles(styles)(Datatype);
