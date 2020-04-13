import {RECEIVE_DFR3_CURVES} from "../actions";
import {DFR3CurvesState, DFR3Curve} from "../utils/flowtype";

type DFR3Action = {
	type: RECEIVE_DFR3_CURVES,
	dfr3Curves: DFR3Curve[]
}
const defaultState = {dfr3Curves: []};

const dfr3Curves = (state: DFR3CurvesState = defaultState, action: DFR3Action) => {
	switch(action.type) {
	case RECEIVE_DFR3_CURVES:
		return Object.assign({}, state, {dfr3Curves: action.dfr3Curves});
	default:
		return state;
	}
};

export default dfr3Curves;
