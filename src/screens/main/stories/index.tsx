import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	GradientTypography,
	Typography,
} from '@/shared/ui';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Section from '../section';


export default function Stories() {
	const t = useTranslations('default.Home.Categories');

	const data = [
		{ id: 1, title: t('WhatIsFuturum'), image: '/images/stories/1.png' },
		{ id: 2, title: t('ProjectVision'), image: '/images/stories/2.png' },
		{ id: 3, title: t('WhyTON'), image: '/images/stories/3.png' },
		{ id: 4, title: t('AdvantagesOfThePlatform'), image: '/images/stories/4.png' },
		{ id: 5, title: t('ForInvestors'), image: '/images/stories/5.png' },
		{ id: 6, title: t('ForBusiness'), image: '/images/stories/6.png' },
	];

	return (
		<Section
			Title={
				<Typography variant="h2">
					{t('StoriesOne')} <GradientTypography variant="h2">{t('StoriesTwo')}</GradientTypography>
				</Typography>
			}
		>
			<Carousel
				opts={{
					align: 'start',
				}}
				className="w-full max-w-[90%] mx-auto"
			>
				<CarouselContent>
					{data.map((item) => (
						<CarouselItem
							key={item.id}
							className="sm:basis-1/2 md:basis-1/4 lg:basis-1/6"
						>
							<div>
								<div className="h-[132px]">
									<div className="  overflow-hidden h-full w-[132px] mx-auto rounded-[20px] bg-gradient-to-r from-gradient-accent-start to-gradient-accent-end p-[1px]">
										<div className="bg-white w-full h-full rounded-[20px] p-[6px]">
											{/* <div className="rounded-[16px] h-full w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex justify-center items-center"> */}
											<Image
												alt=""
												src={item.image}
												className="object-cover rounded-[15px]"
												width={132}
												height={132}
											/>
											{/* </div> */}
										</div>
									</div>
								</div>
								<p className="font-bold text-center mt-[8px] md:text-[16px] text-[14px]">
									{item.title}
								</p>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				<div className="hidden lg:block">
					<CarouselPrevious />
					<CarouselNext />
				</div>
			</Carousel>
		</Section>
	);
}
// {/* <Carousel className="w-full max-w-sm">
// 			<CarouselContent className="-ml-1">
// 				{Array.from({ length: 15 }).map((_, index) => (
// 					<CarouselItem
// 						key={index}
// 						className="pr-[70px] pl-1 md:basis-1/2 lg:basis-1/6"
// 					>
// 						{/* <div className="p-1"> */}

// 					</CarouselItem>
// 				))}
// 			</CarouselContent>
// 			{/* <CarouselPrevious /> */}
// 			<CarouselNext className="right-0" />
// 		</Carousel> */}
