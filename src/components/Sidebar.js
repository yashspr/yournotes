import React from 'react';
import { connect } from 'react-redux';

import NoteCard from './NoteCard';
import { lastModifiedNotesOrderSelector } from '../redux/notes/notes.selectors';

const Sidebar = ({ noteIds }) => {
	return (
		<div className="sidebar">
			{noteIds.map((id) => (
				<NoteCard key={id} id={id} />
			))}
		</div>
	);
};

const mapStateToProps = (state) => ({
	noteIds: lastModifiedNotesOrderSelector(state),
});

export default connect(mapStateToProps)(Sidebar);
