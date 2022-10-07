import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { browserHistory } from "react-router";

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";

import Version from "./children/Version";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(3)
        }
    },
	grid_container: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(10),
		flexGrow: 1,
	},
    h4: {
		// fontWeight: "bold",
		color: theme.palette.primary,
        marginBottom: theme.spacing(3),
		marginTop: theme.spacing(4),
	},
    cardroot: {
        maxWidth: 400,
        marginBottom: theme.spacing(3),
    },
    cardmedia: {
        height: 200,
    },
    footerContainer: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
		display: "flex",
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
    footer: {
		overflow: "hidden",
		backgroundColor: "#ffffff"
	},
}))

const CommunityApps = ({ location }) => {
    const classes = useStyles();
    const images = [
        {app: "Galveston", img: "/public/galveston.jpeg"},
        {app: "Salt Lake City", img: "/public/salt-lake-city.jpeg"},
        {app: "Joplin", img: "/public/joplin-main-street.jpeg"},
    ]
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
                <CardActionArea>
                    <CardMedia
                        className={classes.cardmedia}
                        image={image.img}
                        title={image.app}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {image.app}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porta sapien at turpis dictum pharetra. Nullam congue diam quis accumsan ultrices. Proin tempus dolor quam, at pellentesque tellus blandit eu. Fusce non elit lacus. Nullam lacus mi, mollis vestibulum blandit ut, vehicula sit amet justo. Suspendisse auctor id nunc eget ornare. Cras neque lacus, facilisis ac commodo eu, tincidunt eu nulla. Fusce ac mauris vel arcu fringilla porttitor eget sed libero.
                        </Typography>
                    </CardContent>
                </CardActionArea>
                {/* <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                </CardActions> */}
            </Card>
        )
    }

    return (
        <div>
            <div className={classes.root}>
                {/* <h1>This is the community landing page. Welcome!</h1> */}
                <Paper elevation={2} >
                    <Typography color="inherit" align="center" variant="h4" className={classes.h4}>
		    			Community Apps
                    </Typography>
                    <Grid container className={classes.grid_container} spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" spacing={3}>
                                {images.map(image => {
                                    return (
                                        <Grid key={image.app} item>
                                            {getCard(image)}
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
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
				{/*version*/}
				<Version/>
			</section>
        </div>
        
    )
}

export default CommunityApps