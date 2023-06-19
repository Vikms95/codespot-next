import styled from 'styled-components';

export const Spinner = styled.div`
	border: 4px solid white;
	border-left-color: transparent;
	border-radius: 50%;
	width: 15px;
	height: 15px;
	margin: 0 1.55em;
	animation: spin 1s linear infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
`;
