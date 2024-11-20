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
import { useTranslations } from 'next-intl';

export default function CarouselProfit() {
	const t = useTranslations('default.Home.Categories');
	const plugin = useRef(Autoplay({ delay: 2000, playOnInit: false }));

	const data = [
		{
			id: 1,
			image: '/images/nfts/profit-1.jpg',
			params: [
				{ title: t('Profitability'), value: '55%' },
				{ title: t('IncomeForTheYear'), value: '550 USDT' },
				{ title: t('IncomeForThePeriod'), value: '45,8 USDT' },
			],
			category: t('#business'),
			price: `1 000`,
		},
		{
			id: 2,
			image: '/images/nfts/profit-2.jpg',
			params: [
				{ title: t('Profitability'), value: '60%' },
				{ title: t('IncomeForTheYear'), value: '1 800 USDT' },
				{ title: t('IncomeForThePeriod'), value: '150 USDT' },
			],
			category: t('#business'),
			price: `3 000`,
		},
		{
			id: 4,
			image: '/images/nfts/profit-3.jpg',
			params: [
				{ title: t('Profitability'), value: '70%' },
				{ title: t('IncomeForTheYear'), value: '4 200 USDT' },
				{ title: t('IncomeForThePeriod'), value: '350 USDT' },
			],
			category: t('#business'),
			price: `6 000`,
		},
		{
			id: 3,
			image: '/images/nfts/profit-4.jpg',
			params: [
				{ title: t('Profitability'), value: '75%' },
				{ title: t('IncomeForTheYear'), value: '2 625 USDT' },
				{ title: t('IncomeForThePeriod'), value: '219 USDT' },
			],
			category: t('#business'),
			price: `3 500`,
		},
	
		{
			id: 5,
			image: '/images/nfts/profit-5.jpg',
			params: [
				{ title: t('Profitability'), value: '90%' },
				{ title: t('IncomeForTheYear'), value: '36 000 USDT' },
				{ title: t('IncomeForThePeriod'), value: '3 000 USDT' },
			],
			category: t('#business'),
			price: `40 000`,
		},
	];

	return (
		<Section
			Title={
				<Typography variant="h2">
					<GradientTypography variant="h2">{t('EarnWithTheBestInTheBusinessOne')}</GradientTypography>{' '}
					{t('EarnWithTheBestInTheBusinessTwo')}
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
