import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState = {
	isAuthenticated: false,
	token: cookies.get("Authorization"),
	refreshToken: ""
};

const auth = (state = initialState, action) => {
	switch (action.type) {
	case "AUTH_LOGIN_SUCCESS":
		console.log("Logged in");
		return {
			...state,
			isAuthenticated: true,
			token: action.payload.token,
			refreshToken: action.payload.refreshToken
		};
	case "AUTH_LOGOUT":
		console.log("Logged out");
		return {
			...state,
			isAuthenticated: false,
			token: "",
			refreshToken: ""
		};
	default:
		return state;
	}
};

export default auth;
