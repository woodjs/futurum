'use client'
import usePathname from '@/shared/lib/use-pathname'
import SidebarLink from './sidebar-link'
import { cn } from '@/shared/lib/utils'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import getShortNumber from '@/shared/lib/numberFormatter'
import { useTranslations } from 'next-intl'

const linkList = [
  {
    href: '/',
    name: 'MyAssets',
  },
  {
    href: '/organizations',
    name: 'MyOrganizations',
  },
  {
    href: '#',
    name: 'Profile',
  },
  {
    href: '#',
    name: 'Messages',
    notification: 4,
  },
  {
    href: '#',
    name: 'MyPurchases',
  },
  {
    href: '#',
    name: 'Favorites',
  },
  {
    href: '#',
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

const balance = 276034

const tariff = tariffs.basic

const user = {
  name: 'Владислав',
  avatar: 'https://picsum.photos/300',
  rating: 4.5,
}

const Sidebar = () => {
  const pathname = usePathname()
  const t = useTranslations('Menu')

  return (
    <div
      className='fixed left-[10px] top-[150px] z-50 ml-[20px] flex w-[300px] flex-col gap-[36px]
        rounded-3xl border border-slate-200 bg-white p-[16px] pt-[24px]'
    >
      <div className='flex flex-col items-center justify-between gap-[8px] text-black'>
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
      </div>
      {balance && (
        <button
          className='flex w-full items-center gap-[8px] rounded-xl px-[12px] py-[8px] duration-200
            hover:bg-slate-100'
        >
          <div className='flex flex-col'>
            <div className='text-left text-sm text-slate-400'>
              {t('Balance')}
            </div>
            <div className={cn('text-xl font-bold text-black')}>
              {getShortNumber(balance, 'en', 'USDT')}
            </div>
          </div>
          <ChevronRight className='ml-auto text-slate-400' />
        </button>
      )}
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
      <button
        className='flex w-full items-center gap-[8px] rounded-xl px-[12px] py-[8px] duration-200
          hover:bg-slate-100'
      >
        <div className='flex flex-col'>
          <div className='text-left text-sm text-slate-400'>{t('Tariff')}</div>
          {tariff && (
            <div className={cn('text-2xl font-bold', tariff.className)}>
              {tariff.name}
            </div>
          )}
        </div>
        <ChevronRight className='ml-auto text-slate-400' />
      </button>
    </div>
  )
}

export default Sidebar
