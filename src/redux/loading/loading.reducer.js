import { loadingTypes } from './loading.actions';

let INITIAL_STATE = {
	isNotesLoading: false,
	isSyncing: false,
};

const LoadingReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case loadingTypes.SET_IS_NOTES_LOADING:
			return {
				...state,
				isNotesLoading: action.payload,
			};
		case loadingTypes.SET_IS_SYNCING:
			return {
				...state,
				isSyncing: action.payload,
			};
		default:
			return state;
	}
};

export default LoadingReducer;
