import React, {Component} from "react";
import {Chip, Container, Grid, Link, Typography, Box} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import Version from "./children/Version";
import {getRepoVersion} from "../actions/index";
import config from "../app.config";
import Button from "@material-ui/core/Button";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const styles = (theme) => ({
	root: {
		color: theme.palette.primary,
		position: "relative",
		display: "flex",
		alignItems: "center",
		[theme.breakpoints.up("sm")]: {
			minHeight: 400,
			maxHeight: 1300
		}
	},
	container: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(10),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	backdrop: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		opacity: 0.7,
		zIndex: -1
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
		zIndex: -2
	},
	releaseChip: {
		minWidth: 200,
		padding: 25,
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
		marginTop: theme.spacing(3)
	},
	more: {
		textAlign: "center",
		marginTop: theme.spacing(2)
	},
	connectWithUs: {
		padding: "3em",
		margin: "2em auto",
		borderRadius: "0.5em",
		background: "#eeeeee",
	},
	versionSection: {
		margin: theme.spacing(0.5)
	},
	versionLine: {
		margin: theme.spacing(1)
	},
	versioning: {
		margin: theme.spacing(0.5),
		fontSize: 14,
		// display: "inline",
		fontWeight: "bold"
	},
	sectionDark: {
		display: "flex",
		overflow: "hidden",
		backgroundColor: theme.palette.fourth.main
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
		position: "relative"
	},
	item: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: theme.spacing(0, 3)
	},
	image: {
		height: 100
	},
	title: {
		marginTop: theme.spacing(3),
		minHeight: theme.spacing(10)
	},
	content: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		textAlign: "center"
	},
	footerContainer: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
		display: "flex"
	},
	iconsWrapper: {
		height: 80
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
	list: {
		margin: 0,
		listStyle: "none",
		paddingLeft: 0
	},
	listItem: {
		paddingTop: theme.spacing(0.5),
		paddingBottom: theme.spacing(0.5)
	}
});

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sections: [],
			repos: [],
			subTitle: "",
			githubVersions: {},
			footerLogos: []
		};
	}

	async componentDidMount() {
		let repos = [
			{
				title: "pyIncore",
				repoName: "pyincore",
				options: {
					"Change log": "https://github.com/IN-CORE/pyincore/blob/main/CHANGELOG.md",
					"GitHub": "https://github.com/IN-CORE/pyincore",
					"Conda package": "https://anaconda.org/in-core/pyincore"
				}
			},
			{
				title: "pyIncore-viz",
				repoName: "pyincore-viz",
				options: {
					"Change log": "https://github.com/IN-CORE/pyincore-viz/blob/main/CHANGELOG.md",
					"GitHub": "https://github.com/IN-CORE/pyincore-viz",
					"Conda package": "https://anaconda.org/in-core/pyincore-viz"
				}
			},
			{
				title: "pyIncore-data",
				repoName: "pyincore-data",
				options: {
					"Change log": "https://github.com/IN-CORE/pyincore-data/blob/main/CHANGELOG.md",
					"GitHub": "https://github.com/IN-CORE/pyincore-data",
					"Conda package": "https://anaconda.org/in-core/pyincore-data"
				}
			},
			{
				title: "Web Services",
				repoName: "incore-services",
				options: {
					"Change log": "https://github.com/IN-CORE/incore-services/blob/main/CHANGELOG.md",
					"GitHub": "https://github.com/IN-CORE/incore-services"
				}
			},
			{
				title: "Web Tools",
				repoName: "incore-ui",
				options: {
					"Change log": "https://github.com/IN-CORE/incore-ui/blob/main/CHANGELOG.md",
					"GitHub": "https://github.com/IN-CORE/incore-ui"
				}
			},
			{
				title: "IN-CORE Lab",
				repoName: "incore-lab",
				options: {
					"Change log": "https://github.com/IN-CORE/incore-lab/blob/main/CHANGELOG.md",
					"GitHub": "https://github.com/IN-CORE/incore-lab"
				}
			}
		];

		let sections = [
			{
				titles: ["pyIncore", "pyIncore-viz"],
				image: "/public/python-logo.png",
				description:
					"pyIncore is a component of IN-CORE. It is a python package" +
					" that allows users to apply various hazards to infrastructure in selected areas," +
					" propagating the effect of physical infrastructure damage and loss of " +
					"functionality to social and economic impacts. pyIncore-viz is a python " +
					"package that provides visualization and other utilities for use with pyIncore."
			},
			{
				titles: ["Web Service API"],
				image: "/public/swagger-logo.png",
				description:
					"IN-CORE currently maintains 4 different services: The Authentication Service supports secure LDAP authentication. \
						Data Service provides basic capabilities to fetch/store data from file storage. DFR3 \
						service that supports DFR3 curves and DFR3 mapping.\
						The Hazard Service supports creating model based or data based hazards."
			},
			{
				titles: ["IN-CORE Lab"],
				image: "/public/jupyter-logo.png",
				description:
					"IN-CORE Lab which is a customized JupyterLab deployed on JupyterHub, enables user to work with documents and writing code,\
						using Jupyter notebooks, text editors, terminals, and custom components in a flexible, integrated, and extensible manner."
			},
			{
				titles: ["Web Tools"],
				image: "/public/webapp-logo.png",
				description:
					"The web application provides the user interface for interacting with the service layer.\
						It provides a login interface and enables browsing and searching the datasets, hazards and DFR3 Curves, \
						viewing the metadata and visualizations, and downloading the datasets."
			}
		];

		const subTitle =
			"Run your scientific analyses that model the impact of natural hazards on a community and the \
		resilience of those communities.";

		// TODO: how to automatically update this field important!
		const githubVersions = await getRepoVersion();

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
			repos: repos,
			subTitle: subTitle,
			githubVersions: githubVersions,
			footerLogos: footerLogos
		});
	}

	render() {
		const {classes} = this.props;

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
							The{" "}
							<Link href="https://www.nist.gov" className={classes.link} target="_blank">
								National Institute of Standards and Technology (NIST)
							</Link>{" "}
							funded the multi-university five-year{" "}
							<Link href="http://resilience.colostate.edu" className={classes.link} target="_blank">
								Center of Excellence for Risk-Based Community Resilience Planning (CoE)
							</Link>
							, headquartered at{" "}
							<Link href="https://www.colostate.edu" className={classes.link} target="_blank">
								Colorado State University
							</Link>
							, to develop the measurement science to support community resilience assessment. Measurement
							science is implemented on a platform called{" "}
							<Link
								href="http://resilience.colostate.edu/in_core.shtml"
								className={classes.link}
								target="_blank"
							>
								Interdependent Networked Community Resilience Modeling Environment (IN-CORE)
							</Link>
							. On IN-CORE, users can run scientific analyses that model the impact of natural hazards and
							resiliency against the impact on communities. The IN-CORE platform is built on a{" "}
							<Link href="https://kubernetes.io" className={classes.link} target="_blank">
								Kubernetes cluster
							</Link>{" "}
							with
							<Link href="https://www.docker.com" className={classes.link} target="_blank">
								{" "}
								Docker
							</Link>{" "}
							container technology.
						</Typography>

						<Box className={classes.connectWithUs}>
							<Typography>
								Got questions or need assistance? Join us on&nbsp;
								<Link href={config.slackInvitationLink} target="_blank" className={classes.link}>
									Slack</Link> and say hi in the <b>#general</b> channel. For specific questions,
								head over to the <b>#in-core</b> channel. You can also reach out via&nbsp;
								<Link href={`mailto:${config.mailingList}`} className={classes.link}>email</Link> or
								check out our <Link href={config.incoreDocUrl} target="_blank" className={classes.link}>
								documentation</Link> for more information.
							</Typography>
							<Box style={{margin:"1em auto"}}>
								<Button href={config.slackInvitationLink}
										target="_blank"
										variant="contained" color="primary"
										className={classes.button}
										style={{marginRight: "1em"}}
								>
									<img src="/public/slack-logo.png" style={{ height: "1em", marginRight: "8px"}}/>
									Join Slack
								</Button>
								<Button href={`mailto:${config.mailingList}`}
										variant="contained"
										color="primary"
										className={classes.button}
										startIcon={<MailOutlineIcon />}
								>
									Email Us
								</Button>
							</Box>
						</Box>

						{/*if version exists, display version; otherwise just the text*/}
						{this.state.githubVersions && this.state.githubVersions["in-core"] ? (
							<Chip
								color="secondary"
								size="medium"
								className={classes.releaseChip}
								label={`IN-CORE ${this.state.githubVersions["in-core"]} IS RELEASED INCLUDING`}
							/>
						) : (
							<Chip
								color="secondary"
								size="medium"
								className={classes.releaseChip}
								label={"IN-CORE IS RELEASED INCLUDING"}
							/>
						)}

						<div className={classes.versionSection}>
							{this.state.repos.map((repo) => (
								<div className={classes.versionLine}>
									<Typography variant="body1" className={classes.versioning}>
										{repo.title}

										{/*if version exists, display version; otherwise not displaying the chip*/}
										{this.state.githubVersions && this.state.githubVersions[repo.repoName] ? (
											<Chip
												size="small"
												color="primary"
												label={this.state.githubVersions[repo.repoName]}
												className={classes.versioning}
											/>
										) : null}

										{Object.keys(repo.options).map((option) => (
											<Link
												color="primary"
												underline="always"
												className={classes.versioning}
												href={repo.options[option]}
												target="_blank"
											>
												{option}
											</Link>
										))}
									</Typography>
								</div>
							))}
						</div>
						<div className={classes.backdrop}/>
						<div className={classes.background}/>
					</Container>
				</section>
				<section className={classes.sectionLight}/>
				{/*products*/}
				<section className={classes.sectionDark}>
					<Container className={classes.sectionContainers}>
						<Grid container spacing={4}>
							{this.state.sections.map((section) => (
								<Grid item xs={12} md={3}>
									<div className={classes.item}>
										<img className={classes.image} src={section.image}/>
										<div className={classes.title}>
											{section.titles.map((title) => (
												<Typography variant="h6">{title}</Typography>
											))}
										</div>
										<Typography variant="body1" className={classes.content}>
											{section.description}
										</Typography>
									</div>
								</Grid>
							))}
						</Grid>
					</Container>
				</section>
				{/*footer*/}
				<section className={classes.footer}>
					<Container className={classes.footerContainer}>
						<Grid container spacing={5}>
							{this.state.footerLogos.map((footerLogo) => (
								<Grid item xs={6} sm={3} md={3}>
									<Grid
										container
										direction="column"
										justify="flex-end"
										className={classes.iconsWrapper}
										spacing={2}
									>
										<Grid item className={classes.icons}>
											<Link href={footerLogo.url} target="_blank">
												<img src={footerLogo.image} className={classes.icon}/>
											</Link>
										</Grid>
									</Grid>
								</Grid>
							))}
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
