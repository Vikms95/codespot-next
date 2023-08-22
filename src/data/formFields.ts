import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const registerFields = {
	username: '',
	password: '',
	password2: '',

	touched: {
		username: false,
		password: false,
		password2: false,
	},
};

export const loginSchema = z.object({
	username: z
		.string()
		.min(1, { message: 'Username must be at least 1 character.' }),
	password: z
		.string()
		.min(4, { message: 'Password must be at least 4 characters.' }),
});

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

export { registerFields, postFields, commentFields };
