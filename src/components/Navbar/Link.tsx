import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
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
				<NavigationMenu.Link active={isActive}>
					<NavbarText text={text} isActive={isActive} />
				</NavigationMenu.Link>
			</NextLink>
		</NavigationMenu.Item>
	);
}
