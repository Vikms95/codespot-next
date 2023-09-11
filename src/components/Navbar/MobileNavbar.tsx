import { Separator } from '@/components/ui/separator';
import { SetState } from '@/types';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { useEffect, useRef } from 'react';
import { MdClose } from 'react-icons/md';

type Props = {
	children: JSX.Element[];
	setIsMobileNavbar: SetState<boolean>;
};

export function MobileNavbar({ children, setIsMobileNavbar }: Props) {
	const mainContentRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		mainContentRef.current = document.querySelector(
			'.main-content'
		) as HTMLElement;

		if (mainContentRef.current) {
			mainContentRef.current.style.display = 'none';
		}

		return () => {
			if (mainContentRef.current)
				mainContentRef.current.style.display = 'block';
		};
	}, []);

	return (
		<NavigationMenu.Root className='m-7 bg-white z-50 absolute inset-0'>
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<MdClose
						onClick={() => setIsMobileNavbar(false)}
						className='flex hover:cursor-pointer mb-5 hover:text-main-orange'
					/>
				</NavigationMenu.Item>

				<Separator className='mb-6' />

				{children.map((child, index) => (
					<li key={index} className='mb-6'>
						{child}
					</li>
				))}
			</NavigationMenu.List>
		</NavigationMenu.Root>
	);
}
