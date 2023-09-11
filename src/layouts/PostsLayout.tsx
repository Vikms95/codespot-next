import React, { PropsWithChildren } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { TChildren } from '@/types';
import clsx from 'clsx';

type Props = { title: string } & PropsWithChildren;

export function PostsLayout({ children, title }: Props) {
	const isActive = useFadeIn();

	return (
		<>
			{title && (
				<h2 className='mb-5 text-xl font-semibold text-main-orange'>{title}</h2>
			)}
			<section
				data-testid='posts-layout'
				className={clsx(
					'grid h-full w-full grid-cols-8 gap-8 opacity-0 transition-opacity duration-500 ease-linear sm:p-4 md:p-0',
					isActive && 'opacity-100',
				)}
			>
				{children}
			</section>
		</>
	);
}
