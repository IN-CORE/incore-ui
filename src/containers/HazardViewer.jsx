import {connect} from "react-redux";
import HazardViewerComponent from "../components/HazardViewer";
import {fetchHazards, fetchSpaces, searchHazards} from "../actions";

const mapStateToProps = (state) => {
	return {
		hazards: state.hazard.hazards,
		spaces: state.space.spaces,
		authError: state.user.loginError,
		loading: state.hazard.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllSpaces: () =>{
			dispatch(fetchSpaces());
		},
		getAllHazards: (hazard_type, space, limit, offset) => {
			dispatch(fetchHazards(hazard_type, space, limit, offset));
		},
		searchAllHazards: (hazard_type, keyword, limit, offset) => {
			dispatch(searchHazards(hazard_type, keyword, limit, offset));
		}
	};
};

const HazardViewer = connect(mapStateToProps, mapDispatchToProps)(HazardViewerComponent);

export default HazardViewer;
