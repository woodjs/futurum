'use client'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { useUser } from '../../../entities/user'
import { usePathname, useRouter } from '../../../i18n/routing'
import { removeAccessToken } from '../../../shared/api/helpers/auth.helper'
import { protectedAPI } from '../../../shared/api'
import { AUTH_LOGOUT_URL } from '../../../shared/api/config'
import { Skeleton } from '../../../shared/ui/skeleton'
import { Routes } from '@/shared/model/routes'
import UserMenuLink from './user-menu-link'
import { useTranslations } from 'next-intl'

const linkList = [
  {
    href: Routes.MY_ASSETS,
    name: 'MyAssets',
    label: 'soon',
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

export const UserMenu = () => {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('default.Menu')
  const tProfile = useTranslations('profile')

  const handleLogOut = () => {
    removeAccessToken()
    protectedAPI.post(AUTH_LOGOUT_URL)
    router.push('/auth/signin')
  }

  return (
    <Popover>
      <PopoverTrigger>
        <div className='flex items-center gap-[10px]'>
          {isLoading ? (
            <Skeleton className='size-[36px] rounded-full' />
          ) : (
            <Avatar className='size-[36px]'>
              <AvatarImage src={user?.photo?.path} alt={user?.firstName} />
              <AvatarFallback>{user?.firstName[0]}</AvatarFallback>
            </Avatar>
          )}

          {isLoading ? (
            <Skeleton className='my-1 h-6 w-2/3 rounded-full' />
          ) : (
            <span className='text-[12px] text-[#2D3748] text-[700]'>
              {user?.firstName}
            </span>
          )}

          <svg
            width='9'
            height='5'
            viewBox='0 0 9 5'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='cursor-pointer'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M4.95773 4.47075C4.69738 4.7311 4.27527 4.7311 4.01492 4.47075L0.68159 1.13742C0.42124 0.877071 0.42124 0.454961 0.68159 0.194611C0.941939 -0.0657382 1.36405 -0.0657382 1.6244 0.194611L4.48633 3.05654L7.34826 0.194611C7.60861 -0.0657382 8.03072 -0.0657382 8.29107 0.194611C8.55142 0.454961 8.55142 0.877071 8.29107 1.13742L4.95773 4.47075Z'
              fill='#040921'
            />
          </svg>
        </div>
      </PopoverTrigger>
      <PopoverContent className='flex w-auto flex-col divide-y rounded-[15px] p-[20px]'>
        <div className='flex flex-col gap-[4px]'>
          {linkList.map(item => (
            <UserMenuLink
              active={
                item.exact
                  ? item.href === pathname
                  : pathname.startsWith(item.href)
              }
              key={item.name}
              href={item.href}
              name={t(item.name)}
              disable={item.disable}
              label={item.label && tProfile(item.label)}
              notification={
                Routes.MESSAGES === item.href ? user?.messages : undefined
              }
            />
          ))}
        </div>

        <button
          className='m-0 mt-2 cursor-pointer border-none bg-none p-0 text-[12px] text-[700]
            text-red-500 outline-none hover:text-red-400'
          onClick={handleLogOut}
        >
          {t('logout')}
        </button>
      </PopoverContent>
    </Popover>
  )
}
