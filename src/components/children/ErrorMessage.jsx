import React, {Component} from "react";
import {Alert} from "@material-ui/lab";
import {Collapse, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

class ErrorMessage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			messageOpen: true
		};
		this.toggleErrorMessage = this.toggleErrorMessage.bind(this);
	}

	toggleErrorMessage(){
		this.setState(prevState => ({
			messageOpen: !prevState.messageOpen
		}));
	}

	render() {
		return (
			<Collapse in={this.state.messageOpen}>
				<Alert severity="error" action={
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={this.toggleErrorMessage}
					>
						<CloseIcon fontSize="inherit"/>
					</IconButton>
				}
				>{this.props.error}</Alert>
			</Collapse>
		);
	}
}

export default ErrorMessage;
