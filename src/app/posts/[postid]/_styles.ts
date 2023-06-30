import styled from 'styled-components';

const StyledPost = styled.section`
	max-width: clamp(3em, 100vw, 100ch);
	min-height: 100vh;
	margin: 2em 5em 5em 5em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	pre,
	.highlight .javascript {
		display: flex;
		flex-wrap: wrap;
		background-color: black;
		color: white;
		padding: 1em;
		border-radius: 5px;
		overflow: scroll;
	}

	pre::-webkit-scrollbar,
	.highlight .javascript::-webkit-scrollbar {
		width: 0.75rem;
	}

	pre::-webkit-scrollbar-track,
	.highlight .javascript {
		background: black;
		border-radius: 10px;
	}

	pre::-webkit-scrollbar-thumb,
	.highlight .javascript::-webkit-scrollbar-thumb {
		background: #6649b8;
		border-radius: 10px;
	}

	@media screen and(max-width:600px) {
		margin-left: 12em;
		margin-right: 5em;
	}

	opacity: ${props => (props.isActive ? 1 : 0)};
	transition: opacity 0.8s;
`;

const CommentsTitle = styled.h1`
	padding-left: 1em;
	padding-bottom: 1em;
	padding-top: 2em;
	align-self: flex-start;
`;

const Title = styled.h2`
	font-size: clamp(16px, 5vw, 4em);
	max-width: 80ch;
`;
const Image = styled.img`
	max-width: 100%;
	max-height: 100rem;
	align-self: center;
	margin-bottom: 3em;
`;

const Text = styled.p`
	font-size: clamp(16px, 2vw, 1.5em);
	max-width: clamp(18em, 65vw, 80ch);
	margin-bottom: 5em;
	display: flex;
	flex-direction: column;
	text-align: justify;
`;

const LoginLinkText = styled.div`
	display: flex;
	column-gap: 2em;
	font-weight: 800;
`;

export { CommentsTitle, Image, LoginLinkText, StyledPost, Text, Title };
