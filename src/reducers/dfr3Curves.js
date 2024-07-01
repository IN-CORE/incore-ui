import {
	DFR3CURVE_LOADING,
	DFR3CURVE_LOAD_COMPLETE,
	RECEIVE_DFR3_CURVES,
	DELETE_ITEM,
	DELETE_ERROR,
	RESET_ERROR,
	LOGIN_ERROR, FORBIDDEN
} from "../actions";

const defaultState = {dfr3Curves: [], loading: false};

const dfr3Curves = (state = defaultState, action) => {
	switch(action.type) {
	case RECEIVE_DFR3_CURVES:
		return Object.assign({}, state, {dfr3Curves: action.dfr3Curves});
	case LOGIN_ERROR:
		return Object.assign({}, state, {dfr3Curves: [], Authorization: "", loginError: true});
	case FORBIDDEN:
		return Object.assign({}, state, {dfr3Curves: [], Authorization: "", forbidden: true});
	case DELETE_ITEM:
		return Object.assign({}, state, {
			dfr3Curves: state.dfr3Curves.filter(dfr3Curve => dfr3Curve.id !== action.item.id),
			deleteError: false
		});
	case DELETE_ERROR:
		return Object.assign({}, state, {dfr3Curves:state.dfr3Curves, deleteError:true});
	case RESET_ERROR:
		return Object.assign({}, state, {deleteError:false});
	case DFR3CURVE_LOADING:
		return Object.assign({}, state, {...state, loading: true});
	case DFR3CURVE_LOAD_COMPLETE:
		return Object.assign({}, state, {...state, loading: false, deleteError: false});
	default:
		return state;
	}
};

export default dfr3Curves;
