'use client'
import React from 'react'
import { IOrganization } from '../model'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { StarIcon } from '@heroicons/react/16/solid'
import { useTranslations } from 'next-intl'

interface OrganizationCardProps {
  organization: IOrganization
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  organization,
}) => {
  const t = useTranslations()
  return (
    <div className='rounded-md border border-slate-200 p-3 @container/organization sm:p-4'>
      <div className='flex flex-col gap-4 @sm/organization:flex-row'>
        <Avatar className='aspect-square w-full overflow-hidden rounded-md @sm/organization:max-w-[160px]'>
          <AvatarFallback className='flex aspect-square w-full items-center justify-center bg-slate-100'>
            {organization.companyName[0]}
          </AvatarFallback>
          <AvatarImage
            className='aspect-square w-full object-cover'
            src={organization.logo}
            alt='Company Logo'
          />
        </Avatar>
        <div className='flex flex-col'>
          <div className='text-xl font-bold'>{organization.companyName}</div>
          <p className='text-base text-slate-700'>
            {organization.country}, {organization.city}, {organization.address}
          </p>
          <p className='text-sm text-slate-600'>{organization.ownershipForm}</p>
          <div className='mt-2 flex items-center gap-1'>
            {organization.type && (
              <span
                className='inline-block rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold
                  text-slate-700'
              >
                {t(`organization.types.${organization.type}`)}
              </span>
            )}
            {!!organization.rating && (
              <span
                className='gap-1/2 flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm
                  font-semibold text-slate-700'
              >
                <StarIcon className='size-4 text-yellow-500' />
                {organization.rating}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export { OrganizationCard }
