import React, { useState, useEffect } from 'react';

export function useFadeIn() {
	const [isActive, setIsActive] = useState<boolean>(false);

	useEffect(() => {
		setIsActive(true);
		return () => setIsActive(false);
	});

	return isActive;
}
