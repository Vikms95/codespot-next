'use client';
import React from 'react';
import { Navbar } from './Navbar';
import { Link } from './Link';

export function NavbarWithUser() {
	return (
		<Navbar>
			<Link href='/dashboard' testid='dashboard-button' text='Dashboard' />
			<Link href='/create' testid='create-button' text='Create' />
			<Link href='/logout' testid='logout-button' text='Logout' />
		</Navbar>
	);
}
