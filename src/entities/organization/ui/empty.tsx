'use client'
import { NormalButton } from '@/shared/ui/normal-button'
import { Slot } from '@radix-ui/react-slot'
import { useTranslations } from 'next-intl'
import { FC, useId } from 'react'

interface IEmptyViewProps {
  title: string
  edit: FC<{ id: string }>
  id: string
  isFile?: boolean
}

const EmptyView: FC<IEmptyViewProps> = ({ title, edit, id, isFile }) => {
  const t = useTranslations()
  return (
    <div className='mt-6'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='text-xl font-bold'>{title}</div>
        {edit({ id })}
      </div>
      {isFile ? (
        <div
          className={`flex flex-wrap gap-4 rounded-xl border-2 border-dashed border-slate-300 p-4
            text-center`}
        >
          {t('organization.empty')}
        </div>
      ) : (
        <div className='my-8'>
          <div className='text-center text-xl font-bold text-black'>
            {t('organization.empty')}
          </div>
        </div>
      )}
    </div>
  )
}

export default EmptyView
