import styled from 'styled-components';

const UnauthorizedImage = styled.img`
	height: auto;
	width: 40em;
`;
const UnauthorizedContainer = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	opacity: ${props => (props.isActive ? 1 : 0)};
	margin-right: ${props => (props.isActive ? 'none' : '5em')};
	transition: margin-right 0.5s ease-out, opacity 0.8s, visibility 0.5s linear;
`;

export { UnauthorizedImage, UnauthorizedContainer };
