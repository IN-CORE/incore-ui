import {RECEIVE_DFR3_CURVES} from "../actions";
import {DFR3CurvesState, DFR3Curves} from "../utils/flowtype";

type DFR3Action = {
	type: RECEIVE_DFR3_CURVES,
	DFR3Curves: DFR3Curve[]
}
const defaultState = {DFR3Curves: []};

const DFR3Curves = (state: DFR3CurvesState = defaultState, action: DFR3Action) => {
	switch(action.type) {
	case RECEIVE_DFR3_CURVES:
		return Object.assign({}, state, {DFR3Curves: action.DFR3Curves});
	default:
		return state;
	}
};

export default DFR3Curves;
