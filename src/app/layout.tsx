'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { ReactElement, ReactNode, useState } from 'react';
import { NavbarWithGuest, NavbarWithUser } from '../components/Navbar';
import { AppLayout } from '../layouts';
import { AuthContextProvider } from '@/context/AuthContext';
import { PostsContextProvider } from '@/context/PostsContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TChildren } from '@/types';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Codespot',
	description: 'Blog to share your code ideas.',
};

export default function RootLayout({ children }: TChildren) {
	const [user, setUser] = useState('');
	const [posts, setPosts] = useLocalStorage('posts', []);
	const [lastClickedPost, setLastClickedPost] = useState('');

	return (
		<html lang='en'>
			<body className={inter.className}>
				<AuthContextProvider value={{ user, setUser }}>
					<PostsContextProvider
						value={{ posts, setPosts, lastClickedPost, setLastClickedPost }}
					>
						<section>
							{user ? <NavbarWithUser /> : <NavbarWithGuest />}
							{children}
						</section>
					</PostsContextProvider>
				</AuthContextProvider>
			</body>
		</html>
	);
}
