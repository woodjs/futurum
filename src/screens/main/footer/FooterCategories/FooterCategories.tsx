import { Typography } from '@/shared/ui'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const FooterCategories = () => {
  const t = useTranslations('default.Home.Footer')

  return (
    <div className={'flex flex-col items-center md:items-start'}>
      <Link href={'#'}>
        <Typography className={'mb-[15px] font-semibold text-white'}>
          {t('Category')}
        </Typography>
      </Link>
      <Link href={'#'}>
        <Typography
          className={'mb-[5px] font-semibold text-white text-opacity-50'}
        >
          {t('BuyNFT')}
        </Typography>
      </Link>
      {/* <Link href={'#'}>
				<Typography
					className={'text-white font-semibold text-opacity-50 mb-[5px]'}
				>
				{t('BuyToken')}
				</Typography>
			</Link> */}
      <Link href={'#'}>
        <Typography
          className={'mb-[5px] font-semibold text-white text-opacity-50'}
        >
          {t('DigitalJunk')}
        </Typography>
      </Link>
      <Link href={'#'}>
        <Typography
          className={'mb-[5px] font-semibold text-white text-opacity-50'}
        >
          {t('HelpAnimals')}
        </Typography>
      </Link>
      <Link href={'#'}>
        <Typography
          className={'mb-[5px] font-semibold text-white text-opacity-50'}
        >
          {t('HelpPeople')}
        </Typography>
      </Link>
      <Link href={'#'}>
        <Typography
          className={'mb-[5px] font-semibold text-white text-opacity-50'}
        >
          {t('BooksAndMusic')}
        </Typography>
      </Link>
      <Link href={'#'}>
        <Typography
          className={'mb-[5px] font-semibold text-white text-opacity-50'}
        >
          {t('EventTickets')}
        </Typography>
      </Link>
      <Link href={'#'}>
        <Typography
          className={'mb-[5px] font-semibold text-white text-opacity-50'}
        >
          {t('TrainingCourses')}
        </Typography>
      </Link>
      <Link href={'#'}>
        <Typography
          className={'mb-[5px] font-semibold text-white text-opacity-50'}
        >
          {t('ArtsAtNFT')}
        </Typography>
      </Link>
      <Link href={'#'}>
        <Typography
          className={'mb-[5px] font-semibold text-white text-opacity-50'}
        >
          {t('ReferralPrograms')}
        </Typography>
      </Link>
    </div>
  )
}

export default FooterCategories
