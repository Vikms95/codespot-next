import { useEffect } from 'react';
import { getPostToUpdate } from '../utils/getPostToUpdate';
import { TPost, TSetter } from '@/types';

export function usePostToUpdate(
	postid: string,
	posts: TPost[],
	setFormData: TSetter<Record<string, any>>
) {
	useEffect(() => {
		if (postid) {
			const postToUpdate = getPostToUpdate(posts, postid);

			setFormData(() => {
				return {
					title: postToUpdate.title,
					text: postToUpdate.text,
					isPublic: postToUpdate.public,
					timestamp: postToUpdate.timestamp,
				};
			});
		}
	}, []);
}
