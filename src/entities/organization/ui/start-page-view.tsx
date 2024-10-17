import { FC } from 'react'
import { IFundingInfo } from '../model'
import Image from 'next/image'
import { getFormattedNumber } from '@/shared/lib/numberFormatter'
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui'

interface IStartPageView {
  fundingInfo: IFundingInfo
  id: string
  edit?: FC<{ id: string }>
}
const StartPageView: FC<IStartPageView> = ({ fundingInfo, id, edit }) => {
  return (
    <div className='mt-6 text-black'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='text-xl font-bold'>Стартовая страница</div>
        {edit && edit({ id })}
      </div>
      <div className='flex flex-col items-center gap-2'>
        <div className='self-start'>
          <div className='text-xl font-bold'>
            {getFormattedNumber(fundingInfo.raisedFunding, 'en', 'USD')}/
            {getFormattedNumber(fundingInfo.requiredFunding, 'en', 'USD')}
          </div>
          <div className=''>Необходимо для старта</div>
        </div>
        {fundingInfo.slideDeck && (
          <Carousel
            className='w-full'
            opts={{
              align: 'start',
              loop: true,
            }}
            // plugins={[plugin.current]}
          >
            <CarouselContent className='-ml-1'>
              {fundingInfo.slideDeck.map(item => (
                <CarouselItem
                  key={item.src}
                  className='pl-1 sm:basis-1 md:basis-1/2 lg:basis-1/2'
                >
                  <div className='relative h-[300px] w-full overflow-hidden rounded-xl'>
                    <Image
                      className='object-cover'
                      fill
                      src={item.src}
                      alt={'slice image'}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </div>
  )
}

export default StartPageView
