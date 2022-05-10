import {connect} from "react-redux";
import AppComponent from "../components/App";
import {fetchAllocations, fetchDatasetUsage, fetchHazardUsage, fetchLabUsage, logout} from "../actions";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const mapStateToProps = (state) => {
	return{
		Authorization: cookies.get("Authorization"),
		datasetUsage: state.usage.datasetUsage,
		hazardUsage: state.usage.hazardUsage,
		labUsage: state.usage.labUsage,
		allocations: state.usage.allocations
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getDatasetUsage: () => {
			dispatch(fetchDatasetUsage());
		},
		getHazardUsage:() => {
			dispatch(fetchHazardUsage());
		},
		// TODO fetch lab usage is not actually being used yet
		getLabUsage:() =>{
			dispatch(fetchLabUsage());
		},
		logout: () => {
			dispatch(logout());
		},
		getAllocations: () => {
			dispatch(fetchAllocations());
		}
	};
};


const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default App;
