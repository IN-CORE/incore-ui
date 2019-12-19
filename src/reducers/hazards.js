import {LOGIN_ERROR, RECEIVE_HAZARDS} from "../actions";
import {HazardState, Hazards} from "../utils/flowtype";

type HazardAction = {
	type: RECEIVE_HAZARDS,
	hazards: Hazards
}
const defaultState = {hazards: []};

const hazards = (state: HazardState = defaultState, action: HazardAction) => {
	switch(action.type) {
	case RECEIVE_HAZARDS:
		return Object.assign({}, state, {hazards: action.hazards});
	case LOGIN_ERROR:
		return Object.assign({}, state, {hazards: [], Authorization: "", loginError: true});
	default:
		return state;
	}
};

export default hazards;
