'use client';
import { ENDPOINTS } from '@/constants';
import { TComment } from '@/types';
import { Post } from '@components/Post/Post';
import { PostWithComments } from '@components/Post/PostWithComments';
import { CommentsContextProvider } from '@context/CommentsContext';
import { getComments } from '@services/comment';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function PostWrapper() {
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

	const { data } = useSWR(
		() => ENDPOINTS.GET_POST_COMMENTS(postid),
		getComments,
	);

	useEffect(() => setComments(data), [data]);

	return (
		<CommentsContextProvider value={{ comments, setComments }}>
			{comments?.length === 0 ? <Post /> : <PostWithComments />}
		</CommentsContextProvider>
	);
}
