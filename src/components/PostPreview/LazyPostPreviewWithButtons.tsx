'use client';
import React from 'react';
import { useNearScreen } from '@hooks/useNearScreen';
import { StyledPostPreview } from './_styles';
import { TChildren, TSetter, TUser } from '@/types';

type Props = {
	id: string;
	user: TUser;
	title: string;
	text: string;
	image: string;
	timestamp: string;
	setIsModalActive: TSetter<boolean>;
	setLastClickedPost: TSetter<string>;
} & TChildren;

const PostPreviewWithButtons = React.lazy(
	() => import('./PostPreviewWithButtons')
);

export function LazyPostPreviewWithButtons(props: Props) {
	const { isNearScreen, fromRef } = useNearScreen({ distance: '200px' });

	return (
		<section className='flex flex-col content-between outline-none text-ellipsis sm:col-span-4 l:col-span-2' ref={fromRef}>
			<PostPreviewWithButtons {...props}></PostPreviewWithButtons>
		</section>
	);
}
