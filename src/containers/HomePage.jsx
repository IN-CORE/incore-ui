import {connect} from "react-redux";
import HomePageComponent from "../components/HomePage";
import {login} from "../actions";

const mapStateToProps = (state) => {
	return {
		loginError: state.user.loginError
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: async (username, password) => {
			await dispatch(login(username,password));
		}
	};
};

const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePageComponent);

export default HomePage;
