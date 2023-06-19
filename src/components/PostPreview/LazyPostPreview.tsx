import React, { Dispatch, SetStateAction } from 'react';
import { useNearScreen } from '../../hooks/useNearScreen';
import { StyledPostPreview } from './_styles';
import { TChildren, TUser } from '@/types';

const PostPreview = React.lazy(() => import('./PostPreview'));

type Props = {
	id: string;
	user: TUser;
	title: string;
	text: string;
	image: string;
	timestamp: string;
	setIsModalActive: Dispatch<SetStateAction<boolean>>;
	setLastClickedPostId: Dispatch<SetStateAction<string>>;
} & TChildren;

export function LazyPostPreview(props: Props) {
	const { isNearScreen, fromRef } = useNearScreen({ distance: '200px' });
	return (
		<StyledPostPreview ref={fromRef}>
			{isNearScreen ? <PostPreview {...props}></PostPreview> : null}
		</StyledPostPreview>
	);
}
