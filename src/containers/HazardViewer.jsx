import { connect } from "react-redux";
import HazardViewerComponent from "../components/HazardViewer";
import {
	fetchHazards,
	fetchSpaces,
	searchHazards,
	deleteItemById,
	getItemById,
	resetError,
	resetGetItem,
} from "../actions";

const mapStateToProps = (state) => {
	return {
		hazards: state.hazard.hazards,
		hazard: state.hazard.hazard,
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
		getItemById: (hazard_type, id) => {
			dispatch(getItemById(hazard_type, id));
		},
		resetGetItem: () => {
			dispatch(resetGetItem());
		},
		resetError: () => {
			dispatch(resetError);
		}
	};
};

const HazardViewer = connect(mapStateToProps, mapDispatchToProps)(HazardViewerComponent);

export default HazardViewer;
