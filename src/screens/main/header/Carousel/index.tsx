'use client'

import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui'
import { useRef } from 'react'
import Section from '../../section'
import { useTranslations } from 'next-intl'

export default function CarouselHeader() {
  const t = useTranslations('default.Home.FeaturesSlider')
  const plugin = useRef(Autoplay({ delay: 2000, playOnInit: false }))
  return (
    <Section className='mt-[24px] lg:mt-[64px]'>
      <Carousel
        className='w-full max-w-full'
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[Autoplay({ playOnInit: true, delay: 3000 })]}
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className=''>
          <CarouselItem>
            <div className='p-1'>
              <picture>
                <source
                  className='w-full'
                  srcSet={t('slideOneMobile')}
                  media='(max-width: 600px)'
                />
                <img className='w-full' src={t('slideOne')} alt='' />
              </picture>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className='p-1'>
              <picture>
                <source
                  className='w-full'
                  srcSet={t('slideTwoMobile')}
                  media='(max-width: 600px)'
                />
                <img className='w-full' src={t('slideTwo')} alt='' />
              </picture>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className='p-1'>
              <picture>
                <source
                  className='w-full'
                  srcSet={t('slideThreeMobile')}
                  media='(max-width: 600px)'
                />
                <img className='w-full' src={t('slideThree')} alt='' />
              </picture>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className='p-1'>
              <picture>
                <source
                  className='w-full'
                  srcSet={t('slideFourMobile')}
                  media='(max-width: 600px)'
                />
                <img className='w-full' src={t('slideFour')} alt='' />
              </picture>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className='p-1'>
              <picture>
                <source
                  className='w-full'
                  srcSet={t('slideFiveMobile')}
                  media='(max-width: 600px)'
                />
                <img className='w-full' src={t('slideFive')} alt='' />
              </picture>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </Section>
  )
}
