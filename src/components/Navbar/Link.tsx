import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavbarText } from './NavbarText';

type Props = {
	testid: string;
	href: string;
	text: string;
};

export function Link({ testid, href, text }: Props) {
	const path = usePathname();
	const isActive = path === href;

	return (
		<NavigationMenu.Item>
			<NextLink data-testid={testid} href={href}>
				<NavigationMenu.Link className='navbar-link' active={isActive}>
					<NavbarText text={text} />
				</NavigationMenu.Link>
			</NextLink>
		</NavigationMenu.Item>
	);
}
