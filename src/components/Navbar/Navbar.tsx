import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { useAuth } from '@hooks/useAuth';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { MobileNavbar } from './MobileNavbar';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Link } from './Link';

type Props = { children: JSX.Element[] };

export function Navbar({ children }: Props) {
	const [isMobileNavbar, setIsMobileNavbar] = useState(false);
	const { isMobileView } = useWindowDimensions();

	useAuth();

	return (
		<NavigationMenu.Root
			data-testid='navigation-bar'
			className='mx-auto flex w-10/12 flex-1 justify-start bg-white sm:my-6 lg:my-0'
		>
			{isMobileView ? (
				isMobileNavbar ? (
					<MobileNavbar
						children={children}
						setIsMobileNavbar={setIsMobileNavbar}
					/>
				) : (
					<FaBars
						onClick={() => setIsMobileNavbar(true)}
						className='text-2xl hover:cursor-pointer'
					/>
				)
			) : (
				<NavigationMenu.List className='my-5 flex list-none flex-row gap-x-7'>
					<Link href='/' testid='home-button' text='Home' />
					{children}
				</NavigationMenu.List>
			)}
		</NavigationMenu.Root>
	);
}
