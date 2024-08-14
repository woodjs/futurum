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
		id: 4,
		image: '/images/nfts/top-4.jpg',
		params: [
			{ title: 'Доходность', value: '65%' },
			{ title: 'Доход за год', value: '6 500 USDT' },
			{ title: 'Доход за период', value: '541,6 USDT' },
		],
		category: '#бизнес',
		price: `10 000`,
	},
	{
		id: 2,
		image: '/images/nfts/top-2.jpg',
		params: [
			{ title: 'Доходность', value: '70%' },
			{ title: 'Доход за год', value: '10 500 USDT' },
			{ title: 'Доход за период', value: '875 USDT' },
		],
		category: '#бизнес',
		price: `15 000`,
	},
	{
		id: 3,
		image: '/images/nfts/top-3.jpg',
		params: [
			{ title: 'Доходность', value: '75%' },
			{ title: 'Доход за год', value: '22 500 USDT' },
			{ title: 'Доход за период', value: '1 875 USDT' },
		],
		category: '#бизнес',
		price: `30 000`,
	},
	{
		id: 1,
		image: '/images/nfts/top-1.jpg',
		params: [
			{ title: 'Доходность', value: '80%' },
			{ title: 'Доход за год', value: '40 000 USDT' },
			{ title: 'Доход за период', value: '3 333,3 USDT' },
		],
		category: '#бизнес',
		price: `50 000`,
	},
	{
		id: 5,
		image: '/images/nfts/top-5.jpg',
		params: [
			{ title: 'Доходность', value: '90%' },
			{ title: 'Доход за год', value: '72 000 USDT' },
			{ title: 'Доход за период', value: '6 000 USDT' },
		],
		category: '#бизнес',
		price: `80 000`,
	},
];

export default function CarouselTop() {
	const plugin = useRef(Autoplay({ delay: 2000, playOnInit: false }));
	return (
		<Section
			Title={
				<Typography variant="h2">
					<GradientTypography variant="h2">Топ</GradientTypography> предложений
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
