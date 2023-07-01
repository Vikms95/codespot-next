/* eslint-disable react/prop-types */
import React from 'react';

import unauthorizedImage from '@assets/unauthorized-image.webp';
import { useFadeIn } from '@hooks/useFadeIn';
import { formatError } from '../../utils/formatError';
import { UnauthorizedContainer, UnauthorizedImage } from './_styles';

type Props = { error: Error };

export function Unauthorized({ error }: Props) {
	const isActive = useFadeIn();

	return (
		<UnauthorizedContainer isActive={isActive}>
			<h1>
				You are not allowed within our bubble because of the following error:
			</h1>
			<span style={{ color: 'red' }}>{error && formatError(error)}</span>
			<h2>Want to share your ideas? </h2>
			<h3>
				{' '}
				<a href='/register'>Register </a>
				<span> or </span> <a href='/login'>Login</a>{' '}
			</h3>
			<UnauthorizedImage src={unauthorizedImage} />
		</UnauthorizedContainer>
	);
}
