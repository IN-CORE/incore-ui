import * as React from "react";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
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
								  selected={fragility === props.selectedFragility}>
							<ListItemIcon><ThreeDRotationIcon fontSize="small"/></ListItemIcon>
							<ListItemText primary={getTitle(fragility)}/>
						</ListItem>);

				}
				else {
					return (
						<ListItem button
								  onClick={() => props.onClick(fragility)}
								  selected={fragility === props.selectedFragility}>
							<ListItemIcon><ShowChartIcon fontSize="small"/></ListItemIcon>
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
