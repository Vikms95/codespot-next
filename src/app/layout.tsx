'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { ReactElement, ReactNode, useState } from 'react';
import { NavbarWithGuest, NavbarWithUser } from '../components/Navbar';
import { AppLayout } from '../layouts';
import { AuthContextProvider } from '@/context/AuthContext';
import { PostsContextProvider } from '@/context/PostsContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Codespot',
	description: 'Blog to share your code ideas.',
};

type Props = {
	children: JSX.Element;
};
export default function RootLayout({ children }: Props) {
	const [user, setUser] = useState('');
	const [posts, setPosts] = useLocalStorage('posts', []);
	const [lastClickedPost, setLastClickedPost] = useState('');

	console.log('USER IN TEST', user);
	return (
		<html lang='en'>
			<body className={inter.className}>
				<AppLayout>
					<AuthContextProvider value={{ user, setUser }}>
						<PostsContextProvider
							value={{ posts, setPosts, lastClickedPost, setLastClickedPost }}
						>
							{user ? <NavbarWithUser /> : <NavbarWithGuest />}
							{children}
						</PostsContextProvider>
					</AuthContextProvider>
				</AppLayout>
			</body>
		</html>
	);
}
