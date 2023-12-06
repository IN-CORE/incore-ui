import {
	HAZARD_LOAD_COMPLETE,
	HAZARD_LOADING,
	LOGIN_ERROR,
	RECEIVE_HAZARDS,
	DELETE_ITEM,
	DELETE_ERROR,
	RESET_ERROR,
	GET_ITEM
} from "../actions";
import {HazardState, Hazards} from "../utils/flowtype";

type HazardAction = {
	type: RECEIVE_HAZARDS,
	hazards: Hazards,
	hazard:Hazard,
	item: Object,
	loading: boolean
}
const defaultState = {hazards: [], loading: false};

const hazards = (state: HazardState = defaultState, action: HazardAction) => {
	switch(action.type) {
	case RECEIVE_HAZARDS:
		return Object.assign({}, state, {hazards: action.hazards});
	case DELETE_ITEM:
		return Object.assign({}, state, {
			hazards: state.hazards.filter(hazard => hazard.id !== action.item.id),
			deleteError: false
		});
	case GET_ITEM:
		return Object.assign({}, state, {hazard: action.item});
	case DELETE_ERROR:
		return Object.assign({}, state, {hazards:state.hazards, deleteError:true});
	case RESET_ERROR:
		return Object.assign({}, state, {deleteError:false});
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
