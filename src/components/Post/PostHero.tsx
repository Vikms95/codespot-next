import { getImage } from '@services/post';
import { Title, Image } from './_styles';
import { ImageSrc, TPost } from '@/types';
import useSWR from 'swr';
import { ENDPOINTS } from '@/constants';

type Props = { image: string; title: string; post: TPost };
export function PostHero({ image, title, post }: Props) {
	const { data: imageSrc } = useSWR(() => ENDPOINTS.GET_IMAGE(image), getImage);

	return (
		<>
			<h2 className='max-w-prose text-4xl sm:text-xl'>{title}</h2>

			{imageSrc && (
				<Image
					src={(imageSrc as ImageSrc).url}
					width={900}
					height={500}
					alt='post-portrait'
				/>
			)}
		</>
	);
}
