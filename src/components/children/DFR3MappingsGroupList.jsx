import * as React from "react";
import {List, ListItem, ListItemIcon, ListItemText, Tooltip} from "@material-ui/core";
import AccountTree from "@material-ui/icons/AccountTree";

const DFR3MappingsGroupList = (props) => {
	// console.log(props);
	return (
		<List component="nav" id={props.id} style={{"overflowY": "auto"}}>
			{props.data.map(function (dfr3Mapping) {
				return (
					<ListItem button
						onClick={() => props.onClick(dfr3Mapping)}
						selected={dfr3Mapping === props.selectedMapping}
						key={dfr3Mapping.id}
					>
						<Tooltip title="DFR3 Curves' mapping to inventory attributes">
							<ListItemIcon><AccountTree fontSize="small"/></ListItemIcon>
						</Tooltip>
						<ListItemText primary={getTitle(dfr3Mapping)}/>
					</ListItem>);
			})}
		</List>
	);
};

function getTitle(dfr3Mapping) {
	return dfr3Mapping.name;
}

export default DFR3MappingsGroupList;
