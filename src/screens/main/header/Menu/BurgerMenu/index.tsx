import { cn } from '@/shared/lib/utils';

export default function BurgerMenu({
	items,
	isOpen,
}: {
	items: [{ id: number; name: string }];
	isOpen: boolean;
}) {
	return (
		<div
			className={cn(
				'w-full sticky top-[52px] left-0 bg-primary z-50 h-[100svh] overflow-y-auto',
				isOpen ? 'block' : 'hidden'
			)}
		>
			<nav className="w-full">
				{items.map((item) => (
					<a
						key={item.id}
						href="#"
						className="text-primary-foreground font-[600] border-b border-gray2 block py-[12px] text-center"
					>
						{item.name}
					</a>
				))}
			</nav>
		</div>
	);
}
