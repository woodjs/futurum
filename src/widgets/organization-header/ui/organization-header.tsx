'use client'
import { useGetOrganizationById } from '@/entities/organization/api/hooks/use-get-organization-by-id'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import Rating from '@/shared/ui/rating'
import { Skeleton } from '@/shared/ui/skeleton'
import { HeartIcon, ShareIcon } from '@heroicons/react/16/solid'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { FC } from 'react'

interface OrganizationHeaderProps {
  id: string
}

const OrganizationHeader: FC<OrganizationHeaderProps> = ({ id }) => {
  const { data, isSuccess, isLoading } = useGetOrganizationById(id)

  if (isLoading)
    return (
      <div className='flex items-start justify-between'>
        <div className='flex items-stretch gap-5'>
          <Skeleton className='size-[168px] rounded-full' />
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-12 w-96 rounded-full' />
            <Skeleton className='h-5 w-24 rounded-full' />
            <Skeleton className='h-5 w-72 rounded-full' />
            <Skeleton className='h-6 w-56 rounded-full' />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-6 w-24 rounded-full' />
          <Skeleton className='h-6 w-24 rounded-full' />
        </div>
      </div>
    )
  if (isSuccess)
    return (
      <div className='flex flex-col-reverse items-start justify-between gap-2 lg:flex-row'>
        <div className='flex flex-col items-stretch gap-5 md:flex-row'>
          <Avatar className='md:size-[132px] lg:size-[168px]'>
            <AvatarImage src={data?.logo} alt={data?.companyName} />
            <AvatarFallback>{data?.companyName[0]}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <div className='flex items-center text-3xl font-bold text-black lg:text-5xl'>
              {data?.companyName}{' '}
              <CheckBadgeIcon className='ml-2 size-9 text-blue-600' />
            </div>
            <div className='text-lg font-bold text-slate-500'>
              {data?.ownershipForm}
            </div>
            <div className='text-lg text-slate-500'>
              {data?.country}, {data?.city}, {data?.address}
            </div>
            <Rating
              readOnly
              ratingDigit={data?.rating?.toString() || '0'}
              rating={data?.rating || 0}
            />
          </div>
        </div>
        <div className='ml-auto flex gap-2 text-slate-500 lg:flex-col'>
          <button className='flex items-center gap-2'>
            <span>В избранное</span>
            <HeartIcon className='' width={20} height={20} />
          </button>
          <button
            className='flex items-center gap-2'
            onClick={() => navigator.share({ url: window.location.href })}
          >
            <span>Поделиться</span>
            <ShareIcon className='size-5' width={20} height={20} />
          </button>
        </div>
      </div>
    )
}

export { OrganizationHeader }
