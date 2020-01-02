import React, {Component} from "react";
import {Button, Container, Grid, Typography } from "@material-ui/core";
import SplitButton from "./children/SplitButton";
import {withStyles} from "@material-ui/core/styles";
import Version from "./children/Version";
import config from "../app.config";
import {getRepoVersion} from "../actions/index";


const styles = theme => ({
	root: {
		color: theme.palette.primary,
		position: "relative",
		display: "flex",
		alignItems: "center",
		[theme.breakpoints.up("sm")]: {
			height: "60vh",
			minHeight: 400,
			maxHeight: 1300,
		},
	},
	container: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(10),
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
		opacity: 0.7,
		zIndex: -1,
	},
	background: {
		backgroundColor: "#ffffff",
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
		padding: 20,
		margin: theme.spacing(2),
		color: "#ffffff",
		fontWeight: "bold"
	},
	h1: {
		fontWeight: "bold",
		color: theme.palette.primary
	},
	h5: {
		marginBottom: theme.spacing(3),
		marginTop: theme.spacing(3),
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
	footer: {
		overflow: "hidden",
		backgroundColor: "#ffffff"
	},
	link: {
		color: theme.palette.secondary.main,
		textDecoration: "none",
		fontWeight: "bold"
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
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
	},
	content: {
		textAlign: "center",
	},
	footerContainer: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
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

class HomePage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			sections: [],
			subTitle: "",
			pyincoreVersion: "",
			footerLogos: [],
		};
	}

	async componentDidMount() {
		let sections = [
			{
				title: "pyIncore",
				image: "/public/python-logo.png",
				description: "pyIncore is a Python package to analyze and visualize various hazard scenarios\
							developed by the Center for Risk-Based Community Resilience Planning team from NCSA. \
							pyIncore allows users to apply hazards on infrastructure in selected areas.",
				version: await getRepoVersion("pyincore")
			},
			{
				title: "pyIncore-viz",
				image: "/public/python-logo.png",
				description: "pyincore-viz is a Python project that provides visualization and other utilities for use\
							with pyincore The development is part of NIST sponsored IN-CORE (Interdependent Networked\
							Community Resilience Modeling Environment) initiative.",
				version: await getRepoVersion("pyincore-viz")
			},
			{
				title: "Web Service API",
				image: "/public/swagger-logo.png",
				description: "IN-CORE currently maintains 4 different services: The Authentication Service supports secure LDAP authentication. \
						Data Service provides basic capabilities to fetch/store data from file storage. Fragility \
						service that supports fragilities and fragility mapping.\
						The Hazard Service supports creating model based or data based hazards.",
				version: await getRepoVersion("incore-services")
			},
			{
				title: "IN-CORE Lab",
				image: "/public/jupyter-logo.png",
				description: "IN-CORE Lab which is a customized JupyterLab deployed on JupyterHub, enables user to work with documents and writing code,\
						using Jupyter notebooks, text editors, terminals, and custom components in a flexible, integrated, and extensible manner.",
				version: "placeholder"
			},
			{
				title: "Web Tools",
				image: "/public/webapp-logo.png",
				description: "The web application provides the user interface for interacting with the service layer.\
						It provides a login interface and enables browsing and searching the datasets, hazards and fragilities, \
						viewing the metadata and visualizations, and downloading the datasets.",
				version: await getRepoVersion("incore-ui")
			}
		];


		const subTitle = "Run your scientific analyses that model the impact of natural hazards on a community and the \
		resilience of those communities.";

		// TODO: how to automatically update this field important!
		const pyincoreVersion = `v${config.pyincoreVersion} RELEASED`;

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

		this.setState({
			sections: sections,
			subTitle: subTitle,
			pyincoreVersion: pyincoreVersion,
			footerLogos: footerLogos
		});
	}

	render() {
		const {classes} = this.props;

		// TODO put it somewhere else
		const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

		return (
			<div>
				{/*header*/}
				<section className={classes.root}>
					<Container className={classes.container}>
						<img src="/public/resilience-logo.png"/>
						<Typography color="inherit" align="center" variant="h5" className={classes.h5}>
							{this.state.subTitle}
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
							href="/doc/incore/install_pyincore.html"
							target="_blank">
							{this.state.pyincoreVersion}
						</Button>
						<div className={classes.backdrop}/>
						<div className={classes.background}/>
					</Container>
				</section>
				{/*products*/}
				<section className={classes.sectionDark}>
					<Container className={classes.sectionContainers}>
						<Grid container spacing={4}>
							{this.state.sections.map((section) =>
								<Grid item xs={12} md={4}>
									<div className={classes.item}>
										<img className={classes.image}
											 src={section.image}/>
										<Typography variant="h6" className={classes.title}>
											{section.title}
										</Typography>
										<SplitButton options={[section.version, "View Changelog", "View Documentations", "View Source Code"]}/>
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
								this.state.footerLogos.map((footerLogo) =>
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
					{/*version*/}
					<Version/>
				</section>
			</div>
		);
	}

}

export default withStyles(styles)(HomePage);
