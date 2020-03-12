import {connect} from "react-redux";
import DFR3ViewerComponent from "../components/DFR3Viewer";
import {fetchDFR3Curves, fetchDFR3Mappings, fetchSpaces, searchDFR3Curves} from "../actions";

const mapStateToProps = (state) => {
	return {
		dfr3Curves: state.dfr3Curve.dfr3Curves,
		dfr3Mappings: state.dfr3Mapping.dfr3Mappings,
		spaces: state.space.spaces,
		authError: state.user.loginError,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllSpaces: () =>{
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
		}
	};
};

const DFR3Viewer = connect(mapStateToProps, mapDispatchToProps)(DFR3ViewerComponent);

export default DFR3Viewer;
