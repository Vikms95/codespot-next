import { TChildren } from '@/types';
import { useEffect } from 'react';
import { StyledPost } from './_styles';
import { PostBodyWithGuest, PostBodyWithUser } from './index';
import { useAuthContext } from '../../context/AuthContext';
import { useFadeIn } from '../../hooks/useFadeIn';
import { setToStorage } from '../../utils/setToStorage';
import { useParams } from 'next/navigation';
import { CommentsLayout } from '@/layouts';
import { useCommentsContext } from '@/context/CommentsContext';
import { useDerivedComments } from '@/hooks/useDerivedComments';

export function Post({ children }: TChildren) {
	const { user } = useAuthContext();
	const isActive = useFadeIn();
	const { postid } = useParams();

	const { comments, setComments } = useCommentsContext();
	const { rootComments, getChildComments } = useDerivedComments(comments);

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
			<CommentsLayout
				comments={rootComments}
				setComments={setComments}
				getChildComments={getChildComments}
			/>
		</StyledPost>
	);
}
