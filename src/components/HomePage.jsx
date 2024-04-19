import React, { Component } from "react";
import { Chip, Container, Grid, Link, Typography, Box, Collapse, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Version from "./children/Version";
import { getRepoVersion } from "../actions/index";
import config from "../app.config";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
// Icon Imports
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import BookIcon from "@material-ui/icons/Book";
import SchoolIcon from "@material-ui/icons/School";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ReactGA from "react-ga";

ReactGA.initialize('G-VT38KCDFTM');

const styles = (theme) => ({
	root: {
		color: theme.palette.primary,
		position: "relative",
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
	caption: {
		marginTop: theme.spacing(2),
		marginLeft: theme.spacing(10),
		marginRight: theme.spacing(10),
		fontWeight: "bold"
	},
	intro: {
		margin: "1em auto 2em auto",
		textAlign: "left",
		lineHeight: "1.5em"
	},
	h6: {
		fontWeight: "bold",
		marginBottom: theme.spacing(4),
		textAlign: "left"
	},
	more: {
		fontSize: "16px",
		textAlign: "center",
		marginTop: theme.spacing(2)
	},
	connectWithUs: {
		padding: "3em",
		margin: "2em auto",
		borderRadius: "0.5em",
		background: "#eeeeee",
		textAlign: "center"
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
	},
	infoBlock: {
		"display": "flex",
		"flexDirection": "column",
		"justifyContent": "center",
		"alignItems": "center",
		"textAlign": "left",
		"marginLeft": theme.spacing(4),
		"fontSize": "16px",
		"fontFamily": "Work Sans, sans-serif",
		"fontWeight": "400",
		"lineHeight": "1.5",
		"letterSpacing": "0.00938em",

		"& pre": {
			backgroundColor: "#f5f5f5",
			border: "1px solid #ddd",
			padding: "1em",
			color: "black",
			fontFamily: "Monaco, Andale Mono, Courier New, monospace",
			borderRadius: "0.5em",
			marginBottom: "1em"
		},

		"& div": {
			marginBottom: "1em",
			alignSelf: "flex-start",
			width: "100%"
		},
		"& code": {
			backgroundColor: "#f5f5f5"
		},

		"& h1, & p, & ol, & li, & pre": {
			alignSelf: "flex-start"
		},

		"& button": {
			margin: "1em auto 2em auto",
			display: "flex"
		}
	},
	buttonDiv: {
		display: "flex",
		justifyContent: "left",
		paddingBottom: ".75em",
		alignItems: "center",
		gap: "0.5em"
	},
	greenText: {
		color: theme.palette.primary.main
	},
	versionText: {
		textAlign: "center",
		color: "#6D6D6D"
	}
});

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			repos: [],
			subTitle: "",
			githubVersions: {},
			open: false
		};
	}

	toggleCollapse = () => {
		this.setState((prevState) => ({ open: !prevState.open }));
	};

	async componentDidMount() {
		// add Google anlytics
		ReactGA.pageview(window.location.pathname + window.location.search);

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

		const subTitle =
			"Run your scientific analyses that model the impact of natural hazards on a community and the \
		resilience of those communities.";

		// TODO: how to automatically update this field important!
		const githubVersions = await getRepoVersion();

		this.setState({
			repos: repos,
			subTitle: subTitle,
			githubVersions: githubVersions
		});
	}

	render() {
		const { classes } = this.props;

		return (
			<div>
				{/*header*/}
				<section className={classes.root}>
					<Container className={classes.container}>
						<img src="/public/resilience-logo.png" />
						<Typography color="inherit" align="center" variant="h5" className={classes.caption}>
							{this.state.subTitle}
						</Typography>
						{/*Intro block*/}
						<div className={classes.intro}>
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
								, to develop the measurement science to support community resilience assessment.
								Measurement science is implemented on a platform called{" "}
								<Link
									href="http://resilience.colostate.edu/in_core.shtml"
									className={classes.link}
									target="_blank"
								>
									Interdependent Networked Community Resilience Modeling Environment (IN-CORE)
								</Link>
								. On IN-CORE, users can run scientific analyses that model the impact of natural hazards
								and resiliency against the impact on communities. The IN-CORE platform is built on a{" "}
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
						</div>
						{/*Version Block*/}
						<div>
							<div>
								<Typography
									variant="h5"
									style={{ cursor: "pointer", textAlign: "center" }}
									onClick={this.toggleCollapse}
								>
									What&apos;s new in{" "}
									<span className="greenText">IN-CORE {this.state.githubVersions["in-core"]}?</span>
									<IconButton>
										{this.state.open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
									</IconButton>
								</Typography>
								<Typography variant="subtitle1" style={{ textAlign: "center" }}>
									<Link href={config.githubRelease + this.state.githubVersions["in-core"]}>
										Current Version: {this.state.githubVersions["in-core"]}
									</Link>
								</Typography>
							</div>
							<Collapse in={this.state.open}>
								<div className={classes.versionSection}>
									{this.state.repos.map((repo) => (
										<div className={classes.versionLine}>
											<Typography variant="body1" className={classes.versioning}>
												{repo.title}
												{/*if version exists, display version; otherwise not displaying the chip*/}
												{this.state.githubVersions &&
												this.state.githubVersions[repo.repoName] ? (
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
							</Collapse>
						</div>
						{/* Getting Started Block */}
						<div className={classes.infoBlock}>
							<div>
								<h2>Getting Started</h2>
								<p>Here are two simple steps to quickly get you up and running with IN-CORE:</p>
								<ol>
									<li>
										<Link href={config.signUpURL} target="_blank" className={classes.link}>
											Sign up
										</Link>
										&nbsp;for an IN-CORE account
									</li>
									<li>
										Install&nbsp;
										<Link href={config.pyIncoreDocUrl} target="_blank" className={classes.link}>
											pyincore
										</Link>
										, a python package that contains service classes to connect with IN-CORE web
										services and functionalities for IN-CORE analyses.
										<pre>
											<code>
												conda config --add channels conda-forge{"\n"}
												conda install -c in-core pyincore
											</code>
										</pre>
									</li>
								</ol>
								<div className={classes.buttonDiv}>
									<Button
										variant="contained"
										color="primary"
										alignSelf="center"
										className={classes.button}
										startIcon={<HowToRegIcon />}
										target={"_blank"}
										href={config.signUpURL}
									>
										Sign up for IN-CORE
									</Button>
								</div>
								<Divider />
							</div>
							<div>
								<h2>Learn IN-CORE</h2>
								<p>
									Gain a comprehensive understanding of IN-CORE by reviewing the&nbsp;
									<Link href={config.incoreDocUrl} target="_blank" className={classes.link}>
										step-by-step manual
									</Link>
									. To delve deeper into advanced IN-CORE topics, check out our&nbsp;
									<Link href={config.incoreTutorialUrl} target="_blank" className={classes.link}>
										detailed tutorials
									</Link>
									.
								</p>
								<div className={classes.buttonDiv}>
									<Button
										variant="contained"
										color="primary"
										alignSelf="center"
										target={"_blank"}
										href={config.incoreDocUrl}
										className={classes.button}
										startIcon={<BookIcon />}
									>
										IN-CORE Manual
									</Button>
									<Button
										variant="contained"
										color="primary"
										alignSelf="center"
										target={"_blank"}
										href={config.incoreTutorialUrl}
										className={classes.button}
										startIcon={<SchoolIcon />}
									>
										IN-CORE Tutorial
									</Button>
								</div>
								<Divider />
							</div>
							<div>
								<h2>Get Help</h2>
								<p>
									Got questions or need assistance? There are three ways to reach out for help review
									our:&nbsp;
									<Link href={config.incoreFAQUrl} target="_blank" className={classes.link}>
										FAQs
									</Link>
									&nbsp;for the most common questions, join the&nbsp;
									<Link href={config.slackInvitationLink} target="_blank" className={classes.link}>
										IN-CORE Slack channel
									</Link>
									, or&nbsp;
									<Link href={`mailto:${config.mailingList}`} className={classes.link}>
										email
									</Link>
									&nbsp;our dev team.
								</p>
								<div className={classes.buttonDiv}>
									<Button
										href={config.incoreFAQUrl}
										target="_blank"
										variant="contained"
										color="primary"
										className={classes.button}
										startIcon={<QuestionAnswerIcon />}
									>
										Read FAQs
									</Button>
									<Button
										href={config.slackInvitationLink}
										target="_blank"
										variant="contained"
										color="primary"
										className={classes.button}
									>
										<img
											src="/public/slack-logo.png"
											style={{ height: "1em", marginRight: "8px" }}
										/>
										Join Slack
									</Button>
									<Button
										href={`mailto:${config.mailingList}`}
										variant="contained"
										color="primary"
										className={classes.button}
										startIcon={<MailOutlineIcon />}
									>
										Email Us
									</Button>
								</div>
							</div>
						</div>
					</Container>
				</section>
			</div>
		);
	}
}

export default withStyles(styles)(HomePage);
