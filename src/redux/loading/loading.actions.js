export const loadingTypes = {
	SET_IS_NOTES_LOADING: 'SET_IS_NOTES_LOADING',
	SET_IS_SYNCING: 'SET_IS_SYNCING',
};

export const setIsNotesLoading = (status) => ({
	type: loadingTypes.SET_IS_NOTES_LOADING,
	payload: status,
});

export const setIsSyncing = (status) => ({
	type: loadingTypes.SET_IS_SYNCING,
	payload: status,
});
