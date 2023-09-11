'use client';
import { ENDPOINTS } from '@/constants';
import { EmptyDashboard } from '@components/Dashboard/EmptyDashboard';
import { LazyPostPreviewWithButtons as PostPreviewWithButtons } from '@components/PostPreview';
import { useAuthContext } from '@context/AuthContext';
import { usePostsContext } from '@context/PostsContext';
import { getUserPosts } from '@services/post';
import { TPost } from '@types';
import { useEffect } from 'react';
import useSWR from 'swr';
import { PostsLayout } from '../../layouts';

export default function Dashboard() {
	const { user } = useAuthContext();

	const { posts, setPosts, setLastClickedPost } = usePostsContext();

	const { data, error } = useSWR(
		() => ENDPOINTS.GET_USER_POSTS(user),
		getUserPosts,
	);

	useEffect(() => {
		if (error || !data?.length) return;
		// I want the last post to be the first to show up
		setPosts(data.reverse());
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
			setLastClickedPost,
		};
	};

	const hasNoPost = () => posts?.length === 0;
	const hasPublicPost = () => posts?.some((post: TPost) => post.public);
	const hasPrivatePost = () => posts?.some((post: TPost) => !post.public);

	return (
		<main className='m:my-3 min-h-screen sm:mx-0 md:mx-auto md:px-4 lg:mx-20 lg:my-5'>
			{hasNoPost() ? (
				<EmptyDashboard />
			) : (
				<section className='flex flex-col'>
					{hasPublicPost() && (
						<>
							<PostsLayout title='Published posts'>
								{posts?.map(
									post =>
										post.public && (
											<PostPreviewWithButtons
												data-testid='post-preview'
												{...getPreviewProps!(post)}
												key={post._id}
											/>
										),
								)}
							</PostsLayout>
						</>
					)}
					{hasPrivatePost() && (
						<PostsLayout title='Unpublished posts'>
							{posts?.map(
								post =>
									!post.public && (
										<PostPreviewWithButtons
											data-testid='post-preview'
											{...getPreviewProps!(post)}
											key={post._id}
										/>
									),
							)}
						</PostsLayout>
					)}
				</section>
			)}
		</main>
	);
}
