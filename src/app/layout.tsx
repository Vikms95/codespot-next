'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import { NavbarWithGuest, NavbarWithUser } from '../components/Navbar';
import { AuthContextProvider } from '@/context/AuthContext';
import { PostsContextProvider } from '@/context/PostsContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TChildren } from '@/types';
import Head from 'next/head';

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
						<section className='flex h-full flex-col sm:mx-0 md:mx-auto lg:mx-auto lg:my-10'>
							{user ? <NavbarWithUser /> : <NavbarWithGuest />}
							<div className='main-content flex h-full flex-col'>
								{children}
							</div>
						</section>
					</PostsContextProvider>
				</AuthContextProvider>
			</body>
		</html>
	);
}
