import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Spinner = ({ color, message }) => {
	let classes = [];

	color ? classes.push(color) : classes.push('primary');

	return (
		<div className="spinner-container">
			<div className="spinner">
				<FontAwesomeIcon
					icon={faSpinner}
					size="3x"
					className={classes.join(' ')}
					fixedWidth
					spin
				/>
				<p>{message}</p>
			</div>
		</div>
	);
};

export default Spinner;
