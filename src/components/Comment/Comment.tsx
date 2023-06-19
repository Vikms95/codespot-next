import React, { useState } from 'react';
import { CommentHeader } from './CommentHeader';
import { CommentBody, CommentChildren } from './index';
import { ReplyButton } from './ReplyButton';
import { AuthButton } from './AuthButton';
import { TComment, TUser } from '@/types';

type Props = {
	text: string;
	commentid: string;
	timestamp: string;
	commentUser: TUser;
	getChildComments: (commentid: string) => TComment[];
	isDeletedWithChildren: boolean;
};

export default function Comment({
	text,
	commentid,
	timestamp,
	commentUser,
	getChildComments,
	isDeletedWithChildren,
}: Props) {
	const childComments = getChildComments(commentid);

	return (
		<>
			<CommentBody
				text={text}
				commentid={commentid}
				commentUserId={commentUser._id}
				childComments={childComments}
				getChildComments={getChildComments}
				isDeletedWithChildren={isDeletedWithChildren}
			>
				<CommentHeader
					timestamp={timestamp}
					commentUserName={commentUser.username}
				/>
				<AuthButton />
				<ReplyButton />
			</CommentBody>

			{childComments?.length > 0 && (
				<CommentChildren
					childComments={childComments}
					getChildComments={getChildComments}
				/>
			)}
		</>
	);
}
