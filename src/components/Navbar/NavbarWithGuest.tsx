import React from 'react';
import { Navbar } from './Navbar';
import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { StyledLink, NavItem, LinkText } from './_styles';

export function NavbarWithGuest() {
	return (
		<Navbar>
			<StyledLink data-testid='register-button' href='/register'>
				<NavItem>
					<FaUser />
					<LinkText> Register </LinkText>
				</NavItem>
			</StyledLink>

			<StyledLink data-testid='login-button' href='/login'>
				<NavItem>
					<FaSignInAlt />
					<LinkText> Login </LinkText>
				</NavItem>
			</StyledLink>
		</Navbar>
	);
}
