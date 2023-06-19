/* eslint-disable react/prop-types */
import { TChildren, TComment, TSetter } from '@/types';
import React, {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
} from 'react';

export type TCommentContext = {
	comments: TComment[];
	setComments: TSetter<TComment[]>;
};
const context: TCommentContext = { comments: [], setComments: () => {} };

const CommentsContext = createContext(context);

type Provider = { value: TCommentContext; children: TChildren };

const CommentsContextProvider = ({ value, children }: Provider) => {
	return (
		<CommentsContext.Provider value={value}>
			{children}
		</CommentsContext.Provider>
	);
};

const useCommentsContext = () => {
	return useContext(CommentsContext);
};

export { useCommentsContext, CommentsContextProvider };
