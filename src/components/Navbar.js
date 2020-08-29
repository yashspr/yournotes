import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setIsUserLoggedIn } from '../redux/user/user.actions';
import api from '../services/api';
import { loadNotes } from '../redux/notes/notes.thunks';

const Navbar = ({ isUserLoggedIn, setIsUserLoggedIn, fetchNotes }) => {
	const signIn = () => {
		window.open(
			'http://localhost:4000/auth/login',
			'login',
			'width=452,height=633,menubar=no,toolbar=no,location=no'
		);
		window.addEventListener('message', function (event) {
			console.log(event);
			if (event.origin !== 'http://localhost:4000') {
				return;
			}
			if (event.data === 'success') {
				setIsUserLoggedIn(true);
				fetchNotes();
			}
		});
	};

	const signOut = () => {
		api.signout().then((res) => {
			console.log(res);
			if (res.data.status === 'success') {
				setIsUserLoggedIn(false);
			}
		});
	};

	return (
		<nav className="navbar">
			<div className="logo">
				<Link className="logo__text" to="/">
					Notes Application
				</Link>
			</div>
			<ul className="nav">
				{!isUserLoggedIn ? (
					<span className="nav-link" onClick={signIn}>
						Login
					</span>
				) : (
					<span className="nav-link" onClick={signOut}>
						Logout
					</span>
				)}
			</ul>
		</nav>
	);
};

const mapStateToProps = (state) => ({
	isUserLoggedIn: state.user.isUserLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
	setIsUserLoggedIn: (status) => dispatch(setIsUserLoggedIn(status)),
	fetchNotes: () => dispatch(loadNotes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
