import {
	DELETE_ERROR,
	DELETE_ITEM,
	DFR3MAPPING_LOAD_COMPLETE,
	DFR3MAPPING_LOADING,
	LOGIN_ERROR,
	RECEIVE_DFR3_MAPPINGS,
	RESET_ERROR
} from "../actions";

import { dfr3MappingsStateInitialValue } from "../store/states";

const dfr3Mappings = (state: DFR3MappingState = dfr3MappingsStateInitialValue, action: DFR3MappingsAction) => {
	switch (action.type) {
	case RECEIVE_DFR3_MAPPINGS:
		return {
			...state,
			dfr3Mappings: action.dfr3Mappings
		};
	case DELETE_ITEM:
		return {
			...state,
			dfr3Mappings: state.dfr3Mappings.filter(dfr3Mapping => dfr3Mapping.id !== action.item.id),
			deleteError: false
		}
	case DELETE_ERROR:
		return {
			...state,
			dfr3Mappings: state.dfr3Mappings,
			deleteError: true
		}
	case RESET_ERROR:
		return {
			...state,
			deleteError: false
		}
	case LOGIN_ERROR:
		return {
			...state,
			dfr3Mappings: []
		}
	case DFR3MAPPING_LOADING:
		return {
			...state,
			loading: true
		}
	case DFR3MAPPING_LOAD_COMPLETE:
		return {
			...state,
			loading: false,
			deleteError: false
		}
	default:
		return state;
	}
};

export default dfr3Mappings;
