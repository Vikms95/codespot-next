'use client';
import { getImage } from '@services/post';
import { getCommentsCount } from '@services/comment';
import defaultPostImage from '@assets/default-image.jpg';
import { ImageItem } from '@assets/imageItem';
import { FaComments } from 'react-icons/fa';
import useSWR from 'swr';

import {
	BookText,
	PostImage,
	PostLink,
	PostCommentsContainer,
} from './_styles';

import Image from 'next/image';
import Link from 'next/link';
import { ImageSrc } from '@/types';
type Props = {
	image: string;
	id: string;
};

export function PostPreviewImage({ image, id }: Props) {
	const { data: imageSrc, isLoading } = useSWR('/images/' + image, getImage);
	const { data: commentsCount } = useSWR(`/api/${id}/comments-count`, () =>
		getCommentsCount(id)
	);

	const hasComments = () => commentsCount > 0;

	return (
		<>
			{isLoading ? (
				<ImageItem />
			) : (
				<Link
					className='group flex relative'
					data-testid='post-link'
					href={'/posts/' + id}
				>
					<span className='group-hover:block hidden absolute text-white text-base z-10 font-medium top-[85%] left-[5%]'>
						Read more →{' '}
					</span>

					{hasComments() && (
						<span className='absolute z-10 text-white flex text-xl top-[85%] right-[5%] text-end gap-1'>
							<FaComments />
							{commentsCount}
						</span>
					)}

					<Image
						className='w-full h-72 rounded-tl-sm transition-transform duration-500 group-hover:filter group-hover:brightness-80 group-hover:scale-[1.01]'
						src={image ? (imageSrc as ImageSrc)?.url : defaultPostImage}
						alt='post-preview'
						width={640}
						height={420}
					/>
				</Link>
			)}
		</>
	);
}
