'use client';

import { useRef } from 'react';

import Autoplay from 'embla-carousel-autoplay';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	GradientTypography,
	Typography,
} from '@/shared/ui';
import Section from '../section';
import Nftcard from '@/shared/ui/nftcard';
import NftInnerContent from '@/shared/ui/nft-inner-content';
import NftcardHeader from '@/shared/ui/nftcard-header';
import NftFooter from '@/shared/ui/nft-footer';
import NftImage from '@/shared/ui/nft-image';

const data = [
	{
		id: 1,
		image: '/images/nfts/profit-1.jpg',
		params: [
			{ title: 'Доходность', value: '55%' },
			{ title: 'Доход за год', value: '550 USDT' },
			{ title: 'Доход за период', value: '45,8 USDT' },
		],
		category: '#бизнес',
		price: `1 000`,
	},
	{
		id: 2,
		image: '/images/nfts/profit-2.jpg',
		params: [
			{ title: 'Доходность', value: '60%' },
			{ title: 'Доход за год', value: '1 800 USDT' },
			{ title: 'Доход за период', value: '150 USDT' },
		],
		category: '#бизнес',
		price: `3 000`,
	},
	{
		id: 3,
		image: '/images/nfts/profit-3.jpg',
		params: [
			{ title: 'Доходность', value: '70%' },
			{ title: 'Доход за год', value: '4 200 USDT' },
			{ title: 'Доход за период', value: '350 USDT' },
		],
		category: '#бизнес',
		price: `6 000`,
	},
	{
		id: 4,
		image: '/images/nfts/top-4.jpg',
		params: [
			{ title: 'Доходность', value: '75%' },
			{ title: 'Доход за год', value: '2 625 USDT' },
			{ title: 'Доход за период', value: '219 USDT' },
		],
		category: '#бизнес',
		price: `3 500`,
	},
	{
		id: 5,
		image: '/images/nfts/profit-5.jpg',
		params: [
			{ title: 'Доходность', value: '90%' },
			{ title: 'Доход за год', value: '36 000 USDT' },
			{ title: 'Доход за период', value: '3 000 USDT' },
		],
		category: '#бизнес',
		price: `40 000`,
	},
];

export default function CarouselProfit() {
	const plugin = useRef(Autoplay({ delay: 2000, playOnInit: false }));
	return (
		<Section
			Title={
				<Typography variant="h2">
					<GradientTypography variant="h2">Зарабатывай</GradientTypography>{' '}
					вместе с лучшими в своем деле
				</Typography>
			}
		>
			<Carousel
				className="w-full"
				opts={{
					align: 'start',
					loop: true,
				}}
				plugins={[plugin.current]}
			>
				<CarouselContent className="-ml-1">
					{data.map((item) => (
						<CarouselItem
							key={item.id}
							className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
						>
							<div className="p-1">
								<Nftcard
									className="mx-auto"
									Content={<NftInnerContent content={item.params} />}
									Header={<NftcardHeader content={item.category} />}
									Footer={<NftFooter price={`${item.price} USDT`} />}
									Image={<NftImage imageSrc={item.image} />}
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				{/* <CarouselPrevious />
				<CarouselNext /> */}
			</Carousel>
		</Section>
	);
}
