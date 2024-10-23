'use client'
import { OrganizationCard } from '@/entities/organization'
import { useGetOrganizationList } from '@/entities/organization/api/hooks/use-get-organization-list'
import { Link } from '@/i18n/routing'
import { Typography } from '@/shared/ui'
import Loader from '@/shared/ui/loader'
import { NormalButton } from '@/shared/ui/normal-button'
import { Skeleton } from '@/shared/ui/skeleton'
import { PlusIcon } from '@heroicons/react/16/solid'
import { useTranslations } from 'next-intl'

const skeletons = new Array(12).fill(0)

const MyOrganizationList = () => {
  const { data, isLoading, isSuccess } = useGetOrganizationList({ my: true })
  const t = useTranslations()
  return (
    <div className=''>
      <div className='my-4 flex flex-wrap justify-between gap-2 text-black'>
        <h1 className='text-2xl font-bold'>
          {t('organization.view.myOrganizations')}
        </h1>
        <NormalButton variant='ghost' className='hidden md:block' asChild>
          <Link href='/profile/organizations/create'>
            <span className=''>
              {t('organization.buttons.createOrganization')}
            </span>
          </Link>
        </NormalButton>
      </div>
      <div className='my-8 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2'>
        {isLoading &&
          skeletons.map((_, index) => (
            <Skeleton className='h-[300px] w-full rounded-md' key={index} />
          ))}
        {isSuccess &&
          data.data.map(card => (
            <Link
              href={`/profile/organizations/${card.id}`}
              key={card.companyName}
            >
              <OrganizationCard organization={card} key={card.companyName} />
            </Link>
          ))}
        {isSuccess && data.data.length === 0 && (
          <div className='col-span-2 flex w-full flex-col items-center justify-center'>
            <div className='mt-8 text-center text-xl text-black'>
              {t('organization.view.noOrganizations')}
            </div>
            <NormalButton className='mt-4' variant='default' asChild>
              <Link href='/profile/organizations/create'>
                <span className=''>
                  {t('organization.buttons.createOrganization')}
                </span>
              </Link>
            </NormalButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrganizationList
