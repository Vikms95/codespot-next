import React from 'react';
import { ModalWrapper } from '../../containers/ModalWrapper';
import { usePostsContext } from '@context/PostsContext';
import { deletePost } from '@services/post';
import { Button } from '../../style/Button';
import { StyledModal, ButtonContainer } from './_styles';
import { TSetter } from '@/types';

type Props = {
	lastClickedPostId: string;
	setIsModalActive: TSetter<boolean>;
	isModalActive: boolean;
};

export function Modal({
	lastClickedPostId,
	setIsModalActive,
	isModalActive,
}: Props) {
	const { setPosts } = usePostsContext();

	const handleDelete = async () => {
		// @Vikms95 TODO Use SWR here
		const data = await deletePost(lastClickedPostId);
		if (!data) return;

		setPosts(prevPosts =>
			prevPosts.filter(post => post._id !== lastClickedPostId),
		);

		handleCancel();
	};

	const handleCancel = () => {
		setIsModalActive(false);
	};

	return (
		<ModalWrapper isModalActive={isModalActive} handleCancel={handleCancel}>
			<StyledModal onClick={e => e.stopPropagation()}>
				<p> Are you sure you want to delete this post? </p>
				<ButtonContainer>
					<Button onClick={handleCancel}> Cancel</Button>
					<Button onClick={handleDelete}> Delete</Button>
				</ButtonContainer>
			</StyledModal>
		</ModalWrapper>
	);
}
