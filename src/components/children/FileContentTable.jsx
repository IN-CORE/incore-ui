import React, { Component } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";


class FileContentTable extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		// return <HotTable settings={this.state.settings} licenseKey="non-commercial-and-evaluation" id={this.props.container} />;
		return (<TableContainer component={Paper}>
			<Table size={"small"}>
				<TableHead>
					<TableRow>
						{this.props.colHeaders.map((header) =>
							<TableCell><b>{header}</b></TableCell>)
						}
					</TableRow>
				</TableHead>
				<TableBody>
					{this.props.data.map(row => (
						<TableRow>
							{
								row.map((cell) =>
									<TableCell>{cell}</TableCell>)
							}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>);
	}
}

export default FileContentTable;
