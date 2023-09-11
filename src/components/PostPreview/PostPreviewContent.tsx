'use client';
import React from 'react';
import { useHtmlAsText } from '@hooks/useHtmlAsText';
import { PostTopRow } from './_styles';

type Props = {
	username: string;
	timestamp: string;
	title: string;
	text: string;
};

export function PostPreviewContent({
	username,
	timestamp,
	title,
	text,
}: Props) {
	const textRef = useHtmlAsText(text);

	return (
		<>
			<article className='flex justify-between overflow-hidden'>
				<h3 className='m-0 mb-[0.8rem] flex self-end text-sm text-[#8d8d8d] '>
					{username}
				</h3>
				<h3 className='m-0 mb-[0.8rem] flex self-end text-sm text-[#8d8d8d] '>
					{timestamp}
				</h3>
			</article>

			<h2 className='m-0 text-lg'>{title}</h2>
			<div ref={textRef} className='mb-4 line-clamp-3 p-0' />
		</>
	);
}
