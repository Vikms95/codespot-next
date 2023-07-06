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
				<PostLink data-testid='post-link' href={'/posts/' + id}>
					<BookText>Read more → </BookText>

					{hasComments() && (
						<PostCommentsContainer>
							<FaComments />
							{commentsCount}
						</PostCommentsContainer>
					)}

					<PostImage
						src={image ? imageSrc?.url : defaultPostImage}
						alt='post-preview'
						width={640}
						height={420}
					/>
				</PostLink>
			)}
		</>
	);
}
