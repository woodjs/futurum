'use client'
import { FC } from 'react'
import { IPurchaseParams } from '../api'
import { format } from 'date-fns'
import getShortNumber from '@/shared/lib/numberFormatter'
import { useLocale, useTranslations } from 'next-intl'

interface IPurchaseFiltersFormatterProps {
  id: keyof IPurchaseParams
  value: IPurchaseParams[keyof IPurchaseParams]
}
export const PurchaseFiltersFormatter: FC<IPurchaseFiltersFormatterProps> = ({
  id,
  value,
}) => {
  const locale = useLocale()
  const t = useTranslations('Purchase.Filters')
  switch (id) {
    case 'fromDate':
      // @ts-ignore
      return t('FromValue', { value: format(value, 'yy.MM.dd') })
    case 'toDate':
      // @ts-ignore
      return t('ToValue', { value: format(value, 'yy.MM.dd') })
    case 'fromPrice':
      // @ts-ignore
      return t('FromValue', { value: getShortNumber(value, locale, 'USD') })
    case 'toPrice':
      // @ts-ignore
      return t('ToValue', { value: getShortNumber(value, locale, 'USD') })
    case 'category':
    default:
      return value
  }
}
