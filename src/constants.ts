import { TComment, TPost, TUser } from './types';

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

const BASE_ENDPOINT = 'https://blog-api-backend.onrender.com/api';

const makeUrl = <T extends string>(path: T): `${typeof BASE_ENDPOINT}${T}` =>
	`${BASE_ENDPOINT}${path}` as any;

type UserPostUrl = `${typeof BASE_ENDPOINT}/${string}/posts`;
type PostCommentUrl = `${typeof BASE_ENDPOINT}/${string}/comments`;
type PostCommentsCountUrl = `${typeof BASE_ENDPOINT}/${string}/comments-count`;
type UpdateCommentByPostUrl =
	`${typeof BASE_ENDPOINT}/${string}/comments/${string}`;
type DeleteCommentUrl = `${typeof BASE_ENDPOINT}/${string}`;

export const ENDPOINTS = {
	USER: makeUrl('/user'),
	SESSION: makeUrl('/session'),
	POSTS: makeUrl('/posts'),
	SINGLE_POST: makeUrl('/post'),
	COMMENT: makeUrl('/comment'),
	FLAG_ALL_COMMENTS: makeUrl('/comments'),
	USER_POSTS: (id: TUser['_id']): UserPostUrl =>
		`${BASE_ENDPOINT}/${id}/posts` as UserPostUrl,
	POST_COMMENTS: (id: TPost['_id']): PostCommentUrl =>
		`${BASE_ENDPOINT}/${id}/comments` as PostCommentUrl,
	POST_COMMENTS_COUNT: (id: TPost['_id']): PostCommentsCountUrl =>
		`${BASE_ENDPOINT}/${id}/comments-count` as PostCommentsCountUrl,
	UPDATE_COMMENT_BY_POST: (
		postId: TPost['_id'],
		commentId: TComment['_id'],
	): UpdateCommentByPostUrl =>
		`${BASE_ENDPOINT}/${postId}/comments/${commentId}` as UpdateCommentByPostUrl,
	DELETE_COMMENT: (id: TComment['_id']): DeleteCommentUrl =>
		`${BASE_ENDPOINT}/${id}` as DeleteCommentUrl,
};
