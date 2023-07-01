'use client';
import React from 'react';
import { useHtmlAsText } from '@hooks/useHtmlAsText';
import {
	PostDesc,
	PostTitle,
	PostTopRow,
	PostTopRowContainer,
} from './_styles';

type Props = {
	username: string;
	timestamp: string;
	title: string;
	text: string;
};

export function PostPreviewContent({
	username,
	timestamp,
	title,
	text,
}: Props) {
	const textRef = useHtmlAsText(text);

	return (
		<>
			<PostTopRowContainer>
				<PostTopRow>{username}</PostTopRow>
				<PostTopRow>{timestamp}</PostTopRow>
			</PostTopRowContainer>

			<PostTitle>{title}</PostTitle>
			<PostDesc ref={textRef}></PostDesc>
		</>
	);
}
