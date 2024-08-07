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
import { landingImages } from '@/shared/images';
import { useRef } from 'react';

export default function CarouselToday() {
	const plugin = useRef(Autoplay({ delay: 2000, playOnInit: false }));
	return (
		<Section
			Title={
				<Typography variant="h2">
					<GradientTypography variant="h2">Добрые дела</GradientTypography> на
					сегодня
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
					{Array.from({ length: 10 }).map((_, index) => (
						<CarouselItem
							key={index}
							className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
						>
							<div className="p-1">
								<Nftcard
									className="mx-auto"
									Content={
										<NftInnerContent
											content={[
												{ title: 'Цель', value: '3 000 USDT' },
												{ title: 'Собрано', value: '13%' },
											]}
										/>
									}
									Header={<NftcardHeader content={'#digital'} />}
									Footer={<NftFooter price={'От 1 USDT'} />}
									Image={<NftImage imageSrc={landingImages.nftdog} />}
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
