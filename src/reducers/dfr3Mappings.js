import {
	DELETE_ERROR,
	DELETE_ITEM,
	DFR3MAPPING_LOAD_COMPLETE,
	DFR3MAPPING_LOADING, GET_ITEM,
	LOGIN_ERROR,
	RECEIVE_DFR3_MAPPINGS,
	RESET_ERROR, RESET_GET_ITEM
} from "../actions";
import {DFR3Mappings, DFR3MappingsState} from "../utils/flowtype";

type dfr3Action = {
	type: RECEIVE_DFR3_MAPPINGS,
	dfr3Mappings: DFR3Mappings[],
	dfr3Mapping: DFR3Mappings,
	item: DFR3Mappings,
	loading: boolean
}
const defaultState = {dfr3Mappings: [], loading: false};

const dfr3Mappings = (state: DFR3MappingsState = defaultState, action: dfr3Action) => {
	switch (action.type) {
	case RECEIVE_DFR3_MAPPINGS:
		return Object.assign({}, state, {dfr3Mappings: action.dfr3Mappings});
	case DELETE_ITEM:
		return Object.assign({}, state, {
			dfr3Mappings: state.dfr3Mappings.filter(dfr3Mapping => dfr3Mapping.id !== action.item.id),
			deleteError: false
		});
	case `${GET_ITEM}_MAPPINGS`:
		return Object.assign({}, state, {dfr3Mapping: action.item});
	case RESET_GET_ITEM:
		return Object.assign({}, state, {dfr3Mapping: action.item});
	case DELETE_ERROR:
		return Object.assign({}, state, {dfr3Mappings: state.dfr3Mappings, deleteError: true});
	case RESET_ERROR:
		return Object.assign({}, state, {deleteError: false});
	case LOGIN_ERROR:
		return Object.assign({}, state, {dfr3Mappings: [], Authorization: "", loginError: true});
	case DFR3MAPPING_LOADING:
		return Object.assign({}, state, {...state, loading: true});
	case DFR3MAPPING_LOAD_COMPLETE:
		return Object.assign({}, state, {...state, loading: false, deleteError: false});
	default:
		return state;
	}
};

export default dfr3Mappings;
