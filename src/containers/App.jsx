import {connect} from "react-redux";
import AppComponent from "../components/App";
import {logout} from "../actions";

const mapStateToProps = () => {
	return{
		Authorization: sessionStorage.access_token
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => {
			dispatch(logout());
		}
	};
};


const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default App;
