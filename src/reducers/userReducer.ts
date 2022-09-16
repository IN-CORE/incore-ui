import { SET_USER, LOGIN_ERROR, LOGOUT } from '../actions';
import { userStateInitialValue } from '../store/states';

export const userReducer = (state: UserState = userStateInitialValue, action: UserAction): UserState => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				Authorization: action.Authorization,
				loginError: false
			};
		case LOGIN_ERROR:
			return {
				...state,
				Authorization: '',
				loginError: true
			};
		case LOGOUT:
			return {
				...state,
				Authorization: '',
				loginError: false
			};
		default:
			return state;
	}
};
