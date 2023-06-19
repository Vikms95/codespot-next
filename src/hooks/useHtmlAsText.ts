import { useEffect, useRef } from 'react';

export function useHtmlAsText(text: string) {
	const textRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (textRef.current) {
			textRef.current.innerHTML = text;
		}
	}, [text]);
	return textRef;
}
