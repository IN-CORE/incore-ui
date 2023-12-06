import {DFR3CURVE_LOADING, DFR3CURVE_LOAD_COMPLETE, RECEIVE_DFR3_CURVES, DELETE_ITEM, GET_ITEM, DELETE_ERROR, RESET_ERROR} from "../actions";
import {DFR3CurvesState, DFR3Curve} from "../utils/flowtype";

type DFR3Action = {
	type: RECEIVE_DFR3_CURVES,
	dfr3Curves: DFR3Curve[],
	dfr3Curve: DFR3Curve,
	item: DFR3Curve,
	loading: boolean
}
const defaultState = {dfr3Curves: [], loading: false};

const dfr3Curves = (state: DFR3CurvesState = defaultState, action: DFR3Action) => {
	switch(action.type) {
	case RECEIVE_DFR3_CURVES:
		return Object.assign({}, state, {dfr3Curves: action.dfr3Curves});
	case DELETE_ITEM:
		return Object.assign({}, state, {
			dfr3Curves: state.dfr3Curves.filter(dfr3Curve => dfr3Curve.id !== action.item.id),
			deleteError: false
		});
	case `${GET_ITEM}_FRAGILITIES`:
		return Object.assign({}, state, {dfr3Curve: action.item});
	case `${GET_ITEM}_RESTORATIONS`:
		return Object.assign({}, state, {dfr3Curve: action.item});
	case `${GET_ITEM}_REPAIRS`:
		return Object.assign({}, state, {dfr3Curve: action.item});
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
