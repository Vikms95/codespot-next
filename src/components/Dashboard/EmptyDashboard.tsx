import React from 'react';
import emptyDashboardImage from '../../assets/empty-dashboard.webp';
import { useFadeIn } from '../../hooks/useFadeIn';
import { EmptyDashboardContainer, EmptyDashboardImage } from './_styles';

export function EmptyDashboard() {
	const isActive = useFadeIn();

	return (
		<EmptyDashboardContainer isActive={isActive}>
			<h1>We were looking for your ideas, but did not find them.</h1>
			<h2>Want to show us your first one? </h2>
			<h3>
				{' '}
				<a href='/create'> Create your first post </a>{' '}
			</h3>
			<EmptyDashboardImage src={emptyDashboardImage} />
		</EmptyDashboardContainer>
	);
}
