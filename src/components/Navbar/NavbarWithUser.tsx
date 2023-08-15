'use client';
import Link from 'next/link';
import React from 'react';
import { Navbar } from './Navbar';
import { NavbarText } from './NavbarText';
import { logoutUser } from '../../utils/logoutUser';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

export function NavbarWithUser() {
	return (
		<Navbar>
			<NavigationMenu.Item>
				<Link
					className='navbar-link'
					data-testid='dashboard-button'
					href='/dashboard'
				>
					<NavigationMenu.Link>
						<NavbarText text='Dashboard' />
					</NavigationMenu.Link>
				</Link>
			</NavigationMenu.Item>

			<NavigationMenu.Item>
				<Link
					className='navbar-link'
					data-testid='create-button'
					href='/create'
				>
					<NavigationMenu.Link>
						<NavbarText text='New post' />
					</NavigationMenu.Link>
				</Link>
			</NavigationMenu.Item>

			<NavigationMenu.Item>
				<Link
					className='navbar-link'
					data-testid='logout-button'
					href='/'
					onClick={logoutUser}
				>
					<NavigationMenu.Link>
						<NavbarText text='Logout' />
					</NavigationMenu.Link>
				</Link>
			</NavigationMenu.Item>
		</Navbar>
	);
}
