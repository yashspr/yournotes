import uid from 'uid';

export const notesActionTypes = {
	ADD_NOTE: 'ADD_NOTE',
	UPDATE_NOTE: 'UPDATE_NOTE',
	DELETE_NOTE: 'DELETE_NOTE',
	ADD_NOTES: 'ADD_NOTES',
	ADD_METADATA: 'ADD_METADATA',
	RECONCILE_STATE: 'RECONCILE_STATE',
};

/* Helper Functions */

function getTitle(note) {
	let sentences = note.split('\n');
	let title = sentences[0].slice(0, 30);
	return title;
}

/* Actions */

export const addMetadata = (files) => {
	let notes = {};
	Object.keys(files).forEach((fileId) => {
		notes[fileId] = {
			...files[fileId],
			note: '',
			id: fileId,
			isNew: false,
			isUpdated: false,
			isLoaded: false,
			isDeleted: false,
		};
	});
	return {
		type: notesActionTypes.ADD_METADATA,
		payload: notes,
	};
};

export const addNotes = (notes) => ({
	type: notesActionTypes.ADD_NOTES,
	payload: notes,
});

export const addNewNote = (note = '') => ({
	type: notesActionTypes.ADD_NOTE,
	payload: {
		id: uid(),
		title: getTitle(note),
		note,
		created: Date.now(),
		lastModified: Date.now(),
		isNew: true,
		isUpdated: true,
		isLoaded: true,
		isDeleted: false,
	},
});

export const updateNote = (noteObj, updatedNote) => ({
	type: notesActionTypes.UPDATE_NOTE,
	payload: {
		...noteObj,
		title: getTitle(updatedNote),
		note: updatedNote,
		lastModified: Date.now(),
		isUpdated: true,
	},
});

export const deleteNote = (noteId) => ({
	type: notesActionTypes.DELETE_NOTE,
	payload: noteId,
});

export const reconcileStateAfterSync = (newState) => ({
	type: notesActionTypes.RECONCILE_STATE,
	payload: newState,
});
