import {FORBIDDEN, LOGIN_ERROR, RECEIVE_DATATYPES} from "../actions";

const defaultState = {datatypes: []};

const datatypes = (state=defaultState, action) => {
	switch(action.type) {
	case RECEIVE_DATATYPES:
		return Object.assign({}, state, {datatypes: action.datatypes});
	case LOGIN_ERROR:
		return Object.assign({}, state, {datatypes: [], Authorization: "", loginError: true});
	case FORBIDDEN:
		return Object.assign({}, state, {datatypes: [], Authorization: "", forbidden: true});
	default:
		return state;
	}
};

export default datatypes;
