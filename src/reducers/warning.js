import { OPEN_WARNING_MESSAGE, CLOSE_WARNING_MESSAGE } from "../actions/index";

const initialState = {
	messageOpen: false,
	message: "",
};

const warning = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_WARNING_MESSAGE:
			return {
				...state,
				messageOpen: true,
				message: action.message,
			};
		case CLOSE_WARNING_MESSAGE:
			return {
				...state,
				messageOpen: false,
				message: "",
			};
		default:
			return state;
	}
};

export default warning;
