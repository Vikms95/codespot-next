import { TComment, TUser } from '@/types';
import {
	deleteOptions,
	getOptions,
	rootURL,
	userCreateOptions,
} from '../data/requestParams';
import { findByID } from '../utils/findbyID';

// @Vikms95 Bad design, refactor this
export async function getCommentsCount(commentID: string) {
	if (!commentID) return;

	try {
		const response = await fetch(
			rootURL + `/api/${commentID}/comments-count`,
			getOptions,
		);

		const data = await response.json();
		return data.count;
	} catch (err: any) {
		return new Error(err);
	}
}

export async function getComments(url: string) {
	try {
		const response = await fetch(url, getOptions);

		const data = await response.json();

		return data.comments;
	} catch (err: any) {
		return new Error(err);
	}
}

export async function createComment(
	url: string,
	text: string,
	postid: string,
	userid: TUser['_id'],
	parentid: string,
) {
	if (!text || !postid || !userid || !parentid) return;
	// Change to getCurrentRelativeName
	const timestamp = new Date();

	// We check if the comment has a parentid and attach it to the object,
	// otherwise give the null value to say this is a root comment
	const parent = parentid || null;

	try {
		const response = await fetch(
			rootURL + url,
			userCreateOptions('POST', { text, postid, userid, timestamp, parent }),
		);

		const { comment, username } = await response.json();

		// We manually insert the user id and the username since the created database object
		// will only contain the user id, thus not letting us have the user name available
		// without the join operation
		comment.user = { _id: userid, username };

		return comment;
	} catch (err: any) {
		return new Error(err);
	}
}

export async function updateComment(
	url: string,
	text: string,
	postid: string,
	userid: string,
	commentid: string,
	comments: TComment[],
	isDeletedWithChildren?: boolean,
) {
	const commentToCheck = findByID(comments, commentid)!;

	if (
		!text ||
		!postid ||
		!userid ||
		!commentid ||
		!comments ||
		typeof commentToCheck.isDeletedWithChildren === 'undefined'
	) {
		return;
	}

	const timestamp = new Date();
	const parent = commentToCheck.parent;

	try {
		const response = await fetch(
			rootURL + url,
			userCreateOptions('PUT', {
				text,
				postid,
				userid,
				timestamp,
				parent,
				isDeletedWithChildren,
			}),
		);

		const { comment, username } = await response.json();

		comment.user = { _id: userid, username };

		return comment;
	} catch (err: any) {
		return new Error(err);
	}
}

export async function flagComment(comment: TComment) {
	if (!comment) return;

	try {
		const response = await fetch(
			rootURL + '/api/comments/' + comment._id,
			userCreateOptions('PUT', comment),
		);
		const data = await response.json();

		return data;
	} catch (err: any) {
		return new Error(err);
	}
}

export async function deleteComment(commentid: string) {
	if (!commentid) return;

	try {
		const response = await fetch(rootURL + '/api/' + commentid, deleteOptions);

		return response;
	} catch (err: any) {
		return new Error(err);
	}
}
