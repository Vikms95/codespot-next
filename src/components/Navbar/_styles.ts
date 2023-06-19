import styled from 'styled-components';

import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

const LinkText = styled.span`
	display: none;
	white-space: nowrap;
`;

const TitleText = styled(LinkText)`
	&&& {
		filter: none;
	}
	padding-left: 1.5em;
`;

const StyledLink = styled(Link)`
	width: 100%;
`;

const NavArrow = styled(FaChevronRight)`
	font-weight: bold;
	text-transform: uppercase;
	margin-bottom: 1rem;
	width: 100%;
	margin-top: 0.5em;
	color: #4f29b6;
	width: 100%;
	margin-left: -0.5em;

	& > svg {
		color: #4f29b6;
		transform: rotate(0deg);
		transition: transform 300ms;
	}
`;

const InnerNav = styled.ul`
	padding-inline-start: 0;
	list-style: none;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-direction: column;
	row-gap: 1em;
	width: 100%;

	> * {
		&:first-child {
			background-color: #dcdcdc;
		}
	}
`;

const NavItem = styled.li`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 0.5em 0;
	color: #6649b8;
	font-size: 1.5em;
	font-weight: 500;
	filter: grayscale(100%) opacity(0.7);
	transition: filter 400ms;
	width: 100%;

	& > svg {
		padding-top: 0.2em;
		padding-bottom: 0.2em;
		padding-left: 1.5em;
		min-width: 6rem;
		margin-right: 1rem;

		@media only screen and (max-width: 600px) {
			padding-left: 0;
		}
	}

	@media only screen and (max-width: 600px) {
		justify-content: center;
	}

	&:hover {
		filter: grayscale(0%) opacity(1);
	}
`;

const StyledNavbar = styled.nav`
	background-color: white;
	position: fixed;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1em 0;
	box-shadow: 21px 2px 48px -1px rgba(0, 0, 0, 0.09);
	transition: width 300ms ease;
	z-index: 1;
	overflow: hidden;

	&:hover ${NavArrow} {
		transform: rotate(-180deg) translateX(-2rem);
	}

	&:hover ${LinkText} {
		display: block;
	}

	@media only screen and (min-width: 600px) {
		top: 0;
		width: 7em;
		height: 100%;

		&:hover {
			width: 16rem;
		}

		&:hover ${LinkText} {
			display: inline;
			transition: opacity 400ms;
		}
	}

	@media only screen and (max-width: 600px) {
		display: flex;
		justify-content: center;
		align-items: center;
		bottom: 0;
		width: 100%;
		height: 3rem;

		& ${InnerNav} {
			margin-left: 3em;
			flex-direction: row;
			justify-content: flex-end;
			> * {
				background-color: white;
			}
		}

		&:hover ${LinkText} {
			display: none;
		}
	}
`;

export {
	InnerNav,
	LinkText,
	NavArrow,
	NavItem,
	StyledLink,
	StyledNavbar,
	TitleText,
};
