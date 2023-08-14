import { Separator } from '@/components/ui/separator';
import { NavigationMenuItem } from '@/components/ui/navigation-menu';

export function MobileNavbar({ childs }: { childs: JSX.Element[] }) {
	return (
		<nav className='h-screen'>
			{childs.map(child => {
				return (
					<NavigationMenuItem className='list-none whitespace-nowrap text-sm text-black hover:text-main-orange'>
						{child}
						<Separator />
					</NavigationMenuItem>
				);
			})}
		</nav>
	);
}
