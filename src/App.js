import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotesApp from './pages/NotesApp';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={NotesApp}></Route>
			</Switch>
		</Router>
	);
}

export default App;
