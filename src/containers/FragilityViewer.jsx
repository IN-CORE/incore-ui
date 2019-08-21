import {connect} from "react-redux";
import FragilityViewerComponent from "../components/FragilityViewer";
import {fetchFragilities, fetchSpaces, searchFragilities} from "../actions";

const mapStateToProps = (state) => {
	return {
		fragilities: state.fragility.fragilities,
		spaces: state.space.spaces,
		authError: state.user.loginError,
		locationFrom: state.user.locationFrom
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllSpaces: () =>{
			dispatch(fetchSpaces());
		},
		getAllFragilities: (space, inventory, hazard, limit, offset) => {
			dispatch(fetchFragilities(space, inventory, hazard, limit, offset));
		},
		searchAllFragilities: (keyword, limit, offset) => {
			dispatch(searchFragilities(keyword, limit, offset));
		}
	};
};

const FragilityViewer = connect(mapStateToProps, mapDispatchToProps)(FragilityViewerComponent);

export default FragilityViewer;
