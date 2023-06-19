import React from 'react';

import errorImage from '../../assets/error-404-image.webp';
import { useFadeIn } from '../../hooks/useFadeIn';
import { ErrorContainer, ErrorImage } from './_styles';

export function Error() {
	const isActive = useFadeIn();

	return (
		<ErrorContainer isActive={isActive}>
			<h1>It seems like you are lost.</h1>
			<h2>
				Let us guide you by bringing you to our<a href='/'> Home</a>
			</h2>
			<ErrorImage src={errorImage} />
		</ErrorContainer>
	);
}
