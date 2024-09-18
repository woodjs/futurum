import IconLabelBadge from '@/screens/main/header/IconLabelBadge'
import { Button, Container, Input } from '@/shared/ui'
import { LogoFull } from '@/shared/ui/logo'
import { Heart, Search, ShoppingCart, UserRound } from 'lucide-react'
import { useTranslations } from 'next-intl'

export const Header = () => {
  const t = useTranslations('Home.Header')
  return (
    <div className='sticky left-0 top-[52px] z-50 w-full bg-white'>
      <Container>
        <div className='flex w-full items-center gap-[28px] bg-white py-[24px]'>
          <div className='hidden lg:block'>
            <LogoFull />
          </div>
          <Button className='hidden lg:block'>{t('Registration')}</Button>

          <Input
            placeholder={t('SearchByName')}
            leftSection={<Search />}
            className='flex-1'
          />

          <div className='hidden items-center gap-[26px] lg:flex'>
            <IconLabelBadge
              icon={<UserRound width={25} height={25} />}
              label={t('LogIn')}
            />
            <IconLabelBadge
              icon={<Heart width={25} height={25} />}
              label={t('Watchlist')}
              badgeCount={1}
            />
            <IconLabelBadge
              icon={<ShoppingCart width={25} height={25} />}
              label={t('Cart')}
              badgeCount={2}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}
