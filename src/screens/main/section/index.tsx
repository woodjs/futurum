import { cn } from '@/shared/lib/utils';
import { ReactNode } from 'react';

export default function Section({
	children,
	Title,
	className,
}: {
	children: ReactNode;
	Title?: ReactNode;
	className?: string;
}) {
	return (
		<div className={cn('flex flex-col gap-[42px] mb-[64px]', className)}>
			{Title && <div className="text-center lg:text-left">{Title}</div>}
			{children}
		</div>
	);
}
