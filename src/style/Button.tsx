/* eslint-disable react/prop-types */
import styled from 'styled-components';

export const Button = styled.button`
	display: flex;
	background-color: white;
	color: #6649b8;
	font-size: 1em;
	font-weight: 900;
	border: none;
	border-radius: 50px;
	outline: 2px solid #6649b8;
	padding: 0.4em 1.8em;

	background-color: ${props => props.disabled && 'grey'};
	outline: ${props => props.disabled && 'none'};
	color: ${props => props.disabled && 'white'};

	&:hover {
		${props =>
			props.disabled
				? 'filter: none; cursor: default;'
				: 'background-color: #6649b8; color: white; outline: none;'}
	}
`;
