import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { TChildren } from '@/types';
import clsx from 'clsx';

type Props = { title: string; section: string } & TChildren;

export function PostsLayout({ children, title, section }: Props) {
	const isActive = useFadeIn();

	const isHomeSection = section === 'home';

	return (
		<>
        {title && (
			<h2 className='text-lg sm:ml-8'>{title}</h2>
        )}

			<section
				data-testid='posts-layout'
				className={clsx(
					'w-full h-full opacity-0 transition-opacity duration-500 ease-linear gap-20 grid grid-cols-8 ',
					isActive && 'opacity-100',
                    // isHomeSection && "sm:[&>*:nth-child(1)]:col-span-8 sm:[&>*:nth-child(2)]:col-span-8 md:[&>*:nth-child(1)]:col-span-8 md:[&>*:nth-child(2)]:col-span-8 lg:[&>*:nth-child(1)]:col-span-5 lg:[&>*:nth-child(2)]:col-span-3",
                    
				)}
			>
				{children}
			</section>
		</>
	);
}
