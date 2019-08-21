import {connect} from "react-redux";
import LoginComponent from "../components/Login";
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

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

export default Login;
