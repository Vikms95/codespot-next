import { fireEvent, render, screen } from '@testing-library/react';
import Root from './app/layout';

describe('App', () => {
	beforeEach(() =>
		render(
			<Root>
				<div>dummy</div>
			</Root>
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
	// it('should show 404 page when landing on a bad page', () => {
	// 	render(<Root children={<div>hell</div>} />);
	// 	expect(screen.getByTestId('404-message')).toBeInTheDocument();
	// });
	// it('should show unauthorized access page when accesing dashboard while not logged', () => {
	// 	render(<Root children={<div>hell</div>} />);
	// 	expect(screen.getByTestId('unauthorized-message')).toBeInTheDocument();
	// });
});
