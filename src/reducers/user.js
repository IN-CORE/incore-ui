import {SET_USER, LOGIN_ERROR, LOGOUT} from "../actions";
import type {UserState} from "../utils/flowtype";

type UserAction = {
	type: SET_USER,
	Authorization: String,
	loginError: boolean,
}
const defaultState = {Authorization: "", loginError: false};

const user = (state: UserState = defaultState, action: UserAction) => {
	switch(action.type) {
	case SET_USER:
		return Object.assign({}, state, {Authorization: action.Authorization, loginError: false});
	case LOGIN_ERROR:
		return Object.assign({}, state, {Authorization: "", loginError: true});
	case LOGOUT:
		return Object.assign({}, state, {Authorization: "", loginError: false});
	default:
		return state;
	}
};

export default user;
