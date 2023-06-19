import React from 'react';
import { useNearScreen } from '../../hooks/useNearScreen';
import { StyledPostPreview } from './_styles';
import { TChildren, TSetter, TUser } from '@/types';

type Props = {
	id: string;
	user: TUser;
	title: string;
	text: string;
	image: string;
	timestamp: string;
	setIsModalActive: TSetter<boolean>;
	setLastClickedPost: TSetter<string>;
} & TChildren;

const PostPreviewWithButtons = React.lazy(
	() => import('./PostPreviewWithButtons')
);

export function LazyPostPreviewWithButtons(props: Props) {
	const { isNearScreen, fromRef } = useNearScreen({ distance: '200px' });
	return (
		<StyledPostPreview ref={fromRef}>
			{isNearScreen ? (
				<PostPreviewWithButtons {...props}></PostPreviewWithButtons>
			) : null}
		</StyledPostPreview>
	);
}
