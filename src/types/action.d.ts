interface LoginUserAction {
	type: 'SET_USER';
	Authorization: string;
}

interface LoginErrorUserAction {
	type: 'LOGIN_ERROR';
}

interface LogoutUserAction {
	type: 'LOGOUT';
}

type UserAction = LoginUserAction | LoginErrorUserAction | LogoutUserAction;
