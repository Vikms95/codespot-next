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

type Props = { children: JSX.Element[] };

export function Navbar({ children }: Props) {
	useAuth();

	return (
		<nav data-testid='navigation-bar' className='bg-white flex'>
			<ul className=' list-none flex flex-row justify-around items-center w-full'>
				<Link className='w-full' data-testid='home-button' href='/'>
					<li className='flex'></li>
				</Link>
				{children}
			</ul>
		</nav>
	);
}
