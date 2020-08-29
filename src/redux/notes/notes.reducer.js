import { notesActionTypes } from './notes.actions';

let INITIAL_STATE = {};

const notesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case notesActionTypes.ADD_METADATA:
			return {
				...action.payload,
			};
		case notesActionTypes.ADD_NOTES:
			let newState = {};
			Object.keys(state).forEach((id) => {
				newState[id] = {
					...state[id],
					note: action.payload[id] ? action.payload[id] : '',
					isLoaded: action.payload[id] ? true : false,
				};
			});
			return newState;
		case notesActionTypes.ADD_NOTE:
			return {
				...state,
				[action.payload.id]: action.payload,
			};
		case notesActionTypes.UPDATE_NOTE:
			return {
				...state,
				[action.payload.id]: action.payload,
			};
		case notesActionTypes.DELETE_NOTE:
			return {
				...state,
				[action.payload]: {
					...state[action.payload],
					isDeleted: true,
				},
			};
		case notesActionTypes.RECONCILE_STATE:
			return {
				...action.payload,
			};
		default:
			return state;
	}
};

export default notesReducer;
