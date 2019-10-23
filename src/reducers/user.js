import {SET_USER, LOGIN_ERROR, LOGOUT} from "../actions";
import type {UserState} from "../utils/flowtype";

type UserAction = {
	type: SET_USER,
	refresh_token: String,
	access_token: String,
	loginError: boolean,
}
const defaultState = {refresh_token: "", access_token: "", loginError: false};

const user = (state: UserState = defaultState, action: UserAction) => {
	switch(action.type) {
	case SET_USER:
		return Object.assign({}, state, {refresh_token: action.refresh_token, access_token: action.access_token, loginError: false});
	case LOGIN_ERROR:
		return Object.assign({}, state, {refresh_token: "", access_token: "", loginError: true});
	case LOGOUT:
		return Object.assign({}, state, {refresh_token: "", access_token: "", loginError: false});
	default:
		return state;
	}
};

export default user;
