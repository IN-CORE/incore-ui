import {connect} from "react-redux";
import DataViewerComponent from "../components/DataViewer";
import {fetchDatasets, fetchSpaces, fetchUniqueDatatypes, searchDatasets} from "../actions";


const mapStateToProps = (state) => {
	return {
		datasets: state.data.datasets,
		spaces: state.space.spaces,
		datatypes: state.datatype.datatypes,
		authError: state.user.loginError,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllSpaces: () => {
			dispatch(fetchSpaces());
		},
		getUniqueDatatypes: (space) => {
			dispatch(fetchUniqueDatatypes(space));
		},
		getAllDatasets: (dataType, space, limit, offset) => {
			dispatch(fetchDatasets(dataType, space, limit, offset));
		},
		searchAllDatasets: (keyword, limit, offset) => {
			dispatch(searchDatasets(keyword, limit, offset));
		}
	};
};

const DataViewer = connect(mapStateToProps, mapDispatchToProps)(DataViewerComponent);

export default DataViewer;
