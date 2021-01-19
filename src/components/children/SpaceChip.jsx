// space information
import React from "react";
import {Chip, Tooltip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
	chip:{
		fontSize:"x-small",
		height:"18px"
	}
});

function abbrevSpaceName(spaceName){
	// for long space Name, truncate to 10 characters
	if (spaceName.length > 10) return `${spaceName.slice(0,10)}...`;
	else return spaceName;
}

function SpaceChip(props) {
	const classes = useStyles();

	const {item, selectedItem} = props;
	let spaceChip = (<></>);

	if (item.spaces !== null && item.spaces !== undefined){
		spaceChip = item.spaces.map((space) => {
			return (
				<Tooltip title={`space(s) the item belongs to: ${item.spaces.join(", ")}`} key={`${item.id}-${space}-tooltip`}>
					<Chip size="small" label={abbrevSpaceName(space)} key={`${item.id}-${space}`} className={classes.chip}/>
				</Tooltip>
			);
		});
		if (selectedItem) {
			spaceChip = (<>
				{
					item.spaces.length > 1 ?
						<Tooltip title={`space(s) the item belongs to: ${item.spaces.join(", ")}`} key={`${item.id}-groups-tooltip`} >
							<Chip size="small" label="more..." key={`${item.id}-groups`} className={classes.chip}/>
						</Tooltip> :
						<Tooltip title={`space(s) the item belongs to: ${item.spaces[0]}`} key={`${item.id}-${item.spaces[0]}-tooltip`}>
							<Chip size="small" label={abbrevSpaceName(item.spaces[0])} key={`${item.id}-${item.spaces[0]}`} className={classes.chip}/>
						</Tooltip>
				}
			</>);
		}
	}

	return spaceChip;
}

export default SpaceChip;
