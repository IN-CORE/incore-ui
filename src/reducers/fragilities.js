import {RECEIVE_FRAGILITIES} from "../actions";
import {FragilityState, Fragility} from "../utils/flowtype";

type FragilityAction = {
	type: RECEIVE_FRAGILITIES,
	fragilities: Fragility[]
}
const defaultState = {fragilities: []};

const fragilities = (state: FragilityState = defaultState, action: FragilityAction) => {
	switch(action.type) {
	case RECEIVE_FRAGILITIES:
		return Object.assign({}, state, {fragilities: action.fragilities});
	default:
		return state;
	}
};

export default fragilities;
