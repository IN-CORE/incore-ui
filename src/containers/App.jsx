import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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

// withRouter supplies the `location` prop that react-router v3 passed to the
// component of the top-level route. App is no longer rendered by a <Route>,
// so it has to opt in explicitly.
const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppComponent));

export default App;
