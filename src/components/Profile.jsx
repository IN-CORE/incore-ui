import React, {useEffect, useState} from "react";
import {createMuiTheme, makeStyles} from "@material-ui/core/styles";
import {Box, Chip, Divider, Grid, Link, Paper, Typography, List, ListItem, ListItemText, ListItemIcon} from "@material-ui/core";
import Gravatar from "react-gravatar";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import EditIcon from "@material-ui/icons/Edit";
import ComputerIcon from "@material-ui/icons/Computer";
import MemoryIcon from "@material-ui/icons/Memory";
import StorageIcon from "@material-ui/icons/Storage";

import {getCurrUserInfo, determineUserGroup} from "../utils/common";
import config from "../app.config";
import CustomHighChart from "./children/CustomHighChart";
import chartConfig from "./config/ChartConfig";
import Cookies from "universal-cookie";
import {browserHistory} from "react-router";

const cookies = new Cookies();

const theme = createMuiTheme();

const useStyles = makeStyles({
	root: {
		padding: theme.spacing(4)
	},
	gridItem: {
		padding: theme.spacing(4),
		overflow: "auto",
		minHeight: "800px"
	},
	profileSection: {
		margin: "30px auto",
	},
	quotaSection:{
		margin:"30px"
	},
	avatar: {
		position: "relative"
	},
	avatarImg: {
		width: "100%",
		height: "100%"
	},
	avatarEdit: {
		position: "absolute",
		bottom: "5%",
		right: "5%",
		color: "#FFFFFF",
	},
	profileLink: {
		fontFamily: theme.typography.body1.fontFamily,
		fontWeight: "normal",
		fontSize: "14px",
		display: "block",
		margin: "4px 0",
		overflowWrap: "break-word"
	},
	profileLinkIcon: {
		verticalAlign: "bottom",
		marginRight: "2px"
	},
	groupChip: {
		margin: "4px 8px 4px 0px",
		fontFamily: theme.typography.body1.fontFamily,
		fontWeight: "normal",
		fontSize: 14,
		color: "#FFFFFF",
	},
	groupPieContainer: {
		display: "block",
		margin: "20px auto",
		// textAlign:"center"
	},
	pieChartContainer: {
		width: "50%",
		height: "50%",
		display: "inline-block",
		overflow: "auto",
		textAlign: "center",
	}
});

