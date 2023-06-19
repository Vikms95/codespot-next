type RegisterFields = {
	username: string;
	password: string;
	password2: string;
};
type LoginFields = {
	username: string;
	password: string;
};
type PostFields = {
	title: string;
	text: string;
};

type CommentFields = {
	text: string;
};

const registerVal = (fields: RegisterFields) => {
	return {
		username: fields.username.length === 0,
		password: fields.password.length <= 4,
		password2:
			fields.password2.length <= 4 || fields.password !== fields.password2,
	};
};

const loginVal = (fields: LoginFields) => {
	return {
		username: fields.username.length === 0,
		password: fields.password.length <= 4,
	};
};

const postVal = (fields: PostFields) => {
	return {
		title: fields.title.length < 5,
		text: fields.text.length < 30,
	};
};

const commentVal = (fields: CommentFields) => {
	return {
		text: fields.text.length === 0,
	};
};

export { registerVal, loginVal, postVal, commentVal };
