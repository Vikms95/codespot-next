'use client';
import React, { Dispatch, SetStateAction } from 'react';

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
	buttons?: any;
};

export default function PostPreview({
	id,
	user,
	title,
	text,
	image,
	timestamp,
	buttons,
}: Props) {
	return (
		<>
			<article className='h-auto max-w-full object-cover'>
				<PostPreviewImage buttons={buttons} image={image} id={id} />
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
