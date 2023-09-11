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

export const BASE_ENDPOINT = 'https://blog-api-backend.onrender.com';
export const BASE_API_ENDPOINT = BASE_ENDPOINT + '/api';

// Create a generic that extends string
function createApiUrl<T extends string>(
	// Make urls extend an array of this generic
	...parts: UrlPart<T>
): Url<T> {
	// Whatever we return, it will be a composition of type of BASE_ENDPOINT and T

	return `${BASE_API_ENDPOINT}${parts.join('')}` as Url<T>;
}

function createBaseUrl<T extends string>(
	// Make urls extend an array of this generic
	...parts: UrlPart<T>
): Url<T> {
	// Whatever we return, it will be a composition of type of BASE_ENDPOINT and T

	return `${BASE_ENDPOINT}${parts.join('')}` as Url<T>;
}

export const ENDPOINTS = {
	USER: createApiUrl('/user'),
	SESSION: createApiUrl('/session'),
	GET_POSTS: createApiUrl('/posts'),
	CREATE_POST: createApiUrl('/post'),
	CREATE_COMMENT: createApiUrl('/comment'),
	FLAG_ALL_COMMENTS: createApiUrl('/comments'),
	GET_USER_POSTS: (id: TUser['_id']) => createApiUrl('/', id, '/posts'),
	UPDATE_POST: (id: TPost['_id']) => createApiUrl('/posts/', id),
	GET_POST_COMMENTS: (id: TPost['_id']) => createApiUrl('/', id, '/comments'),
	GET_IMAGE: (image: string) => createBaseUrl('/images/', image),
	GET_POST_COMMENTS_COUNT: (id: TPost['_id']) =>
		createApiUrl('/', id, '/comments-count'),
	UPDATE_COMMENT: (postId: TPost['_id'], commentId: TComment['_id']) =>
		createApiUrl('/', postId, '/comments', commentId),
	DELETE_COMMENT: (id: TComment['_id']) => createApiUrl('/', id),
};
