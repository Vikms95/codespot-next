import { TPost } from '@/types';

export const findByID = (posts: TPost[], postid: string) =>
	posts.find(post => post._id === postid);
