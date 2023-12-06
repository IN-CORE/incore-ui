import { connect } from "react-redux";
import DataViewerComponent from "../components/DataViewer";
import {
	fetchDatasets,
	fetchSpaces,
	fetchUniqueDatatypes,
	searchDatasets,
	deleteItemById,
	getItemById,
	resetError, resetGetItemById
} from "../actions";

const mapStateToProps = (state) => {
	return {
		datasets: state.data.datasets,
		dataset: state.data.dataset,
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
		getItemById: (id) => {
			dispatch(getItemById("datasets", id));
		},
		resetGetItemById: () => {
			dispatch(resetGetItemById());
		},
		resetError: () => {
			dispatch(resetError);
		}
	};
};

const DataViewer = connect(mapStateToProps, mapDispatchToProps)(DataViewerComponent);

export default DataViewer;
