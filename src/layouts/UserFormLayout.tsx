import React from 'react';
import styled from 'styled-components';

export const UserFormLayout = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	column-gap: min(5vw, 5em);
	margin-top: -5em;
	margin-left: -4em;

	opacity: ${props => (props.isActive ? 1 : 0)};
	margin-right: ${props => (props.isActive ? 'none' : '5em')};
	transition: margin-right 0.5s ease-out, opacity 0.8s, visibility 0.5s linear;

	@media screen and (max-width: 1050px) {
		margin-left: -24em;
	}

	@media screen and (max-width: 600px) {
		margin-left: 0;
	}
`;
