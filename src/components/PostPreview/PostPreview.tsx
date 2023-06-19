/* eslint-disable react/prop-types */
import React, { Dispatch, SetStateAction } from 'react';

import {
	PostBotRowContainer,
	PostContentContainer,
	PostImageContainer,
} from './_styles';
import { PostPreviewImage } from './PostPreviewImage';
import { PostPreviewContent } from './PostPreviewContent';
import { TChildren } from '@/types';
import { TUser } from '@/types';

type Props = {
	id: string;
	user: TUser;
	title: string;
	text: string;
	image: string;
	timestamp: string;
	setIsModalActive: Dispatch<SetStateAction<boolean>>;
	setLastClickedPostId: Dispatch<SetStateAction<string>>;
	children?: TChildren;
};

export default function PostPreview({
	id,
	user,
	title,
	text,
	image,
	timestamp,
	setIsModalActive,
	setLastClickedPostId,
	children,
}: Props) {
	return (
		<>
			<PostImageContainer>
				<PostPreviewImage image={image} id={id} />
			</PostImageContainer>

			<PostContentContainer>
				<PostPreviewContent
					text={text}
					title={title}
					username={user.username}
					timestamp={timestamp}
				/>
			</PostContentContainer>

			{children && (
				<PostBotRowContainer>
					{React.cloneElement(children, {
						id,
						setIsModalActive,
						setLastClickedPostId,
					})}
				</PostBotRowContainer>
			)}
		</>
	);
}
