import {connect} from "react-redux";
import AppComponent from "../components/App";
import {logout} from "../actions";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const mapStateToProps = () => {
	return{
		Authorization: cookies.get("Authorization")
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
