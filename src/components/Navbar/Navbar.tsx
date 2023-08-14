'use client';
import { useAuth } from '@hooks/useAuth';
import { useWindowDimensions } from '@hooks/useWindowDimensions';
import { FaHouseUser } from 'react-icons/fa';

import {
	InnerNav,
	NavArrow,
	NavItem,
	StyledLink,
	StyledNavbar,
	TitleText,
} from './_styles';
import Link from 'next/link';
import { NavbarText } from './NavbarText';

type Props = { children: JSX.Element[] };

export function Navbar({ children }: Props) {
	useAuth();

	return (
		<nav data-testid='navigation-bar' className='bg-white flex'>
			<ul className=' group list-none flex flex-row justify-start  w-full gap-x-7 mb-5 '>
				<Link className='navbar-link' data-testid='home-button' href='/'>
					<NavbarText text='Home' />
				</Link>
				{children}
			</ul>
		</nav>
	);
}
