import React from 'react';
import { Navbar } from './Navbar';
import { Link } from './Link';

export function NavbarWithGuest() {
	return (
		<Navbar>
			<Link href='/register' testid='register-button' text='Register' />
			<Link href='/login' testid='login-button' text='Login' />
		</Navbar>
	);
}
