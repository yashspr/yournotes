import React, { Component } from 'react';
import { connect } from 'react-redux';
import showdown from 'showdown';

import { addNewNote, updateNote } from '../redux/notes/notes.actions';

import Textarea from './Textarea';
import EditorToolbar from './EditorToolbar';
import { setVisibleNoteId } from '../redux/visibleNoteId/visibleNoteId.actions';

class Editor extends Component {
	convertor = new showdown.Converter();

	render() {
		const { visibleNoteId, notes, updateNote, markdownPreview } = this.props;

		if (visibleNoteId)
			console.log(this.convertor.makeHtml(notes[visibleNoteId].note));

		return (
			<div className="editor">
				<EditorToolbar />
				{markdownPreview ? (
					visibleNoteId ? (
						<div
							className="markdown"
							dangerouslySetInnerHTML={{
								__html: `${this.convertor.makeHtml(notes[visibleNoteId].note)}`,
							}}
						/>
					) : (
						''
					)
				) : (
					<Textarea
						placeholder="Enter some text"
						onChange={(updatedNote) =>
							updateNote(notes[visibleNoteId], updatedNote)
						}
						value={visibleNoteId ? notes[visibleNoteId].note : ''}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	visibleNoteId: state.visibleNoteId,
	notes: state.notes,
	markdownPreview: state.options.markdownPreview,
});

const mapDispatchToProps = (dispatch) => ({
	updateNote: (noteObj, updatedNote) => {
		if (!noteObj) {
			let newNoteAction = addNewNote(updatedNote);
			let newId = newNoteAction.payload.id;
			dispatch(newNoteAction);
			dispatch(setVisibleNoteId(newId));
		} else {
			dispatch(updateNote(noteObj, updatedNote));
		}
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
