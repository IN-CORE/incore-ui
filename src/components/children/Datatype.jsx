import * as React from "react";
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles/index";


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

		if (this.props.datatypes.length > 0) {
			return (
				<div>
					<InputLabel>Dataset Type</InputLabel>
					<Select value={this.props.selectedDatatype} onChange={this.props.changeDatasetType}
						className={classes.select}>
						<MenuItem key="All" value="All" className={classes.denseStyle}>All</MenuItem>
						{this.props.datatypes.map((datatype, index) =>
							(<MenuItem label={datatype.datatype} value={datatype.datatype} name={datatype.datatype}
									  key={datatype.datatype} className={classes.denseStyle}>
								{datatype.datatype}</MenuItem>))}
					</Select>
				</div>);
		}
		else {
			return null;
		}

	}
}

export default withStyles(styles)(Datatype);
