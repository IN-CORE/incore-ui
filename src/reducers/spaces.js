import {RECEIVE_SPACES} from "../actions";

const defaultState = {spaces: []};

const spaces = (state=defaultState, action) => {
	switch(action.type) {
	case RECEIVE_SPACES:
		return Object.assign({}, state, {spaces: action.spaces});
	default:
		return state;
	}
};

export default spaces;
