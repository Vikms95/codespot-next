import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { TChildren } from '@/types';
import clsx from 'clsx';

type Props = { title: string; section: string } & TChildren;

export function PostsLayout({ children, title, section }: Props) {
	const isActive = useFadeIn();

	return (
		<>
			<h2 className=''>{title}</h2>
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
