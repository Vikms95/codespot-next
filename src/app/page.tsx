'use client';
import { useEffect } from 'react';
import { TSetter } from '@/types';
import { LazyPostPreview as PostPreview } from '@/components/PostPreview';
import { PostsLayout } from '@/layouts';
import { usePostsContext } from '@/context/PostsContext';
import { getPosts } from '@/services/post';
import useSWR from 'swr';

type Props = {
	setLastClickedPostId: TSetter<string>;
	setIsModalActive: TSetter<boolean>;
};

export default function Home({
	setLastClickedPostId,
	setIsModalActive,
}: Props) {
	const { posts, setPosts } = usePostsContext();
	const { data: fetchedPosts } = useSWR('/api/posts', getPosts);

	useEffect(() => {
		if (fetchedPosts) {
			setPosts(fetchedPosts.reverse());
		}
	}, [fetchedPosts]);

	return (
		<main className='min-h-screen min-w-full'>
			{posts && (
				<PostsLayout title='Latest post' section='home'>
					{posts
						.filter(post => post.public)
						.map(({ _id, user, text, title, image, timestamp }) => (
                            <PostPreview
								key={_id}
								id={_id}
								user={user}
								text={text}
								title={title}
								image={image}
								timestamp={timestamp}
								setIsModalActive={setIsModalActive}
								setLastClickedPostId={setLastClickedPostId}
							/>
						))}
				</PostsLayout>
			)}
		</main>
	);
}
