export const parseEditorData = (
	content: string,
	editor: { targetElm: { name: string } },
) => {
	const name = editor.targetElm.name;
	console.warn('FILTER', editor.targetElm);

	return {
		target: {
			name,
			value: content,
		},
	};
};
