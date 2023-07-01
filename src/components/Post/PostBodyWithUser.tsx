import React from 'react';
import { PostBody } from './PostBody';
import { CommentForm } from '../Form/CommentForm';

export function PostBodyWithUser() {
	return (
		<PostBody>
			<CommentForm isCommentForm={false} />
		</PostBody>
	);
}
