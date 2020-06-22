import React, {Component} from "react";
import {Alert} from "@material-ui/lab";

class ErrorMessage extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Alert serverity="error" onClose={()=>{}}>{this.props.error}</Alert>
		);
	}
}

export default ErrorMessage;
