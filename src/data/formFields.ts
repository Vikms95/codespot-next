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

const postFields = {
	title: '',
	text: '',
	isPublic: false,
	image: '',
	timestamp: '',
};

const commentFields = {
	text: '',
};

export { postFields, commentFields };
