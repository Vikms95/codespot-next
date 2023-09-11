'use client';
import React from 'react';
import { Navbar } from './Navbar';
import { Link } from './Link';
import { logoutUser } from '@/utils/logoutUser'
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavbarText } from './NavbarText'

export function NavbarWithUser() {
	return (
		<Navbar>
			<Link href='/dashboard' testid='dashboard-button' text='Dashboard' />
			<Link href='/create' testid='create-button' text='Create' />
			<NavigationMenu.Item onClick={logoutUser}>
					<NavbarText text='Logout'/>
		    </NavigationMenu.Item>
		</Navbar>
	);
}
