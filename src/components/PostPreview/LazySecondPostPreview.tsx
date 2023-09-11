import React, { Dispatch, SetStateAction } from 'react';
import { useNearScreen } from '@hooks/useNearScreen';
import { SetState, TChildren, TUser } from '@/types';

const SecondPostPreview = React.lazy(() => import('./SecondPostPreview'));

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
		// <section className='flex flex-col text-ellipsis sm:col-span-8 md:col-span-3 lg:col-span-3' ref={fromRef}>
		<section className='flex flex-col basis-2/5 text-ellipsis sm:col-span-8 md:col-span-3' ref={fromRef}>
			<SecondPostPreview {...props}/>
		</section>
	);
}
