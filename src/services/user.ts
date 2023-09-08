import { userCreateOptions, rootURL } from '../data/requestParams';

const createUser = async (
	url: string,
	username: string,
	password: string,
	password2: string,
) => {
	if (!username || !password || !password2) return;

	try {
		const response = await fetch(
			rootURL + url,
			userCreateOptions('POST', { username, password, password2 }),
		);

		const data = await response.json();

		if (response.ok) {
			return data;
		}

		throw new Error(data.message);
	} catch (err: any) {
		console.error(err);
		throw new Error(err);
	}
};

const loginUser = async (url: string, username: string, password: string) => {
	if (!username || !password) return;

	console.log('Filter: ', { url, username, password });

	try {
		const response = await fetch(
			rootURL + url,
			userCreateOptions('POST', { username, password }),
		);

		const data = await response.json();

		if (response.ok) {
			return data;
		}

		throw new Error(data.message);
	} catch (err: any) {
		console.error(err);
		throw new Error(err);
	}
};

const verifyUser = async (url: string) => {
	try {
		const response = await fetch(rootURL + url, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		});

		const data = await response.json();

		if (response.ok) {
			return data.user;
		} else {
			throw new Error(data.message);
		}
	} catch (err: any) {
		console.error(err);
		return Promise.reject(err);
	}
};

export { createUser, loginUser, verifyUser };
