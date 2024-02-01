import React, { Component } from "react";
import keycloak from "./keycloak";
import { connect } from "react-redux";
import { authLoginSuccess } from "../actions";

export default function withAuth(ProtectedComponent) {
	class AuthHOC extends Component {
		componentDidMount() {
			console.log(this.props.auth);
			// if (!keycloak.authenticated) {
			// 	console.log("Came here");
			// 	keycloak.login().then(() => {
			// 		const payload = {
			// 			token: keycloak.token,
			// 			refreshToken: keycloak.refreshToken
			// 		};
			// 		this.props.loginSuccess(payload.token, payload.refreshToken);
			// 	});
			// }
		}

		render() {
			return this.props.isAuthenticated ? <ProtectedComponent {...this.props} /> : null;
		}
	}

	const mapStateToProps = (state) => ({
		auth: state.auth,
		isAuthenticated: state.auth.isAuthenticated
	});

	const mapDispatchToProps = (dispatch) => {
		return {
			loginSuccess: (token, refreshToken) => {
				dispatch(authLoginSuccess(token, refreshToken));
			}
		};
	};

	return connect(mapStateToProps, mapDispatchToProps)(AuthHOC);
}
