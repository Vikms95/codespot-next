import React from 'react';
import { useNearScreen } from '../../hooks/useNearScreen';
// import { StyledComment } from './_styles.js';
import { TComment, TUser } from '../../types.js';

type Props = {
	text: string;
	commentid: string;
	timestamp: string;
	commentUser: TUser;
	getChildComments: (commentid: string) => TComment[];
	isDeletedWithChildren: boolean;
};

const Comment = React.lazy(() => import('./Comment'));

export function LazyComment(props: Props) {
	const { isNearScreen, fromRef } = useNearScreen();

	return (
		// TODO create styled comment
		// <StyledComment ref={fromRef}>
		<>{isNearScreen ? <Comment {...props}></Comment> : null}</>
		// </StyledComment>
	);
}
