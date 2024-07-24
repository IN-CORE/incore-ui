import {
	HAZARD_LOAD_COMPLETE,
	HAZARD_LOADING,
	LOGIN_ERROR,
	FORBIDDEN,
	RECEIVE_HAZARDS,
	DELETE_ITEM,
	DELETE_ERROR,
	RESET_ERROR
} from "../actions";

const defaultState = {hazards: [], loading: false};

const hazards = (state = defaultState, action) => {
	switch (action.type) {
		case RECEIVE_HAZARDS:
			return Object.assign({}, state, {hazards: action.hazards});
		case DELETE_ITEM:
			return Object.assign({}, state, {
				hazards: state.hazards.filter(hazard => hazard.id !== action.item.id),
				deleteError: false
			});
		case DELETE_ERROR:
			return Object.assign({}, state, {hazards: state.hazards, deleteError: true});
		case RESET_ERROR:
			return Object.assign({}, state, {deleteError: false});
		case LOGIN_ERROR:
			return Object.assign({}, state, {hazards: [], Authorization: "", loginError: true});
		case HAZARD_LOADING:
			return Object.assign({}, state, {...state, loading: true});
		case HAZARD_LOAD_COMPLETE:
			return Object.assign({}, state, {...state, loading: false, deleteError: false});
		default:
			return state;
	}
};

export default hazards;
