'use client'
import { FC } from 'react'
import { IOrganization } from '../model'
import { GradientTypography } from '@/shared/ui'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { NormalButton } from '@/shared/ui/normal-button'
import { Link } from '@/i18n/routing'
import { OrganizationView } from './organization-view'
import { useTranslations } from 'next-intl'

interface ISuccessOrganizationViewProps {
  organization: IOrganization
}

const SuccessOrganizationView: FC<ISuccessOrganizationViewProps> = ({
  organization,
}) => {
  const t = useTranslations('organization')
  return (
    <div
      style={{
        perspective: '1000px',
      }}
      className='relative flex w-full flex-col items-center gap-6 overflow-hidden rounded-2xl
        border border-slate-200 bg-white p-6 pb-0 text-black'
    >
      <div
        style={{
          transform:
            'scale(1) rotateX(30deg) translateY(-460px) translateZ(-500px)',
        }}
        className='pointer-events-none absolute right-0 top-0 origin-top'
      >
        <OrganizationView organization={organization} />
      </div>
      <div
        className='relative flex w-full flex-col items-center gap-6 bg-gradient-to-t from-white
          from-25% to-transparent pb-12 pt-48 animate-in'
      >
        <CheckBadgeIcon className='size-32 text-sky-500' />
        <div className='text-center'>
          <GradientTypography
            className='text-3xl md:text-4xl'
            variant='subtitle-1'
          >
            {organization.companyName}
          </GradientTypography>
          <div className='text-2xl font-bold'>
            {t('success.successfullyCreated')}
          </div>
          <NormalButton className='mt-8' asChild>
            <Link href={`/profile/organizations/${organization.id}`}>
              {t('success.goToOrganization')}
            </Link>
          </NormalButton>
          <NormalButton variant='ghost' className='mt-8 block' asChild>
            <Link href={`/profile/organizations`}>
              {t('success.backToList')}
            </Link>
          </NormalButton>
        </div>
      </div>
    </div>
  )
}

export { SuccessOrganizationView }
