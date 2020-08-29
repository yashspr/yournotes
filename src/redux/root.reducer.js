import { combineReducers } from 'redux';

import notesReducer from './notes/notes.reducer';
import visibleIdReducer from './visibleNoteId/visibleNoteId.reducer';
import loadingReducer from './loading/loading.reducer';
import userReducer from './user/user.reducer';
import optionsReducer from './options/options.reducer';

const rootReducer = combineReducers({
	notes: notesReducer,
	visibleNoteId: visibleIdReducer,
	loading: loadingReducer,
	user: userReducer,
	options: optionsReducer,
});

export default rootReducer;
