'use client';

import Autoplay from 'embla-carousel-autoplay';
import { Button, Carousel, CarouselContent, CarouselItem } from '@/shared/ui';
import SlideOne from './images/slide_1.png';
import { useRef } from 'react';
import Section from '../../section';

export default function CarouselHeader() {
	const plugin = useRef(Autoplay({ delay: 2000, playOnInit: false }));
	return (
		<Section className="mt-[24px] lg:mt-[64px]">
			<Carousel
				className="w-full max-w-full"
				opts={{
					align: 'start',
					loop: true,
				}}
				plugins={[Autoplay({ playOnInit: true, delay: 3000 })]}
				// onMouseEnter={plugin.current.stop}
				// onMouseLeave={plugin.current.reset}
			>
				<CarouselContent className="">
					<CarouselItem>
						<div className="p-1">
							<picture>
								<source
									className="w-full"
									srcSet="/images/sliders/slide-1-mobile.jpg"
									media="(max-width: 600px)"
								/>
								<img
									className="w-full"
									src="/images/sliders/slide-1.jpg"
									alt=""
								/>
							</picture>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className="p-1">
							<picture>
								<source
									className="w-full"
									srcSet="/images/sliders/slide-2-mobile.jpg"
									media="(max-width: 600px)"
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
							<picture>
								<source
									className="w-full"
									srcSet="/images/sliders/slide-3-mobile.jpg"
									media="(max-width: 600px)"
								/>
								<img
									className="w-full"
									src="/images/sliders/slide-3.jpg"
									alt=""
								/>
							</picture>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className="p-1">
							<picture>
								<source
									className="w-full"
									srcSet="/images/sliders/slide-4-mobile.jpg"
									media="(max-width: 600px)"
								/>
								<img
									className="w-full"
									src="/images/sliders/slide-4.jpg"
									alt=""
								/>
							</picture>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className="p-1">
							<picture>
								<source
									className="w-full"
									srcSet="/images/sliders/slide-5-mobile.jpg"
									media="(max-width: 600px)"
								/>
								<img
									className="w-full"
									src="/images/sliders/slide-5.jpg"
									alt=""
								/>
							</picture>
						</div>
					</CarouselItem>
				</CarouselContent>
			</Carousel>
		</Section>
	);
}
