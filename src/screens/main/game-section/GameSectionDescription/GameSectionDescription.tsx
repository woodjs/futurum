import { Button, GradientTypography, Typography } from '@/shared/ui'
import { useTranslations } from 'next-intl'

const GameSectionDescription = () => {
  const t = useTranslations('default.Home.Categories')

  return (
    <div className={'w-full lg:w-[42%]'}>
      <div className={'mb-[24px] flex flex-col lg:flex-row'}>
        <Typography
          variant={'h2'}
          className={'mr-2.5 text-center text-black lg:text-left'}
        >
          {t('PlayAndEarnOne')}{' '}
          <GradientTypography
            variant={'h2'}
            className={'text-center lg:text-left'}
          >
            {t('PlayAndEarnTwo')}
          </GradientTypography>
        </Typography>
      </div>
      <Typography
        variant={'p-large'}
        className={'text-center text-black lg:text-left'}
      >
        {t('JoinUsTodayOne')}
      </Typography>
      {/* <Typography
				variant={'subtitle-1'}
				className={'text-black mr-2.5 mt-[24px] text-center lg:text-left'}
			>
				{t('JoinUsTodayOne')}
			</Typography>

			<GradientTypography
				variant={'subtitle-1'}
				className={'w-full text-center lg:text-left lg:w-auto'}
			>
				{t('JoinUsTodayTwo')}
			</GradientTypography> */}
      <div className={'mt-[24px]'}>
        <Button
          variant={'outline'}
          className={'w-full lg:mr-[24px] lg:w-[150px]'}
        >
          {t('ReadMore')}
        </Button>
        <Button
          className={'mb-[24px] mt-[24px] w-full lg:mb-0 lg:mt-0 lg:w-[150px]'}
        >
          {t('Play')}
        </Button>
      </div>
    </div>
  )
}

export default GameSectionDescription
