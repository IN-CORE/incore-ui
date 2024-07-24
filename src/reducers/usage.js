import {
	RECEIVE_USAGE,
	LOGIN_ERROR,
	RECEIVE_LAB_USAGE,
	RECEIVE_ALLOCATIONS
} from "../actions";

const defaultState = {
	usage: {},
	labUsage: {},
	allocations: {}
};

const usage = (state=defaultState, action) => {
	switch(action.type) {
	case RECEIVE_USAGE:
		return Object.assign({}, state, {usage: action.usage});
	case RECEIVE_LAB_USAGE:
		return Object.assign({}, state, {lab: action.usage});
	case RECEIVE_ALLOCATIONS:
		return Object.assign({}, state, {allocations: action.allocations});
	case LOGIN_ERROR:
		return Object.assign({}, state, {usage: {}, labUsage:{}, allocations:{}, Authorization: "", loginError: true});
	default:
		return state;
	}
};

export default usage;
