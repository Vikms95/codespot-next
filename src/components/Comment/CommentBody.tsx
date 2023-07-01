import { TChildren, TComment, TSetter } from '@/types';
import React, { useState } from 'react';
import { CommentBorder, IconsContainer, Text } from './_styles';
import { useAuthContext } from '@context/AuthContext';
import { useCommentsContext } from '@context/CommentsContext';
import { deleteComment, flagComment } from '@services/comment';
import { addPropsToChildren } from '../../utils/addPropsToChildren';
import { findByID } from '../../utils/findbyID';
import { CommentForm } from '../Form/CommentForm';

type Props = {
	text: string;
	commentid: string;
	commentUserId: string;
	childComments: TComment[] | TComment;
	isDeletedWithChildren: boolean;
	getChildComments: (commentid: string) => TComment[] | TComment;
} & TChildren;

export function CommentBody({
	text,
	children,
	commentid,
	commentUserId,
	childComments,
	getChildComments,
	isDeletedWithChildren,
}: Props) {
	const { comments, setComments } = useCommentsContext();
	const { user: loggedUserID } = useAuthContext();
	const [isFormActive, setIsFormActive] = useState(false);

	const handleDelete = (e: Event) => {
		e.preventDefault();

		if (childComments) {
			softDeleteComment();
		} else {
			hardDeleteComment(commentid);
		}
	};

	const softDeleteComment = async () => {
		const comment = findByID(comments, commentid);

		const data = await flagComment(comment);

		if (!data) return;

		setComments((prevComments: TComment[]) =>
			prevComments.map((item: TComment) =>
				item._id === comment._id
					? { ...item, isDeletedWithChildren: true, text: '(deleted)' }
					: { ...item }
			)
		);
	};

	const hardDeleteComment = async (commentid: string) => {
		const comment = findByID(comments, commentid);

		const data = await deleteComment(commentid);
		if (!data) return;

		setComments((prevComments: TComment[]) =>
			prevComments.filter(comment => comment._id !== commentid)
		);

		checkForDeletedParentComment(comments, comment);
	};

	const checkForDeletedParentComment = (
		commentsContext: TComment[],
		comment: TComment
	) => {
		if (comment.parent) {
			const parentid = comment.parent;

			const parentComment = findByID(commentsContext, parentid);
			const parentComments = getChildComments(parentid);

			if (wasSoftDeleted(parentComments, parentComment)) {
				hardDeleteComment(parentid);
			}
		}
	};

	const wasSoftDeleted = (children: TComment[], comment: TComment) =>
		children.length === 1 && comment.isDeletedWithChildren;

	const isLoggedUserCommentDeleted = () =>
		loggedUserID && !isDeletedWithChildren;

	const isLoggedUserComment = () => loggedUserID === commentUserId;

	return (
		<>
			{React.Children.toArray(children[0])}

			<Text>{text}</Text>

			<IconsContainer>
				{isLoggedUserCommentDeleted() &&
					React.Children.toArray(
						isLoggedUserComment()
							? addPropsToChildren(children[1], {
									handleDelete,
									isFormActive,
									setIsFormActive,
							  })
							: addPropsToChildren(children[2], {
									isFormActive,
									setIsFormActive,
							  })
					)}
			</IconsContainer>
			<CommentBorder />

			{isFormActive && (
				<CommentForm
					initialValue={text}
					isCommentForm={true}
					autoFocus={true}
					commentid={commentid}
					setIsFormActive={setIsFormActive}
					type={loggedUserID !== commentUserId ? 'reply' : 'edit'}
				/>
			)}
		</>
	);
}
