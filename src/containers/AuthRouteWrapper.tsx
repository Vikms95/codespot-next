import React from 'react';
import { Outlet } from 'react-router-dom';
import { Unauthorized } from '../components/Unauthorized/Unauthorized';
import { useAuth } from '../hooks/useAuth';

/**
 * Component to wrap any component that is rendered after a protected route.
 * It will call the useAuth hook which will verify the user and return its id.
 * Then it does render the children components, otherwise it runs the Unauthorized component.
 */
export function AuthRouteWrapper() {
	const { user, error } = useAuth();

	return user ? <Outlet /> : <Unauthorized error={error!} />;
}
