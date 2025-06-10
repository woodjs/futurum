/* eslint-disable react/react-in-jsx-scope */
'use client'
import { Link } from '@/i18n/routing'
import { NormalButton } from '@/shared/ui/normal-button'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

interface IFailedOrganizationViewProps {
  back: () => void
  error?: string
}

const FailedOrganizationView: FC<IFailedOrganizationViewProps> = ({
  back,
  error,
}) => {
  const t = useTranslations('organization')

  return (
    <div
      className='flex w-full flex-col items-center gap-6 rounded-2xl border border-slate-200
        bg-white p-6 py-12 pb-36 text-black'
    >
      <ExclamationTriangleIcon className='size-32 text-red-500' />
      <div className='text-center text-3xl font-bold'>
        {error || t('failure.somethingWentWrong')}
      </div>
      <NormalButton onClick={back}>{t('failure.backToCreation')}</NormalButton>
      <NormalButton variant='ghost' asChild>
        <Link href='/profile/organizations'>{t('failure.backToList')}</Link>
      </NormalButton>
    </div>
  )
}

export { FailedOrganizationView }