export default function Profile(props) {
	const {loginError, datasetUsage, hazardUsage} = props;
	const [authError, setAuthError] = useState(false);
	const [dataEntityPie, setDataEntityPie] = useState({});
	const [dataFileSizePie, setDataFileSizePie] = useState({});
	const [hazardEntityPie, setHazardEntityPie] = useState({});
	const [hazardFileSizePie, setHazardFileSizePie] = useState({});

	// Get user information and determine which group to use
	const userInfo = getCurrUserInfo();
	const group = determineUserGroup(userInfo);

	useEffect(() => {
		// check if logged in
		let authorization = cookies.get("Authorization");

		// logged in
		if (config.hostname.includes("localhost") || (authorization !== undefined && authorization !== "" && authorization !== null)) {
			setAuthError(false);
		}
		// not logged in
		else {
			setAuthError(true);
		}
	}, []);

	useEffect(() => {
		if (datasetUsage !== undefined && Object.keys(datasetUsage).length > 0){
			let pieChartConfig = configurePieCharts(datasetUsage, "datasetUsage", group);
			setDataEntityPie(pieChartConfig["entity"]);
			setDataFileSizePie(pieChartConfig["fileSize"]);
		}
	}, [datasetUsage]);

	useEffect(() => {
		if (hazardUsage !== undefined && Object.keys(hazardUsage).length > 0){
			let pieChartConfig = configurePieCharts(hazardUsage, "hazardUsage", group);
			setHazardEntityPie(pieChartConfig["entity"]);
			setHazardFileSizePie(pieChartConfig["fileSize"]);
		}
	}, [hazardUsage]);

	// for any auth error
	useEffect(() =>{
		if (loginError === true){
			setAuthError(true);
		}
	}, [loginError]);

	/*
	function to configure group of pie chart
	 */
	const configurePieCharts = (usage, type="datasetUsage", group) => {
		// to create a deep copy !important
		let defaultEntityPieConfig = JSON.parse(JSON.stringify(chartConfig.pieChartConfig));
		let defaultFileSizePieConfig = JSON.parse(JSON.stringify(chartConfig.pieChartConfig));

		defaultEntityPieConfig["series"][0]["data"] = [
			{
				name: "Available",
				y: config.maxUsage[group][type].entity - usage["total_number_of_datasets"]
			},
			{
				name: "Used",
				y: usage["total_number_of_datasets"]
			}];
		defaultEntityPieConfig["title"]["text"] = "Entities";
		defaultEntityPieConfig["subtitle"]["text"] = `Used ${usage["total_number_of_datasets"]} of ${config.maxUsage[group][type].entity}`;

		defaultFileSizePieConfig["series"][0]["data"] = [
			{
				name: "Available",
				y: config.maxUsage[group][type].fileSizeByte - usage["total_file_size_byte"]
			},
			{
				name: "Used",
				y: usage["total_file_size_byte"]
			}];
		defaultFileSizePieConfig["title"]["text"] = "File Size";
		defaultFileSizePieConfig["subtitle"]["text"] = `Used ${usage["total_file_size"]} of ${config.maxUsage[group][type].fileSize}`;

		return {"entity": defaultEntityPieConfig, "fileSize": defaultFileSizePieConfig};
	};

	const classes = useStyles();

	if (authError) {
		browserHistory.push("/login?origin=profile");
		return null;
	}
	else {
		return (
			<div className={classes.root}>
				<Grid container spacing={4}>
					{/*profile*/}
					<Grid item lg={3} md={3} sm={3} xl={3} xs={12}>
						<Paper variant="outlined" className={classes.gridItem}>
							{
								userInfo["email"] !== undefined ?
									<Box className={classes.avatar}>
										<Gravatar className={classes.avatarImg} size={300} email={userInfo["email"]}
												  rating="g"/>
										<Link href={config.setGravatarURL} target="_blank"
											  className={classes.avatarEdit}>
											<EditIcon fontSize="default"/>
										</Link>
									</Box>
									:
									<img src="/public/profile.png" style={{width:"100%"}}/>
							}
							<Box className={classes.profileSection}>
								{
									userInfo["preferred_username"] !== undefined ?
										<Typography variant="h6">{userInfo["preferred_username"]}</Typography> : null
								}
								{
									userInfo["name"] !== undefined ?
										<Typography variant="body1"
											className={classes.profileLink}>{userInfo["name"]}</Typography> : null
								}
								{
									userInfo["email"] !== undefined ?
										<Typography className={classes.profileLink}>
											{/*<MailOutlineIcon fontSize="small" className={classes.profileLinkIcon}/>*/}
											{userInfo["email"]}</Typography> : null
								}
								<Link href={config.resetPwURL} className={classes.profileLink} target="_blank">
									<LockOpenIcon fontSize="small" className={classes.profileLinkIcon}/>
									Forgot password?</Link>
							</Box>
							<Divider orientation="horizontal"/>
							<Box className={classes.profileSection}>
								{
									userInfo["groups"] !== undefined ?
										(
											<>
												<Typography variant="h6">Groups
													({userInfo["groups"].length})</Typography>
												{
													userInfo["groups"].map((group, idx) => {
														return (
															<Chip size="small" color="secondary" label={group}
																  className={classes.groupChip} key={idx}/>
														);
													})
												}
											</>
										)
										:
										null
								}
							</Box>
							<Divider orientation="horizontal"/>
							<Box className={classes.profileSection}>
								<Typography variant="h6">Token Valid Till</Typography>
								{
									userInfo["exp"] !== undefined ?
										<Typography
											variant="body1">{new Date(userInfo["exp"] * 1000).toString()}</Typography> : null
								}
							</Box>
						</Paper>
					</Grid>
					{/*quota*/}
					<Grid item lg={9} md={9} sm={9} xl={9} xs={12}>
						<Paper variant="outlined" className={classes.gridItem}>
							<Grid container spacing={4}>
								<Grid item xl={7} lg={7} md={12} sm={12} xs={12}>
									{/*Data services*/}
									<Box className={classes.quotaSection}>
										<Typography variant="h5">Data Service</Typography>
										<Typography variant="body1">Usage of datasets</Typography>
										<Box className={classes.groupPieContainer}>
											<Box className={classes.pieChartContainer}>
												{
													Object.keys(dataEntityPie).length > 0 ?
														<CustomHighChart chartId="data-entity" configuration={dataEntityPie}
															customClassName="piecharts-container"/> :<></>
												}
											</Box>
											<Box className={classes.pieChartContainer}>
												{
													Object.keys(dataFileSizePie).length > 0?
														<CustomHighChart chartId="data-disk-storage"
																		 configuration={dataFileSizePie}
																		 customClassName="piecharts-container"/> : <></>
												}
											</Box>
										</Box>
									</Box>
									<Divider orientation="horizontal"/>
									{/*Hazard services*/}
									<Box className={classes.quotaSection}>
										<Typography variant="h5">Hazard Service</Typography>
										<Typography variant="body1">Usage of hazard scenarios</Typography>
										<Box className={classes.groupPieContainer}>
											<Box className={classes.pieChartContainer}>
												{
													Object.keys(hazardEntityPie).length > 0 ?
														<CustomHighChart chartId="hazard-entity" configuration={hazardEntityPie}
																	 customClassName="piecharts-container"/> : <></>
												}
											</Box>
											<Box className={classes.pieChartContainer}>
												{
													Object.keys(hazardFileSizePie).length > 0 ?
														<CustomHighChart chartId="hazard-disk-storage"
																		 configuration={hazardFileSizePie}
																		 customClassName="piecharts-container"/> : <></>
												}
											</Box>
										</Box>
									</Box>
								</Grid>
								<Grid item xl={5} lg={5} md={12} sm={12} xs={12}
									  style={{borderLeft: "solid 1px rgba(0, 0, 0, 0.12)"}}>
									<Box className={classes.quotaSection}>
										<Typography variant="h5">IN-CORE Lab</Typography>
										<Typography variant="body1">Usage of IN-CORE Lab</Typography>
										<Box>
											<List>
												<ListItem>
													<ListItemIcon><ComputerIcon/></ListItemIcon>
													{/*TODO this should read from a config file*/}
													<ListItemText
														primary={`${config["maxUsage"][group]["labUsage"]["vCPU"]} CPUs`}/>
												</ListItem>
												<ListItem>
													<ListItemIcon><MemoryIcon/></ListItemIcon>
													{/*TODO this should read from a config file*/}
													<ListItemText
														primary={`${config["maxUsage"][group]["labUsage"]["RAM"]} Memory`}/>
												</ListItem>
												<ListItem>
													<ListItemIcon><StorageIcon/></ListItemIcon>
													{/*TODO this should read from a config file*/}
													<ListItemText
														primary={`${config["maxUsage"][group]["labUsage"]["Storage"]} Disk Storage`}/>
												</ListItem>
											</List>
											{/*<Link className={classes.profileLink} href={config.tosURL} target="_blank">Learn*/}
											{/*	More ...</Link>*/}
										</Box>
									</Box>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	}
}
