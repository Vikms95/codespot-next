import React from 'react';
import { Navbar } from './Navbar';
import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { StyledLink, NavItem, LinkText } from './_styles';
import Link from 'next/link';
import { NavbarText } from './NavbarText';

export function NavbarWithGuest() {
	return (
		<Navbar>
			<Link data-testid='register-button' href='/register'>
				<NavbarText text='Register' />
			</Link>

			<Link data-testid='login-button' href='/login'>
				<NavbarText text='Login' />
			</Link>
		</Navbar>
	);
}
