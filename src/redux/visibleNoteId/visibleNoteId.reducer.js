import { visibleNoteIdTypes } from './visibleNoteId.actions';

let INITIAL_STATE = '';

const visibleNoteIdReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case visibleNoteIdTypes.SET_VISIBLE_NOTE_ID:
			return action.payload;
		default:
			return state;
	}
};

export default visibleNoteIdReducer;
