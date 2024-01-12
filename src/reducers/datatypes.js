import {RECEIVE_DATATYPES} from "../actions";

const defaultState = {datatypes: []};

const datatypes = (state=defaultState, action) => {
	switch(action.type) {
	case RECEIVE_DATATYPES:
		return Object.assign({}, state, {datatypes: action.datatypes});
	default:
		return state;
	}
};

export default datatypes;
