'use client';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import useSWR from 'swr';
import { StyledDashboard } from './_styles';
import { EmptyDashboard } from '@components/Dashboard/EmptyDashboard';
import { useAuthContext } from '@context/AuthContext';
import { usePostsContext } from '@context/PostsContext';
import { getUserPosts } from '@services/post';
import { PostsLayout } from '../../layouts';
import { LazyPostPreviewWithButtons as PostPreviewWithButtons } from '@components/PostPreview';
import { TPost } from '@types';

type Props = {
	setIsModalActive: Dispatch<SetStateAction<boolean>>;
};

export default function Dashboard({ setIsModalActive }: Props) {
	const { user } = useAuthContext();
	const { posts, setPosts, setLastClickedPost } = usePostsContext();
	const { data, error } = useSWR(`/api/${user}/posts`, () =>
		getUserPosts(user)
	);

	useEffect(() => {
		if (error) return;
		console.warn(data);
		setPosts((data as TPost[])?.reverse());
	}, [data]);

	const getPreviewProps = (post: TPost) => {
		return {
			key: post._id,
			id: post._id,
			user: post.user,
			title: post.title,
			text: post.text,
			image: post.image,
			timestamp: post.timestamp,
			isPublic: post.public,
			// setIsModalActive,
			setLastClickedPost,
		};
	};

	const hasNoPost = () => posts?.length === 0;
	const hasPublicPost = () => posts?.some((post: TPost) => post.public);
	const hasPrivatePost = () => posts?.some((post: TPost) => !post.public);

	console.warn('user is: ', user);

	return (
		<StyledDashboard>
			{hasNoPost() ? (
				<EmptyDashboard />
			) : (
				<>
					{hasPublicPost() && (
						<PostsLayout title='Published posts' section='dashboard'>
							{posts?.map(
								post =>
									post.public && (
										<PostPreviewWithButtons
											data-testid='post-preview'
											{...getPreviewProps!(post)}
											key={post._id}
										/>
									)
							)}
						</PostsLayout>
					)}
					{hasPrivatePost() && (
						<PostsLayout title='Unpublished posts' section='dashboard'>
							{posts?.map(
								post =>
									!post.public && (
										<PostPreviewWithButtons
											data-testid='post-preview'
											{...getPreviewProps!(post)}
											key={post._id}
										/>
									)
							)}
						</PostsLayout>
					)}
				</>
			)}
		</StyledDashboard>
	);
}
