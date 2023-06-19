import { MS_PER_DAY, MS_PER_WEEK } from '@/constants';
import { TPost } from '@/types';
import { assert, describe, expect, it, SpyInstance } from 'vitest';
import { createFormData } from './createFormData';
import { findByID } from './findbyID';
import { formatError } from './formatError';
import { getFormattedDate } from './getFormattedDate';
import { getFromStorage } from './getFromStorage';
import { getRelativeCurrentDate } from './getRelativeCurrentDate';
import { setToStorage } from './setToStorage';

// Mock data
const form = {
	title: 'title',
	text: 'text',
	isPublic: true,
	user: { _id: 'id', username: 'user' },
	image: 'image',
};
const { image, title, text, isPublic, user } = form;

const posts = [
	{ _id: '1', title: 'one' },
	{ _id: '2', title: 'two' },
	{ _id: '3', title: 'three' },
];

global.localStorage = {
	length: 0,
	state: {
		'access-token': 'superHashedString',
	},
	setItem(key, item) {
		this.state[key] = item;
	},
	getItem(key) {
		return this.state[key];
	},
	clear() {},
	key(index: number) {
		return index.toString();
	},
	removeItem() {},
};

describe('createFormData', () => {
	it('creates form data of a post', () => {
		const mockFormData = new FormData();

		mockFormData.append('image', image || '');
		mockFormData.append('title', title);
		mockFormData.append('text', text);
		mockFormData.append('isPublic', isPublic as any as string);
		mockFormData.append('user', user as any as string);

		const formData = createFormData(form);
		assert.deepEqual(mockFormData, formData);
	});
});

describe('getFormattedDate', () => {
	it('returns the passed in formatted date', () => {
		const timestamp = getFormattedDate(new Date(1687001481870));
		expect(timestamp).toEqual('June 17, 2023');
	});
});

// TODO this will fail on certain hours of the day, so ignore if fails
describe('getRelativeCurrentDate', () => {
	//  vi.setSystemTime(date)
	it('returns the correct days', () => {
		const diff = new Date(new Date().getTime() - MS_PER_DAY * 3);
		const timestamp = getFormattedDate(diff);
		const relativeDate = getRelativeCurrentDate(timestamp);

		expect(relativeDate).toBe('3 days ago');
	});

	it('returns the correct weeks', () => {
		const diff = new Date(new Date().getTime() - MS_PER_WEEK * 2);
		const timestamp = getFormattedDate(diff);
		const relativeDate = getRelativeCurrentDate(timestamp);

		expect(relativeDate).toBe('2 weeks ago');
	});
});

describe('formatError', () => {
	it('formats error', () => {
		const err = new Error('test error');
		const formattedErr = formatError(err);
		expect(formattedErr).toBe('test error');
	});
});

describe('findByID', () => {
	it('finds correct element within array', () => {
		const post = findByID(posts as TPost[], '1');
		expect(post).toBe(posts[0]);
	});
});

describe('getFromStorage', () => {
	it('invokes get item from local storage', () => {
		const getItem = vi.spyOn(global.localStorage, 'getItem');
		getFromStorage('1');

		expect(getItem).toHaveBeenCalled();
	});
	it('returns the right value from local storage', () => {
		global.localStorage.setItem('1', JSON.stringify(posts[0]));
		const post = getFromStorage('1');

		expect(post).toEqual(posts[0]);
	});
});

describe('setToStorage', () => {
	it('sets the right value to storage', () => {
		setToStorage('1', posts[0]);
		const post = global.localStorage.getItem('1');
		if (!post) return;

		const parsedPost = JSON.parse(post);
		expect(parsedPost).toEqual(posts[0]);
	});
});
