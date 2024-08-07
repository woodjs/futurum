import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';

interface IProps {
	Content?: React.ReactNode;
	Header: React.ReactNode;
	Footer: React.ReactNode;
	Image?: React.ReactNode;
	height?: 'h-[418px]' | 'h-[344px]';
	className?: string;
}

const Nftcard: FC<IProps> = ({
	Content,
	Header,
	Footer,
	Image,
	height = 'h-[344px]',
	className,
}) => {
	return (
		<div className={cn('w-[220px] relative ', className, height)}>
			<div className={'flex justify-center align-middle'}>{Header}</div>
			{Image}
			{Content && (
				<div
					className={
						'rounded-xl absolute bottom-24 w-[200px] left-1/2 -translate-x-1/2'
					}
				>
					{Content}
				</div>
			)}
			{Footer}
		</div>
	);
};

export default Nftcard;
