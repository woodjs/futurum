'use client'
import { useTranslations } from 'next-intl'
import { Container, GradientTypography } from '@/shared/ui'
import React from 'react'
import ScrollToTop from '@/shared/ui/scroll-to-top'
import { PurchaseFilterForm, StatusFilter } from '@/features/purchase-filter'
import { PurchaseStatusFilter } from '@/entities/purchases/api'
import { PurchaseList, PurchaseListNew } from '@/widgets/purchase-list'
import ClientSideRequest from './Zapr'


export default function Home() {
  const t = useTranslations('Menu')
  return (
    <div className={'relative'}>
      <Container>
        <ClientSideRequest></ClientSideRequest>
      </Container>
      <ScrollToTop />
    </div>
  )
}
