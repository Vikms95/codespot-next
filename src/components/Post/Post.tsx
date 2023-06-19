import { TChildren } from '@/types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StyledPost } from './_styles';
import { PostBodyWithGuest, PostBodyWithUser } from './index';
import { useAuthContext } from '../../context/AuthContext';
import { useFadeIn } from '../../hooks/useFadeIn';
import { setToStorage } from '../../utils/setToStorage';

export function Post({ children }: TChildren) {
	const { postid } = useParams();
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
