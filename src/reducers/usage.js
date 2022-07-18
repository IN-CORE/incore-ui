import {
	RECEIVE_USAGE,
	LOGIN_ERROR,
	RECEIVE_LAB_USAGE
} from "../actions";

const defaultState = {
	usage: {},
	hazardUsage: {},
	labUsage: {}
};

const usage = (state=defaultState, action) => {
	switch(action.type) {
	case RECEIVE_USAGE:
		return Object.assign({}, state, {usage: action.usage});
	case RECEIVE_LAB_USAGE:
		return Object.assign({}, state, {lab: action.usage});
	case LOGIN_ERROR:
		return Object.assign({}, state, {datasets: [], Authorization: "", loginError: true});
	default:
		return state;
	}
};

export default usage;
