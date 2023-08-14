export function NavbarText({ text }: { text: string }) {
	return (
		<span className='whitespace-nowrap text-sm text-black hover:text-main-orange'>
			{text}
		</span>
	);
}
