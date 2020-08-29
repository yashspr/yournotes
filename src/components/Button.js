import React from 'react';

const Button = ({ children, classes, ...otherOptions }) => {
	return (
		<button
			className={`btn btn-primary ${classes ? classes.join(' ') : null}`}
			{...otherOptions}
		>
			{children}
		</button>
	);
};

export default Button;
