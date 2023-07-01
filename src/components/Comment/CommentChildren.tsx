import React, { useState } from 'react';
import { ChildrenCommentsLayout } from '../../layouts/ChildrenCommentsLayout';
import { CommentsLayout } from '../../layouts/CommentsLayout';
import { FaChevronDown } from 'react-icons/fa';
import { CollapseButton, ExpandButton } from './_styles';
import { TComment } from '@/types';

type Props = {
	childComments: TComment[];
	getChildComments: (commentid: string) => TComment[] | TComment;
};

export function CommentChildren({ childComments, getChildComments }: Props) {
	const [areChildrenHidden, setAreChildrenHidden] = useState(false);

	return (
		<>
			<ChildrenCommentsLayout areChildrenHidden={areChildrenHidden}>
				<CollapseButton
					aria-label='Hide Replies'
					onClick={() => setAreChildrenHidden(true)}
				/>
				<CommentsLayout
					comments={childComments}
					getChildComments={getChildComments}
				/>
			</ChildrenCommentsLayout>

			<ExpandButton
				areChildrenHidden={areChildrenHidden}
				onClick={() => setAreChildrenHidden(false)}
			>
				{'Show replies'}
				<FaChevronDown />
			</ExpandButton>
		</>
	);
}
