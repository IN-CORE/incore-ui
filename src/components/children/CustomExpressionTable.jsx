import React, { PropTypes } from "react";
import { Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core";

class CustomExpressionTable extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		let curves;
		if ("fragilityCurves" in this.props.dfr3Curve) {
			curves = this.props.dfr3Curve.fragilityCurves;
		}
		else if ("repairCurves" in this.props.dfr3Curve) {
			curves = this.props.dfr3Curve.repairCurves;
		}
		else if ("restorationCurves" in this.props.dfr3Curve) {
			curves = this.props.dfr3Curve.restorationCurves;
		}
		else{
			curves = [];
		}

		return (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell colSpan="2" tooltip="DFR3 Curve GUID" style={{textAlign: "center"}}>
							{this.props.dfr3Curve.id}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Limit State</TableCell>
						<TableCell>Expression</TableCell>
					</TableRow>
				</TableHead>
				<TableBody displayRowCheckbox={false}>
					{curves.map(function (curve) {
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
