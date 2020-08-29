import { userTypes } from './user.actions';

const INITIAL_STATE = {
	isUserLoggedIn: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case userTypes.SET_IS_USER_LOGGED_IN:
			return {
				...state,
				isUserLoggedIn: action.payload,
			};
		default:
			return state;
	}
};

export default userReducer;
