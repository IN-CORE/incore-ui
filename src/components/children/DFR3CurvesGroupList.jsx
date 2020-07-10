import * as React from "react";
import {List, ListItem, ListItemIcon, ListItemText, Tooltip} from "@material-ui/core";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import ThreeDRotationIcon from "@material-ui/icons/ThreeDRotation";

const DFR3CurvesGroupList = (props) => {
	return (
		<List component="nav" id={props.id} style={{"overflowY": "auto"}}>
			{props.data.map(function (dfr3Curve) {
				if (dfr3Curve.is3dPlot) {
					return (
						<ListItem button
								  onClick={() => props.onClick(dfr3Curve)}
								  selected={dfr3Curve === props.selectedDFR3Curve}
								  key={dfr3Curve.id}
						>
							<Tooltip title="3D DFR3 Curves">
								<ListItemIcon><ThreeDRotationIcon fontSize="small"/></ListItemIcon>
							</Tooltip>
							<ListItemText primary={getTitle(dfr3Curve)}/>
						</ListItem>);

				}
				else {
					return (
						<ListItem button
								  onClick={() => props.onClick(dfr3Curve)}
								  selected={dfr3Curve === props.selectedDFR3Curve}
								  key={dfr3Curve.id}
						>
							<Tooltip title="2D DFR3 Curves">
								<ListItemIcon><ShowChartIcon fontSize="small"/></ListItemIcon>
							</Tooltip>
							<ListItemText primary={getTitle(dfr3Curve)}/>
						</ListItem>);
				}
			})}
		</List>
	);
};

function getTitle(dfr3Curve) {
	let title = dfr3Curve.authors.join(", ");

	if (dfr3Curve.paperReference !== null) {
		title += ` (${dfr3Curve.paperReference.yearPublished})`;
	}

	if (dfr3Curve.legacyId !== null) {
		title += ` - ${dfr3Curve.legacyId}`;
	}

	return title;
}

export default DFR3CurvesGroupList;
