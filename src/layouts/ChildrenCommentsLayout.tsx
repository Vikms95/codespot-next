import styled from 'styled-components';

export const ChildrenCommentsLayout = styled.div`
	display: ${props => (props.areChildrenHidden ? 'none' : 'flex')};
`;
