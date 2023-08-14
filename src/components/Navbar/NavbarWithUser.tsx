'use client';
import Link from 'next/link';
import React from 'react';
import { Navbar } from './Navbar';
import { NavbarText } from './NavbarText';
import { logoutUser } from '../../utils/logoutUser';

export function NavbarWithUser() {
	return (
		<Navbar>
			<Link className='w-full' data-testid='dashboard-button' href='/dashboard'>
				<NavbarText text='Dashboard' />
			</Link>

			<Link className='w-full' data-testid='create-button' href='/create'>
				<NavbarText text='New post' />
			</Link>

			<Link
				className='w-full'
				data-testid='logout-button'
				href='/'
				onClick={logoutUser}
			>
				<NavbarText text='Logout' />
			</Link>
		</Navbar>
	);
}
