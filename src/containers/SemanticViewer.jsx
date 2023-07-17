import { connect } from "react-redux";
import SemanticViewerComponent from "../components/SemanticViewer";
import { fetchHazards, fetchSpaces, searchHazards, deleteItemById, resetError } from "../actions";

const mapStateToProps = (state) => {
	return {
		hazards: state.hazard.hazards,
		deleteError: state.hazard.deleteError,
		spaces: state.space.spaces,
		authError: state.user.loginError,
		loading: state.hazard.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllSpaces: () => {
			dispatch(fetchSpaces());
		},
		getAllHazards: (hazard_type, space, limit, offset) => {
			dispatch(fetchHazards(hazard_type, space, limit, offset));
		},
		searchAllHazards: (hazard_type, keyword, limit, offset) => {
			dispatch(searchHazards(hazard_type, keyword, limit, offset));
		},
		deleteItemById: (hazard_type, id) => {
			dispatch(deleteItemById(hazard_type, id));
		},
		resetError: () => {
			dispatch(resetError);
		}
	};
};

const SemanticViewer = connect(mapStateToProps, mapDispatchToProps)(SemanticViewerComponent);

export default SemanticViewer;
