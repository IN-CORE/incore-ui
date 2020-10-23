import {RECEIVE_DATATYPES} from "../actions";

type DatatypeAction = {
	type: RECEIVE_DATATYPES,
	datatypes: []
}
const defaultState = {datatypes: []};

const datatypes = (state=defaultState, action: DatatypeAction) => {
	switch(action.type) {
	case RECEIVE_DATATYPES:
		return Object.assign({}, state, {datatypes: action.datatypes});
	default:
		return state;
	}
};

export default datatypes;
