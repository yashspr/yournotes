import { batch } from 'react-redux';

import {
	addMetadata,
	addNotes,
	reconcileStateAfterSync,
} from './notes.actions';
import { setIsNotesLoading, setIsSyncing } from '../loading/loading.actions';
import { setVisibleNoteId } from '../visibleNoteId/visibleNoteId.actions';

import api from '../../services/api';
import { mostRecentNoteId } from '../visibleNoteId/visibleNoteId.selector';

export const loadNotes = () => async (dispatch, getState) => {
	dispatch(setIsNotesLoading(true));
	let response = await api.fetchMetadata();
	let data = response.data;
	dispatch(addMetadata(data.files));
	let noteIds = Object.keys(data.files);
	response = await api.fetchNotes(noteIds);
	dispatch(addNotes(response.data));
	dispatch(setVisibleNoteId(mostRecentNoteId(getState())));
	dispatch(setIsNotesLoading(false));
};

export const syncNotes = () => async (dispatch, getState) => {
	const { notes, visibleNoteId } = getState();

	dispatch(setIsSyncing(true));

	let notesToUpload = [];
	let notesToUpdate = [];
	let noteIdsToDelete = [];

	Object.keys(notes).forEach((id) => {
		let noteObj = notes[id];
		if (!noteObj.isLoaded) {
			return;
		}
		if (noteObj.isNew && !noteObj.isDeleted) {
			notesToUpload.push(noteObj);
		} else if (noteObj.isUpdated && !noteObj.isDeleted) {
			notesToUpdate.push(noteObj);
		} else if (!noteObj.isNew && noteObj.isDeleted) {
			noteIdsToDelete.push(noteObj.id);
		}
	});

	console.log(notesToUpload);
	console.log(notesToUpdate);
	console.log(noteIdsToDelete);

	let newIds = [];

	if (notesToUpload.length > 0) {
		let response = await api.uploadNotes(notesToUpload);
		if (
			response.data.status &&
			response.data.status === 'failed to update metadata'
		) {
			console.log('Failed to Update Metadata');
		} else {
			newIds = response.data.newFileIDs;
			newIds.forEach(({ newId, oldId }) => {
				let newObj = {
					...notes[oldId],
					id: newId,
					isNew: false,
					isUpdated: false,
				};
				notes[newId] = newObj;
				delete notes[oldId];
			});
		}
	}

	if (notesToUpdate.length > 0) {
		let response = await api.updateNotes(notesToUpdate);
		let erroredIds = response.data.erroredFileIds;

		notesToUpdate.forEach((noteObj) => {
			if (!erroredIds.includes(noteObj.id)) {
				noteObj.isUpdated = false;
			}
		});
	}

	if (noteIdsToDelete.length > 0) {
		let response = await api.deleteNotes(noteIdsToDelete);
		let erroredIds = response.data.erroredFileIds;

		noteIdsToDelete.forEach((id) => {
			if (!erroredIds.includes(id)) {
				delete notes[id];
			}
		});
	}

	batch(() => {
		dispatch(reconcileStateAfterSync(notes));
		if (!notes[visibleNoteId]) {
			let newVisibleNoteId = newIds.find(
				({ oldId, newId }) => oldId === visibleNoteId
			).newId;
			dispatch(setVisibleNoteId(newVisibleNoteId));
		}
		dispatch(setIsSyncing(false));
	});
};
