import { TUser } from '@/types';

type TFormData = {
	title: string;
	text: string;
	isPublic: boolean;
	user: TUser;
	image: string;
};
export const createFormData = ({
	title,
	text,
	isPublic,
	user,
	image,
}: TFormData) => {
	const formData = new FormData();

	formData.append('image', image || '');
	formData.append('title', title);
	formData.append('text', text);
	formData.append('isPublic', isPublic as any as string);
	formData.append('user', user as any as string);

	return formData;
};
