import {HAZARD_LOAD_COMPLETE, HAZARD_LOADING, LOGIN_ERROR, RECEIVE_HAZARDS} from "../actions";
import {HazardState, Hazards} from "../utils/flowtype";

type HazardAction = {
	type: RECEIVE_HAZARDS,
	hazards: Hazards,
	loading: boolean
}
const defaultState = {hazards: [], loading: false};

const hazards = (state: HazardState = defaultState, action: HazardAction) => {
	switch(action.type) {
	case RECEIVE_HAZARDS:
		return Object.assign({}, state, {hazards: action.hazards});
	case LOGIN_ERROR:
		return Object.assign({}, state, {hazards: [], Authorization: "", loginError: true});
	case HAZARD_LOADING:
		return Object.assign({}, state, {...state, loading: true});
	case HAZARD_LOAD_COMPLETE:
		return Object.assign({}, state, {...state, loading: false});
	default:
		return state;
	}
};

export default hazards;
