/* eslint react/prop-types: 0 */
import React from 'react';
import { useWindowDimensions } from '@hooks/useWindowDimensions';
import { FaHouseUser } from 'react-icons/fa';

import {
	InnerNav,
	NavArrow,
	NavItem,
	StyledLink,
	StyledNavbar,
	TitleText,
} from './_styles';
import { useAuth } from '@hooks/useAuth';

type Props = { children: JSX.Element[] };

export function Navbar({ children }: Props) {
	const { width } = useWindowDimensions();
	useAuth();
	return (
		<StyledNavbar>
			<InnerNav>
				<StyledLink href='/'>
					<NavItem>
						{width > 600 ? (
							<>
								<TitleText data-testid='title' role='button'>
									{' '}
									CODESPOT{' '}
								</TitleText>
								<NavArrow />
							</>
						) : (
							<FaHouseUser />
						)}
					</NavItem>
				</StyledLink>
				{children}
			</InnerNav>
		</StyledNavbar>
	);
}
