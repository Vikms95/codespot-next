import React from 'react';
import styled from 'styled-components';
import { LazyComment as Comment } from '../components/Comment';
import { TComment, TSetter } from '@/types';

const StyledCommentsLayout = styled.section`
	display: grid;
	grid-auto-flow: row;
	row-gap: 3em;
	background-color: white;
	width: 80%;
	align-self: flex-start;
`;

type Props = {
	comments: TComment[];
	setComments?: TSetter<TComment[]>;
	getChildComments: (commentid: string) => TComment[];
};

export function CommentsLayout({ comments, getChildComments }: Props) {
	return (
		<StyledCommentsLayout>
			{comments?.map(comment => {
				return (
					<Comment
						key={comment._id}
						text={comment.text}
						commentid={comment._id}
						commentUser={comment.user}
						timestamp={comment.timestamp}
						getChildComments={getChildComments}
						isDeletedWithChildren={comment.isDeletedWithChildren}
					/>
				);
			})}
		</StyledCommentsLayout>
	);
}
