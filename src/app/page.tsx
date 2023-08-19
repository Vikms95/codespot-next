'use client';
import { useEffect } from 'react';
import { TSetter } from '@/types';
import { LazyPostPreview as PostPreview } from '@/components/PostPreview';
import { PostsLayout } from '@/layouts';
import { usePostsContext } from '@/context/PostsContext';
import { getPosts } from '@/services/post';
import useSWR from 'swr';
import { MainPostLayout } from '@/components/PostPreview/MainPostsLayout'

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
        <main className='min-h-screen min-w-full sm:mx-0 sm:my-3 md:mx-3 md:my-3 lg:mx-10 lg:my-5'>
            {posts.length > 0 && (
                (() => {
                    const [first, second, ...rest] = posts;
                    return (
                        <MainPostLayout 
                            posts={[first, second]} 
                            setIsModalActive={setIsModalActive}
                            setLastClickedPostId={setLastClickedPostId} 
                        />
                    );
                })()
            )}
        </main>
    );
    
}

            // <PostsLayout section='home'>
            // 	{posts
            // 		.filter(post => post.public)
            // 		.map(({ _id, user, text, title, image, timestamp }, index) => {
            //             if(index < 2) return
            //            return ( <PostPreview
            // 				key={_id}
            // 				id={_id}
            // 				user={user}
            // 				text={text}
            // 				title={title}
            // 				image={image}
            // 				timestamp={timestamp}
            // 				setIsModalActive={setIsModalActive}
            // 				setLastClickedPostId={setLastClickedPostId}
            // 			/>)
            //         })}
            // </PostsLayout>