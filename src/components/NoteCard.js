import React from 'react';
import { connect } from 'react-redux';

import { setVisibleNoteId } from '../redux/visibleNoteId/visibleNoteId.actions';

const NoteCard = ({ id, notes, onclick }) => {
	return (
		<div className="note-card note-card--selected" onClick={() => onclick(id)}>
			<div className="note-card__title">{notes[id].title}</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	onclick: (id) => dispatch(setVisibleNoteId(id)),
});

const mapStateToProps = (state) => ({
	notes: state.notes,
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteCard);
