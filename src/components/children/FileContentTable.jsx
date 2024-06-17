import React, { Component } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";

class FileContentTable extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		// return <HotTable settings={this.state.settings} licenseKey="non-commercial-and-evaluation" id={this.props.container} />;
		return (
			<TableContainer component={Paper}>
				<Table size={"small"}>
					<TableHead>
						<TableRow>
							{this.props.colHeaders.map((header) => (
								<TableCell key={header}>
									<b>{header}</b>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{this.props.data.map((row, i) => (
							<TableRow key={i}>
								{row.map((cell, j) => (
									<TableCell key={j}>{cell}</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
	}
}

export default FileContentTable;
