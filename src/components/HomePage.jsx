import React from "react";
import {Button, Container, Grid, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";


const styles = theme => ({
	root: {
		color: theme.palette.common.white,
		position: "relative",
		display: "flex",
		alignItems: "center",
		[theme.breakpoints.up("sm")]: {
			height: "80vh",
			minHeight: 500,
			maxHeight: 1300,
		},
	},
	container: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(14),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	backdrop: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: theme.palette.common.black,
		opacity: 0.7,
		zIndex: -1,
	},
	arrowDown: {
		position: "absolute",
		bottom: theme.spacing(4),
	},
	background: {
		backgroundImage: "url('/public/resilience-logo.png')",
		backgroundColor: "#7fc7d9",
		backgroundPosition: "center",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundSize: "cover",
		zIndex: -2,
	},
	button: {
		minWidth: 200,
		padding:20,
		margin: theme.spacing(2),
		color:"#ffffff",
		fontWeight:"bold"
	},
	h1: {
		fontWeight: "bold",
		color: theme.palette.primary
	},
	h5: {
		marginBottom: theme.spacing(4),
		marginTop: theme.spacing(4),
		[theme.breakpoints.up("sm")]: {
			marginTop: theme.spacing(10),
		},
	},
	more: {
		textAlign: "center",
		marginTop: theme.spacing(2),
	},
	sectionDark: {
		display: "flex",
		overflow: "hidden",
		backgroundColor: theme.palette.fourth.main,
	},
	sectionLight: {
		display: "flex",
		overflow: "hidden"
	},
	footer:{
		display:"flex",
		overflow:"hidden",
		backgroundColor: "#ffffff"
	},
	link:{
		color:theme.palette.secondary.main,
		textDecoration:"none",
		fontWeight:"bold"
	},
	sectionContainers: {
		marginTop: theme.spacing(15),
		marginBottom: theme.spacing(30),
		display: "flex",
		position: "relative",
	},
	item: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: theme.spacing(0, 3),
	},
	image: {
		height: 100,
	},
	title: {
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5),
	},
	content:{
		textAlign:"center",
	},
	footerContainer: {
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(8),
		display: "flex",
	},
	iconsWrapper: {
		height: 80,
	},
	icons: {
		display: "flex",
	},
	icon: {
		height: 80,
		borderRadius: 5,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginRight: theme.spacing(1)
	},
	list: {
		margin: 0,
		listStyle: "none",
		paddingLeft: 0,
	},
	listItem: {
		paddingTop: theme.spacing(0.5),
		paddingBottom: theme.spacing(0.5),
	},
});


function HomePage(props) {

	const {classes} = props;
	const title = "IN-CORE";
	const subTitle = "Run your scientific analyses that model the impact of natural hazards on a community and the \
		resilience of those communities.";

	const sections = [
		{
			title: "pyIncore",
			image: "/public/python-logo.png",
			description: "pyIncore is a Python package to analyze and visualize various hazard scenarios\
							developed by the Center for Risk-Based Community Resilience Planning team from NCSA. \
							pyIncore allows users to apply hazards on infrastructure in selected areas.",
		},
		{
			title: "Web Service API",
			image: "/public/swagger-logo.png",
			description: "IN-CORE currently maintains 4 different services: The Authentication Service supports secure LDAP authentication. \
						Data Service provides basic capabilities to fetch/store data from file storage. Fragility \
						service that supports fragilities and fragility mapping.\
						The Hazard Service supports creating model based or data based hazards."
		},
		{
			title:"IN-CORE Lab",
			image: "/public/jupyter-logo.png",
			description: "IN-CORE Lab which is a customized JupyterLab deployed on JupyterHub, enables user to work with documents and writing code,\
						using Jupyter notebooks, text editors, terminals, and custom components in a flexible, integrated, and extensible manner.",
		},
		{
			title:"Web Tools",
			image: "/public/webapp-logo.png",
			description: "The web application provides the user interface for interacting with the service layer.\
						It provides a login interface and enables browsing and searching the datasets, hazards and fragilities, \
						viewing the metadata and visualizations, and downloading the datasets."
		}
	];

	const footerLogos = [
		{
			image: "/public/CSU-logo.png",
			url: "https://www.colostate.edu/"
		},
		{
			image: "/public/resilience-logo-small.png",
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

	return (
		<div>
			{/*header*/}
			<section className={classes.root}>
				<Container className={classes.container}>
					<Typography color="inherit" align="center" variant="h1" className={classes.h1} marked="center">
						{title}
					</Typography>
					<Typography color="inherit" align="center" variant="h5" className={classes.h5}>
						{subTitle}
					</Typography>
					<Typography variant="body1" color="inherit" className={classes.more}>
						The <a href="https://www.nist.gov" className={classes.link} target="_blank">National
						Institute of Standards and
						Technology (NIST)</a> funded the multi-university five-year <a
						href="http://resilience.colostate.edu" className={classes.link} target="_blank">Center of
						Excellence
						for Risk-Based Community Resilience Planning (CoE)</a>, headquartered at <a
						href="https://www.colostate.edu" className={classes.link} target="_blank">
						Colorado State University</a>, to develop the measurement science to support community
						resilience assessment.
						Measurement science is implemented on a platform called <a
						href="http://resilience.colostate.edu/in_core.shtml" className={classes.link}
						target="_blank">
						Interdependent Networked Community Resilience Modeling Environment (IN-CORE)</a>. On
						IN-CORE,
						users can run scientific analyses that model the impact of natural hazards and resiliency
						against the impact on communities. The IN-CORE platform is built on a <a
						href="https://kubernetes.io" className={classes.link} target="_blank">Kubernetes
						cluster</a> with<a href="https://www.docker.com" className={classes.link}
										   target="_blank"> Docker</a> container technology.
					</Typography>
					<Button
						color="secondary"
						variant="contained"
						size="large"
						className={classes.button}
						component="a"
						href="">
						V0.3.0 RELEASED
					</Button>
					<div className={classes.backdrop}/>
					<div className={classes.background}/>
					<img
						className={classes.arrowDown}
						src="/public/productHeroArrowDown.png"
						height="18"
						width="14"
						alt="arrow down"
					/>
				</Container>
			</section>
			{/*products*/}
			<section className={classes.sectionDark}>
				<Container className={classes.sectionContainers}>
					<Grid container spacing={3}>
						{sections.map((section) =>
							<Grid item xs={12} md={3}>
								<div className={classes.item}>
									<img className={classes.image}
										 src={section.image}/>
									<Typography variant="h6" className={classes.title}>
										{section.title}
									</Typography>
									<Typography variant="body1" className={classes.content}>
										{section.description}
									</Typography>
								</div>
							</Grid>)
						}
					</Grid>
				</Container>
			</section>
			{/*footer*/}
			<section className={classes.footer}>
				<Container className={classes.footerContainer}>
					<Grid container spacing={5}>
						{
							footerLogos.map((footerLogo) =>
								<Grid item xs={6} sm={3} md={3}>
									<Grid container direction="column" justify="flex-end"
										  className={classes.iconsWrapper}
										  spacing={2}>
										<Grid item className={classes.icons}>
											<a href={footerLogo.url} target="_blank">
												<img src={footerLogo.image} className={classes.icon}/>
											</a>
										</Grid>
									</Grid>
								</Grid>)
						}
					</Grid>
				</Container>
			</section>
		</div>
	);

}

export default withStyles(styles)(HomePage);
