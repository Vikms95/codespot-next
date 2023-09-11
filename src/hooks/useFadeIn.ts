import React, { useState, useEffect } from 'react';

export function useFadeIn() {
	const [isActive, setIsActive] = useState<boolean>(false);

	useEffect(() => {
		setTimeout(() => setIsActive(true), 0);
		return () => setIsActive(false);
	});

	return isActive;
}
