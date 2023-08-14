'use client';
import { useAuth } from '@hooks/useAuth';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';

import Link from 'next/link';
import { NavbarText } from './NavbarText';
import { MobileNavbar } from './MobileNavbar';

type Props = { children: JSX.Element[] };

export function Navbar({ children }: Props) {
	const [isMobileNavbar, setIsMobileNavbar] = useState(false);
	useAuth();

	return (
		<nav data-testid='navigation-bar' className='bg-white flex'>
			<ul className='sm:flex hidden group list-none flex-row justify-start w-full gap-x-7 mb-5'>
				<Link className='navbar-link' data-testid='home-button' href='/'>
					<NavbarText text='Home' />
				</Link>
				{children}
			</ul>

			<FaBars
				onClick={() => setIsMobileNavbar(true)}
				className='sm:hidden flex hover:cursor-pointer'
			/>

			{isMobileNavbar && <MobileNavbar childs={children} />}
		</nav>
	);
}
