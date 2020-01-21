import React, { PropTypes } from "react";
import { Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core";

class CustomExpressionTable extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		return (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell colSpan="2" tooltip="DFR3Curve GUID" style={{textAlign: "center"}}>
							{this.props.DFR3Curve.id}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Limit State</TableCell>
						<TableCell>Expression</TableCell>
					</TableRow>
				</TableHead>
				<TableBody displayRowCheckbox={false}>
					{this.props.DFR3Curve.fragilityCurves.map(function (curve) {
						return (
							<TableRow>
								<TableCell>{curve.description}</TableCell>
								<TableCell>{curve.expression}</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		);
	}

	componentWillUnmount() {
	}
}

CustomExpressionTable.propTypes = {};

export default CustomExpressionTable;
