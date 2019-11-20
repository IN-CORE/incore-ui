import {LOGIN_ERROR, RECEIVE_DATASETS} from "../actions";
import {DatasetState, Datasets} from "../utils/flowtype";

type DatasetAction = {
	type: RECEIVE_DATASETS,
	datasets: Datasets
}
const defaultState = {datasets: []};

const datasets = (state: DatasetState = defaultState, action: DatasetAction) => {
	switch(action.type) {
	case RECEIVE_DATASETS:
		return Object.assign({}, state, {datasets: action.datasets});
	case LOGIN_ERROR:
		return Object.assign({}, state, {datasets: [], Authorization: "", loginError: true});
	default:
		return state;
	}
};

export default datasets;
