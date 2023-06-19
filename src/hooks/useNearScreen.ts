import React, { useState, useEffect, useRef, Ref, RefObject } from 'react';

type Args = { distance: string; externalRef?: RefObject<HTMLElement> };

export function useNearScreen(
	{ distance, externalRef }: Args = { distance: '100px' }
) {
	const [isNearScreen, setIsNearScreen] = useState(false);
	const fromRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const element = externalRef ? externalRef.current : fromRef.current;

		const onChange: IntersectionObserverCallback = (entries, observer) => {
			const element = entries[0];

			if (element.isIntersecting) {
				setIsNearScreen(true);
				observer.unobserve(element.target);
			}
		};

		const observer = new IntersectionObserver(onChange, {
			rootMargin: distance,
		});

		if (element instanceof HTMLElement) {
			observer.observe(element);
		}

		return () => observer.disconnect();
	});

	return { isNearScreen, fromRef };
}
