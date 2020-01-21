import React, {PropTypes} from "react";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

class DistributionTable extends React.Component {
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
						<TableCell colSpan={3}>
							{this.props.dfr3Curve.id}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Limit State</TableCell>
						<TableCell>Alpha/
							{
							curves[0].alphaType?
								curves[0].alphaType[0].toUpperCase()
								+ curves[0].alphaType.slice(1)
								:
								''
							}</TableCell>
						<TableCell>Beta</TableCell>
					</TableRow>
				</TableHead>
				<TableBody displayRowCheckbox={false}>
					{curves.map(function (curve) {
						return (
							<TableRow>
								<TableCell>{curve.description}</TableCell>
								<TableCell>{curve.alpha}</TableCell>
								<TableCell>{curve.beta}</TableCell>
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

DistributionTable.propTypes = {};

export default DistributionTable;
