import { useCommentsContext } from '@/context/CommentsContext';
import { createComment, updateComment } from '@/services/comment';
import { Spinner } from '@/style/Spinner';
import { TComment, TFormFuncionality, TSetter } from '@/types';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { useAuthContext } from '../../context/AuthContext';
import { commentFields } from '../../data/formFields';
import { commentVal } from '../../data/validationValues';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';
/* eslint-disable react/prop-types */
import {
	StyledCommentInput,
	StyledCommentForm,
	CommentInputButtons,
	CommentFormButton,
} from './_styles';

type Props = {
	type?: TFormFuncionality;
	initialValue?: string;
	isCommentForm?: boolean;
	autoFocus?: boolean;
	commentid?: string;
	setIsFormActive?: Dispatch<SetStateAction<boolean>>;
};

export function CommentForm({
	type,
	initialValue,
	commentid,
	autoFocus,
	isCommentForm,
	setIsFormActive,
	params,
}: Props) {
	const { user: userid } = useAuthContext();
	const { postid } = params;
	const { formData, setFormData, handleChange } = useForm(commentFields);
	const { isFormValid } = useValidation(commentVal, formData);
	const { text } = formData;
	const { comments, setComments } = useCommentsContext();

	const checkFormFunctionality = (type: TFormFuncionality | undefined) => {
		switch (type) {
			case 'reply':
				return 'Reply';
			case 'edit':
				return 'Edit';
			default:
				return 'Comment';
		}
	};

	useEffect(() => {
		if (type === 'edit') {
			setFormData(prevFormData => ({
				...prevFormData,
				text: initialValue,
			}));
		}
	}, [initialValue]);

	const {
		data: commentCreated,
		trigger: triggerCreate,
		isMutating: isLoadingCreate,
	} = useSWRMutation('/api/comment', () =>
		createComment(text, postid, userid, commentid)
	);

	useEffect(() => {
		if (!commentCreated) return;

		setComments((prevComments: TComment[]) => [
			...prevComments,
			commentCreated,
		]);
		setFormData(commentFields);
		setIsFormActive?.(false);
	}, [commentCreated]);

	const {
		data: commentUpdated,
		trigger: triggerUpdate,
		isMutating: isLoadingUpdate,
	} = useSWRMutation(`/api/${postid}/comments/${commentid}`, () =>
		updateComment(text, postid, userid, commentid, comments)
	);

	useEffect(() => {
		if (!commentUpdated) return;

		setComments(prevComments =>
			prevComments.map(prevComment =>
				prevComment._id === commentid ? commentUpdated : prevComment
			)
		);

		setFormData(commentFields);
		setIsFormActive?.(false);
	}, [commentUpdated]);

	return (
		<StyledCommentForm
			isCommentForm={isCommentForm}
			autoFocus={autoFocus}
			tabIndex={1}
			onSubmit={e => {
				e.preventDefault();
				type === 'edit' ? triggerUpdate() : triggerCreate();
			}}
		>
			<StyledCommentInput
				type='text'
				name='text'
				value={text}
				onChange={handleChange}
				maxLength={3000}
				placeholder='What are your thoughts?'
			/>

			<CommentInputButtons>
				{isCommentForm && (
					<CommentFormButton onClick={() => setIsFormActive?.(false)}>
						Cancel
					</CommentFormButton>
				)}

				<CommentFormButton
					type='submit'
					disabled={isFormValid() || isLoadingCreate || isLoadingUpdate}
				>
					{isLoadingCreate || isLoadingUpdate ? (
						<Spinner />
					) : (
						checkFormFunctionality(type)
					)}
				</CommentFormButton>
			</CommentInputButtons>
		</StyledCommentForm>
	);
}
