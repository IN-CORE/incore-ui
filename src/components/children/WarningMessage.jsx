import React from "react";
import { Alert } from "@material-ui/lab";
import { Collapse, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import { closeWarningMessage} from "../../actions";

const WarningMessage = () => {

	const dispatch = useDispatch();
	const { messageOpen, error, message } = useSelector(
		(state) => state.warning
	);

	const handleClose = () => {
		dispatch(closeWarningMessage());
	};

	return (
		<Collapse in={messageOpen}>
			<Alert
				severity="warning"
				action={
					<>
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={handleClose}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					</>
				}
			>
				{message}
			</Alert>
		</Collapse>
	);
};

export default ErrorMessage;
