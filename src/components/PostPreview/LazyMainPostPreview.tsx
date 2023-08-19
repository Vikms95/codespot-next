import React, { Dispatch, SetStateAction } from 'react';
import { useNearScreen } from '@hooks/useNearScreen';
import { SetState, TChildren, TUser } from '@/types';

const MainPostPreview = React.lazy(() => import('./MainPostPreview'));

type Props = {
	id: string;
	user: TUser;
	title: string;
	text: string;
	image: string;
	timestamp: string;
	setIsModalActive: SetState<boolean>;
	setLastClickedPostId: SetState<string
    >;
} & TChildren;

export default function LazyMainPostPreview(props: Props) {
	const { isNearScreen, fromRef } = useNearScreen({ distance: '200px' });
	return (
		// <section className='flex flex-col text-ellipsis sm:col-span-8 md:col-span-5 lg:col-span-5' ref={fromRef}>
		<section className='flex flex-col text-ellipsis sm:col-span-8 md:col-span-5 ' ref={fromRef}>
			<MainPostPreview {...props}/>
		</section>
	);
}
