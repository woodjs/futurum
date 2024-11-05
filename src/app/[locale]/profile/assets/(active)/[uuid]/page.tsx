'use client'

import React from 'react'

import { Button, Container, GradientTypography } from '@/shared/ui'
import { useRouter } from '@/i18n/routing'
import { Routes } from '@/shared/model/routes'
import ScrollToTop from '@/shared/ui/scroll-to-top'
import { StatusFilter } from '@/features/actives-filter/ui/status-filter'
import { ActivesList } from '@/widgets/active-list'


export default function Home() {
  const { push } = useRouter()
  const handleButtonClick = () => push(Routes.CREATE_ASSET_NFT)
 

  return (
    <div className={'relative'}>
      <Container>
        <div className='flex flex-col gap-6'>
          <GradientTypography>Доброе сердце</GradientTypography>
          

          
        </div>
      </Container>
      <ScrollToTop />

    </div>
  )
}
