'use client'
import usePathname from '@/shared/lib/use-pathname'
import SidebarLink from './sidebar-link'
import { cn } from '@/shared/lib/utils'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import getShortNumber from '@/shared/lib/numberFormatter'
import { useTranslations } from 'next-intl'
import { Skeleton } from '@/shared/ui/skeleton'
import { Routes } from '@/shared/model/routes'
import BigButton from '@/shared/ui/big-button'

const linkList = [
  {
    href: Routes.MY_ASSETS,
    name: 'MyAssets',
  },
  {
    href: Routes.MY_ORGANIZATIONS,
    name: 'MyOrganizations',
  },
  {
    href: Routes.PROFILE,
    name: 'Profile',
  },
  {
    href: Routes.MESSAGES,
    name: 'Messages',
    notification: 4,
  },
  {
    href: Routes.PURCHASES,
    name: 'MyPurchases',
  },
  {
    href: Routes.FAVORITES,
    name: 'Favorites',
  },
  {
    href: Routes.CART,
    name: 'Cart',
  },
]

const tariffs = {
  basic: {
    className:
      'bg-gradient-to-r from-gradient-accent-start to-gradient-accent-end inline-block text-transparent bg-clip-text',
    name: 'Basic',
  },
}

const userFake = {
  name: 'Владислав',
  avatar: 'https://picsum.photos/300',
  rating: 4.5,
  balance: 276034,
  tariff: tariffs.basic,
  id: '1',
}

const Sidebar = () => {
  const pathname = usePathname()
  const t = useTranslations('Menu')

  // TODO update with real api
  const {
    data: user,
    isLoading: isUserLoading,
    isSuccess: isUserSuccess,
  } = { data: userFake, isLoading: false, isSuccess: true }

  return (
    <div
      className='sticky top-36 z-50 mr-4 flex h-fit w-[300px] flex-shrink-0 flex-col gap-[36px]
        rounded-3xl border border-slate-200 bg-white p-[16px] pt-[24px]'
    >
      <div className='flex flex-col items-center justify-between gap-[8px] text-black'>
        {isUserLoading && (
          <>
            <Skeleton className='my-[5px] size-[90px] rounded-full' />
            <Skeleton className='my-1 h-6 w-2/3 rounded-full' />
          </>
        )}
        {isUserSuccess && (
          <>
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className='text-lg'>
              {user.name}
              <span className='inline-flex items-center pl-[8px] text-base'>
                {user.rating}
                <span className='text-xs'>★</span>
              </span>
            </div>
          </>
        )}
      </div>
      <BigButton isLoading={isUserLoading} label={t('Balance')}>
        {getShortNumber(user.balance, 'en', 'USDT')}
      </BigButton>
      <div className='flex flex-col gap-[4px]'>
        {linkList.map(item => (
          <SidebarLink
            active={pathname === item.href}
            key={item.name}
            href={item.href}
            name={t(item.name)}
            notification={item.notification}
          />
        ))}
      </div>
      <BigButton
        label={t('Tariff')}
        classNames={{
          value: 'text-2xl font-bold',
        }}
        isLoading={isUserLoading}
      >
        <div className={cn('text-2xl font-bold', user.tariff.className)}>
          {user.tariff.name}
        </div>
      </BigButton>
    </div>
  )
}

export default Sidebar
