import { Separator } from '@/components/ui/separator';
import { SetState } from '@/types';
import { MdClose } from 'react-icons/md';
import { useEffect } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

export function MobileNavbar({
	children,
	setIsMobileNavbar,
}: {
	children: JSX.Element[];
	setIsMobileNavbar: SetState<boolean>;
}) {
	useEffect(() => {
		const main = document.querySelector('.main-content') as HTMLElement;

		if (main) {
			main.style.display = 'none';
		}

		return () => {
			if (main) main.style.display = 'block';
		};
	}, []);

	return (
		<NavigationMenu.Root className='m-7  bg-white z-50 top-0 left-0 right-0 bottom-0 absolute'>
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<MdClose
						onClick={() => setIsMobileNavbar(false)}
						className='flex hover:cursor-pointer mb-5 hover:text-main-orange'
					/>
				</NavigationMenu.Item>

				<Separator className='mb-6' />

				{children.map(child => {
					return <li className='mb-6'>{child}</li>;
				})}
			</NavigationMenu.List>
		</NavigationMenu.Root>
	);
}
