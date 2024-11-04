'use client'

import React from 'react'

import { Button, Container, GradientTypography } from '@/shared/ui'
import { useRouter } from '@/i18n/routing'
import { Routes } from '@/shared/model/routes'

export default function Home() {
  const { push } = useRouter()

  const handleButtonClick = () => push(Routes.CREATE_ASSET)

  return (
    <div className={'relative'}>
      <Container>
        <div className='flex flex-col gap-6'>
          <GradientTypography>Мои активы</GradientTypography>
          <Button onClick={handleButtonClick} className='max-w-40' size='sm'>
            Создать актив
          </Button>
        </div>
      </Container>
    </div>
  )
}
