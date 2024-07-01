import config from "../app.config";
import {
	DATA_LOADING,
	DATA_LOAD_COMPLETE,
	LOGIN_ERROR,
	FORBIDDEN,
	RECEIVE_DATASETS,
	DELETE_ITEM,
	DELETE_ERROR,
	RESET_ERROR
} from "../actions";

const defaultState = {datasets: [], loading: false};

const datasets = (state = defaultState, action) => {
	switch(action.type) {
	case RECEIVE_DATASETS:
		return Object.assign({}, state, {datasets: action.datasets});
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
	case FORBIDDEN:
		return Object.assign({}, state, {datasets: [], Authorization: "", forbidden: true});
	case DATA_LOADING:
		return Object.assign({}, state, {...state, loading: true});
	case DATA_LOAD_COMPLETE:
		return Object.assign({}, state, {...state, loading: false, deleteError: false});
	default:
		return state;
	}
};

export default datasets;
