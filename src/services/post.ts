import axios from 'axios';
import { getFormattedDate } from '../utils/getFormattedDate';
import { deleteOptions, getOptions, rootURL } from '../data/requestParams';
import { TPost, TUser } from '@/types';
import { createFormData } from '@/utils/createFormData';

export async function getPosts(url: string) {
	try {
		const response = await fetch(url, getOptions);

		const data = await response.json();

		return data;
	} catch (err: any) {
		return new Error(err);
	}
}

export async function getUserPosts(url: string): Promise<TPost[]> {
	if (!url) throw new Error('Invalid URL');

	try {
		const response = await fetch(url, getOptions);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to fetch posts');
		}

		const data: TPost[] = await response.json();
		return data;
	} catch (err: any) {
		throw new Error(err.message || 'Unknown error occurred');
	}
}

export async function getImage(url: string) {
	try {
		const data = await fetch(rootURL + url);

		return data as Response;
	} catch (err: any) {
		return new Error(err);
	}
}

export async function createPost(
	url: string,
	user: TUser,
	title: string,
	text: string,
	isPublic: boolean,
	image: string,
) {
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
		const { data } = await axios.post(rootURL + url, formDataRequest, {});
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
}

export async function updatePost(
	url: string,
	user: TUser,
	title: string,
	text: string,
	isPublic: boolean,
	image: string,
	postToUpdate: string,
	formData: Record<string, any>,
) {
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
			rootURL + url + postToUpdate,
			formDataRequest,
			{},
		);

		return data;
	} catch (err: any) {
		console.warn('data', err);
		return new Error(err);
	}
}

// @Vikms95 TODO Use SWR here

export async function deletePost(postid: string) {
	if (!postid) return;

	try {
		const response = await fetch(
			rootURL + '/api/posts/' + postid,
			deleteOptions,
		);
		const data = await response.json();

		return data;
	} catch (err: any) {
		return new Error(err);
	}
}
