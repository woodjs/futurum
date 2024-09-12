'use client'
import usePathname from '@/shared/lib/use-pathname'
import SidebarLink from './sidebar-link'
import { cn } from '@/shared/lib/utils'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import getShortNumber from '@/shared/lib/numberFormatter'

const linkList = [
  {
    href: '/',
    name: 'Мои активы',
  },
  {
    href: '#',
    name: 'Мои организации',
  },
  {
    href: '#',
    name: 'Профиль',
  },
  {
    href: '#',
    name: 'Сообщения',
    notification: 4,
  },
  {
    href: '#',
    name: 'Мои покупки',
  },
  {
    href: '#',
    name: 'Избранное',
  },
  {
    href: '#',
    name: 'Корзина',
  },
]

const statuses = {
  basic: {
    className:
      'bg-gradient-to-r from-gradient-accent-start to-gradient-accent-end inline-block text-transparent bg-clip-text',
    name: 'Basic',
  },
}

const balance = 276034

const status = statuses.basic

const user = {
  name: 'Владислав',
  avatar: 'https://picsum.photos/300',
  rating: 4.5,
}

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <div
      className='ml-[20px] flex w-[300px] flex-col gap-[36px] rounded-2xl border border-slate-200
        p-[16px]'
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
      <button
        className='flex w-full items-center gap-[8px] rounded-xl px-[12px] py-[8px] duration-200
          hover:bg-slate-100'
      >
        <div className='flex flex-col'>
          <div className='text-left text-sm text-slate-400'>Баланс</div>
          {balance && (
            <div className={cn('text-xl font-bold text-black')}>
              {getShortNumber(balance, 'en', 'USDT')}
            </div>
          )}
        </div>
        <ChevronRight className='ml-auto text-slate-400' />
      </button>
      <div className='flex flex-col gap-[4px]'>
        {linkList.map(item => (
          <SidebarLink
            active={pathname === item.href}
            key={item.name}
            href={item.href}
            name={item.name}
            notification={item.notification}
          />
        ))}
      </div>
      <button
        className='flex w-full items-center gap-[8px] rounded-xl px-[12px] py-[8px] duration-200
          hover:bg-slate-100'
      >
        <div className='flex flex-col'>
          <div className='text-left text-sm text-slate-400'>Статус</div>
          {status && (
            <div className={cn('text-2xl font-bold', status.className)}>
              {status.name}
            </div>
          )}
        </div>
        <ChevronRight className='ml-auto text-slate-400' />
      </button>
    </div>
  )
}

export default Sidebar
