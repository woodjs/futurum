import { Tariff } from '@/shared/api/types'
import { FC } from 'react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import Image from 'next/image'
import { GradientTypography } from '@/shared/ui/gradient-typography'
import { Typography } from '@/shared/ui/typography'
import { tariffs } from '@/entities/tariff-card/lib/tariffs'
import { ButtonName } from '@/entities/tariff-card/lib/buttonName'
import { useTranslations } from 'next-intl'

interface IProps {
  variant?: Tariff
  buttonName: ButtonName
  onButtonClick: (variant: string) => void
  mode?: 'Month' | 'Year'
}

const TariffCard: FC<IProps> = ({
  variant = Tariff.BASIC,
  buttonName,
  onButtonClick,
  mode = 'Month',
}) => {
  const t = useTranslations('Tariffs')
  return (
    <div
      className={`relative flex h-[361px] w-[306px] items-center justify-center rounded-[15px]
        p-[1px]`}
    >
      <Button
        className={cn(
          tariffs[variant].gradient,
          `hover:from-auto hover:to-auto absolute -top-[24px] left-1/2 w-[192px]
          -translate-x-1/2`,
        )}
      >
        {variant}
      </Button>
      <div className={'absolute flex flex-col items-center justify-center'}>
        <div
          className={'flex h-[96px] max-w-[242px] items-center justify-center'}
        >
          <Typography
            variant={'h5'}
            className={'text-center leading-6'}
            dangerouslySetInnerHTML={{
              __html: t(`TariffTypes.Description.${variant}`),
            }}
          />
        </div>
        <GradientTypography
          variant={'h3'}
          className={cn(tariffs[variant].gradient, 'mt-6')}
        >
          {t(`TariffTypes.Price.${mode}.${variant}`)}
        </GradientTypography>
        <div
          className={cn(
            tariffs[Tariff.BASIC],
            'my-6 h-[48px] w-[192px] rounded-[500px] p-[1px]',
          )}
        >
          <Button
            variant={'outline'}
            className={'h-full w-full'}
            onClick={() => onButtonClick(variant)}
          >
            {t(buttonName)}
          </Button>
        </div>
        {variant !== Tariff.BASIC && (
          <Typography
            variant={'p-small'}
            className={'text-center text-[#A0AEC0E5]'}
          >
            {t('Condition')}
          </Typography>
        )}
      </div>
      <Image src={tariffs[variant].card} alt={variant} />
    </div>
  )
}

export default TariffCard
