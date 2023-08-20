'use client';
import { getImage } from '@services/post'
import { getCommentsCount } from '@services/comment'
import defaultPostImage from '@assets/default-image.jpg'
import { ImageItem } from '@assets/imageItem'
import { FaComments } from 'react-icons/fa'
import useSWR from 'swr'
import Image from 'next/image'
import Link from 'next/link'
import { ImageSrc } from '@/types'
import clsx from 'clsx'

type Props = {
	image: string;
	id: string;
	imageType?: string;
};

export function PostPreviewImage({ image, id, imageType }: Props) {
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
					className='group flex flex-grow relative'
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
						className={clsx('w-full opacity-90 group-hover:opacity-100 overflow-hidden transition-opacity object-cover ', imageType ? 'sm:min-h-[25.5rem] lg:min-h-[26.25rem]': 'sm:h-36 md:h-56')}
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
// : 'sm:h-[200px] md:h-48'