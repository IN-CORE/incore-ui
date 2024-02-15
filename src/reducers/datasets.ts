import {
	DATA_LOADING,
	DATA_LOAD_COMPLETE,
	LOGIN_ERROR,
	RECEIVE_DATASETS,
	DELETE_ITEM,
	DELETE_ERROR,
	RESET_ERROR
} from "../actions";
import { datasetsStateInitialValue } from "../store/states";

const datasets = (state: DatasetState = datasetsStateInitialValue, action: DatasetAction): DatasetState => {
	switch (action.type) {
		case RECEIVE_DATASETS:
			return {
				...state,
				datasets: action.datasets
			};
		case DELETE_ITEM:
			return {
				...state,
				datasets: state.datasets.filter((dataset) => dataset.id !== action.item.id),
				deleteError: false
			};
		case DELETE_ERROR:
			return {
				...state,
				datasets: state.datasets,
				deleteError: true
			};
		case RESET_ERROR:
			return {
				...state,
				deleteError: false
			};
		case LOGIN_ERROR:
			return {
				...state,
				datasets: []
			};
		// return Object.assign({}, state, {datasets: [], Authorization: "", loginError: true});
		case DATA_LOADING:
			return {
				...state,
				loading: true
			};
		case DATA_LOAD_COMPLETE:
			return {
				...state,
				loading: false,
				deleteError: false
			};
		default:
			return state;
	}
};

export default datasets;
