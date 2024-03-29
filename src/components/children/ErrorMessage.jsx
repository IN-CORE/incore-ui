import React, {Component} from "react";
import {Alert} from "@material-ui/lab";
import {Collapse, IconButton, Link} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import config from "../../app.config";

class ErrorMessage extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Collapse in={this.props.messageOpen}>
				<Alert severity="error" action={
					<>
						{/*TODO need a template for body that includes the reporter's user name and the id of the reported item*/}
						{
							this.props.error !== ""
								?
								<Link
									href={`mailto:${config.mailingList}?subject=Bug%20Report&body=${this.props.error}`}>
									Report
								</Link>
								:
								<IconButton
									aria-label="close"
									color="inherit"
									size="small"
									onClick={this.props.closeErrorMessage}
								>
									<CloseIcon fontSize="inherit"/>
								</IconButton>

						}

					</>
				}
				>{this.props.message}</Alert>
			</Collapse>
		);
	}
}

export default ErrorMessage;
