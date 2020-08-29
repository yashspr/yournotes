export const userTypes = {
	SET_IS_USER_LOGGED_IN: 'SET_IS_USER_LOGGED_IN',
};

export const setIsUserLoggedIn = (status) => ({
	type: userTypes.SET_IS_USER_LOGGED_IN,
	payload: status,
});
