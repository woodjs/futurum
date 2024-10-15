'use client'
import { OrganizationCard } from '@/entities/organization'
import { useGetOrganizationList } from '@/entities/organization/api/hooks/use-get-organization-list'
import { Link } from '@/i18n/routing'
import { Typography } from '@/shared/ui'
import Loader from '@/shared/ui/loader'
import { NormalButton } from '@/shared/ui/normal-button'
import { Skeleton } from '@/shared/ui/skeleton'
import { PlusIcon } from '@heroicons/react/16/solid'

const skeletons = new Array(12).fill(0)

const MyOrganizationList = () => {
  const { data, isLoading, isSuccess } = useGetOrganizationList({ my: true })
  return (
    <div className=''>
      <div className='my-4 flex flex-wrap justify-between gap-2 text-black'>
        <h1 className='text-2xl font-bold'>Мои организации</h1>
        <NormalButton variant='ghost' className='hidden md:block' asChild>
          <Link href='/profile/organizations/create'>
            <span className=''>Создать организацию</span>
          </Link>
        </NormalButton>
      </div>
      <div className='my-8 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2'>
        {isLoading &&
          skeletons.map((_, index) => (
            <Skeleton className='h-[300px] w-full rounded-md' key={index} />
          ))}
        {isSuccess &&
          data.organizationList.map(card => (
            <Link
              href={`/profile/organizations/${card.id}`}
              key={card.companyName}
            >
              <OrganizationCard organization={card} key={card.companyName} />
            </Link>
          ))}
      </div>
    </div>
  )
}

export default MyOrganizationList
