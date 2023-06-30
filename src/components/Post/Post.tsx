import { TChildren } from '@/types';
import { useEffect } from 'react';
import { StyledPost } from './_styles';
import { PostBodyWithGuest, PostBodyWithUser } from './index';
import { useAuthContext } from '../../context/AuthContext';
import { useFadeIn } from '../../hooks/useFadeIn';
import { setToStorage } from '../../utils/setToStorage';
import { useParams } from 'next/navigation';

export function Post({ children }: TChildren) {
	const { user } = useAuthContext();
	const isActive = useFadeIn();
	const { postid } = useParams();

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
