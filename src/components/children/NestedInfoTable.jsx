import React from "react";
import {Button, Divider, List, ListItem, Table, TableBody, TableCell, TableRow, Tooltip} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles/index";
import config from "../../app.config";


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

		const renderDataRows = (data, classes, onClick) => {
			const keysToExclude = ["hazardDatasets", "rasterDataset", "datasetId"];
			console.log(config.hostname + "semantics/api/types/" + "ergo");
			return Object.keys(data).map((key) => {
				if (key === "hazardDatasets" && data[key].length > 0) {
					return (
						<TableRow key={key}>
							<TableCell className={classes.rowHeaderCell}>
								{key}
							</TableCell>
							<TableCell>
								<List>
									{data[key].map((hazardDataset) => {
										if (hazardDataset.datasetId) {
											return (
												<div key={hazardDataset.datasetId}>
													<ListItem key={hazardDataset.datasetId}>
														<Button
															color="primary"
															variant="contained"
															size="small"
															className={classes.inlineButtons}
															onClick={() => onClick(hazardDataset.datasetId)}
														>
															Preview
														</Button>
														{hazardDataset.datasetId}
													</ListItem>
													<Divider />
												</div>
											);
										}
									})}
								</List>
							</TableCell>
						</TableRow>
					);
				} else if (key === "rasterDataset" && data[key] && data[key].datasetId) {
					return (
						<TableRow key={key}>
							<TableCell className={classes.rowHeaderCell}>
								{key}
							</TableCell>
							<TableCell>
								<List>
									<ListItem key={data[key].datasetId}>
										<Button
											color="primary"
											variant="contained"
											size="small"
											className={classes.inlineButtons}
											onClick={() => onClick(data[key].datasetId)}
										>
											Preview
										</Button>
										{data[key].datasetId}
									</ListItem>
									<Divider />
								</List>
							</TableCell>
						</TableRow>
					);
				} else if (key === "datasetId" && data[key]) {
					return (
						<TableRow key={key}>
							<TableCell className={classes.rowHeaderCell}>
								{key}
							</TableCell>
							<TableCell>
								<List>
									<ListItem key={data[key]}>
										<Button
											color="primary"
											variant="contained"
											size="small"
											className={classes.inlineButtons}
											onClick={() => onClick(data[key])}
										>
											Preview
										</Button>
										{data[key]}
									</ListItem>
									<Divider />
								</List>
							</TableCell>
						</TableRow>
					);
				} else if (data[key]) {
					return (
						<TableRow key={key}>
							{key === "creator" ? (
								<Tooltip title="The person who created the resource">
									<TableCell className={classes.rowHeaderCell}>
										{key}
									</TableCell>
								</Tooltip>
							) : (
								<TableCell className={classes.rowHeaderCell}>
									{key}
								</TableCell>
							)}
							{/* If the value is an object, render a sub-table	*/}
							{typeof data[key] === "object" && data[key] ? (
								Object.keys(data[key]).map((key2) => {
									return (
										<TableRow key={key2}>
											<TableCell className={classes.rowSubHeaderCell}>
												{key2}
											</TableCell>

											{typeof data[key][key2] === "object" && data[key][key2] ? (
												Object.keys(data[key][key2]).map((key3) => {
													if (key3 !== "legacyEntry") {
														return (
															<TableRow key={key3}>
																<TableCell className={classes.rowSubHeaderCell}>
																	{key3}
																</TableCell>
																<TableCell>
																	{JSON.stringify(data[key][key2][key3])}
																</TableCell>
															</TableRow>
														);
													}
												})
											) : (
												<TableCell>
													{JSON.stringify(data[key][key2])}
												</TableCell>
											)}
										</TableRow>
									);
								})
							) : key ==='dataType' ? // Another ternary operator to check if the value is a dataType if so create linking
									(<TableCell>
										<a href={`/semantics/api/types/${data[key]}`} target="_blank" rel="noopener noreferrer">{data[key]} </a>
									</TableCell>)
									:
								(<TableCell>
									{data[key]}
								</TableCell>)
							}
						</TableRow>
					);
				} else {
					return null;
				}
			});
		};

		return (<Table size="small">
			<TableBody>
				{
					renderDataRows(this.props.data, classes, this.props.onClick)
				}
			</TableBody>
		</Table>);
	}
}

export default withStyles(styles)(NestedInfoTable);
