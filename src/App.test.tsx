import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import RootLayout from './app/layout';
import Home from './app/page';
import * as postService from './services/post';
import { NextRouter, useRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { mockIntersectionObserver } from '../__mocks__/mockIntersectionObserver';
import { mockPostArray } from '../__mocks__/mockPostArray';

describe('RootLayout component', () => {
	setupTests();
	it('renders correctly', () => {
		expect(screen.getByRole('navigation')).toBeInTheDocument(); // Assuming the Navbar component is wrapped in a <nav> element
		expect(screen.getByRole('main')).toBeInTheDocument(); // Assuming the children components are wrapped in a <main> element
	});
});

describe('Routes', () => {
	setupTests();

	it('renders login page', async () => {
		const mockRouter: Partial<NextRouter> = {
			push: mockPush,
			prefetch: () => Promise.resolve(),
			reload: () => {},
			back: () => {},
			beforePopState: () => {},
			events: {
				on: () => {},
				off: () => {},
				emit: () => {},
			},
			isFallback: false,
			isReady: true,
		};

		jest.mocked(useRouter).mockReturnValue(mockRouter as NextRouter);

		const loginButton = screen.getByTestId('login-button');

		act(() => fireEvent.click(loginButton));

		expect(mockPush).toHaveBeenCalledWith(
			'/login',
			expect.objectContaining({ forceOptimisticNavigation: false })
		);
	});
});

function setupTests() {
	beforeEach(() =>
		act(() => {
			render(
				<RouterContext.Provider value={{ push: mockPush }}>
					<RootLayout>
						<Home
							setIsModalActive={jest.fn()}
							setLastClickedPostId={jest.fn()}
						/>
					</RootLayout>
				</RouterContext.Provider>
			);
			jest.clearAllMocks();
		})
	);

	afterEach(() => {
		jest.clearAllMocks();
	});
}

jest.mock('./services/post');
jest.mocked(postService).getPosts.mockImplementation(async () => mockPostArray);

let mockPush = jest.fn();
jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));

window.IntersectionObserver = jest
	.fn()
	.mockImplementation(mockIntersectionObserver);
