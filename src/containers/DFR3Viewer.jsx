import { connect } from "react-redux";
import DFR3ViewerComponent from "../components/DFR3Viewer";
import {
	fetchDFR3Curves,
	fetchDFR3Mappings,
	fetchSpaces,
	searchDFR3Curves,
	searchDFR3Mappings,
	deleteItemById,
	resetError, getItemById
} from "../actions";

const mapStateToProps = (state) => {
	return {
		dfr3Curves: state.dfr3Curve.dfr3Curves,
		dfr3Curve: state.dfr3Curve.dfr3Curve,
		deleteError: state.dfr3Curve.deleteError || state.dfr3Mapping.deleteError,
		dfr3Mappings: state.dfr3Mapping.dfr3Mappings,
		spaces: state.space.spaces,
		authError: state.user.loginError,
		curvesLoading: state.dfr3Curve.loading,
		mappingsLoading: state.dfr3Mapping.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllSpaces: () => {
			dispatch(fetchSpaces());
		},
		getAllDFR3Curves: (dfr3_type, space, inventory, hazard, limit, offset) => {
			dispatch(fetchDFR3Curves(dfr3_type, space, inventory, hazard, limit, offset));
		},
		getAllDFR3Mappings: (dfr3_type, space, inventory, hazard, limit, offset) => {
			dispatch(fetchDFR3Mappings(dfr3_type, space, inventory, hazard, limit, offset));
		},
		searchAllDFR3Curves: (dfr3_type, keyword, limit, offset) => {
			dispatch(searchDFR3Curves(dfr3_type, keyword, limit, offset));
		},
		searchAllDFR3Mappings: (dfr3_type, keyword, limit, offset) => {
			dispatch(searchDFR3Mappings(dfr3_type, keyword, limit, offset));
		},
		deleteCurveItemById: (dfr3_type, id) => {
			dispatch(deleteItemById(dfr3_type, id));
		},
		getCurveItemById: (dfr3_type, id) => {
			dispatch(getItemById(dfr3_type, id));
		},
		deleteMappingItemById: (id) => {
			dispatch(deleteItemById("mappings", id));
		},
		resetError: () => {
			dispatch(resetError);
		}
	};
};

const DFR3Viewer = connect(mapStateToProps, mapDispatchToProps)(DFR3ViewerComponent);

export default DFR3Viewer;
