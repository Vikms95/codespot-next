import { TPost } from '@/types';
import { useEffect, useState } from 'react';

export function usePost(postid: string, posts: TPost[]) {
	const [post, setPost] = useState<TPost>({
		image: '',
		_id: '',
		public: false,
		text: '',
		timestamp: '',
		title: '',
		user: { _id: '', username: '' },
	});

	useEffect(() => {
		if (posts) {
			const postToReturn = posts.find(post => post._id === postid);
			if (postToReturn) {
				setPost(postToReturn);
			}
		}
	}, [posts]);

	return post;
}
