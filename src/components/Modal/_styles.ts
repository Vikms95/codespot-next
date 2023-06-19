import styled from 'styled-components';

const StyledModal = styled.section`
	background-color: white;
	top: 50%;
	left: 50%;
	position: absolute;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 1em;
	padding: 3em;
	border-radius: 5px;
	box-shadow: 2px 2px 10px 0px;
`;
const ButtonContainer = styled.div`
	display: flex;
	gap: 2em;
`;

export { StyledModal, ButtonContainer };
