import { FC } from 'react'
import FeatureCard from './FeatureCard'
import { useTranslations } from 'next-intl'
import IncomeIcon from './icons/income.png'
import ComputerCoin from './icons/computer.png'
import AnimalCoin from './icons/animal.png'
import HelpIcon from './icons/help.png'
import BookIcon from './icons/book.png'
import TicketIcon from './icons/ticket.png'
import BlogIcon from './icons/blog.png'
import YetiIcon from './icons/yeti.png'
import MessageIcon from './icons/message.png'
import { GradientTypography } from '@/shared/ui'

interface FeatureSectionProps {}

const FeatureSection: FC<FeatureSectionProps> = () => {
  const t = useTranslations('default.Home')

  return (
    <div className='mt-[24px] lg:mt-[64px]'>
      <div className='hidden lg:block'>
        <GradientTypography>
          {t('Header.DigitalAssetMarketplace')}
        </GradientTypography>
        <p className='mt-[8px] text-[22px] font-normal'>
          {t('Header.ScaleYourBusiness')}
        </p>
      </div>

      <div className='lg:mt-[52px]'>
        <div
          className='mb-[8px] grid grid-cols-2 gap-[8px] sm:grid-cols-2 lg:mb-[24px] lg:grid-cols-3
            lg:gap-[24px]'
        >
          <FeatureCard
            isActive
            Title={
              <span className='block font-bold lg:text-[18px] xl:text-[20px]'>
                {t('Categories.GainIncome')}
              </span>
            }
            subtitle={t('Categories.FromExistingBusinesses')}
            // image={<img src={IncomeIcon.src} alt="" />}
            Image={
              <div className='z-1 absolute right-0 top-0 hidden w-[120px] lg:block'>
                <img
                  src={IncomeIcon.src}
                  alt=''
                  className='h-full w-full object-contain'
                />
              </div>
            }
          />
          <FeatureCard
            Title={
              <span className='block font-bold lg:text-[18px] xl:text-[20px]'>
                {t('Categories.BecomeACofounder')}
              </span>
            }
            className='px-[10px]'
            subtitle={t('Categories.OfAnInnovativeStartup')}
            Image={
              <div className='z-1 absolute bottom-0 right-[26px] hidden h-[74px] w-[74px] lg:block'>
                <img
                  src='/images/features/profit.png'
                  alt=''
                  className='h-full w-full object-contain'
                />
              </div>
            }
          />
          <FeatureCard
            Title={
              <span className='block max-w-[171px] font-bold lg:text-[18px] xl:text-[20px]'>
                {t('Categories.DigitalMarketplace')}
              </span>
            }
            Image={
              <>
                <div className='z-1 absolute right-0 top-0 hidden w-[160px] lg:block'>
                  <img
                    src={ComputerCoin.src}
                    alt=''
                    className='h-full w-full object-contain'
                  />
                </div>
                <img
                  src='/images/features/sell-mobile.png'
                  alt=''
                  className='h-[48px] w-[60px] lg:hidden'
                />
              </>
            }
          />
          <FeatureCard
            Title={
              <span className='block max-w-[171px] font-bold lg:text-[18px] xl:text-[20px]'>
                {t('Categories.AnimalCharity')}
              </span>
            }
            Image={
              <>
                <div className='z-1 absolute right-[-8px] top-[12px] hidden w-[80px] lg:block'>
                  <img
                    src={AnimalCoin.src}
                    alt=''
                    className='h-full w-full object-contain'
                  />
                </div>
                <img
                  src='/images/features/animal-mobile.png'
                  alt=''
                  className='h-[48px] w-[48px] lg:hidden'
                />
              </>
            }
            className='lg:col-span-1 lg:col-start-4' // Последний элемент занимает одну колонку
          />
        </div>

        <div className='grid grid-cols-2 gap-[8px] sm:grid-cols-3 lg:grid-cols-6 lg:gap-[24px]'>
          <FeatureCard
            Title={
              <span className='block max-w-[105px] font-bold lg:text-[18px] xl:text-[20px]'>
                {t('Categories.PeopleCharity')}
              </span>
            }
            Image={
              <>
                <div className='z-1 absolute right-0 top-0 hidden w-[90px] lg:block'>
                  <img
                    src={HelpIcon.src}
                    alt=''
                    className='h-full w-full object-contain'
                  />
                </div>
                <img
                  src='/images/features/heart-mobile.png'
                  alt=''
                  className='block lg:hidden'
                />
              </>
            }
          />
          <FeatureCard
            className='blur-sm'
            Title={
              <span className='block max-w-[105px] font-bold lg:text-[18px] xl:text-[20px]'>
                {t('Categories.BooksAndMusic')}
              </span>
            }
            Image={
              <>
                <div className='z-1 absolute right-0 top-0 hidden w-[90px] lg:block'>
                  <img
                    src={BookIcon.src}
                    alt=''
                    className='h-full w-full object-contain'
                  />
                </div>
                <img
                  src='/images/features/book-mobile.png'
                  alt=''
                  className='block h-[48px] w-[48px] lg:hidden'
                />
              </>
            }
          />
          <FeatureCard
            className='justify-end pb-0 blur-sm'
            Title={
              <span className='block max-w-[179px] font-bold lg:text-[18px] xl:text-[20px]'>
                {t('Categories.EventTickets')}
              </span>
            }
            Image={
              <>
                <div className='z-1 absolute right-0 top-0 hidden w-[90px] lg:block'>
                  <img
                    src={TicketIcon.src}
                    alt=''
                    className='h-full w-full object-contain'
                  />
                </div>
                <img
                  src='/images/features/movie-mobile.png'
                  alt=''
                  className='block h-[48px] w-[48px] lg:hidden'
                />
              </>
            }
          />
          <FeatureCard
            className='blur-sm'
            Title={
              <span className='block max-w-[156] font-bold lg:text-[18px] xl:text-[20px]'>
                {t('Categories.EducationCourses')}
              </span>
            }
            Image={
              <>
                <div className='z-1 absolute right-0 top-0 hidden w-[120px] lg:block'>
                  <img
                    src={BlogIcon.src}
                    alt=''
                    className='h-full w-full object-contain'
                  />
                </div>
                <img
                  src='/images/features/blog-mobile.png'
                  alt=''
                  className='h-[48px block w-[72px] lg:hidden'
                />
              </>
            }
          />
          <FeatureCard
            className='justify-end pb-0 blur-sm'
            Title={
              <span className='block max-w-[115px] font-bold lg:text-[18px] xl:text-[20px]'>
                {t('Categories.NFTArts')}
              </span>
            }
            Image={
              <>
                <div className='z-1 absolute right-0 top-0 hidden w-[90px] lg:block'>
                  <img
                    src={YetiIcon.src}
                    alt=''
                    className='h-full w-full object-contain'
                  />
                </div>
                <img
                  src='/images/features/nft-mobile.png'
                  alt=''
                  className='block h-[48px] w-[48px] lg:hidden'
                />
              </>
            }
          />
          <FeatureCard
            className='blur-sm'
            Title={
              <span className='block max-w-[141px] font-bold lg:text-[18px] xl:text-[20px]'>
                {t('Categories.ReferralPrograms')}
              </span>
            }
            Image={
              <>
                <div className='z-1 absolute right-0 top-0 hidden w-[90px] lg:block'>
                  <img
                    src={MessageIcon.src}
                    alt=''
                    className='h-full w-full object-contain'
                  />
                </div>
                <img
                  src='/images/features/message-mobile.png'
                  alt=''
                  className='block h-[48px] w-[60px] lg:hidden'
                />
              </>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default FeatureSection
