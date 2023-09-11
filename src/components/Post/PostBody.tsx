import { ENDPOINTS } from '@/constants';
import { useCommentsContext } from '@context/CommentsContext';
import { usePostsContext } from '@context/PostsContext';
import { useHtmlAsText } from '@hooks/useHtmlAsText';
import { usePost } from '@hooks/usePost';
import { getPosts } from '@services/post';
import { useParams } from 'next/navigation';
import React, { PropsWithChildren, useEffect } from 'react';
import useSWR from 'swr';
import { PostHero } from './PostHero';
import { CommentsTitle, Text } from './_styles';

export function PostBody({ children }: PropsWithChildren) {
	const { posts, setPosts } = usePostsContext();
	const { postid } = useParams();
	const post = usePost(postid, posts);
	const { title, image, text } = post;
	const textRef = useHtmlAsText(text);
	const { comments } = useCommentsContext();
	const { data } = useSWR(ENDPOINTS.GET_POSTS, getPosts);

	useEffect(() => {
		if (!posts) {
			setPosts(data);
		}
	}, []);

	return (
		<section className='sm:p-4 md:p-0'>
			<PostHero image={image} post={post} title={title} />
			<p className='text-lg sm:text-xs' ref={textRef}></p>

			{children}

			<h1 className='self-start pb-4 pl-4 pt-8'>
				{comments?.length > 0 ? 'Comments' : 'There are no comments...'}
			</h1>
		</section>
	);
}
