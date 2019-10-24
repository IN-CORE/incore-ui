import React, {PropTypes} from "react";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

class DistributionTable extends React.Component {
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
						<TableCell colSpan={3}>
							{this.props.fragility.id}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Limit State</TableCell>
						<TableCell>Alpha</TableCell>
						<TableCell>Beta</TableCell>
					</TableRow>
				</TableHead>
				<TableBody displayRowCheckbox={false}>
					{this.props.fragility.fragilityCurves.map(function (curve) {
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
