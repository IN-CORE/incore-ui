import {
	DATA_LOADING,
	DATA_LOAD_COMPLETE,
	LOGIN_ERROR,
	RECEIVE_DATASETS,
} from "../actions";
import {DatasetState, Datasets} from "../utils/flowtype";

type DatasetAction = {
	type: RECEIVE_DATASETS,
	datasets: Datasets,
	loading: boolean
}
const defaultState = {datasets: [], loading: false};

const datasets = (state: DatasetState = defaultState, action: DatasetAction) => {
	switch(action.type) {
	case RECEIVE_DATASETS:
		return Object.assign({}, state, {datasets: action.datasets});
	case LOGIN_ERROR:
		return Object.assign({}, state, {datasets: [], Authorization: "", loginError: true});
	case DATA_LOADING:
		return Object.assign({}, state, {...state, loading: true});
	case DATA_LOAD_COMPLETE:
		return Object.assign({}, state, {...state, loading: false});
	default:
		return state;
	}
};

export default datasets;
