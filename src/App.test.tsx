import { fireEvent, render, screen } from '@testing-library/react';
import RootLayout from './app/layout';
import { AuthContextProvider } from './context/AuthContext';

describe('RootLayout component', () => {
	it('renders correctly', () => {
		// const user = 'John';
		// const setUser = () => {};
		// render(<RootLayout />);
		// expect(screen.getByRole('navigation')).toBeInTheDocument(); // Assuming the Navbar component is wrapped in a <nav> element
		// expect(screen.getByRole('main')).toBeInTheDocument(); // Assuming the children components are wrapped in a <main> element
	});

	// it('renders NavbarWithUser component when user is truthy', () => {
	// 	// Set up the necessary state for the test
	// 	const user = { name: 'John' };
	// 	render(<RootLayout />);

	// 	// Check if the NavbarWithUser component is rendered
	// 	expect(screen.getByRole('navigation')).toHaveTextContent('Welcome, John');
	// });

	// it('renders NavbarWithGuest component when user is falsy', () => {
	// 	// Set up the necessary state for the test
	// 	render(<RootLayout />);

	// 	// Check if the NavbarWithGuest component is rendered
	// 	expect(screen.getByRole('navigation')).toHaveTextContent('Guest');
	// });
});
