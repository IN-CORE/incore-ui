import {DFR3CURVE_LOADING, DFR3CURVE_LOAD_COMPLETE, RECEIVE_DFR3_CURVES} from "../actions";
import {DFR3CurvesState, DFR3Curve} from "../utils/flowtype";

type DFR3Action = {
	type: RECEIVE_DFR3_CURVES,
	dfr3Curves: DFR3Curve[],
	loading: boolean
}
const defaultState = {dfr3Curves: [], loading: false};

const dfr3Curves = (state: DFR3CurvesState = defaultState, action: DFR3Action) => {
	switch(action.type) {
	case RECEIVE_DFR3_CURVES:
		return Object.assign({}, state, {dfr3Curves: action.dfr3Curves});
	case DFR3CURVE_LOADING:
		return Object.assign({}, state, {...state, loading: true});
	case DFR3CURVE_LOAD_COMPLETE:
		return Object.assign({}, state, {...state, loading: false});
	default:
		return state;
	}
};

export default dfr3Curves;
