import React from "react";
import { Grid, Link, Typography } from "@material-ui/core";
import config from "../app.config";

export const Forbidden = () => {
	return (
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justifyContent="center"
				style={{ minHeight: "50vh"}}
			>
				<Grid item xs={4}>
					<Typography variant="h3" paragraph>
						Access Denied
					</Typography>
					<Typography variant="body1" paragraph style={{fontSize: "16px"}}>
						You do not currently have permission to access the IN-CORE resource. <br />
						Please wait for the administrator to grant you access.
					</Typography>
					<Typography variant="body1" paragraph>
						<Link href="/" variant="body1">
							Home
						</Link>
					</Typography>
					<Typography variant="body1" paragraph>
						<Link href={config.slackInvitationLink} target="_blank">
							Join Slack channel
						</Link>
					</Typography>
					<Typography variant="body1" paragraph>
						<Link href={`mailto:${config.mailingList}`}>
							Contact Us
						</Link>
					</Typography>
				</Grid>
			</Grid>
	);
};
