'use client';
import { useEffect } from 'react';
import { TPost, TSetter } from '@/types';
import { LazyPostPreview as PostPreview } from '@/components/PostPreview';
import { PostsLayout } from '@/layouts';
import { usePostsContext } from '@/context/PostsContext';
import { getPosts } from '@/services/post';
import useSWR from 'swr';
import { MainPostLayout } from '@/components/PostPreview/MainPostsLayout';
import { ENDPOINTS } from '@/constants';

type Props = {
	setLastClickedPostId: TSetter<string>;
	setIsModalActive: TSetter<boolean>;
};

export default function Home({
	setLastClickedPostId,
	setIsModalActive,
}: Props) {
	const { posts, setPosts } = usePostsContext();
	const { data: fetchedPosts } = useSWR(ENDPOINTS.GET_POSTS, getPosts);

	useEffect(() => {
		if (!fetchedPosts) return;

		const publicPosts = fetchedPosts
			.filter((post: TPost) => post.public)
			.reverse();

		setPosts(publicPosts);
	}, [fetchedPosts]);

	return (
		<main className='m:my-3 min-h-screen sm:mx-0 md:mx-auto md:px-4 lg:mx-20 lg:my-5'>
			{posts.length > 0 &&
				(() => {
					const [first, second, ...rest] = posts;
					return (
						<>
							{first && second && (
								<MainPostLayout
									posts={[first, second]}
									setIsModalActive={setIsModalActive}
									setLastClickedPostId={setLastClickedPostId}
								/>
							)}

							<PostsLayout section='home'>
								{rest.map(({ _id, user, text, title, image, timestamp }) => {
									if (!_id || !user.username) return null;
									return (
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
									);
								})}
							</PostsLayout>
						</>
					);
				})()}
		</main>
	);
}
