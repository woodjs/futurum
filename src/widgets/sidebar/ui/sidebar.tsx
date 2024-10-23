'use client'
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
import { Tariff } from '@/shared/api/types'
import { Link, usePathname } from '@/i18n/routing'
import { useUser } from '../../../entities/user'

const linkList = [
  {
    href: Routes.MY_ASSETS,
    name: 'MyAssets',
    label: 'Скоро',
    disable: true,
    exact: false,
  },
  {
    href: Routes.MY_ORGANIZATIONS,
    name: 'MyOrganizations',
    disable: false,
    exact: false,
  },
  {
    href: Routes.PROFILE,
    name: 'Profile',
    disable: false,
    exact: true,
  },
  {
    href: Routes.MESSAGES,
    name: 'Messages',
    notification: 0,
    disable: true,
  },
  {
    href: Routes.PURCHASES,
    name: 'MyPurchases',
    disable: true,
  },
  {
    href: Routes.FAVORITES,
    name: 'Favorites',
    disable: true,
  },
  {
    href: Routes.CART,
    name: 'Cart',
    disable: true,
  },
]

const tariffs = {
  [Tariff.BASIC]:
    'bg-gradient-to-r from-gradient-accent-start to-gradient-accent-end inline-block text-transparent bg-clip-text',
  [Tariff.PREMIUM]:
    'bg-gradient-to-r from-gradient-accent-start to-gradient-accent-end inline-block text-transparent bg-clip-text',
  [Tariff.STANDARD]:
    'bg-gradient-to-r from-gradient-accent-start to-gradient-accent-end inline-block text-transparent bg-clip-text',
  [Tariff.BLACK]:
    'bg-gradient-to-r from-gradient-accent-start to-gradient-accent-end inline-block text-transparent bg-clip-text',
}

const userFake = {
  name: 'Владислав',
  avatar: 'https://picsum.photos/300',
  rating: 4.5,
  balance: 276034,
  tariff: {
    id: Tariff.BASIC,
    name: 'Basic',
  },
  messages: 4,
  id: '1',
}

interface IUserMe {
  name: string
  avatar: string
  rating: number
  balance: number
  tariff: {
    id: Tariff
    name: string
  }
  messages: number
  id: string
}

const Sidebar = () => {
  const pathname = usePathname()
  const t = useTranslations('default.Menu')
  const { user, isLoading } = useUser()

  // TODO update with real api
  // const {
  //   data: user,
  //   isLoading: isUserLoading,
  //   isSuccess: isUserSuccess,
  // } = { data: userFake, isLoading: false, isSuccess: true }
  linkList.forEach(link => {
    console.log(link.href, pathname, pathname.startsWith(link.href))
  })
  return (
    <div
      className='sticky top-40 mr-4 flex h-fit w-[300px] flex-shrink-0 flex-col gap-[36px]
        rounded-3xl border border-slate-200 bg-white p-[16px] pt-[24px]'
    >
      <div className='flex flex-col items-center justify-between gap-[8px] text-black'>
        {isLoading && (
          <>
            <Skeleton className='my-[5px] size-[90px] rounded-full' />
            <Skeleton className='my-1 h-6 w-2/3 rounded-full' />
          </>
        )}
        {!isLoading && (
          <>
            <Avatar>
              <AvatarImage src={user?.photo?.path} alt={user.firstName} />
              <AvatarFallback>{user.firstName[0]}</AvatarFallback>
            </Avatar>
            <div className='text-lg'>
              {user.firstName}
              {user.rating && (
                <span className='inline-flex items-center pl-[8px] text-base'>
                  {user.rating}
                  <span className='text-xs'>★</span>
                </span>
              )}
            </div>
          </>
        )}
      </div>
      {/* <BigButton isLoading={isLoading} label={t('Balance')}>
        {getShortNumber(user.balance, 'en', 'USDT')}
      </BigButton> */}
      <div className='flex flex-col gap-[4px]'>
        {linkList.map(item => (
          <SidebarLink
            active={
              item.exact
                ? item.href === pathname
                : pathname.startsWith(item.href)
            }
            key={item.name}
            href={item.href}
            name={t(item.name)}
            disable={item.disable}
            label={item.label}
            notification={
              Routes.MESSAGES === item.href ? user?.messages : undefined
            }
          />
        ))}
      </div>
      <Link href={Routes.TARIFFS}>
        {/* <BigButton
          label={t('Tariff')}
          classNames={{
            value: 'text-2xl font-bold',
          }}
          isLoading={isLoading}
        >
          <div className={cn('text-2xl font-bold', tariffs[user.tariff.id])}>
            {user.tariff.name}
          </div>
        </BigButton> */}
      </Link>
    </div>
  )
}

export default Sidebar
