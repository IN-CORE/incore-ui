// This is a fallback value for when a component that is not in a Context provider tries to access its value.
export const userStateInitialValue: UserState = {
	Authorization: "",
	loginError: false,
	loginSuccess: false
};
