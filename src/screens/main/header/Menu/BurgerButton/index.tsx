'use client';

import styles from './BurgerButton.module.css';
import { cn } from '@/shared/lib/utils';

export default function BurgerButton({
	isOpen,
	onClick,
}: {
	onClick: () => void;
	isOpen: boolean;
}) {
	return (
		<div
			onClick={onClick}
			className={cn(
				'relative flex flex-col cursor-pointer w-[32px]',
				isOpen && styles.active
			)}
		>
			<span className={styles.lines}></span>
		</div>
	);
}
