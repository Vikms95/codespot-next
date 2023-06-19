import React, { useState } from 'react';
import './assets/global.css';
import { Error } from './components/Error';
import { LoginForm, PostForm, RegisterForm } from './components/Form';
import { Home } from './components/Home';
import { Modal } from './components/Modal';
import { NavbarWithGuest, NavbarWithUser } from './components/Navbar';
import { AuthRouteWrapper } from './containers/AuthRouteWrapper';
import { PostWrapper } from './containers/PostWrapper';
import { AuthContextProvider } from './context/AuthContext';
import { PostsContextProvider } from './context/PostsContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AppLayout } from './layouts';
import { Routes, Route, Navigate } from 'react-router-dom';

import {
	Dashboard,
	DashboardPrivatePosts,
	DashboardPublicPosts,
} from './components/Dashboard/index';

export default function App() {
	const [user, setUser] = useState('');
	const [posts, setPosts] = useLocalStorage('posts', []);
	const [isModalActive, setIsModalActive] = useState(false);
	const [lastClickedPost, setLastClickedPost] = useState('');

	return (
		<AuthContextProvider value={{ user, setUser }}>
			{user ? <NavbarWithUser /> : <NavbarWithGuest />}
			<AppLayout>
				<PostsContextProvider value={{ posts, setPosts }}>
					<Routes>
						<Route element={<AuthRouteWrapper />}>
							<Route path='/create' element={<PostForm />} />
							<Route path='/update/:postid' element={<PostForm />} />
							<Route
								path='/dashboard'
								element={
									<Dashboard
										setIsModalActive={setIsModalActive}
										setLastClickedPost={setLastClickedPost}
									>
										<DashboardPublicPosts />
										<DashboardPrivatePosts />
									</Dashboard>
								}
							/>
						</Route>

						<Route path='/404' element={<Error />} />
						<Route path='/register' element={<RegisterForm />} />
						<Route path='/posts/:postid' element={<PostWrapper />} />
						<Route path='*' element={<Navigate to='/404' replace />} />
						<Route path='/login' element={<LoginForm setUser={setUser} />} />
						<Route
							path='/'
							element={
								<Home
									setIsModalActive={setIsModalActive}
									setLastClickedPostId={setLastClickedPost}
								/>
							}
						/>
					</Routes>

					<Modal
						isModalActive={isModalActive}
						lastClickedPostId={lastClickedPost}
						setIsModalActive={setIsModalActive}
					/>
				</PostsContextProvider>
			</AppLayout>
		</AuthContextProvider>
	);
}
