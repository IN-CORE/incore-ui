import React from "react";
import {Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions} from "@material-ui/core";

function Confirmation(props) {

	const {confirmOpen, actionBtnName, actionText, handleConfirmed, handleCanceled} = props;

	return (
		<Dialog open={confirmOpen} onClose={handleCanceled} maxWidth={"sm"}>
			<DialogTitle id="confirmation-dialog-title">Are you sure?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{actionText}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color="primary"
					variant="contained"
					size="small"
					onClick={handleConfirmed}>{actionBtnName}</Button>
				<Button color="primary"
					variant="outlined"
					size="small"
					onClick={handleCanceled}>Cancel</Button>
			</DialogActions>
		</Dialog>
	);
}

export default Confirmation;
