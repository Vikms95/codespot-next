import React, { Dispatch, SetStateAction } from 'react';
import { useNearScreen } from '@hooks/useNearScreen';
import { TChildren, TUser } from '@/types';

const PostPreview = React.lazy(() => import('./PostPreview'));

type Props = {
	id: string;
	user: TUser;
	title: string;
	text: string;
	image: string;
	timestamp: string;
	setIsModalActive: Dispatch<SetStateAction<boolean>>;
	setLastClickedPostId: Dispatch<SetStateAction<string>>;
} & TChildren;

export function LazyPostPreview(props: Props) {
	const { isNearScreen, fromRef } = useNearScreen({ distance: '200px' });
	return (
		<section className='flex flex-col content-between outline-none text-ellipsis sm:col-span-4 l:col-span-2' ref={fromRef}>
			<PostPreview {...props}/>
		</section>
	);
}
