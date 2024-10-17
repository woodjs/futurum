import { FC } from 'react'
import { IFinancialInfo } from '../model'
import getShortNumber from '@/shared/lib/numberFormatter'

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
  return (
    <div className='mt-6'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='text-xl font-bold'>Финансовые показатели</div>
        {edit && edit({ id })}
      </div>
      <div className='rounded-lg bg-slate-100 p-4 py-8'>
        <div className='flex flex-wrap justify-evenly gap-8'>
          <div className='flex flex-col items-center justify-between rounded-lg bg-white p-6 shadow-md'>
            <p className='text-3xl font-semibold text-slate-800'>
              {foundationYear}
            </p>
            <span className='font-medium text-slate-600'>Foundation Year</span>
          </div>

          <div className='flex flex-col items-center justify-between rounded-lg bg-white p-6 shadow-md'>
            <p className='text-3xl font-semibold text-slate-800'>
              {getShortNumber(annualTurnover, 'en', 'USD')}
            </p>
            <span className='font-medium text-slate-600'>Annual Turnover</span>
          </div>

          <div className='flex flex-col items-center justify-between rounded-lg bg-white p-6 shadow-md'>
            <p className='text-3xl font-semibold text-slate-800'>
              {getShortNumber(grossRevenue, 'en', 'USD')}
            </p>
            <span className='font-medium text-slate-600'>Gross Revenue</span>
          </div>
        </div>
      </div>
    </div>
  )
}
