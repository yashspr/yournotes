import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';
import Spinner from '../components/Spinner';

import { setIsUserLoggedIn } from '../redux/user/user.actions';
import { loadNotes } from '../redux/notes/notes.thunks';
import api from '../services/api';

class NotesApp extends Component {
	componentDidMount() {
		const { setIsUserLoggedIn, fetchNotes } = this.props;

		api.isUserLoggedIn().then((response) => {
			if (response.data.status === 'success') {
				setIsUserLoggedIn(true);
				fetchNotes();
			} else {
				setIsUserLoggedIn(false);
			}
		});
	}

	render() {
		const { isNotesLoading, isSyncing } = this.props;

		return (
			<div className="notes-app">
				<Navbar />
				<div className="main">
					{isNotesLoading || isSyncing ? (
						<Spinner
							message={
								isNotesLoading
									? 'Notes are loading...'
									: isSyncing
									? 'Notes are synchronizing with server'
									: ' '
							}
						/>
					) : (
						<>
							<Sidebar />
							<Editor />
						</>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isNotesLoading: state.loading.isNotesLoading,
	isSyncing: state.loading.isSyncing,
});

const mapDispatchToProps = (dispatch) => ({
	setIsUserLoggedIn: (status) => dispatch(setIsUserLoggedIn(status)),
	fetchNotes: () => dispatch(loadNotes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesApp);
