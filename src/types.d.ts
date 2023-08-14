import { Dispatch, SetStateAction } from 'react';

export type TPost = {
	_id: string;
	image: string;
	public: boolean;
	text: string;
	title: string;
	user: TUser;
	timestamp: string;
	isDeletedWithChildren: boolean;
};

export type TComment = {
	_id: string;
	isDeletedWithChildren: boolean;
	parent: string | null;
	post: string;
	text: string;
	timestamp: string;
	user: TUser;
};

export type TUser = {
	_id: string;
	username: string;
};

export type TPostFunctions = {
	setIsModalActive: Dispatch<SetStateAction<boolean>>;
	setLastClickedPost: Dispatch<SetStateAction<string>>;
};

export type TGetPreviewProps = (post: TPost) => TPost & TPostFunctions;

export type TFormFuncionality = 'reply' | 'edit';

export type TChildren = JSX.Element | JSX.Element[] | ReactElement<any, any>;

export type TSetter<T> = Dispatch<SetStateAction<T>>;

export type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type ImageSrc = {
	url: string;
};
