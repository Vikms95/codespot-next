import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
	beforeEach(() =>
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		)
	);
	it('should render the app', () => {
		const button = screen.getByText(/CODESPOT/i);
		expect(button).toBeInTheDocument();
	});
	it('should redirect to Login component if no user is logged in', () => {
		expect(screen.getByTestId('login-button')).toBeInTheDocument();
	});
	it('should redirect to register when clicking `Register`', () => {
		const button = screen.getByTestId('register');
		fireEvent.click(button);
		expect(screen.getByTestId('register-button')).toBeInTheDocument();
	});
	it('should redirect to login when clicking `Login`', () => {
		const button = screen.getByTestId('login');
		fireEvent.click(button);
		expect(screen.getByTestId('login-button')).toBeInTheDocument();
	});
	it('should show 404 page when landing on a bad page', () => {
		render(
			<MemoryRouter initialEntries={['/badroute']}>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByTestId('404-message')).toBeInTheDocument();
	});
	it('should show unauthorized access page when accesing dashboard while not logged', () => {
		render(
			<MemoryRouter initialEntries={['/dashboard']}>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByTestId('unauthorized-message')).toBeInTheDocument();
	});
});
