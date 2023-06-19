import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { verifyUser } from '../services/user';
import useSWR from 'swr';
/**
 * Hook used everytime we want to check for validity of the JWT token
 * before entering a route or to have that user id available in the component
 * outside of the protected routes. It won't be used for Post since that would
 * mean making a JWT verification for each Post rendered
 */
export function useAuth() {
	const { user, setUser } = useAuthContext();
	const {
		data,
		isLoading: loading,
		error,
	} = useSWR('/api/session', () => verifyUser());

	useEffect(() => setUser(data), [data]);

	return { user, loading, error };
}
