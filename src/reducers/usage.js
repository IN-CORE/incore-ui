import {
	RECEIVE_DATASET_USAGE,
	LOGIN_ERROR,
	RECEIVE_HAZARD_USAGE,
	RECEIVE_LAB_USAGE, RECEIVE_ALLOCATIONS
} from "../actions";

const defaultState = {
	datasetUsage: {},
	hazardUsage: {},
	labUsage: {},
	allocations: {}
};

const usage = (state=defaultState, action) => {
	switch(action.type) {
	case RECEIVE_DATASET_USAGE:
		return Object.assign({}, state, {datasetUsage: action.usage});
	case RECEIVE_HAZARD_USAGE:
		return Object.assign({}, state, {hazardUsage: action.usage});
	case RECEIVE_LAB_USAGE:
		return Object.assign({}, state, {lab: action.usage});
	case RECEIVE_ALLOCATIONS:
		return Object.assign({}, state, {allocations: action.usage});
	case LOGIN_ERROR:
		return Object.assign({}, state, {datasets: [], Authorization: "", loginError: true});
	default:
		return state;
	}
};

export default usage;
