import { createSelector } from 'reselect';

const notesSelector = (state) => state.notes;

export const mostRecentNoteId = createSelector(notesSelector, (notes) => {
	let sortedIds = Object.keys(notes)
		.filter((id) => !notes[id].isDeleted)
		.map((id) => [id, notes[id].lastModified])
		.sort((a, b) => b[1] - a[1])
		.map((arr) => arr[0]);

	if (sortedIds.length > 0) return sortedIds.shift();
	else return '';
});
