import { connect } from "react-redux";
import AppComponent from "../components/App";
import {fetchAllocations, fetchUsage, fetchLabUsage, logout, authLoginSuccess} from "../actions";

const mapStateToProps = (state) => {
	return {
		Authorization: state.auth.token,
		usage: state.usage.usage,
		labUsage: state.usage.labUsage,
		allocations: state.usage.allocations,
		isAuthenticated: state.auth.isAuthenticated
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
		},
		loginSuccess: (token, refreshToken) => {
			dispatch(authLoginSuccess(token, refreshToken));
		}
	};
};

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default App;
