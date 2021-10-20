import config from "../app.config";
import {
	DATA_LOADING,
	DATA_LOAD_COMPLETE,
	LOGIN_ERROR,
	RECEIVE_DATASETS,
	DELETE_ITEM,
	DELETE_ERROR,
	RESET_ERROR
} from "../actions";
import {DatasetState, Datasets, Dataset} from "../utils/flowtype";

type DatasetAction = {
	type: RECEIVE_DATASETS,
	datasets: Datasets,
	item: Dataset,
	loading: boolean
}

const defaultState = {datasets: [], loading: false};

const datasets = (state:DatasetState = defaultState, action:DatasetAction) => {
	switch(action.type) {
	case RECEIVE_DATASETS:
		return Object.assign({}, state, {datasets: state.datasets});
	case DELETE_ITEM:
		return Object.assign({}, state, {
			datasets: state.datasets.filter(dataset => dataset.id !== action.item.id),
			deleteError: false
		});
	case DELETE_ERROR:
		return Object.assign({}, state, {datasets:state.datasets, deleteError:true});
	case RESET_ERROR:
		return Object.assign({}, state, {deleteError:false});
	case LOGIN_ERROR:
		return Object.assign({}, state, {datasets: [], Authorization: "", loginError: true});
	case DATA_LOADING:
		return Object.assign({}, state, {...state, loading: true});
	case DATA_LOAD_COMPLETE:
		return Object.assign({}, state, {...state, loading: false, deleteError: false});
	default:
		return state;
	}
};

export default datasets;
