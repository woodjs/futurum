import Link from 'next/link'
import { Typography } from '@/shared/ui'
import { useTranslations } from 'next-intl'

const FooterInfo = () => {
  const t = useTranslations('default.Home.Footer')

  return (
    <div className={'flex flex-col items-center md:items-start'}>
      <Link href={'#'}>
        <Typography className={'mb-[15px] font-semibold text-white'}>
          {t('LegalInformation')}
        </Typography>
      </Link>
      <Link href={'/docs/roadmap-ru.pdf'}>
        <Typography
          className={'mb-[5px] font-semibold text-white text-opacity-50'}
        >
          {t('Roadmap')}
        </Typography>
      </Link>
      <Link href={'/docs/white-paper-ru.pdf'}>
        <Typography
          className={'mb-[5px] font-semibold text-white text-opacity-50'}
        >
          {t('WhitePaper')}
        </Typography>
      </Link>
      <Link href={'#'}>
        <Typography
          className={'mb-[5px] font-semibold text-white text-opacity-50'}
        >
          {t('UserAgreement')}
        </Typography>
      </Link>
      <Link href={'#'}>
        <Typography
          className={'mb-[5px] font-semibold text-white text-opacity-50'}
        >
          {t('PrivacyPolicy')}
        </Typography>
      </Link>
      <Link href={'#'}>
        <Typography
          className={'mb-[5px] font-semibold text-white text-opacity-50'}
        >
          {t('PublicOffer')}
        </Typography>
      </Link>
      <Link href={'#'}>
        <Typography className={'mt-[27px] font-semibold text-white'}>
          {t('ContactInformation')}
        </Typography>
      </Link>
    </div>
  )
}

export default FooterInfo
