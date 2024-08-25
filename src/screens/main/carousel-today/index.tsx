'use client';

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
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function CarouselToday() {
	const t = useTranslations('Home.Categories');

	const data = [
		{
			id: 1,
			image: '/images/nfts/today-1.jpg',
			title: t('ChatbotVirtualGain'),
			params: [
				{ title: t('Purpose'), value: '3 000 USDT' },
				{ title: t('Collected'), value: '13%' },
			],
			category: t('#animalCharity'),
		},
		{
			id: 2,
			image: '/images/nfts/today-2.jpg',
			title: t('ChatbotVirtualGain'),
			params: [
				{ title: t('Purpose'), value: '750 USDT' },
				{ title: t('Collected'), value: '22%' },
			],
			category: t('#animalCharity'),
		},
		{
			id: 3,
			image: '/images/nfts/today-3.jpg',
			title: t('ChatbotVirtualGain'),
			params: [
				{ title: t('Purpose'), value: '300 USDT' },
				{ title: t('Collected'), value: '81%' },
			],
			category: t('#animalCharity'),
		},
		{
			id: 4,
			image: '/images/nfts/today-4.jpg',
			title: t('ChatbotVirtualGain'),
			params: [
				{ title: t('Purpose'), value: '25 000 USDT' },
				{ title: t('Collected'), value: '7%' },
			],
			category: t('#peopleCharity'),
		},
		{
			id: 5,
			image: '/images/nfts/today-5.jpg',
			title: t('ChatbotVirtualGain'),
			params: [
				{ title: t('Purpose'), value: '18 000 USDT' },
				{ title: t('Collected'), value: '36%' },
			],
			category: t('#peopleCharity'),
		},
	];

	const plugin = useRef(Autoplay({ delay: 2000, playOnInit: false }));
	return (
		<Section
			Title={
				<Typography variant="h2">
					<GradientTypography variant="h2">{t('GoodDeedsForTodayOne')}</GradientTypography> {t('GoodDeedsForTodayTwo')}
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
									Footer={<NftFooter price={`${t('from')} 1 USDT`} />}
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
