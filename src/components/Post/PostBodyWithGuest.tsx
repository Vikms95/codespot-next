import React from 'react';
import { PostBody } from './PostBody';
import Link from 'next/link';
import { LoginLinkText } from './_styles';

export function PostBodyWithGuest() {
	return (
		<PostBody>
			<LoginLinkText>
				<span>Want to leave your comment?</span>{' '}
				<Link href='/login'>Login</Link>
			</LoginLinkText>
		</PostBody>
	);
}
