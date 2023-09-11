import clsx from 'clsx';

export function NavbarText({
	text,
	isActive,
}: {
	text: string;
	isActive?: boolean;
}) {
	return (
		<span
			className={clsx(
				'navbar-link whitespace-nowrap text-sm text-black hover:text-main-orange hover:cursor-pointer',
				isActive &&
					'text-main-orange before:absolute before:content-[""] before:top-7 before:h-[1.5px] before:bg-main-orange'
			)}
		>
			{text}
		</span>
	);
}
