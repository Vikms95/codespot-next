export const parseEditorData = (content: any, editor: any) => {
	const { targetElm } = editor;
	const { name } = targetElm;

	return {
		target: {
			name,
			value: content,
		},
	};
};
