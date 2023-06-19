import { TComment } from '@/types';
import { useMemo } from 'react';

export const useDerivedComments = (comments: TComment[]) => {
	const commentByParentID = useMemo(() => {
		if (!comments) return [];

		const group: Record<string | 'null', any> = {};

		comments.forEach(comment => {
			const parent = comment.parent as string;

			if (group[comment.parent!] == null) {
				group[parent] = [];
			}

			// Here 'null' key is implicitly converted to string
			// https://stackoverflow.com/questions/9687866/is-null-a-valid-javascript-property-name
			group[parent].push(comment);
		});

		return group;
	}, [comments]);

	const getChildComments = (parentid: string) => {
		// @ts-expect-error
		return commentByParentID[parentid];
	};

	return {
		// @ts-expect-error
		rootComments: commentByParentID.null,
		getChildComments,
	};
};
