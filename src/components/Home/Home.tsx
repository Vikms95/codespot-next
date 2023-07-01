import { useEffect } from 'react';
import { LazyPostPreview as PostPreview } from '../PostPreview/';
import { PostsLayout } from '../../layouts';
import { usePostsContext } from '@context/PostsContext';
import { getPosts } from '@services/post';
import { StyledHome } from './_styles';
import { TSetter } from '@/types';
import useSWR from 'swr';

type Props = {
	setLastClickedPostId: TSetter<string>;
	setIsModalActive: TSetter<boolean>;
};

export function Home({ setLastClickedPostId, setIsModalActive }: Props) {
	const { posts, setPosts } = usePostsContext();
	const { data } = useSWR('/api/posts', getPosts);

	useEffect(() => {
		setPosts(data?.reverse());
	}, [data]);

	return (
		<StyledHome>
			{posts && (
				<PostsLayout title='Latest post' section='home'>
					{posts.map(
						post =>
							post.public && (
								<PostPreview
									key={post._id}
									id={post._id}
									user={post.user}
									text={post.text}
									title={post.title}
									image={post.image}
									timestamp={post.timestamp}
									setIsModalActive={setIsModalActive}
									setLastClickedPostId={setLastClickedPostId}
								/>
							)
					)}
				</PostsLayout>
			)}
		</StyledHome>
	);
}
