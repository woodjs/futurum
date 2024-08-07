'use client';

import Autoplay from 'embla-carousel-autoplay';
import { Button, Carousel, CarouselContent, CarouselItem } from '@/shared/ui';
import SlideOne from './images/slide_1.png';
import { useRef } from 'react';

export default function CarouselHeader() {
	const plugin = useRef(Autoplay({ delay: 2000, playOnInit: false }));
	return (
		<Carousel
			className="w-full max-w-full"
			opts={{
				align: 'start',
				loop: true,
			}}
			plugins={[plugin.current]}
			// onMouseEnter={plugin.current.stop}
			// onMouseLeave={plugin.current.reset}
		>
			<CarouselContent className="">
				<CarouselItem>
					<div className="p-1">
						<img
							src="/images/sliders/slide-1.jpg"
							alt=""
							className="h-[120px] object-fill"
						/>
						{/* <div>
							<p className="text-6xl font-bold text-white">NFT</p>
							<p className="font-bold text-5xl text-white max-w-[500px] my-[20px]">
								с гарантированной доходностью
							</p>
							<p className="font-normal text-xl text-white">
								Зарабатывай вместе с лучшими в своём деле
							</p>
						</div> */}
					</div>
				</CarouselItem>
				<CarouselItem>
					<div className="p-1">
						<picture>
							<source
								className="w-full"
								srcSet="/images/sliders/slide-2-mobile.jpg"
								media="(max-width: 991px)"
							/>
							<img
								className="w-full"
								src="/images/sliders/slide-2.jpg"
								alt=""
							/>
						</picture>
					</div>
				</CarouselItem>
				<CarouselItem>
					<div className="p-1">
						<img
							src="/images/sliders/slide-3.jpg"
							alt=""
							className="h-[120px] object-fill"
						/>
						{/* <div>
							<p className="text-6xl font-bold text-white">Цифровые активы</p>
							<p className="font-bold text-3xl text-white max-w-[687px] my-[20px]">
								Покупай обучающие курсы, книги, музыку, билеты на мероприятия,
								IT-технологии и многое другое...
							</p>
						</div> */}
					</div>
				</CarouselItem>
				<CarouselItem>
					<div className="p-1 ">
						<img
							src="/images/sliders/slide-4.jpg"
							alt=""
							className="h-[120px] object-fill"
						/>
						{/* <div>
							<p className="text-6xl font-bold text-white">
								Токенизация бизнеса
							</p>
							<p className="font-bold text-3xl text-white max-w-[687px] my-[20px]">
								Привлекай инвестиции со всего мира
							</p>
						</div> */}
					</div>
				</CarouselItem>
				<CarouselItem>
					<div className="p-1 ">
						<img
							src="/images/sliders/slide-5.jpg"
							alt=""
							className="h-[120px] object-fill"
						/>
						{/* <div>
							<p className="text-6xl font-bold text-white">Добрые дела</p>
							<p className="font-bold text-3xl text-white max-w-[687px] my-[20px]">
								Принимай участие в благотворительных акциях
							</p>
						</div> */}
					</div>
				</CarouselItem>
			</CarouselContent>
		</Carousel>
	);
}
