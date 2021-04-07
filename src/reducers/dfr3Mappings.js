import {
	DFR3MAPPING_LOAD_COMPLETE,
	DFR3MAPPING_LOADING,
	LOGIN_ERROR,
	RECEIVE_DFR3_MAPPINGS,
} from "../actions";
import {DFR3MappingsState, DFR3Mappings} from "../utils/flowtype";

type dfr3Action = {
	type: RECEIVE_DFR3_MAPPINGS,
	dfr3Mappings: DFR3Mappings[],
	loading: boolean
}
const defaultState = {dfr3Mappings: [], loading: false};

const dfr3Mappings = (state: DFR3MappingsState = defaultState, action: dfr3Action) => {
	switch(action.type) {
	case RECEIVE_DFR3_MAPPINGS:
		return Object.assign({}, state, {dfr3Mappings: action.dfr3Mappings});
	case LOGIN_ERROR:
		return Object.assign({}, state, {dfr3Mappings: [], Authorization: "", loginError: true});
	case DFR3MAPPING_LOADING:
		return Object.assign({}, state, {...state, loading: true});
	case DFR3MAPPING_LOAD_COMPLETE:
		return Object.assign({}, state, {...state, loading: false});
	default:
		return state;
	}
};

export default dfr3Mappings;
