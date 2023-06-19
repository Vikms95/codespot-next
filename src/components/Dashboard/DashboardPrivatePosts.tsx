/* eslint-disable react/prop-types */
import React from 'react';
import { PostsLayout } from '../../layouts';
import { LazyPostPreviewWithButtons as PostPreviewWithButtons } from '../PostPreview';
import { TGetPreviewProps, TPost } from '../../types';

type Props = { posts?: TPost[]; getPreviewProps?: TGetPreviewProps };

export function DashboardPrivatePosts({ posts, getPreviewProps }: Props) {
	return (
		<PostsLayout title='Unpublished posts' section='dashboard'>
			{posts?.map(
				post =>
					!post.public && <PostPreviewWithButtons {...getPreviewProps!(post)} />
			)}
		</PostsLayout>
	);
}
