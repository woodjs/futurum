'use client'
import { FC } from 'react'
import { IFinancialInfo } from '../model'
import getShortNumber from '@/shared/lib/numberFormatter'
import { useTranslations } from 'next-intl'

interface IFinancialViewProps extends IFinancialInfo {
  id: string
  edit?: FC<{ id: string }>
}

export const FinancialView: FC<IFinancialViewProps> = ({
  annualTurnover,
  foundationYear,
  grossRevenue,
  edit,
  id,
}) => {
  const t = useTranslations()

  return (
    <div className='mt-6'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='text-xl font-bold'>
          {t('organization.view.financialIndicators')}
        </div>
        {edit && edit({ id })}
      </div>
      <div className='rounded-lg bg-slate-100 p-4 py-8'>
        <div className='flex flex-wrap justify-evenly gap-8'>
          <div className='flex flex-col items-center justify-between rounded-lg bg-white p-6 shadow-md'>
            <p className='text-3xl font-semibold text-slate-800'>
              {foundationYear}
            </p>
            <span className='font-medium text-slate-600'>
              {t('organization.view.foundationYear')}
            </span>
          </div>

          <div className='flex flex-col items-center justify-between rounded-lg bg-white p-6 shadow-md'>
            <p className='text-3xl font-semibold text-slate-800'>
              {getShortNumber(annualTurnover, 'en', 'USD')}
            </p>
            <span className='font-medium text-slate-600'>
              {t('organization.view.annualTurnover')}
            </span>
          </div>

          <div className='flex flex-col items-center justify-between rounded-lg bg-white p-6 shadow-md'>
            <p className='text-3xl font-semibold text-slate-800'>
              {getShortNumber(grossRevenue, 'en', 'USD')}
            </p>
            <span className='font-medium text-slate-600'>
              {t('organization.view.grossRevenue')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
