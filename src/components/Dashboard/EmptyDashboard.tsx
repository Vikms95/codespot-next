import React from 'react';
import emptyDashboardImage from '@assets/empty-dashboard.webp';
import { useFadeIn } from '@hooks/useFadeIn';
import { EmptyDashboardContainer, EmptyDashboardImage } from './_styles';
import clsx from 'clsx'
import Image from 'next/image'

export function EmptyDashboard() {
	const isActive = useFadeIn();
    
	return (
		<section className={clsx('flex flex-col gap-y-5 opacity-0 justify-center items-center transition-opacity translate-x-5 ease-in', isActive && 'opacity-100')}>
			<h1 >We were looking for your ideas, but did not find them.</h1>
			<a className='hover:text-main-orange text-xl text-main-grey' href='/create'> Create your first post </a>
			<Image alt='not-allowed' className='h-auto w-[40rem]' src={emptyDashboardImage} />
		</section>
	);
}
