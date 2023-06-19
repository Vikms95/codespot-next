'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import { NavbarWithGuest, NavbarWithUser } from '../components/Navbar';
import { AppLayout } from '../layouts';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Codespot',
	description: 'Blog to share your code ideas.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] = useState('');
	return (
		<html lang='en'>
			<body className={inter.className}>
				<AppLayout>
					{user ? <NavbarWithUser /> : <NavbarWithGuest />}
					{children}
				</AppLayout>
			</body>
		</html>
	);
}
