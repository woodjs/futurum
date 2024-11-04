'use client'
import React from 'react'

import { Container, GradientTypography } from '@/shared/ui'
import { PurchaseFilterForm, StatusFilter } from '@/features/purchase-filter'

import CreateAssetForm from '@/features/create-asset-form/CreateAssetForm'
import ScrollToTop from '@/shared/ui/scroll-to-top'

import MyFormComponent from '@/features/new-form/newForm'
import ActiveCreate from '@/features/active-form/clearformactive'
import { ActivesList } from '@/widgets/active-list'

export default function Home() {
  
  return (
    <div className={'relative'}>
      <Container>
        <GradientTypography className='mb-8'>
          Создание актива
        </GradientTypography>
        
        
        <ActiveCreate/>

      </Container>
      <ScrollToTop />
    </div>
  )
}
