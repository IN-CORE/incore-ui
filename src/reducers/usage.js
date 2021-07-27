import {
	RECEIVE_DATASET_USAGE,
	LOGIN_ERROR,
	RECEIVE_HAZARD_USAGE,
	RECEIVE_LAB_USAGE
} from "../actions";

const defaultState = {
	datasetUsage: {},
	hazardUsage: {},
	labUsage: {}
};

const usage = (state=defaultState, action) => {
	switch(action.type) {
	case RECEIVE_DATASET_USAGE:
		return Object.assign({}, state, {datasetUsage: action.usage});
	case RECEIVE_HAZARD_USAGE:
		return Object.assign({}, state, {hazardUsage: action.usage});
	case RECEIVE_LAB_USAGE:
		return Object.assign({}, state, {lab: action.usage});
	case LOGIN_ERROR:
		return Object.assign({}, state, {datasets: [], Authorization: "", loginError: true});
	default:
		return state;
	}
};

export default usage;
