'use client'
import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { Button, GradientTypography, Typography } from '@/shared/ui'


interface IProps {
	Content?: React.ReactNode;
	Header: React.ReactNode;
	Footer: React.ReactNode;
	Image?: React.ReactNode;
	height?: 'h-[418px]' | 'h-[344px]';
	className?: string;
}

const ActiveBodyCardBig: FC<IProps> = ({
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
			
			<Button type='button' className='my-1 w-[220px] text-sm'>Написать сообщение</Button>
			<Button type='button' className='my-1 w-[220px] text-sm'>Другие активы пользователя</Button>
			<Button type='button' className='my-1 w-[220px] text-sm'>Написать сообщение</Button>
		</div>
	);
};

export default ActiveBodyCardBig;
