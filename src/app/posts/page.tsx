'use client';
import { TChildren } from '@/types';
import { useEffect } from 'react';
import { StyledPost } from './_styles';
import { PostBodyWithGuest, PostBodyWithUser } from '../../components/Post';
import { useAuthContext } from '../../context/AuthContext';
import { useFadeIn } from '../../hooks/useFadeIn';
import { setToStorage } from '../../utils/setToStorage';

export default function Post({ children, params }: TChildren) {
	const { postid } = params;
	const { user } = useAuthContext();
	const isActive = useFadeIn();

	useEffect(() => {
		if (!user) {
			setToStorage('postToRedirect', postid);
		} else {
			localStorage.removeItem('postToRedirect');
		}
	}, [user]);

	return (
		<StyledPost isActive={isActive}>
			{user ? <PostBodyWithUser /> : <PostBodyWithGuest />}
			{children}
		</StyledPost>
	);
}
