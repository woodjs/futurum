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
import { landingImages } from '@/shared/images';

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
					{Array.from({ length: 10 }).map((_, index) => (
						<CarouselItem
							key={index}
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
									Image={<NftImage imageSrc={landingImages.nft2} />}
									Footer={
										<NftFooter
											borderColor={'border-primary'}
											price={'700 USDT'}
											priceColor={'text-white'}
											bgColor={'bg-primary'}
											height={'h-[149px]'}
											description={
												'Чат-бот «Виртуальный Гений» — умный и дружелюбный ассистент для быстрого поиска информации и решения повседневных задач.'
											}
										/>
									}
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
