import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { TChildren } from '@/types';
import clsx from 'clsx';

type Props = { title: string; section: string } & TChildren;

export function PostsLayout({ children, title, section }: Props) {
	const isActive = useFadeIn();


	return (
			<section
				data-testid='posts-layout'
				className={clsx(
					'w-full h-full opacity-0 transition-opacity duration-500 ease-linear gap-8 grid grid-cols-8 sm:p-4 md:p-0 lg:mx-20',
					isActive && 'opacity-100',
                    
				)}
			>
				{children}
			</section>
	);
}
