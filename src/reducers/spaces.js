import {FORBIDDEN, LOGIN_ERROR, RECEIVE_SPACES} from "../actions";

const defaultState = {spaces: []};

const spaces = (state=defaultState, action) => {
	switch(action.type) {
	case RECEIVE_SPACES:
		return Object.assign({}, state, {spaces: action.spaces});
	case LOGIN_ERROR:
		return Object.assign({}, state, {spaces: [], Authorization: "", loginError: true});
	case FORBIDDEN:
		return Object.assign({}, state, {spaces: [], Authorization: "", forbidden: true});
	default:
		return state;
	}
};

export default spaces;
