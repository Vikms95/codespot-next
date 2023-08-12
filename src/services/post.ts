import axios from 'axios';
import { getFormattedDate } from '../utils/getFormattedDate';
import { deleteOptions, getOptions, rootURL } from '../data/requestParams';
import { TPost, TUser } from '@/types';
import { createFormData } from '@/utils/createFormData';

const getPosts = async () => {
	try {
		const response = await fetch(rootURL + '/api/posts', getOptions);

		const data = await response.json();

		return data;
	} catch (err: any) {
		return new Error(err);
	}
};

const getUserPosts = async (
	userid: string
): Promise<TPost[] | Error | undefined> => {
	if (!userid) return;

	try {
		const response = await fetch(rootURL + `/api/${userid}/posts`, getOptions);

		const data = await response.json();

		return data;
	} catch (err: any) {
		return new Error(err);
	}
};

const getImage = async (url: string) => {
	try {
		const data = await fetch(rootURL + url);

		return data;
	} catch (err: any) {
		return new Error(err);
	}
};

const createPost = async (
	user: string,
	title: string,
	text: string,
	isPublic: boolean,
	image: string
) => {
	const formDataRequest = createFormData({
		title,
		text,
		isPublic,
		user,
		image,
	});
	const timestamp = getFormattedDate();
	formDataRequest.append('timestamp', timestamp);

	try {
		const { data } = await axios.post(
			rootURL + '/api/post',
			formDataRequest,
			{}
		);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const updatePost = async (
	user: TUser,
	title: string,
	text: string,
	isPublic: boolean,
	image: string,
	postToUpdate: string,
	formData: Record<string, any>
) => {
	const formDataRequest = createFormData({
		title,
		text,
		isPublic,
		user,
		image,
	});

	formDataRequest.append('formerTimeStamp', formData.timestamp);

	try {
		const data = await axios.put(
			rootURL + '/api/posts/' + postToUpdate,
			formDataRequest,
			{}
		);

		return data;
	} catch (err: any) {
		console.warn('data', err);
		return new Error(err);
	}
};

const deletePost = async (postid: string) => {
	if (!postid) return;

	try {
		const response = await fetch(
			rootURL + '/api/posts/' + postid,
			deleteOptions
		);
		const data = await response.json();

		return data;
	} catch (err: any) {
		return new Error(err);
	}
};

export { getPosts, getUserPosts, createPost, deletePost, getImage, updatePost };
