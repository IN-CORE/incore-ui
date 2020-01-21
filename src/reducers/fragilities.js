import {RECEIVE_DFR3_CURVES} from "../actions";
import {FragilityState, Fragility} from "../utils/flowtype";

type FragilityAction = {
	type: RECEIVE_DFR3_CURVES,
	fragilities: Fragility[]
}
const defaultState = {fragilities: []};

const fragilities = (state: FragilityState = defaultState, action: FragilityAction) => {
	switch(action.type) {
	case RECEIVE_DFR3_CURVES:
		return Object.assign({}, state, {fragilities: action.fragilities});
	default:
		return state;
	}
};

export default fragilities;
