'use client';
import { useEffect } from 'react';
import { TPost, TSetter } from '@/types';
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
			setPosts(fetchedPosts.filter((post: TPost) => post.public).reverse());
		}
	}, [fetchedPosts]);

    
    return (
        <main className='min-h-screen sm:mx-0 md:mx-auto md:px-4 m:my-3 lg:my-5 lg:mx-20'>
            {posts.length > 0 && (
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
                                    )
                                })}
                        </PostsLayout>
                        </>
                    );
                })()
            )}
        </main>
    );
    
}
