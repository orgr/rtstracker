import React from 'react';

const Input = ({ className, ...props }) => {
	return (
		<input className={`input ${className}`} {...props} />
	);
};

export default Input;
