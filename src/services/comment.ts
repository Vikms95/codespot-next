import { TComment } from '@/types';
import {
	userCreateOptions,
	deleteOptions,
	getOptions,
	rootURL,
} from '../data/requestParams';
import { findByID } from '../utils/findbyID';

const getCommentsCount = async (commentID: string) => {
	if (!commentID) return;

	try {
		const response = await fetch(
			rootURL + `/api/${commentID}/comments-count`,
			getOptions
		);

		const data = await response.json();
		return data.count;
	} catch (err: any) {
		return new Error(err);
	}
};

const getComments = async (postID: string) => {
	if (!postID) return;
	try {
		const response = await fetch(
			rootURL + `/api/${postID}/comments`,
			getOptions
		);

		const data = await response.json();

		return data.comments;
	} catch (err: any) {
		return new Error(err);
	}
};

const createComment = async (
	text: string,
	postid: string,
	userid: string,
	parentid: string
) => {
	if (!text || !postid || !userid) return;
	// Change to getCurrentRelativeName
	const timestamp = new Date();

	// We check if the comment has a parentid and attach it to the object,
	// otherwise give the null value to say this is a root comment
	const parent = parentid || null;

	try {
		const response = await fetch(
			rootURL + '/api/comment',
			userCreateOptions('POST', { text, postid, userid, timestamp, parent })
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
};

const updateComment = async (
	text: string,
	postid: string,
	userid: string,
	commentid: string,
	comments: string,
	isDeletedWithChildren?: boolean
) => {
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
			rootURL + `/api/${postid}/comments/${commentid}`,
			userCreateOptions('PUT', {
				text,
				postid,
				userid,
				timestamp,
				parent,
				isDeletedWithChildren,
			})
		);

		const { comment, username } = await response.json();

		comment.user = { _id: userid, username };

		return comment;
	} catch (err: any) {
		return new Error(err);
	}
};

const flagComment = async (comment: TComment) => {
	if (!comment) return;

	try {
		const response = await fetch(
			rootURL + '/api/comments/' + comment._id,
			userCreateOptions('PUT', comment)
		);
		const data = await response.json();

		return data;
	} catch (err: any) {
		return new Error(err);
	}
};

const deleteComment = async (commentid: string) => {
	if (!commentid) return;

	try {
		const response = await fetch(rootURL + '/api/' + commentid, deleteOptions);

		return response;
	} catch (err: any) {
		return new Error(err);
	}
};

export {
	createComment,
	deleteComment,
	flagComment,
	getComments,
	getCommentsCount,
	updateComment,
};
