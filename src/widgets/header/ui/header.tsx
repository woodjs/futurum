'use client'
import IconLabelBadge from '@/screens/main/header/IconLabelBadge'
import { Button, Container, Input } from '@/shared/ui'
import { LogoFull } from '@/shared/ui/logo'
import { UserIcon } from '@heroicons/react/24/solid'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useTranslations } from 'next-intl'
import { Link } from '../../../i18n/routing'
import { getAccessToken } from '../../../shared/api/helpers/auth.helper'
import { UserMenu } from '../../user-menu'
import { useEffect, useState } from 'react'

export const Header = () => {
  const [token, setToken] = useState(null)
  const t = useTranslations('default.Home.Header')

  useEffect(() => {
    const accessToken = getAccessToken()
    setToken(accessToken)
  }, [token])

  return (
    <div className='sticky left-0 top-[52px] z-50 mb-2 w-full bg-white/80 backdrop-blur-lg'>
      <Container>
        <div className='flex w-full items-center gap-[28px] py-[24px]'>
          <div className='hidden lg:block'>
            <LogoFull />
          </div>
          {token ? null : (
            <Link href='/auth/signup'>
              <Button className=''>{t('Registration')}</Button>
            </Link>
          )}

          <Input
            placeholder={t('SearchByName')}
            leftSection={
              <MagnifyingGlassIcon className='size-[20px] text-slate-500' />
            }
            className='flex-1'
          />

          <div className='flex items-center gap-[26px]'>
            {token ? (
              <UserMenu />
            ) : (
              <Link href='/auth/signin'>
                <IconLabelBadge
                  icon={
                    <UserIcon
                      width={25}
                      height={25}
                      className='text-slate-600'
                    />
                  }
                  label={t('LogIn')}
                />
              </Link>
            )}
            {/* <IconLabelBadge
              icon={
                <HeartIcon width={25} height={25} className='text-slate-600' />
              }
              label={t('Watchlist')}
              badgeCount={1}
            /> */}
            {/* <IconLabelBadge
              icon={
                <ShoppingCartIcon
                  width={25}
                  height={25}
                  className='text-slate-600'
                />
              }
              label={t('Cart')}
              badgeCount={2}
            /> */}
          </div>
        </div>
      </Container>
    </div>
  )
}
