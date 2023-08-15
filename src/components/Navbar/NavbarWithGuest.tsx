import React from 'react';
import { Navbar } from './Navbar';
import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { StyledLink, NavItem, LinkText } from './_styles';
import Link from 'next/link';
import { NavbarText } from './NavbarText';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

export function NavbarWithGuest() {
	return (
		<Navbar>
			<NavigationMenu.Item>
				<Link
					className='navbar-link'
					data-testid='register-button'
					href='/register'
				>
					<NavigationMenu.Link>
						<NavbarText text='Register' />
					</NavigationMenu.Link>
				</Link>
			</NavigationMenu.Item>

			<NavigationMenu.Item>
				<Link className='navbar-link' data-testid='login-button' href='/login'>
					<NavigationMenu.Link>
						<NavbarText text='Login' />
					</NavigationMenu.Link>
				</Link>
			</NavigationMenu.Item>
		</Navbar>
	);
}
