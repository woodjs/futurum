import { cn } from '@/shared/lib/utils';
import { FC } from 'react';
import { Button } from '@/shared/ui/button';
import NftcardTimer from '@/shared/ui/nft-timer';

interface IProps {
	Description?: React.ReactNode;
	bgColor?: string;
	borderColor?: string;
	height?: 'h-[149px]' | 'h-[75px]';
	price: string;
	priceColor?: string;
}

const NftFooter: FC<IProps> = ({
	bgColor = 'bg-gray',
	borderColor,
	Description,
	height = 'h-[75px]',
	price,
	priceColor = 'text-black',
}) => {
	return (
		<div
			className={cn(
				'rounded-b-[14px] border-solid border w-full relative -top-[22px] pl-2 pr-2',
				bgColor,
				borderColor,
				height
			)}
		>
			<div className={'absolute -top-[12px] z-50 left-1/2 -translate-x-1/2'}>
				<NftcardTimer content={'40d:12h:06m'} />
			</div>
			{Description && (
				<div className={'mt-[16px] mb-[12px]'}>{Description}</div>
			)}
			<div
				className={cn(
					'flex justify-between items-center',
					!Description && 'h-full'
				)}
			>
				<div>
					<p className={cn('text-[12px] font-bold', priceColor)}>Цена</p>
					<p className={cn('text-[14px] font-bold', priceColor)}>{price}</p>
				</div>
				<div>
					<Button className={'w-[95px] text-[14px]'}>Купить</Button>
				</div>
			</div>
		</div>
	);
};

export default NftFooter;
