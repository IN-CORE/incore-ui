import {connect} from "react-redux";
import FragilityViewerComponent from "../components/FragilityViewer";
import {fetchDFR3Curves, fetchSpaces, searchDFR3Curves} from "../actions";

const mapStateToProps = (state) => {
	return {
		fragilities: state.fragility.fragilities,
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
		searchAllDFR3Curves: (dfr3_type, keyword, limit, offset) => {
			dispatch(searchDFR3Curves(dfr3_type, keyword, limit, offset));
		}
	};
};

const FragilityViewer = connect(mapStateToProps, mapDispatchToProps)(FragilityViewerComponent);

export default FragilityViewer;
