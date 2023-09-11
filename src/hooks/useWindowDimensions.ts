'use client';
import { useEffect, useState } from 'react';
import { getWindowDimensions } from '../utils/getWindowDimensions';

export function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const isMobileView = windowDimensions.width <= 640;

	return { windowDimensions, isMobileView };
}
