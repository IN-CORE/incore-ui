import * as React from "react";
import {List, ListItem, ListItemIcon, ListItemText, Tooltip} from "@material-ui/core";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import ThreeDRotationIcon from "@material-ui/icons/ThreeDRotation";

const GroupList = (props) => {
	return (
		<List component="nav" id={props.id} style={{"overflowY": "auto"}}>
			{props.data.map(function (fragility) {
				if (fragility.is3dPlot) {
					return (
						<ListItem button
								  onClick={() => props.onClick(fragility)}
								  selected={fragility === props.selectedDFR3Curve}>
							<Tooltip title="3D DFR3 Curves">
								<ListItemIcon><ThreeDRotationIcon fontSize="small"/></ListItemIcon>
							</Tooltip>
							<ListItemText primary={getTitle(fragility)}/>
						</ListItem>);

				}
				else {
					return (
						<ListItem button
								  onClick={() => props.onClick(fragility)}
								  selected={fragility === props.selectedDFR3Curve}>
							<Tooltip title="2D DFR3 Curves">
								<ListItemIcon><ShowChartIcon fontSize="small"/></ListItemIcon>
							</Tooltip>
							<ListItemText primary={getTitle(fragility)}/>
						</ListItem>);
				}
			})}
		</List>
	);
};

function getTitle(fragility) {
	let title = fragility.authors.join(", ");

	if (fragility.paperReference !== null) {
		title += ` (${fragility.paperReference.yearPublished})`;
	}

	title += ` - ${fragility.legacyId}`;

	return title;
}

export default GroupList;
