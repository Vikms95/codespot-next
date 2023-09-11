'use client';
import React, { Dispatch, PropsWithChildren, SetStateAction } from 'react';

import { PostBotRowContainer } from './_styles';
import { PostPreviewImage } from './PostPreviewImage';
import { PostPreviewContent } from './PostPreviewContent';
import { TChildren } from '@/types';
import { TUser } from '@/types';

type Props = {
	id: string;
	user: TUser;
	title: string;
	text: string;
	image: string;
	timestamp: string;
} & PropsWithChildren;

export default function PostPreview({
	id,
	user,
	title,
	text,
	image,
	timestamp,
	children,
}: Props) {
	return (
		<>
			<article className='h-auto max-w-full object-cover'>
				<PostPreviewImage buttons={children} image={image} id={id} />
			</article>

			<article className='flex h-full flex-col justify-between gap-x-4 p-6'>
				<PostPreviewContent
					text={text}
					title={title}
					username={user.username}
					timestamp={timestamp}
				/>
			</article>
		</>
	);
}
