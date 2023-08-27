import React, { useState, useEffect } from 'react';
import { getComments } from '../services/comment';
import { Post } from '../components/Post/Post';
import { PostWithComments } from '../components/Post/PostWithComments';
import { CommentsContextProvider } from '../context/CommentsContext';
import useSWR from 'swr';
import { TComment } from '@/types';
import { useParams } from 'next/navigation';

export function PostWrapper() {
	const { postid } = useParams();
	const [comments, setComments] = useState<TComment[]>([
		{
			_id: '',
			isDeletedWithChildren: false,
			parent: '',
			post: '',
			text: '',
			timestamp: '',
			user: {
				_id: '',
				username: '',
			},
		},
	]);
	const { data } = useSWR(`/api/${postid}/comments`, getComments);

	useEffect(() => setComments(data), [data]);

	return (
		<CommentsContextProvider value={{ comments, setComments }}>
			{comments?.length === 0 ? <Post /> : <PostWithComments />}
		</CommentsContextProvider>
	);
}
