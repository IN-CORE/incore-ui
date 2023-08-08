import { connect } from "react-redux";
import SemanticViewerComponent from "../components/SemanticViewer";
import {
	fetchSemantics,
	fetchSpaces,
	deleteItemById,
	searchSemantics,
	resetError
} from "../actions";

const mapStateToProps = (state) => {
	return {
		semantics: state.semantics.semantics,
		deleteError: state.data.deleteError,
		spaces: state.space.spaces,
		authError: state.user.loginError,
		loading: state.data.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllSpaces: () => {
			dispatch(fetchSpaces());
		},
		getAllSemantics: (space, limit, offset) => {
			dispatch(fetchSemantics(space, limit, offset));
		},
		searchAllSemantics: (keyword) => {
			dispatch(searchSemantics(keyword));
		},
		deleteItemById: (id) => {
			dispatch(deleteItemById("semantics", id));
		},
		resetError: () => {
			dispatch(resetError);
		}
	};
};

const SemanticViewer = connect(mapStateToProps, mapDispatchToProps)(SemanticViewerComponent);

export default SemanticViewer;
