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
import {
  IFeature,
  ISubscriptionPlan,
  ISubscriptionPlanDetails,
} from '@/widgets/tariffs2/ui/tariffs'
import { object } from 'zod'

interface IProps {
  details: ISubscriptionPlanDetails
  name: Tariff
  price: number
  mode?: 'Month' | 'Year'
  features: IFeature[]
  selected?: Boolean
}

const TariffCard: FC<IProps> = ({
  details,
  name,
  price,
  features,
  selected = false,
}) => {
  return (
    <div className={cn('flex flex-col')}>
      <div
        className={cn(selected && 'rounded-[15px] border-[1px] border-black')}
      >
        <div
          className={cn(
            tariffs[name].gradient,
            'rounded-t-[15px] py-[10px] text-center',
            name === Tariff.BLACK ? 'text-white' : 'text-black',
          )}
        >
          <Typography variant='h4' className={cn('mb-[8px]')}>
            {name}
          </Typography>
          <Typography variant='subtitle-2' className={cn()}>
            {price} USDT/мес.
          </Typography>
        </div>
        <div className='flex flex-col rounded-b-[15px] bg-gray'>
          {features.map((feature, index) => (
            <div
              key={feature.key}
              className='flex items-center border-b border-transparent-gray px-[16px] py-[8px]
                last:border-none'
            >
              <Typography variant='overline'>{feature.value}</Typography>
              <Typography className='ml-auto' variant='subtitle-3'>
                {details[feature.key as keyof ISubscriptionPlanDetails] === 0
                  ? '-'
                  : feature.key === 'referralConnection'
                    ? details[feature.key] + ' '
                    : feature.key === 'commission'
                      ? details[feature.key] + '%'
                      : typeof details[
                            feature.key as keyof ISubscriptionPlanDetails
                          ] === 'boolean'
                        ? details[feature.key as keyof ISubscriptionPlanDetails]
                          ? 'да'
                          : 'нет'
                        : details[
                            feature.key as keyof ISubscriptionPlanDetails
                          ]}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      <Button className='mt-[15px]' size={'default'}>
        {selected ? 'Продлить' : 'Купить'}
      </Button>
    </div>
  )
}

export default TariffCard
