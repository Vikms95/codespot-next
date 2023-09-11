'use client';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import PostPreview from './PostPreview';
import { useRouter } from 'next/navigation';
import { TChildren, TUser } from '@/types';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

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
	return <PostPreview buttons={<PostButtons {...props} />} {...props} />;
}

function PostButtons({ id, setIsModalActive, setLastClickedPost }: Props) {
	const router = useRouter();

	const handleUpdate = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();

		setLastClickedPost(id);
		return router.push('/update/' + id);
	};

	const revealDeleteModal = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();

		setIsModalActive(true);
		setLastClickedPost(id);
	};

	return (
		<article className='flex gap-x-4'>
			<div role='button' onClick={handleUpdate}>
				<FaPencilAlt
					className='transition-all hover:scale-110'
					color='#DE004A'
				/>
			</div>
			<div role='button' onClick={revealDeleteModal}>
				<FaTrash className='transition-all hover:scale-110' color='#DE004A' />
			</div>
		</article>
	);
}
