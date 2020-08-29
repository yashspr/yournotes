import { createSelector } from 'reselect';

const notesSelector = (state) => state.notes;

export const lastModifiedNotesOrderSelector = createSelector(
	notesSelector,
	(notes) => {
		return Object.keys(notes)
			.filter((id) => !notes[id].isDeleted)
			.map((id) => [id, notes[id].lastModified])
			.sort((a, b) => b[1] - a[1])
			.map((arr) => arr[0]);
	}
);
