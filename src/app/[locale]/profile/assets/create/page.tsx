import React from 'react'

import { Container, GradientTypography, Typography } from '@/shared/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'

import { CreateAssetForm } from '@/features/create-asset'

export default function Home() {
  return (
    <div className={'relative'}>
      <Container>
        <GradientTypography className='mb-8'>
          Создание актива
        </GradientTypography>

        <CreateAssetForm />
      </Container>
    </div>
  )
}
