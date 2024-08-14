import { connect } from "react-redux";
import AppComponent from "../components/App";
import { fetchAllocations, fetchUsage, fetchLabUsage, logout } from "../actions";

const mapStateToProps = (state) => {
	return {
		Authorization: state.user.Authorization,
		usage: state.usage.usage,
		labUsage: state.usage.labUsage,
		allocations: state.usage.allocations,
		forbidden: state.user.forbidden,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUsage: () => {
			dispatch(fetchUsage());
		},
		// TODO fetch lab usage is not actually being used yet
		getLabUsage: () => {
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
