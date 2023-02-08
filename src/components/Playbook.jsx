import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { browserHistory } from "react-router";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import config from "../app.config";
import Version from "./children/Version";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(3)
		}
	},
	grid_container: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(10),
		flexGrow: 1
	},
	h4: {
		// fontWeight: "bold",
		color: theme.palette.primary
	},
	h5: {
		marginBottom: theme.spacing(2)
	},
	cardroot: {
		maxWidth: 400,
		marginBottom: theme.spacing(3),
		marginTop: theme.spacing(3)
	},
	cardmedia: {
		height: 250,
		width: 500
	},
	footerContainer: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
		display: "flex"
	},
	icons: {
		display: "flex"
	},
	icon: {
		height: 80,
		borderRadius: 5,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginRight: theme.spacing(1)
	},
	footer: {
		overflow: "hidden",
		backgroundColor: "#ffffff"
	}
}));

const Playbook = ({ location }) => {
	const classes = useStyles();
	const images = config["playbookImageDetails"];
	const diag_img = "/public/step_diag.png";
	const footerLogos = [
		{
			image: "/public/CSU-logo.png",
			url: "https://www.colostate.edu/"
		},
		{
			image: "/public/resilience-logo.png",
			url: "http://resilience.colostate.edu/"
		},
		{
			image: "/public/UIUC-logo.png",
			url: "https://illinois.edu/"
		},
		{
			image: "/public/NCSA-logo.png",
			url: "http://www.ncsa.illinois.edu/"
		}
	];

	const getCard = (image) => {
		return (
			<Card className={classes.cardroot}>
				<CardActionArea href={image.url}>
					<CardMedia className={classes.cardmedia} image={image.img} title={image.app} />
					<CardContent>
						<Box textAlign="center">
							<Typography gutterBottom variant="h5" component="h2">
								{image.app}
							</Typography>
						</Box>
					</CardContent>
				</CardActionArea>
			</Card>
		);
	};

	return (
		<div>
			<div className={classes.root}>
				<Paper elevation={2}>
					<Grid container direction="row" alignItems="center" justifyContent="center" spacing={2}>
						<Grid item>
							<img src="/public/cr-logo.png" />
						</Grid>
						<Grid item>
							<Typography color="inherit" align="center" variant="h4" className={classes.h4}>
								Community Resilience Planning
							</Typography>
						</Grid>
					</Grid>
					<Grid container className={classes.grid_container} spacing={2}>
						<Grid item xs={12}>
							<Grid container justifyContent="center" spacing={3}>
								{images.map((image) => {
									return (
										<Grid key={image.app} item>
											{getCard(image)}
										</Grid>
									);
								})}
							</Grid>
						</Grid>
					</Grid>
					<Typography component="div">
						<Box textAlign="justify" ml={10} mr={10} pl={4} pr={4} fontSize={20}>
							This graph shows the framework used for matching and integrating the steps of the NIST’s
							Community Resilience Planning Guide for Buildings and Infrastructure Systems (Playbook) with
							modules in IN-CORE. NIST’s Resilience Planning Playbook is a practical, flexible methodology
							to set priorities, allocate resources, and manage risks to improve resilience. IN-CORE can
							provide data and analyses for multiple aspects of community infrastructure for recovery and
							resilience planning. This integrative framework matches the planning steps with the
							appropriate data outputs or models within IN-CORE. For example, Step 2 of the Playbook,
							Understand the Situation is a planning step that draws information from built environment,
							social, economic, impact, and recovery inventories developed in IN-CORE such as buildings
							inventory, housing units, household allocation inventory. IN-CORE community description
							inventories also support Step 3 of the Playbook process, Determine Goals and Objectives. The
							next phase of this framework integrates IN-CORE's predictive models of hazard, damages,
							social and economic impacts, and recovery with Step 4 of the Playbook, Plan development
							where user communities can develop strategies, policies, actions to achieve their resilience
							goals and objectives based on the predictions provided by various IN-CORE models such as
							expected building damages, population dislocation, employment losses. Plan development (Step
							4) also relies on the capability of IN-CORE modules to present the expected outcomes of
							various mitigation and recovery policies in order to reduce damages and losses and improve
							recovery proactively in advance of predicted hazard scenarios. Together the data and
							analysis capabilities of IN-CORE and the planning process of the Playbook are integrated to
							support and inform planning with analysis and modeling.
						</Box>
					</Typography>
					<Box textAlign="center" p={2} m={1}>
						<img style={{ maxWidth: "80%", height: "auto" }} src={diag_img} />
					</Box>
				</Paper>
			</div>
			{/*footer*/}
			<section className={classes.footer}>
				<Container className={classes.footerContainer}>
					<Grid container spacing={5}>
						{footerLogos.map((footerLogo) => (
							<Grid item xs={6} sm={3} md={3}>
								<Grid
									container
									direction="column"
									justify="flex-end"
									className={classes.iconsWrapper}
									spacing={2}
								>
									<Grid item className={classes.icons}>
										<a href={footerLogo.url} target="_blank">
											<img src={footerLogo.image} className={classes.icon} />
										</a>
									</Grid>
								</Grid>
							</Grid>
						))}
					</Grid>
				</Container>
				{/*version*/}
				<Version />
			</section>
		</div>
	);
};

export default Playbook;
