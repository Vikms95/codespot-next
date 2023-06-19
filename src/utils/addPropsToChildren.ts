import React from 'react';

function addPropsToReactElement(
	element: JSX.Element,
	props: Record<string, any>
) {
	if (React.isValidElement(element)) {
		return React.cloneElement(element, props);
	}
	return element;
}

export function addPropsToChildren(
	children: JSX.Element,
	props: Record<string, any>
) {
	if (!Array.isArray(children)) {
		return addPropsToReactElement(children, props);
	}
	return children.map(childElement =>
		addPropsToReactElement(childElement, props)
	);
}
