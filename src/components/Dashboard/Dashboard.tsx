import React, { Dispatch, SetStateAction, useEffect } from 'react';
import useSWR from 'swr';
import { StyledDashboard } from './_styles';
import { EmptyDashboard } from './EmptyDashboard';
import { useAuthContext } from '../../context/AuthContext';
import { usePostsContext } from '../../context/PostsContext';
import { getUserPosts } from '../../services/post';
import { TPost } from '../../types';
import { addPropsToChildren } from '../../utils/addPropsToChildren';

type Props = {
	children: JSX.Element[];
	setIsModalActive: Dispatch<SetStateAction<boolean>>;
	setLastClickedPost: Dispatch<SetStateAction<string>>;
};

export function Dashboard({
	setLastClickedPost,
	setIsModalActive,
	children,
}: Props) {
	const { user } = useAuthContext();
	const { posts, setPosts } = usePostsContext();
	const { data } = useSWR(`/api/${user}/posts`, () => getUserPosts(user));

	const getPreviewProps = (post: TPost) => {
		return {
			key: post._id,
			id: post._id,
			user: post.user,
			title: post.title,
			text: post.text,
			image: post.image,
			timestamp: post.timestamp,
			isPublic: post.public,
			setIsModalActive,
			setLastClickedPost,
		};
	};

	useEffect(() => {
		setPosts(data?.reverse());
	}, [data]);

	const hasNoPost = () => posts?.length === 0;
	const hasPublicPost = () => posts?.some((post: TPost) => post.public);
	const hasPrivatePost = () => posts?.some((post: TPost) => !post.public);

	return (
		<StyledDashboard>
			{hasNoPost() ? (
				<EmptyDashboard />
			) : (
				<>
					{hasPublicPost() &&
						React.Children.toArray(
							addPropsToChildren(children[0], {
								posts,
								getPreviewProps,
							})
						)}

					{hasPrivatePost() &&
						React.Children.toArray(
							addPropsToChildren(children[1], {
								posts,
								getPreviewProps,
							})
						)}
				</>
			)}
		</StyledDashboard>
	);
}
