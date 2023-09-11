'use client';
import React, { Dispatch, SetStateAction } from 'react';
import PostPreview from './PostPreview';
import { useRouter } from 'next/navigation';
import { PostButtonContainer } from './_styles';
import { Button } from '../../style/Button';
import { TChildren, TSetter, TUser } from '@/types';
import { setToStorage } from '@/utils/setToStorage';

type Props = {
	id: string;
	user: TUser;
	title: string;
	text: string;
	image: string;
	timestamp: string;
	setIsModalActive: Dispatch<SetStateAction<boolean>>;
	setLastClickedPost: Dispatch<SetStateAction<string>>;
} & TChildren;

export default function PostPreviewWithButtons(props: Props) {
	const { id, setIsModalActive, setLastClickedPost } = props;
	const router = useRouter();

	const handleUpdate = () => {
		setLastClickedPost(id);
		return router.push('/update/' + id);
	};

	const revealDeleteModal = () => {
		setIsModalActive(true);
		setLastClickedPost(id);
	};

	return (
		<PostPreview {...props}>
			<PostButtonContainer>
				<Button onClick={handleUpdate}>Update</Button>
				<Button onClick={revealDeleteModal}>Delete</Button>
			</PostButtonContainer>
		</PostPreview>
	);
}
