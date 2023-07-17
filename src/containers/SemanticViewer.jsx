import { connect } from "react-redux";
import SemanticViewerComponent from "../components/SemanticViewer";
import {
	fetchDatasets,
	fetchSpaces,
	fetchUniqueDatatypes,
	searchDatasets,
	deleteItemById,
	resetError
} from "../actions";

const mapStateToProps = (state) => {
	return {
		datasets: state.data.datasets,
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
		getUniqueDatatypes: () => {
			dispatch(fetchUniqueDatatypes());
		},
		getAllDatasets: (dataType, space, limit, offset) => {
			dispatch(fetchDatasets(dataType, space, limit, offset));
		},
		searchAllDatasets: (keyword, limit, offset) => {
			dispatch(searchDatasets(keyword, limit, offset));
		},
		deleteItemById: (id) => {
			dispatch(deleteItemById("datasets", id));
		},
		resetError: () => {
			dispatch(resetError);
		}
	};
};

const SemanticViewer = connect(mapStateToProps, mapDispatchToProps)(SemanticViewerComponent);

export default SemanticViewer;
