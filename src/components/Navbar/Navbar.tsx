'use client';
import { useAuth } from '@hooks/useAuth';
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

type Props = { children: JSX.Element[] };

export function Navbar({ children }: Props) {
	const { width } = useWindowDimensions();
	useAuth();
	return (
		<StyledNavbar data-testid='navigation-bar'>
			<InnerNav>
				<StyledLink data-testid='home-button' href='/'>
					<NavItem>
						{width > 600 ? (
							<>
								<TitleText
									data-testid='title'
									aria-label='button'
									role='button'
								>
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
