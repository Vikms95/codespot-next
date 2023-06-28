import React, {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
} from 'react';
import { TPost, TSetter } from '../types';

type Context = {
	posts: TPost[];
	setPosts: TSetter<TPost[]>;
	lastClickedPost: string;
	setLastClickedPost: TSetter<string>;
};

type Provider = { value: Context; children: JSX.Element[] | JSX.Element };

const context: Context = {
	posts: [],
	setPosts: () => {},
	lastClickedPost: '',
	setLastClickedPost: () => {},
};
const PostsContext = createContext(context);

const PostsContextProvider = ({ value, children }: Provider) => (
	<PostsContext.Provider value={value}>{children}</PostsContext.Provider>
);

const usePostsContext = () => useContext(PostsContext);

export { usePostsContext, PostsContextProvider };
