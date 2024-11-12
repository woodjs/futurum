import { useTranslations } from 'next-intl'
import { Container, GradientTypography } from '@/shared/ui'
import React from 'react'
import ScrollToTop from '@/shared/ui/scroll-to-top'
import { PurchaseFilterForm, StatusFilter } from '@/features/purchase-filter'
import { PurchaseStatusFilter } from '@/entities/purchases/api'
import { PurchaseList } from '@/widgets/purchase-list'

PurchaseStatusFilter

export default function Home() {
  const t = useTranslations('Menu')
  return (
    <div className={'relative'}>
      <Container>
        <GradientTypography className='mb-[24px]'>
          {t('MyPurchases')}
        </GradientTypography>
        <StatusFilter />
        <PurchaseFilterForm />
        <PurchaseList />
      </Container>
      <ScrollToTop />
    </div>
  )
}
