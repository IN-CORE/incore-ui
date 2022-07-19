import {connect} from "react-redux";
import AppComponent from "../components/App";
import {fetchLabUsage, fetchUsage, logout} from "../actions";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const mapStateToProps = (state) => {
	return{
		Authorization: cookies.get("Authorization"),
		usage: state.usage.usage,
		labUsage: state.usage.labUsage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUsage: () => {
			dispatch(fetchUsage());
		},
		// TODO fetch lab usage is not actually being used yet
		getLabUsage:() =>{
			dispatch(fetchLabUsage());
		},
		logout: () => {
			dispatch(logout());
		}
	};
};


const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default App;
