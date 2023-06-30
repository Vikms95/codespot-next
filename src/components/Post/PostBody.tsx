import { TChildren } from '@/types';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { CommentsTitle, Text } from './_styles';
import { PostHero } from './PostHero';
import { useCommentsContext } from '../../context/CommentsContext';
import { usePostsContext } from '../../context/PostsContext';
import { useHtmlAsText } from '../../hooks/useHtmlAsText';
import { usePost } from '../../hooks/usePost';
import { getPosts } from '../../services/post';
import { useParams } from 'next/navigation';

type Params = { postid: string };

export function PostBody({ children }: TChildren) {
	const { posts, setPosts } = usePostsContext();
	const { postid } = useParams();
	const post = usePost(postid, posts);
	const { title, image, text } = post;
	const textRef = useHtmlAsText(text);
	const { comments } = useCommentsContext();
	const { data } = useSWR('/api/posts', getPosts);

	useEffect(() => {
		if (!posts) {
			setPosts(data);
		}
	}, []);

	return (
		<>
			<PostHero image={image} post={post} title={title} />
			<Text ref={textRef}></Text>

			{children}

			<CommentsTitle>
				{comments?.length > 0 ? 'Comments' : 'There are no comments...'}
			</CommentsTitle>
		</>
	);
}
