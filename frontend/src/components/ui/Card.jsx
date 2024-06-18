import React from 'react';

const Card = ({ className, children, ...props }) => {
	return (
		<div className={`card ${className}`} {...props}>
			{children}
		</div>
	);
};

export const CardHeader = ({ children }) => <div className="card-header">{children}</div>;
export const CardTitle = ({ children, className }) => <h2 className={`card-title ${className}`} >{children}</h2>;
export const CardDescription = ({ children }) => <p className="card-description">{children}</p>;
export const CardContent = ({ children, className }) => <div className={`card-content ${className}`}>{children}</div>;
export const CardFooter = ({ children }) => <div className="card-footer">{children}</div>;

export default Card;
