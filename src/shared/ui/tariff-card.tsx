import { Tariff } from '@/shared/api/types'
import { FC } from 'react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { tariffsImages } from '@/shared/images/tariffs'
import Image from 'next/image'
import { GradientTypography } from '@/shared/ui/gradient-typography'
import { Typography } from '@/shared/ui/typography'

const tariffs = {
  [Tariff.BASIC]:
    'bg-gradient-to-r from-gradient-accent-start to-gradient-accent-end',
  [Tariff.PREMIUM]:
    'bg-gradient-to-r from-[#D4A107] via-[#E8CC31] to-[#CDB113]',
  [Tariff.STANDARD]: 'bg-gradient-to-r from-[#03CBAF] to-[#E7E310]',
  [Tariff.BLACK]: 'bg-gradient-to-r from-[#131311] via-[#0F2446] to-[#04193E]',
}

const images = {
  [Tariff.BASIC]: tariffsImages.basic,
  [Tariff.PREMIUM]: tariffsImages.premium,
  [Tariff.STANDARD]: tariffsImages.standard,
  [Tariff.BLACK]: tariffsImages.black,
}

interface IProps {
  variant?: Tariff
  className?: string
}

const TariffCard: FC<IProps> = ({ variant = Tariff.BLACK, className }) => {
  return (
    <div
      className={`relative flex h-[361px] w-[306px] items-center justify-center rounded-[15px]
        p-[1px]`}
    >
      <Button
        className={cn(
          tariffs[variant],
          `hover:from-auto hover:to-auto absolute -top-[24px] left-1/2 w-[192px]
          -translate-x-1/2`,
        )}
      >
        {variant}
      </Button>
      <div className={'absolute flex flex-col items-center justify-center'}>
        <div className={'max-w-[258px]'}>
          <Typography variant={'h5'} className={'text-center leading-6'}>
            без ограничений <br />
            комиссия до 2,5% <br />
            личный менеджер <br />
            размещение в топе 10 NFT
          </Typography>
        </div>
        <GradientTypography
          variant={'h3'}
          className={cn(tariffs[variant], 'mt-6')}
        >
          100 TON/мес.
        </GradientTypography>
        <div
          className={cn(
            tariffs[Tariff.BASIC],
            'my-6 h-[48px] w-[192px] rounded-[500px] p-[1px]',
          )}
        >
          <Button variant={'outline'} className={'h-full w-full'}>
            Купить
          </Button>
        </div>
        <Typography
          variant={'p-small'}
          className={'text-center text-[#A0AEC0E5]'}
        >
          При условии оплаты за год
        </Typography>
      </div>
      <Image src={images[variant]} alt={variant} />
    </div>
  )
}

export { TariffCard }
