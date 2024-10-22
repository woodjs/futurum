'use client'

import { useTranslations } from 'next-intl'
import { tariffs } from '@/entities/tariff-card/lib/tariffs'

import { Tariff } from '@/shared/api/types'
import { subscriptionPlans } from '../mocks'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { cn } from '@/shared/lib/utils'
import { Button, Typography } from '@/shared/ui'
import { boolean } from 'zod'
import { useState } from 'react'

const Tariffs = () => {
  const t = useTranslations('Tariffs')
  const tariff = 'Premium'
  const expireDate = '21.12.2025'

  const onTariffClick = (variant: string) => {
    switch (variant) {
      case Tariff.BASIC:
        console.log('basic')
        break
      case Tariff.STANDARD:
        console.log('standard')
        break
      case Tariff.PREMIUM:
        console.log('premium')
        break
      case Tariff.BLACK:
        console.log('black')
        break
    }
  }

  const features = [
    { key: 'nftTotalQuantity', value: 'Общее количество NFT' },
    { key: 'nftArtwork', value: 'NFT арт' },
    { key: 'collectionsQuantity', value: 'Количество коллекций' },
    { key: 'collectibleSBT', value: 'Коллекционные SBT' },
    { key: 'commission', value: 'Комиссия (%)' },
    { key: 'organizationAddition', value: 'Добавление организаций' },
    {
      key: 'customCollectionDesign',
      value: 'Индивидуальное оформление коллекций',
    },
    { key: 'accountRating', value: 'Рейтинг аккаунта' },
    { key: 'nftPurchaseAbility', value: 'Возможность покупки NFT' },
    { key: 'internalWalletCreation', value: 'Создание внутреннего кошелька' },
    { key: 'prioritySupport', value: 'Приоритетная поддержка 24/7' },
    { key: 'closedCommunity', value: 'Закрытое сообщество Futurum Ltd.' },
    { key: 'personalManager', value: 'Персональный менеджер' },
    { key: 'status', value: 'Статус Private' },
    { key: 'tokenCreation', value: 'Создание токена компании на DEX' },
    { key: 'referralConnection', value: 'Подключение реферальной программы' },
  ]

  const referlaLevelsTexts = ['', 'уровень', 'уровня', 'уровней']

  const [selectedTariff, setSelectedTariff] = useState(Tariff.BASIC)

  return (
    <Table>
      <TableHeader>
        <TableRow className={cn('')}>
          <TableHead
            className={cn('max-w-[182px] rounded-t-[15px] bg-[#F8F9FB]')}
          ></TableHead>
          <TableHead
            className={cn(
              tariffs[Tariff.BASIC].gradient,
              'rounded-t-[15px] py-[10px] text-center',
            )}
          >
            <Typography variant='h4' className={cn('mb-[8px] text-black')}>
              Basic
            </Typography>
            <Typography variant='subtitle-2' className={cn('text-black')}>
              Бесплатно
            </Typography>
          </TableHead>
          <TableHead
            className={cn(
              tariffs[Tariff.STANDARD].gradient,
              'rounded-t-[15px] py-[10px] text-center',
            )}
          >
            <Typography variant='h4' className={cn('mb-[8px] text-black')}>
              Standard
            </Typography>
            <Typography variant='subtitle-2' className={cn('text-black')}>
              {subscriptionPlans[1].price} USDT/мес.
            </Typography>
          </TableHead>
          <TableHead
            className={cn(
              tariffs[Tariff.PREMIUM].gradient,
              'rounded-t-[15px] py-[10px] text-center',
            )}
          >
            <Typography variant='h4' className={cn('mb-[8px] text-black')}>
              Premium
            </Typography>
            <Typography variant='subtitle-2' className={cn('text-black')}>
              {subscriptionPlans[2].price} USDT/мес.
            </Typography>
          </TableHead>
          <TableHead
            className={cn(
              tariffs[Tariff.BLACK].gradient,
              'rounded-t-[15px] py-[10px] text-center',
            )}
          >
            <Typography variant='h4' className={cn('mb-[8px] text-white')}>
              Black
            </Typography>
            <Typography variant='subtitle-2' className={cn('text-white')}>
              {subscriptionPlans[3].price} USDT/мес.
            </Typography>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {features.map(feature => (
          <TableRow key={feature.key}>
            <TableCell className={cn('max-w-[182px] bg-[#F8F9FB]')}>
              <Typography>{feature.value}</Typography>
            </TableCell>
            {subscriptionPlans.map((el, index) => (
              <TableCell
                key={el.name}
                className={cn(
                  'text-center',
                  el.name === Tariff.BASIC && 'bg-[#C8F8E9]',
                  el.name === Tariff.STANDARD && 'bg-[#B5EDEF]',
                  el.name === Tariff.PREMIUM && 'bg-[#F8E9B3]',
                  el.name === Tariff.BLACK && 'bg-black text-white',
                )}
              >
                <Typography variant='subtitle-3'>
                  {el.details[feature.key] === 0
                    ? '-'
                    : feature.key === 'referralConnection'
                      ? el.details[feature.key] +
                        ' ' +
                        referlaLevelsTexts[index]
                      : feature.key === 'commission'
                        ? el.details[feature.key] + '%'
                        : typeof el.details[feature.key] === 'boolean'
                          ? el.details[feature.key]
                            ? 'да'
                            : 'нет'
                          : el.details[feature.key]}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        ))}
        <TableRow>
          <TableCell className='bg-[#F8F9FB]'></TableCell>
          {subscriptionPlans.map(plan => (
            <TableCell
              key={plan.name}
              className={cn(
                'text-center',
                plan.name === Tariff.BASIC && 'bg-[#C8F8E9]',
                plan.name === Tariff.STANDARD && 'bg-[#B5EDEF]',
                plan.name === Tariff.PREMIUM && 'bg-[#F8E9B3]',
                plan.name === Tariff.BLACK && 'bg-black text-white',
              )}
            >
              <Button variant='default' disabled>
                {plan.name === selectedTariff ? 'Продлить' : 'Купить'}
              </Button>
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default Tariffs
