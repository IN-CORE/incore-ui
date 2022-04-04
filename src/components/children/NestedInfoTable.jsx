import React from "react";
import {Button, Divider, List, ListItem, Table, TableBody, TableCell, TableRow, Tooltip} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles/index";


const styles = {
	inlineButtons: {
		display: "inline-block",
		margin: "auto 5px"
	},
	rowHeaderCell: {
		minWidth: "30%",
		fontWeight: "bold",
		backgroundColor: "#eee"
	},
	rowSubHeaderCell: {
		minWidth: "30%",
		fontWeight: "bold"
	}
};

class NestedInfoTable extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {

		const {classes} = this.props;

		return (<Table size="small">
			<TableBody>
				{
					Object.keys(this.props.data).map((key) => {
						// multiple datasets
						if (key === "hazardDatasets" && this.props.data[key].length > 0) {
							return (
								<TableRow>
									<TableCell className={classes.rowHeaderCell}>
										{key}
									</TableCell>
									<TableCell>
										<List>
											{
												this.props.data[key].map((hazardDataset) => {
													if (hazardDataset.datasetId) {
														return (<div key={hazardDataset.datasetId}>
															<ListItem key={hazardDataset.datasetId}>
																<Button color="primary" variant="contained"
																		size="small" className={classes.inlineButtons}
																		onClick={() => this.props.onClick(hazardDataset.datasetId)}>Preview</Button>
																{hazardDataset.datasetId}
															</ListItem>
															<Divider/>
														</div>);
													}
												})
											}
										</List>
									</TableCell>
								</TableRow>
							);
						}
						// model based eq
						else if (key === "rasterDataset" && this.props.data[key] && this.props.data.rasterDataset.datasetId) {
							return (
								<TableRow>
									<TableCell className={classes.rowHeaderCell}>
										{key}
									</TableCell>
									<TableCell>
										<List>
											<ListItem key={this.props.data.rasterDataset.datasetId}>
												<Button color="primary" variant="contained" size="small"
														className={classes.inlineButtons}
														onClick={() => this.props.onClick(this.props.data.rasterDataset.datasetId)}>Preview</Button>
												{this.props.data.rasterDataset.datasetId}
											</ListItem>
											<Divider/>
										</List>
									</TableCell>
								</TableRow>
							);
						}
						// tornado only has single dataset
						else if (key === "datasetId" && this.props.data[key]) {
							return (
								<TableRow>
									<TableCell className={classes.rowHeaderCell}>
										{key}
									</TableCell>
									<TableCell>
										<List>
											<ListItem key={this.props.data.datasetId}>
												<Button color="primary" variant="contained" size="small"
														className={classes.inlineButtons}
														onClick={() => this.props.onClick(this.props.data.datasetId)}>Preview</Button>
												{this.props.data.datasetId}
											</ListItem>
											<Divider/>
										</List>
									</TableCell>
								</TableRow>
							);
						} else if (this.props.data[key]) {
							return (
								<TableRow>
									{
										key === "creator" ?
											(<Tooltip title="The person who created the resource">
												<TableCell
													className={classes.rowHeaderCell}>
													{key}
												</TableCell>
											</Tooltip>)
											:
											(<TableCell
												className={classes.rowHeaderCell}>
												{key}
											</TableCell>)
									}

									{(typeof this.props.data[key] === "object" && this.props.data[key]) ?
										Object.keys(this.props.data[key]).map((key2) => {
											return (
												// second level
												<TableRow>
													<TableCell className={classes.rowSubHeaderCell}>
														{key2}
													</TableCell>

													{
														(typeof this.props.data[key][key2] === "object" && this.props.data[key][key2]) ?
															Object.keys(this.props.data[key][key2]).map((key3) => {
																if (key3 !== "legacyEntry") {
																	return (
																		// third level
																		<TableRow>
																			<TableCell
																				className={classes.rowSubHeaderCell}>
																				{key3}
																			</TableCell>
																			<TableCell>
																				{JSON.stringify(
																					this.props.data[key][key2][key3])}
																			</TableCell>
																		</TableRow>

																	);
																}
															}) : (
																<TableCell>{JSON.stringify(this.props.data[key][key2])}</TableCell>)
													}
												</TableRow>
											);
										})
										:
										(<TableCell>{this.props.data[key]}</TableCell>)
									}
								</TableRow>);
						} else {
							return null;
						}
					})
				}
			</TableBody>
		</Table>);
	}
}

export default withStyles(styles)(NestedInfoTable);
