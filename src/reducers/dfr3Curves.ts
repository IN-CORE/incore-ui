import {
	DFR3CURVE_LOADING,
	DFR3CURVE_LOAD_COMPLETE,
	RECEIVE_DFR3_CURVES,
	DELETE_ITEM,
	DELETE_ERROR,
	RESET_ERROR
} from "../actions";
import { dfr3CurvesStateInitialValue } from "../store/states";

const dfr3Curves = (state: DFR3State = dfr3CurvesStateInitialValue, action: DFR3Action) => {
	switch (action.type) {
		case RECEIVE_DFR3_CURVES:
			return {
				...state,
				dfr3Curves: action.dfr3Curves
			};
		case DELETE_ITEM:
			return {
				...state,
				dfr3Curves: state.dfr3Curves.filter((dfr3Curve) => dfr3Curve.id !== action.item.id),
				deleteError: false
			};
		case DELETE_ERROR:
			return {
				...state,
				dfr3Curves: state.dfr3Curves,
				deleteError: true
			};
		case RESET_ERROR:
			return {
				...state,
				deleteError: false
			};
		case DFR3CURVE_LOADING:
			return {
				...state,
				loading: true
			};
		case DFR3CURVE_LOAD_COMPLETE:
			return {
				...state,
				loading: false,
				deleteError: false
			};
		default:
			return state;
	}
};

export default dfr3Curves;
