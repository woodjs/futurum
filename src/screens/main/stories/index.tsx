import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/shared/ui';
import Image from 'next/image';

import Income from '../header/FeatureSection/icons/income.png';

export default function Stories() {
	return (
		<div>
			<p className="text-[42px] font-bold">
				Наши{' '}
				<span className="bg-gradient-to-r from-gradient-accent-start to-gradient-accent-end inline-block text-transparent bg-clip-text">
					Stories
				</span>
			</p>

			<Carousel
				opts={{
					align: 'start',
				}}
				className="w-full max-w-[90%] mx-auto"
			>
				<CarouselContent>
					{Array.from({ length: 15 }).map((_, index) => (
						<CarouselItem
							key={index}
							className="sm:basis-1/2 md:basis-1/4 lg:basis-1/6"
						>
							<div>
								<div className="h-[132px]">
									<div className="h-full w-[132px] mx-auto rounded-[20px] bg-gradient-to-r from-gradient-accent-start to-gradient-accent-end p-[1px]">
										<div className="bg-white w-full h-full rounded-[20px] p-[6px]">
											<div className="rounded-[16px] h-full w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex justify-center items-center">
												<Image
													alt=""
													src={Income.src}
													width={100}
													height={100}
												/>
											</div>
										</div>
										{/* <div className="rounded-md flex h-full w-full items-center justify-center bg-white back p-[6px]">
									<div className="h-full w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
								</div> */}
									</div>
								</div>
								{/* <Typography>Правильная упаковка бизнеса</p> */}
								<p className="font-bold text-center mt-[8px]">
									Правильная упаковка бизнеса
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
		</div>
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
