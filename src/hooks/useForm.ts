import { useState } from 'react';

export const useForm = (
	formFields: Record<string, Record<string, any> | any>
) => {
	const [formData, setFormData] = useState(formFields);

	const handleChange = (e: Event) => {
		const event = e.target as HTMLTextAreaElement;

		setFormData(prev => ({
			...prev,
			[event.name]: event.value,
		}));
	};

	const handleBlur = (e: Event) => {
		const event = e.target as HTMLTextAreaElement;
		const field = event.name;

		setFormData(prev => ({
			...prev,
			touched: { ...prev.touched, [field]: true },
		}));
	};

	return { formData, setFormData, handleChange, handleBlur };
};
