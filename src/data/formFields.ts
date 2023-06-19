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

const loginFields = {
	username: '',
	password: '',

	touched: {
		username: false,
		password: false,
	},
};

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

export { registerFields, loginFields, postFields, commentFields };
