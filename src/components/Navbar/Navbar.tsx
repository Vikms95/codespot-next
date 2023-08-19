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
			className='bg-white flex flex-1 justify-start sm:mx-auto w-10/12 my-5'
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
						className='hover:cursor-pointer text-2xl'
					/>
				)
			) : (
				<NavigationMenu.List className='list-none flex flex-row gap-x-7 my-5'>
					<Link href='/' testid='home-button' text='Home' />
					{children}
				</NavigationMenu.List>
			)}
		</NavigationMenu.Root>
	);
}
