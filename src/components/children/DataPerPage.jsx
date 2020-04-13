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


class DataPerPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {classes} = this.props;

		return (
			<div>
				<InputLabel>Results per page</InputLabel>
				<Select value={this.props.dataPerPage}
					onChange={this.props.changeDataPerPage}
					className={classes.select}>
					<MenuItem value={15} className={classes.denseStyle}>15</MenuItem>
					<MenuItem value={30} className={classes.denseStyle}>30</MenuItem>
					<MenuItem value={50} className={classes.denseStyle}>50</MenuItem>
					<MenuItem value={75} className={classes.denseStyle}>75</MenuItem>
					<MenuItem value={100} className={classes.denseStyle}>100</MenuItem>
				</Select>
			</div>);
	}
}

export default withStyles(styles)(DataPerPage);

