/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { getImage } from '@services/post';
import { Title, Image } from './_styles';
import { TPost } from '@/types';
import useSWRMutation from 'swr/mutation';

type Props = { image: string; title: string; post: TPost };
export function PostHero({ image, title, post }: Props) {
	const { data: imageSrc, trigger } = useSWRMutation('/images/', () =>
		getImage(image)
	);

	useEffect(() => {
		trigger();
	}, [post]);

	return (
		<>
			<Title>{title && title}</Title>

			{imageSrc?.ok && <Image src={imageSrc?.url} alt='post-portrait' />}
		</>
	);
}
