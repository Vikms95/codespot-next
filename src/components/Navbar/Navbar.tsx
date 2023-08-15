'use client';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { useAuth } from '@hooks/useAuth';
// import Link from 'next/link';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { MobileNavbar } from './MobileNavbar';
import { NavbarText } from './NavbarText';
import { Separator } from '../ui/separator';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Navigation } from 'lucide-react';
import { Link } from './Link';

type Props = { children: JSX.Element[] };

export function Navbar({ children }: Props) {
	const [isMobileNavbar, setIsMobileNavbar] = useState(false);
	const { width } = useWindowDimensions();

	useAuth();

	return (
		<>
			<NavigationMenu.Root
				data-testid='navigation-bar'
				className='bg-white flex'
			>
				{width > 640 && (
					<NavigationMenu.List className='group list-none flex flex-row justify-start w-full gap-x-7 mb-5'>
						<Link href='/' testid='home-button' text='Home' />
						{children}
					</NavigationMenu.List>
				)}

				{width <= 640 && !isMobileNavbar && (
					<FaBars
						onClick={() => setIsMobileNavbar(true)}
						className='flex hover:cursor-pointer text-2xl'
					/>
				)}
			</NavigationMenu.Root>

			{width <= 640 && isMobileNavbar && (
				<MobileNavbar
					children={children}
					setIsMobileNavbar={setIsMobileNavbar}
				/>
			)}
		</>
	);
}
