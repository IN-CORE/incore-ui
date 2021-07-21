import * as React from "react";
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles/index";
import {compareStrings} from "../../utils/common";


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

class Space extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		const {classes} = this.props;

		if (this.props.spaces.length > 0) {
			let sorted_spaces = this.props.spaces.sort(function(a, b) {
				return compareStrings(a.name, b.name);
			});

			return (
				<div>
					<InputLabel>Spaces</InputLabel>
					<Select value={this.props.selectedSpace} onChange={this.props.handleSpaceSelection}
						className={classes.select}>
						<MenuItem key="All" value="All" className={classes.denseStyle}>All</MenuItem>
						{sorted_spaces.map((space, index) =>
							(<MenuItem label={space.metadata.name} value={space.metadata.name} name={space.metadata.name}
									  key={space.metadata.name} className={classes.denseStyle}>
								{space.metadata.name}</MenuItem>))}
					</Select>
				</div>);
		}
		else {
			return null;
		}

	}
}

export default withStyles(styles)(Space);
