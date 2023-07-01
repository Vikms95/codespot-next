/* eslint-disable react/prop-types */
import React from 'react';
import { PostsLayout } from '../../layouts';
import { TGetPreviewProps, TPost } from '@types';
import { LazyPostPreviewWithButtons as PostPreviewWithButtons } from '../PostPreview';

type Props = { posts?: TPost[]; getPreviewProps?: TGetPreviewProps };

export function DashboardPublicPosts({ posts, getPreviewProps }: Props) {
	return (
		<PostsLayout title='Published posts' section='dashboard'>
			{posts?.map(
				post =>
					post.public && <PostPreviewWithButtons {...getPreviewProps!(post)} />
			)}
		</PostsLayout>
	);
}
