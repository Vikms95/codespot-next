/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getComments } from '../services/comment';
import { Post } from '../components/Post/Post';
import { PostWithComments } from '../components/Post/PostWithComments';
import { CommentsContextProvider } from '../context/CommentsContext';
import useSWR from 'swr';
import { TComment } from '@/types';

export function PostWrapper() {
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
	const { postid } = useParams();
	const { data } = useSWR(`/api/${postid}/comments`, () =>
		getComments(postid!)
	);

	useEffect(() => setComments(data), [data]);

	return (
		<CommentsContextProvider value={{ comments, setComments }}>
			{comments?.length === 0 ? <Post /> : <PostWithComments />}
		</CommentsContextProvider>
	);
}
