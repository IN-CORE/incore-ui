import { connect } from "react-redux";
import SemanticViewerComponent from "../components/SemanticViewer";
import {
	fetchSemantics,
	fetchSpaces,
	deleteItemById,
	resetError
} from "../actions";

const mapStateToProps = (state) => {
	return {
		semantics: state.data.semantics,
		deleteError: state.data.deleteError,
		spaces: state.space.spaces,
		datatypes: state.datatype.datatypes,
		authError: state.user.loginError,
		loading: state.data.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllSpaces: () => {
			dispatch(fetchSpaces());
		},
		getAllSemantics: (dataType, space, limit, offset) => {
			dispatch(fetchSemantics(dataType, space, limit, offset));
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
