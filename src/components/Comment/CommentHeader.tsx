import React from 'react';
import { CommentTopRow, Username, CommentDate } from './_styles';
import { getRelativeCurrentDate } from '../../utils/getRelativeCurrentDate';

type Props = {
	commentUserName: string;
	timestamp: string;
};

export function CommentHeader({ commentUserName, timestamp }: Props) {
	return (
		<>
			<CommentTopRow>
				<Username>{commentUserName || '(deleted user)'}</Username>
				<CommentDate>{getRelativeCurrentDate(timestamp)}</CommentDate>
			</CommentTopRow>
		</>
	);
}
