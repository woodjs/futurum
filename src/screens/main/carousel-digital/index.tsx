'use client';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	GradientTypography,
	Typography,
} from '@/shared/ui';
import Section from '../section';
import Nftcard from '@/shared/ui/nftcard';
import NftcardHeader from '@/shared/ui/nftcard-header';
import NftImage from '@/shared/ui/nft-image';
import NftFooter from '@/shared/ui/nft-footer';

const data = [
	{
		id: 1,
		image: '/images/nfts/digital-1.jpg',
		title: 'Чат-бот «Виртуальный Гений»',
		description:
			'умный и дружелюбный ассистент для быстрого поиска информации и решения повседневных задач.',
		price: 700,
	},
	{
		id: 2,
		image: '/images/nfts/digital-2.jpg',
		title: 'ЭкоПростор',
		description:
			'дизайн макет, сочетающий природные элементы и современные решения для создания гармоничного и...',
		price: 1300,
	},
	{
		id: 3,
		image: '/images/nfts/digital-3.jpg',
		title: 'WebHarmony',
		description:
			'современный дизайн сайта, объединяющий интуитивную навигацию и эстетичную визуализацию..',
		price: 750,
	},
	{
		id: 4,
		image: '/images/nfts/digital-4.jpg',
		title: 'Ультраград',
		description:
			'детализированная 3D модель мегаполиса будущего с инновационной архитектурой и продуманной инфраструктурой.',
		price: 2500,
	},
	{
		id: 5,
		image: '/images/nfts/digital-5.jpg',
		title: 'Цифровой Рывок',
		description:
			'динамичная маркетинговая стратегия, направленная на быстрое привлечение клиентов...',
		price: 1.4,
	},
];

export default function CarouselDigital() {
	return (
		<Section
			Title={
				<Typography variant="h2">
					<GradientTypography variant="h2">Цифровая </GradientTypography>{' '}
					барахолка
				</Typography>
			}
		>
			<Carousel
				className="w-full"
				opts={{
					align: 'start',
					loop: true,
				}}
				// plugins={[plugin.current]}
			>
				<CarouselContent className="-ml-1">
					{data.map((item) => (
						<CarouselItem
							key={item.id}
							className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 "
						>
							<div className="p-1">
								<Nftcard
									className="mx-auto"
									height={'h-[418px]'}
									Header={
										<NftcardHeader
											content={'#digital'}
											bgColor={'bg-primary'}
											textColor={'text-white'}
										/>
									}
									Image={<NftImage imageSrc={item.image} />}
									Footer={
										<NftFooter
											borderColor={'border-primary'}
											price={`${item.price} USDT`}
											priceColor={'text-white'}
											bgColor={'bg-primary'}
											height={'h-[149px]'}
											Description={
												<Typography className="text-[11px] text-white font-bold">
													{item.title} -{' '}
													<span className="font-normal">
														{item.description}
													</span>
												</Typography>
											}
										/>
									}
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</Section>
	);
}
