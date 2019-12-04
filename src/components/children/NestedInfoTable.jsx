import React from "react";
import {
	Button, Divider, List, ListItem, Table, TableBody,
	TableCell, TableRow, Tooltip} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles/index";


const styles = {
	inlineButtons: {
		display: "inline-block",
		margin: "auto 5px"
	},
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
									<TableCell style={{width: "30%", fontWeight: "bold", backgroundColor: "#eee"}}>
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
						// tornado only has single dataset
						else if (key === "datasetId" && this.props.data[key]) {
							return (
								<TableRow>
									<TableCell style={{width: "30%", fontWeight: "bold", backgroundColor: "#eee"}}>
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
						}
						else if (this.props.data[key]) {
							return (
								<TableRow>
									{
										key === "creator" ?
											(<Tooltip title="The person who created the resource">
												<TableCell
													style={{width: "30%", fontWeight: "bold", backgroundColor: "#eee"}}>
													{key}
												</TableCell>
											</Tooltip>)
											:
											(<TableCell
												style={{width: "30%", fontWeight: "bold", backgroundColor: "#eee"}}>
												{key}
											</TableCell>)
									}

									{(typeof this.props.data[key] === "object" && this.props.data[key]) ?
										Object.keys(this.props.data[key]).map((key2) => {
											return (
												// second level
												<TableRow>
													<TableCell style={{width: "30%", fontWeight: "bold"}}>
														{key2}
													</TableCell>

													{
														(typeof this.props.data[key][key2] === "object" && this.props.data[key][key2]) ?
															Object.keys(this.props.data[key][key2]).map((key3) => {
																return (

																	// third level
																	<TableRow>
																		<TableCell
																			style={{width: "30%", fontWeight: "bold"}}>
																			{key3}
																		</TableCell>
																		<TableCell>
																			{JSON.stringify(this.props.data[key][key2][key3])}
																		</TableCell>
																	</TableRow>

																);
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
						}
						else {
							return null;
						}
					})
				}
			</TableBody>
		</Table>);
	}
}

export default withStyles(styles)(NestedInfoTable);
