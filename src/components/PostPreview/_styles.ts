import styled from 'styled-components';
import { FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const StyledPostPreview = styled.section`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	box-shadow: 1.5px 1.5px 1.5px -1px gray;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	border: none;
	min-height: 32em;
	min-width: 3em;
	text-overflow: ellipsis;

	border-radius: 5px;

	@media screen and (max-width: 450px) {
		max-width: 80% !important;
	}
`;

export const PostImageContainer = styled.article`
	object-fit: cover;
	height: auto;
	max-width: 100%;
`;

export const PostImage = styled.img`
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	width: 100%;
	height: 18em;
`;

export const StyledBookImage = styled(FaBookOpen)`
	display: none;
	position: absolute;
	color: white;
	font-size: 3em;
	top: 40%;
	left: 75%;
	z-index: 1;
`;

export const BookText = styled.span`
	display: none;
	position: absolute;
	color: white;
	font-size: 1em;
	top: 85%;
	left: 5%;
	z-index: 1;
	font-weight: 500;
	font-size: 1.5em;
`;

export const PostLink = styled(Link)`
	display: flex;
	position: relative;

	&:hover ${PostImage} {
		filter: brightness(0.8);
		transform: scale(1.005, 1.005);
		transition: transform 0.5s;
	}

	&:hover ${StyledBookImage} {
		display: block;
	}

	&:hover ${BookText} {
		display: block;
	}
`;

export const PostContentContainer = styled.article`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	row-gap: 1em;
	padding: 1.5em;
	height: 100%;
`;

export const PostTopRowContainer = styled.article`
	display: flex;
	justify-content: space-between;
`;

export const PostTopRow = styled.h3`
	margin: 0 0 0.8em 0;
	font-size: smaller;
	color: #8d8d8d;
	display: flex;
	align-self: flex-end;
`;

export const PostTitle = styled.h2`
	margin: 0;
	font-size: larger;
`;

export const PostDesc = styled.div`
	display: -webkit-box;
	overflow: hidden;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	margin-bottom: 1rem;
	padding: 0;
`;

export const PostBotRowContainer = styled.div`
	display: flex;
	justify-content: space-around;
	padding-bottom: 1.5em;
`;

export const PostButtonContainer = styled.article`
	display: flex;
	column-gap: 2em;
`;

export const PostCommentsContainer = styled.span`
	position: absolute;
	top: 85%;
	right: 5%;
	display: flex;
	color: white;
	font-size: 1.5em;
	gap: 0.2em;
	text-align: end;
	z-index: 1;
`;
