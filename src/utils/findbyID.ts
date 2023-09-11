import { TComment, TPost } from '@/types';

export const findByID = <T extends TPost | TComment>(
	array: T[],
	id: T['_id'],
): T | undefined => {
	return array.find(el => el._id === id);
};
