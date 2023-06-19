import { getFromStorage } from './getFromStorage';
import { findByID } from './findbyID';
import { setToStorage } from './setToStorage';
import { TPost } from '@/types';
export const getPostToUpdate = (posts: TPost[], postid: string) => {
	if (posts.length) {
		const postToUpdate = findByID(posts, postid);

		setToStorage('postToUpdate', postToUpdate);

		return postToUpdate;
	}
	// This is done so before having the post fetched from the backend
	// I can already show the post to update to the user, to avoid any delay
	return getFromStorage('postToUpdate');
};
