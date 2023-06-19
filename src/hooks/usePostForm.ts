import { useState } from 'react';

export const usePostForm = (editorRef, formFields) => {
	const [formData, setFormData] = useState<Record<string, any>>(formFields);

	const handleChange = (e: Event) => {
		const event = e.target as HTMLInputElement;

		setFormData(prevFormData => ({
			...prevFormData,
			[event.name]: event.value,
		}));
	};

	const handlePrivacyChange = () => {
		setFormData(prevFormData => ({
			...prevFormData,
			isPublic: !prevFormData.isPublic,
		}));
	};

	const handleImageChange = (e: Event) => {
		const element = e.target as HTMLInputElement;
		const fileList: FileList | any[] = element.files || [];

		if (fileList?.length) {
			setFormData(prevFormData => ({
				...prevFormData,
				image: fileList[0],
			}));
		}
	};

	const handleEditorChange = (content: any, editor: any) => {
		const editorContent = editorRef.current.getContent();
		setFormData(prevFormData => ({ ...prevFormData, text: editorContent }));
	};

	return {
		formData,
		setFormData,
		handleChange,
		handlePrivacyChange,
		handleImageChange,
		handleEditorChange,
	};
};
