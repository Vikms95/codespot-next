import React, { useEffect, useState } from 'react';

export function useValidation(
	validator: (fields: Record<string, any>) => Record<string, any>,
	fields: Record<string, any>
) {
	if (!fields) return;

	const [errors, setErrors] = useState(() => validator(fields));

	useEffect(() => {
		setErrors(() => validator(fields));
	}, [fields]);

	const isFormValid = () => Object.keys(errors).some(field => errors[field]);

	const shouldMarkErr = (field: string) => {
		const hasError = errors[field];
		const shouldShow = fields.touched[field];
		return hasError ? shouldShow : false;
	};

	return { isFormValid, shouldMarkErr };
}
