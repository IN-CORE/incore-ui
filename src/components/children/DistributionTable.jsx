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
						{
							Object.keys(curves[0]).map(key =>{
								if (key === "description") return (<TableCell>limit state</TableCell>);
								else if (key !== "className") return (<TableCell>{key}</TableCell>);
							})
						}
					</TableRow>
				</TableHead>
				<TableBody displayRowCheckbox={false}>
					{curves.map(function (curve) {
						return (
							<TableRow>
								{
									Object.keys(curve).map(key =>{
										if ((key === "alpha" || key === "beta") && curve.className === "ConditionalStandardFragilityCurve"){
											return (<TableCell>
												{
													curve[key].map(content => {
														return (<TableRow>{content}</TableRow>);
													})
												}
											</TableCell>);
										}
										else if (key === "rules" && curve.className === "ConditionalStandardFragilityCurve"){
											return (<TableCell>
												{
													curve.alpha.map((a, index) => {
														return (<TableRow>{(curve[key][index.toString()])}</TableRow>);
													})
												}
											</TableCell>);
										}
										else if (key === "parameters" && curve.className === "ParametricFragilityCurve"){
											return (<TableCell>
												{
													curve[key].map(parameterSet => {
														return (
															<TableRow>{JSON.stringify(parameterSet)}</TableRow>);
													})
												}
											</TableCell>);
										}
										else if (key !== "className") {
											return (<TableCell>{curve[key]}</TableCell>);
										}
									})
								}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		);
	}

}

DistributionTable.propTypes = {};

export default DistributionTable;
