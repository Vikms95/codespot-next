import { getImage } from '@services/post';
import { Title, Image } from './_styles';
import { TPost } from '@/types';
import useSWR from 'swr';

type Props = { image: string; title: string; post: TPost };
export function PostHero({ image, title, post }: Props) {
	const { data: imageSrc } = useSWR('/images/' + image, getImage);

	return (
		<>
			<Title>{title && title}</Title>

			{imageSrc?.ok && (
				<Image
					src={imageSrc?.url}
					width={900}
					height={500}
					alt='post-portrait'
				/>
			)}
		</>
	);
}
