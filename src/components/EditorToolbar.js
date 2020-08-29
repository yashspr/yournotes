import React from 'react';
import { connect } from 'react-redux';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Button from './Button';

import { addNewNote, deleteNote } from '../redux/notes/notes.actions';
import { syncNotes } from '../redux/notes/notes.thunks';
import { setVisibleNoteId } from '../redux/visibleNoteId/visibleNoteId.actions';
import { setMarkdownPreview } from '../redux/options/options.actions';
import { mostRecentNoteId } from '../redux/visibleNoteId/visibleNoteId.selector';

const EditorToolbar = ({
	visibleNoteId,
	addNewNoteAndSetId,
	deleteNoteAndResetId,
	syncNotes,
	isSyncing,
	markdownPreview,
	setMarkdownPreview,
}) => {
	return (
		<div className="editor-toolbar">
			<Button classes={['sync-btn']} onClick={syncNotes}>
				Sync
			</Button>
			<FormGroup row>
				<FormControlLabel
					control={
						<Switch
							checked={markdownPreview}
							onChange={(e) => setMarkdownPreview(e.target.checked)}
							name="markdownSwitch"
							color="primary"
						/>
					}
					label="Markdown Preview"
				/>
			</FormGroup>
			<Button onClick={addNewNoteAndSetId}>New Note</Button>
			<Button onClick={() => deleteNoteAndResetId(visibleNoteId)}>
				Delete Note
			</Button>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	addNewNoteAndSetId: () => {
		let newNoteAction = addNewNote();
		let newId = newNoteAction.payload.id;
		dispatch(newNoteAction);
		dispatch(setVisibleNoteId(newId));
	},
	deleteNoteAndResetId: (id) => {
		dispatch(deleteNote(id));
	},
	syncNotes: () => dispatch(syncNotes()),
	setMarkdownPreview: (status) => dispatch(setMarkdownPreview(status)),
});

const mapStateToProps = (state) => ({
	visibleNoteId: state.visibleNoteId,
	isSyncing: state.loading.isSyncing,
	markdownPreview: state.options.markdownPreview,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorToolbar);
