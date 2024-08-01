'use client';

import { useState } from 'react';
import styles from './BurgerButton.module.css';
import { cn } from '@/shared/lib/utils';

export default function BurgerButton() {
	// add animation and state click isOpen
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			onClick={() => setIsOpen(!isOpen)}
			className={cn(
				'relative flex flex-col cursor-pointer w-[32px]',
				isOpen && styles.active
			)}
		>
			{/* <div
				className={`w-8 h-1 bg-white rounded-full transition duration-300 absolute left-0 top-[-10px] ${
					isOpen ? 'rotate-45 !top-0' : ''
				}`}
			/>
			<div
				className={`w-8 h-1 bg-white rounded-full ${isOpen ? 'opacity-0' : ''}`}
			/>
			<div
				className={`w-8 h-1 bg-white rounded-full transition duration-300 absolute left-0 top-[10px] ${
					isOpen ? '-rotate-45 !top-0' : ''
				}`}
			/> */}
			<span className={styles.lines}></span>
		</div>
	);
}
