import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import RootLayout from './app/layout';
import Home from './app/page';
import * as postService from './services/post';
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

	it('renders login page', () => {
		const loginButton = screen.getByTestId('login-button');
		act(() => fireEvent.click(loginButton));

		const loginForm = screen.queryByTestId('login-form');
		expect(loginForm).toBeInTheDocument();
	});
});

function setupTests() {
	beforeEach(() =>
		act(() => {
			render(
				<RootLayout>
					<Home setIsModalActive={jest.fn()} setLastClickedPostId={jest.fn()} />
				</RootLayout>
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

window.IntersectionObserver = jest
	.fn()
	.mockImplementation(mockIntersectionObserver);
