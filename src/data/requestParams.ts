import { TMethod } from '@/types';

const rootURL = 'https://blog-api-backend.onrender.com';

const getOptions = {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
	},
};

const deleteOptions = {
	method: 'DELETE',
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
	},
};

const userCreateOptions = (
	method: TMethod,
	bodyObject: Record<string, any>
) => {
	return {
		method,
		body: JSON.stringify(bodyObject),
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
	};
};

const postCreateOptions = (
	method: TMethod,
	bodyObject: Record<string, any>
) => {
	return {
		method,
		body: JSON.stringify(bodyObject),
	};
};

export {
	getOptions,
	userCreateOptions,
	postCreateOptions,
	deleteOptions,
	rootURL,
};
