import React from 'react';
import { Navbar } from './Navbar';
import { logoutUser } from '../../utils/logoutUser';
import { FaBook, FaTable, FaDoorOpen } from 'react-icons/fa';
import { StyledLink, NavItem, LinkText } from './_styles';

export function NavbarWithUser() {
	return (
		<Navbar>
			<StyledLink href='/dashboard'>
				<NavItem>
					<FaTable />
					<LinkText> Dashboard </LinkText>
				</NavItem>
			</StyledLink>

			<StyledLink href='/create'>
				<NavItem>
					<FaBook />
					<LinkText> New post </LinkText>
				</NavItem>
			</StyledLink>

			<StyledLink href='/' onClick={logoutUser}>
				<NavItem>
					<FaDoorOpen />
					<LinkText> Logout </LinkText>
				</NavItem>
			</StyledLink>
		</Navbar>
	);
}
