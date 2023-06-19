import styled from 'styled-components';

const StyledModalWrapper = styled.div`
	backdrop-filter: brightness(70%);
	top: 50%;
	left: 50%;
	height: 100vh;
	width: 120vw;
	position: fixed;
	transform: translate(-50%, -50%);
	z-index: 2;
`;

export { StyledModalWrapper };
