import { TComment, TPost, TUser, Url, UrlPart } from './types';

export const MS_PER_WEEK = 604800000;
export const MS_PER_DAY = 86400000;
export const MS_PER_HOUR = 3600000;
export const MS_PER_MINUTE = 60000;
export const MONTH_NAMES = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export const EDITOR_API_KEY =
	'k1kgs8qmzd0isvug3s4btubgrps7yutyhiy7jbsi038go8sq';

export const BASE_ENDPOINT = 'https://blog-api-backend.onrender.com/api';

// Create a generic that extends string
function createUrl<T extends string>(
	// Make urls extend an array of this generic
	...parts: UrlPart<T>
): Url<T> {
	// Whatever we return, it will be a composition of type of BASE_ENDPOINT and T

	return `${BASE_ENDPOINT}${parts.join('')}` as Url<T>;
}

export const ENDPOINTS = {
	USER: createUrl('/user'),
	SESSION: createUrl('/session'),
	GET_POSTS: createUrl('/posts'),
	CREATE_POST: createUrl('/post'),
	CREATE_COMMENT: createUrl('/comment'),
	FLAG_ALL_COMMENTS: createUrl('/comments'),
	GET_USER_POSTS: (id: TUser['_id']) => createUrl('/', id, '/posts'),
	UPDATE_POST: (id: TPost['_id']) => createUrl('/posts/', id),
	GET_POST_COMMENTS: (id: TPost['_id']) => createUrl('/', id, '/comments'),
	GET_POST_COMMENTS_COUNT: (id: TPost['_id']) =>
		createUrl('/', id, '/comments-count'),
	UPDATE_COMMENT: (postId: TPost['_id'], commentId: TComment['_id']) =>
		createUrl('/', postId, '/comments', commentId),
	DELETE_COMMENT: (id: TComment['_id']) => createUrl('/', id),
};
