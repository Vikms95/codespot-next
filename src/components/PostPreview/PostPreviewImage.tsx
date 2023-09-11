'use client';
import { getImage } from '@services/post';
import { getCommentsCount } from '@services/comment';
import defaultPostImage from '@assets/default-image.jpg';
import { ImageItem } from '@assets/imageItem';
import { FaComments } from 'react-icons/fa';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { ImageSrc } from '@/types';
import clsx from 'clsx';

type Props = {
	image: string;
	id: string;
	imageType?: string;
	buttons: any;
};

export function PostPreviewImage({ image, id, imageType, buttons }: Props) {
	const { data: imageSrc, isLoading } = useSWR('/images/' + image, getImage);
	const { data: commentsCount } = useSWR(`/api/${id}/comments-count`, () =>
		getCommentsCount(id),
	);

	const hasComments = () => commentsCount > 0;

	return (
		<>
			{isLoading ? (
				<ImageItem />
			) : (
				<Link
					className='group relative flex flex-grow'
					data-testid='post-link'
					href={'/posts/' + id}
				>
					{buttons && (
						<span className='absolute right-[5%] top-[5%] z-10 hidden text-base font-medium text-white group-hover:block'>
							{buttons}
						</span>
					)}
					<span className='absolute left-[5%] top-[85%] z-10 hidden text-base font-medium text-white group-hover:block'>
						Read more →{' '}
					</span>

					{hasComments() && (
						<span className='absolute right-[5%] top-[85%] z-10 flex gap-1 text-end text-xl text-white'>
							<FaComments />
							{commentsCount}
						</span>
					)}

					<Image
						className={clsx(
							'w-full overflow-hidden object-cover opacity-90 transition-opacity group-hover:opacity-100',
							imageType ? 'sm:h-[25.5rem] lg:h-[26.25rem]' : 'sm:h-36 md:h-56',
						)}
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
