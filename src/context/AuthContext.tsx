import { TSetter } from '@/types';
import { createContext, useContext, JSX } from 'react';

type Context = {
	user: string;
	setUser: TSetter<string>;
};

type Provider = { value: Context; children: JSX.Element[] | JSX.Element };

const context: Context = { user: '', setUser: () => {} };
const AuthContext = createContext(context);

const AuthContextProvider = ({ value, children }: Provider) => (
	<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
);

const useAuthContext = () => useContext(AuthContext);

export { AuthContextProvider, useAuthContext };
