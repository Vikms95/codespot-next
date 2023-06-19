import styled from 'styled-components';

export const AppLayout = styled.main`
	min-height: 100vh;
	margin-top: 2em;
	margin-bottom: 2em;
	margin-left: 12em;
	display: flex;
	justify-content: center;
	transition: all 200ms;

	@media only screen and (max-width: 600px) {
		margin-left: 0;
	}
`;
