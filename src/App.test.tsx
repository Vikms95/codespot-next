import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useSWR from 'swr';
import RootLayout from './app/layout';
import Home from './app/page';
import { mockIntersectionObserver } from '../__mocks__/mockIntersectionObserver';
import { mockPostArray } from '../__mocks__/mockPostArray';

describe('RootLayout component', () => {
	testSetup();
	it('renders correctly', () => {
		expect(screen.getByRole('navigation')).toBeInTheDocument(); // Assuming the Navbar component is wrapped in a <nav> element
		expect(screen.getByRole('main')).toBeInTheDocument(); // Assuming the children components are wrapped in a <main> element
	});
});

describe('Routes', () => {
	testSetup();

	it('renders login page', () => {
		const loginButton = screen.getByTestId('login-button');
		act(() => {
			fireEvent.click(loginButton);
		});
		const loginForm = screen.queryByTestId('login-form');
		expect(loginForm).toBeInTheDocument();
	});
});

function testSetup() {
	beforeEach(() =>
		act(() => {
			render(
				<RootLayout>
					<Home setIsModalActive={jest.fn()} setLastClickedPostId={jest.fn()} />
				</RootLayout>
			);
		})
	);

	afterEach(() => {
		jest.clearAllMocks();
	});
}

jest.mock('swr'); // this will mock the entire `swr` module

// @ts-expect-error
useSWR.mockImplementation(() => {
	return {
		data: mockPostArray,
		error: undefined,
		isValidating: false,
		mutate: jest.fn(),
	};
});

window.IntersectionObserver = jest
	.fn()
	.mockImplementation(mockIntersectionObserver);
