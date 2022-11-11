import { SET_USER, LOGIN_ERROR, LOGOUT } from "../actions";
import { userStateInitialValue } from "../store/states";

const user = (state: UserState = userStateInitialValue, action: UserAction): UserState => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				Authorization: action.Authorization,
				loginError: false,
				loginSuccess: true
			};
		case LOGIN_ERROR:
			return {
				...state,
				Authorization: "",
				loginError: true,
				loginSuccess: false
			};
		case LOGOUT:
			return {
				...state,
				Authorization: "",
				loginError: false,
				loginSuccess: false
			};
		default:
			return state;
	}
};

export default user;
