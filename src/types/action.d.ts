interface LoginUserAction {
	type: "SET_USER";
	Authorization: string;
}

interface LoginErrorUserAction {
	type: "LOGIN_ERROR";
}

interface LogoutUserAction {
	type: "LOGOUT";
}

interface ForbiddenUserAction {
	type: "FORBIDDEN";
}

type UserAction = LoginUserAction | LoginErrorUserAction | LogoutUserAction | ForbiddenUserAction;
