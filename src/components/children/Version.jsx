import * as React from "react";
import {Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import config from "../../app.config";

const styles = theme => ({
	versionContainer: {
		margin: theme.spacing(1),
		display: "block",
		overflow: "hidden",
		backgroundColor: "none",
		textAlign:"center"
	},
	highlightText: {
		color: "#e94a26",
		fontWeight: "bold",
		textAlign:"center"
	}
});

class Version extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {classes} = this.props;
		const webappVersion = config.webVersion;

		return (
			<div className={classes.versionContainer}>
				<Typography variant="body1"><kbd className={classes.highlightText}>IN-CORE</kbd> Web ({webappVersion})
				</Typography>
			</div>
		);
	}
}

export default withStyles(styles)(Version);
