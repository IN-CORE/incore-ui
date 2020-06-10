import React from "react";
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
						{/* column header except for parametric fragility */}
						{
							curves[0].className !== "ParametricFragilityCurve" ?
								<TableCell>Alpha/
									{
										curves[0].alphaType?
											curves[0].alphaType[0].toUpperCase()
											+ curves[0].alphaType.slice(1)
											:
											""
									}
								</TableCell> :null
						}
						{
							curves[0].className !== "ParametricFragilityCurve" ?
								<TableCell>Beta</TableCell> : null
						}

						{/*column header for conditional standard fragility*/}
						{
							curves[0].className === "ConditionalStandardFragilityCurve" ?
								<TableCell>Rules</TableCell>:null
						}
					</TableRow>
				</TableHead>
				<TableBody displayRowCheckbox={false}>
					{curves.map(function (curve) {
						if (curve.className === "ConditionalStandardFragilityCurve"){
							// return (
							// <TableRow>
							// 	<TableCell>{curve.description}</TableCell>
							// 	<TableCell>{curve.alpha.join("/ ")}</TableCell>
							// 	<TableCell>{curve.beta.join("/ ")}</TableCell>
							// 	Object.keys(curve.rules).map(key=>{
							// 	return (
							// 	<TableRow>
							// 		<TableCell>
							// 		{key}
							// 		</TableCell>
							// 		<TableCell>
							// 		{JSON.stringify(
							// 			this.props.data[key][key2][key3])}
							// 		</TableCell>
							// 		</TableRow>
							//
							// })
							// 	{/*<TableCell>{curve.rules}</TableCell>*/}
							// </TableRow>
							// );
						}
						else if (curve.className === "ParametricFragilityCurve"){
							return;
						}
						else{
							return (
								<TableRow>
									<TableCell>{curve.description}</TableCell>
									<TableCell>{curve.alpha}</TableCell>
									<TableCell>{curve.beta}</TableCell>
								</TableRow>
							);
						}
					})}
				</TableBody>
			</Table>
		);
	}

}

DistributionTable.propTypes = {};

export default DistributionTable;
