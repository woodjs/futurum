'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { Container } from '@/shared/ui'
import BurgerButton from './BurgerButton'
import BurgerMenu from './BurgerMenu'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../shared/ui/select'
import { LoginDialog } from '@/features/login'

function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('Home.Header')

  const data = [
    {
      id: 1,
      name: t('AboutUs'),
    },
    {
      id: 2,
      name: t('ForBusiness'),
    },
    {
      id: 3,
      name: t('ForIndividuals'),
    },
    {
      id: 4,
      name: t('CareersAtFuturum'),
    },
    {
      id: 5,
      name: t('Community'),
    },
  ]

  const trimUrl = (url: string) => {}

  const handleLanguageChange = (lang: string): void => {
    const newPath = pathname.replace(locale, lang)
    router.replace(newPath)
  }

  return (
    <>
      <div className='sticky left-0 top-0 z-50 h-[52px] bg-primary'>
        <Container className='flex h-full items-center justify-between'>
          <div className='flex w-full items-center justify-between'>
            <ul className='hidden flex-col gap-[35px] md:flex-row lg:flex'>
              {data.map(item => (
                <li key={item.id}>
                  <a href='#' className='font-[600] text-primary-foreground'>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <Select onValueChange={handleLanguageChange}>
              <SelectTrigger className='w-[70px]'>
                <SelectValue placeholder={locale} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='ru'>Ru</SelectItem>
                <SelectItem value='en'>En</SelectItem>
              </SelectContent>
            </Select>

            <div className='lg:hidden'>
              <svg
                width='27'
                height='34'
                viewBox='0 0 27 34'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clipPath='url(#clip0_34_2614)'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M18.747 12.323C20.9223 12.1685 23.9272 10.4987 25.2275 8.59467C26.9832 6.02359 27.1125 3.6628 26.9459 0.000732422C25.9125 0.523817 24.0749 3.01765 19.5278 3.04482L-0.00050354 3.08106L0.0330834 12.4017C1.44144 12.5772 18.3909 12.4837 18.7466 12.323H18.747ZM17.9741 14.0468C17.8162 13.825 18.1199 13.8722 17.467 13.8565L0.000416651 13.9018L0.0174402 23.1919C0.943153 23.3412 9.5497 23.2563 10.0411 23.0675C12.1387 22.788 14.8979 21.1229 15.6579 20.1612C16.3232 19.3196 16.7856 18.7073 17.289 17.489C17.7159 16.4557 17.9722 15.2746 17.9741 14.0468ZM0.859415 29.6611C0.962477 32.1397 3.04349 34.0923 5.56297 33.9964C7.96697 33.9049 9.97069 31.7463 9.82622 29.1118C9.68773 26.5908 7.63432 24.5142 5.03984 24.702C2.59674 24.8789 0.747612 26.9594 0.859875 29.6606L0.859415 29.6611Z'
                    fill='white'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_34_2614'>
                    <rect width='27' height='34' fill='white' />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <div className='lg:hidden'>
              <BurgerButton
                onClick={() => setIsOpen(!isOpen)}
                isOpen={isOpen}
              />
            </div>
          </div>
        </Container>
      </div>
      <BurgerMenu items={data} isOpen={isOpen} />
    </>
  )
}

export default Menu
