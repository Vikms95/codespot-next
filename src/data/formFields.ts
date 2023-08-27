import { z } from 'zod';

export const loginSchema = z.object({
	username: z
		.string()
		.min(1, { message: 'Username must be at least 1 character.' }),
	password: z
		.string()
		.min(4, { message: 'Password must be at least 5 characters.' }),
});

// https://github.com/colinhacks/zod/issues/2284
// https://stackoverflow.com/questions/73695535/how-to-check-confirm-password-with-zod
export const registerSchema = z
	.object({
		username: z
			.string()
			.min(1, { message: 'Username must be at least 1 character.' }),
		password: z
			.string()
			.min(4, { message: 'Password must be at least 5 characters.' }),
		password2: z
			.string()
			.min(4, { message: 'Password must be at least 5 characters.' }),
	})
	.superRefine(data => data.password !== data.password2);

export const postSchema = z.object({
	title: z
		.string()
		.min(5, { message: 'Post should have a title with 5 characters or more.' }),
	text: z
		.string()
		.min(30, { message: 'Post should be 30 characters or more.' }),
	isPublic: z.boolean(),
	image: z.string().min(0),
});

export const commentSchema = z.object({ text: z.string() });

export const loginFields = {
	username: '',
	password: '',
};

export const registerFields = {
	username: '',
	password: '',
	password2: '',
};

export const postFields = {
	title: '',
	text: '',
	isPublic: false,
	image: '',
};

export const commentFields = {
	text: '',
};
