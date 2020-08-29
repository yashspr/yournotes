export const visibleNoteIdTypes = {
	SET_VISIBLE_NOTE_ID: 'SET_VISIBLE_NOTE_ID',
};

export const setVisibleNoteId = (id) => ({
	type: visibleNoteIdTypes.SET_VISIBLE_NOTE_ID,
	payload: id,
});
