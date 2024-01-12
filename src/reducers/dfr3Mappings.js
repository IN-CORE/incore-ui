import {
	DELETE_ERROR,
	DELETE_ITEM,
	DFR3MAPPING_LOAD_COMPLETE,
	DFR3MAPPING_LOADING,
	LOGIN_ERROR,
	RECEIVE_DFR3_MAPPINGS,
	RESET_ERROR
} from "../actions";

const defaultState = {dfr3Mappings: [], loading: false};

const dfr3Mappings = (state = defaultState, action) => {
	switch (action.type) {
	case RECEIVE_DFR3_MAPPINGS:
		return Object.assign({}, state, {dfr3Mappings: action.dfr3Mappings});
	case DELETE_ITEM:
		return Object.assign({}, state, {
			dfr3Mappings: state.dfr3Mappings.filter(dfr3Mapping => dfr3Mapping.id !== action.item.id),
			deleteError: false
		});
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
